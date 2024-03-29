# 4.6 内部缓存原理

ES查询过程中会占用CPU、内存资源，而内存会令很多读者头疼，内存一直很高，不知道是哪里的问题，想优化，但是不懂其原理便会无从下手，所以了解内存里的缓存原理是很有必要。

**清理缓存有以下几种方式**
1. 关闭索引 [查看](/chapter2/index_operation.html#_1-关闭索引)
2. 使用清理缓存命令

清空所有缓存
```json
POST _cache/clear
```

清空`1个或多个`索引缓存
```json
POST indexname,product_index/_cache/clear
```

## 4.6.1 Node 查询缓存
Node级别的filter过滤器结果缓存，集群中的每个节点包含一个Node Query Cache，作用域是Node实例，由该节点的所有 shard 共享，Cache 采用 LRU 算法进行淘汰。

### 1. 什么情况下发生NodeQueryCache

1. 只有Filter下的子Query才能缓存
2. 不能缓存的Query
TermQuery/MatchAllDocsQuery/MatchNoDocsQuery/BooleanQuery/DisjunnctionMaxQuery
3. MultiTermQuery/MultiTermQueryConstantScoreWrapper/TermInSetQuery/Point*Query的Query查询超过2次会被Cache，其它Query要5次
4. 默认每个Segment大于10000个doc或每个段的doc数大于总doc数的30%时才允许参与cache。
5. 结果集比较大的Query在Cache时尽量增加使用周期以免频繁Cache构建DocIdset。
6. Segment被合并或者删除，那么也会清理掉对应的缓存。
7. 该内存无法被GC

### 2. Cache相关配置
1. indices.queries.cache.size：为每个节点配置缓存的内存大小，默认是10%，支持两种格式，一种是百分数，占节点heap的百分比，另一种是精确的值，如512mb，这个参数是静态的配置后需要重启节点生效。
2. index.queries.cache.enabled：属于index级别的配置，用来控制是否启用缓存，默认是开启的。

缓存策略初始化在Node初始化的时候完成，Query Cache在Node层面，如果想把Cache基于每个Shard层面，需要把属性index.queries.cache.everything设置为true(默认false)

## 4.6.2 ShardCache
针对 ES 的 query 请求，缓存各分片的查询结果，主要用于缓存聚合结果，采用LRU机制，当分片 refresh 后会失效。Shard Request Cache是分片级别的查询缓存，每个分片有自己的缓存。该缓存采用 LRU 机制，缓存的 key 是整个客户端请求，缓存内容为单个分片的查询结果。如果一个客户端请求被数据节点缓存了，下次查询的时候可以直接从缓存获取，无需对分片进行查询。Shard查询缓存的理念是对请求的完整响应进行缓存，不需要执行任何搜索，并且基本上可以立即返回响应 — 只要数据没有更改，以确保您不会返回任何过时数据

```java
final Key key =  new Key(cacheEntity, reader.getReaderCacheHelper().getKey(), cacheKey);
```
- cacheEntity， 主要是 shard信息，代表该缓存是哪个 shard上的查询结果。
- readerCacheKey， 主要用于区分不同的 IndexReader。 cacheKey， 主要是整个客户端请求的请求体（source）和请求参数（preference、indexRoutings、requestCache等）。由于客户端请求信息直接序列化为二进制作为缓存 key 的一部分，所以客户端请求的 json 顺序，聚合名称等变化都会导致 cache 无法命中。


### 1. Cache 失效策略
Request Cache是非常智能的，它能够保证和在近实时搜索中的非缓存查询结果一致。

> Request Cache缓存失效是自动的，当索引refresh时就会失效，所以其生命周期是一个refresh_interval，也就是说在默认情况下Request Cache是每1秒钟失效一次（注意：分片在这段时间内确实有改变才会失效）。当一个文档被索引到该文档变成Searchable之前的这段时间内，不管是否有请求命中缓存该文档都不会被返回，正是因为如此ES才能保证在使用Request Cache的情况下执行的搜索和在非缓存近实时搜索的结果一致。

### 2. 参数配置
1. index.requests.cache.enable：默认为true，启动RequestCache配置。
2. indices.requests.cache.size：RequestCache占用JVM的百分比，默认情况下是JVM堆的1%大小
3. indices.requests.cache.expire：配置过期时间，单位为分钟。

每次请求的时候使用query-string参数可以指定是否使用Cache（request_cache=true），这个会覆盖Index级别的设置。

### 3. Request Cache作用
Request Cache 的主要作用是对聚合的缓存，聚合过程是实时计算，通常会消耗很多资源，缓存对聚合来说意义重大。

只有客户端查询请求中 size=0的情况下才会被缓存，其他不被缓存的条件还包括 scroll、设置了 profile属性，查询类型不是 QUERY_THEN_FETCH，以及设置了 requestCache=false等。另外一些存在不确定性的查询例如：范围查询带有now，由于它是毫秒级别的，缓存下来没有意义，类似的还有在脚本查询中使用了 Math.random() 等函数的查询也不会进行缓存。

该缓存使用LRU淘汰策略，内存无法被GC。

1. 默认被开启，ES6.71版本之后。
2. RequestCache作用域为Node，在Node中的Shard共享这个Cache空间。。
3. RequestCache 是以查询的DSL整个串为key的，修改一个字符和顺序都需要重新生成Cache。
4. 缓存失效是索引的refresh操作，也可以设置失效时间。
5. 缓存的默认大小是JVM堆内存的1%，可以通过手动设置。

## 4.6.3 Indexing Buffer
索引缓冲区，用于存储新索引的文档，当其达到阈值时，会触发 ES flush 将段落到磁盘上。Lucene文件写入Indexing Buffer中，这时文件不能搜索，但触发refresh后，进入Page Cache后形成Segment就可以被搜索，这个也是ES NRT近实时搜索特性的原因。

### 1. 参数配置
以下设置是静态的，必须在群集中的每个数据节点上进行配置：

- indices.memory.index_buffer_size 接受百分比或字节大小的值。 它默认为10％，这意味着分配给一个节点的总堆栈的10％将用作所有分片共享的索引缓冲区大小。
- indices.memory.min_index_buffer_size 如果将index_buffer_size指定为百分比，则可以使用此设置指定绝对最小值。 默认值为48mb。
- ndices.memory.max_index_buffer_size 如果index_buffer_size被指定为百分比，则可以使用此设置来指定绝对最大值。 默认为限制

### 2. 注意事项
由于可以GC，有flush操作，不需要特殊的关注。Indexing Buffer是用来缓存新数据，当其满了或者refresh/flush interval到了，就会以segment file的形式写入到磁盘。 这个参数的默认值是10% heap size。根据经验，这个默认值也能够很好的工作，应对很大的索引吞吐量。 但有些用户认为这个buffer越大吞吐量越高，因此见过有用户将其设置为40%的。到了极端的情况，写入速度很高的时候，40%都被占用，导致OOM

## 4.6.4 FieldData Cache

用于 text 字段分词或排序时获取字段值，基于 lucene 的 segment 构建，伴随 segment 生命周期常驻在堆内存中。

Fielddata Cache做了解即可，使用它的也非常的少了，基本可以用doc_value代替了，doc_value使用不需要全部载入内存。


## 4.6.5 页缓存
ES的读写操作是基于Lucene完成的，Lucene的读写操作是基于Segnemt。Segment具有不变性，一旦生成，无法修改。这样，把Segment加载到Page Cache进行读操作是很高效的，写操作也是先写入Page Cache，然后flush到磁盘，推荐Page Cache占整个内存的50%。ES的写操作只有增加和删除，并没有修改（修改API是先删除再新增），有写操作的时候Page Cache会有脏页。

Linux除了通过对read，write函数的调用实现数据的读写，还提供了一种方式，对文件数据进行读写，即利用mmap函数。

mmap与read相比的优势在于：少了一次内存从内核空间到用户空间的拷贝，对于需要常驻内存的文件和随机读取场景更适用；而反过来read的优势在于，调用开销少，不需要构建内存映射的页表等操作（包括unmap），对于少量顺序读取或者读取完就丢弃的场景更适用。