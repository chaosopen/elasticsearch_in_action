# 5.2 使用Canal进行MySQL数据同步

## 5.2.1 开启MySQL的binlog模式

这里要注意本书使用的MySQL版本是`5.7`


### 1. 开启MySQL的binlog
通过配置 /etc/my.cnf 或 /etc/mysql/mysql.conf.d/mysqld.cnf 配置文件的 log-bin 选项：

```shell
log_bin=ON
server-id=1001
binlog-format=ROW
```
配置后重启MySQL，根据语句查询是否开启

### 2. 判断MySQL是否已经开启binlog
```sql
show variables like 'log_bin';
```
`log_bin=on` 表示开启

### 3. 查看binlog模式
```sql
show global variables like "binlog_format%";
```
`binlog_format=row` 表示行模式

## 5.2.2 安装Kafka
安装Kafka参考：[点击查看](https://www.cnblogs.com/chaosopen/p/17831418.html)

## 5.2.3 安装Canal
官方参考安装：[点击查看](https://github.com/alibaba/canal/wiki/QuickStart)

## 5.2.4 配置Canal-Adapter
官方参考安装：[点击查看](https://github.com/alibaba/canal/wiki/Sync-ES)

## 5.2.5 测试数据监听发送

1. 添加数据


2. 验证ES是否接收数据

