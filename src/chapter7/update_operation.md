# 7.2 修改相关操作

## 7.2.1 锁机制
程序运行时，会有很多线程去操作数据，从而导致数据不一致，此时为了控制并发问题，我们会选用锁机制，锁分为悲观锁和乐观锁。

### 1. 悲观锁与乐观锁介绍

#### 1. 悲观锁
听名字就知道，很悲观，总会认为有人要和他一块改数据，每次拿数据要先上锁，从而只有一个线程可以操作数据。悲观锁在数据库应用比较多的。

#### 2. 乐观锁
乐观锁和悲观锁相反，很乐观的认为没人和他一块改数据，**只有在修改数据的时候才会上锁**，并且会有一个version版本比较。

> 例如一个线程拿到ID=1的数据，version是1，修改的时候要保证数据的version是1，不然则认为该条数据被其他线程修改过，从而放弃修改。修改成功后，将version+1。

**ES作为搜索引擎，其场景是读多写少情况，所以它的加锁机制是乐观锁，这样可以提高吞吐量。**

<font color="red">**对于乐观锁本书的ES版本和旧版本差距较大，读者需要对照相对应版本的API**</font>

### 2. 乐观锁实现方式

ES使用 `if_seq_no` 和 `if_primary_term` 实现乐观锁

* 1. _seq_no

递增的版本顺序号，每个文档一个  
任何类型的写操作，包括create、update、delete，_seq_no 都会 +1

* 2. _primary_term

文档所在主分片的编号，当Primary Shard发生重新分配时，如重启、Primary选举等，_primary_term会递增1。_primary_term主要是用来恢复数据时处理当多个文档的_seq_no一样时的冲突，避免Primary Shard上的写入被覆盖。


添加数据、通过ID查看数据会返回 `if_seq_no` 和 `if_primary_term` 的值。

### 3. 乐观锁实现过程

修改文档时，带上 `if_seq_no` 和 `if_primary_term`，会判断文档当前 `_seq_no` 值和参数是否一致，如果一致修改成功，否则修改失败。

* 乐观锁修改语法
```json
POST indexname/_update/1?if_seq_no=1&if_primary_term=1
{
  "doc":{
    "name":"修改"
  }
}
```

* 乐观锁删除语法
```json
DELETE indexname/_doc/1?if_seq_no=1&if_primary_term=1
```

