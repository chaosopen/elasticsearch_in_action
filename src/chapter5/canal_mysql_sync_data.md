# 5.2 使用Canal进行MySQL数据同步

## 5.2.1 开启MySQL的binlog模式

本书使用软件的版本
| 软件 | 版本|
|----|----|
|MySQL|5.7|
|Canal|1.1.6|
|Canal-Adapter|1.1.6|


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

## 5.2.5 Canal和Canal-Adapter配置文件参考

### 1. Canal 配置

#### 1. 修改 `conf/canal.properties` 以下配置
```properties
canal.serverMode = kafka
kafka.bootstrap.servers = 127.0.0.1:9092
```

#### 2. 修改 `conf/example/instance.properties` 以下配置
```properties
canal.instance.master.address=127.0.0.1:3306

canal.instance.dbUsername=root
canal.instance.dbPassword=123456
canal.instance.defaultDatabaseName=product_search
canal.instance.connectionCharset = UTF-8

canal.mq.topic=test_topic
```

### 2. Canal-Adapter 配置


#### 1. 修改 `conf/application.yml` 以下配置

```yml
server:
  port: 8081
spring:
  jackson:
    date-format: yyyy-MM-dd HH:mm:ss
    time-zone: GMT+8
    default-property-inclusion: non_null

canal.conf:
  mode: kafka
  flatMessage: true
  zookeeperHosts:
  syncBatchSize: 1000
  retries: 0
  timeout:
  accessKey:
  secretKey:
  consumerProperties:
    # kafka consumer
    kafka.bootstrap.servers: 127.0.0.1:9092
    kafka.enable.auto.commit: false
    kafka.auto.commit.interval.ms: 1000
    kafka.auto.offset.reset: latest
    kafka.request.timeout.ms: 40000
    kafka.session.timeout.ms: 30000
    kafka.isolation.level: read_committed
    kafka.max.poll.records: 1000
  srcDataSources:
    defaultDS:
      url: jdbc:mysql://127.0.0.1:3306/product_search?useUnicode=true
      username: root
      password: 123456
  canalAdapters:
  - instance: test_topic
    groups:
    - groupId: g1
      outerAdapters:
      - name: es7
        key: example
        hosts: http://127.0.0.1:9200
        properties:
          mode: rest
          cluster.name: elasticsearch
```


#### 1. 修改 `conf/es7/mytest_user.yml` 以下配置

```yml
dataSourceKey: defaultDS
destination: test_topic
groupId: g1
outerAdapterKey: example
esMapping:
  _index: product_index
  _id: _id
  upsert: false
  sql: "SELECT a.id as _id,a.spu_id as spuId,a.category_name as categoryName,a.product_name as productName,a.price,a.attrs,DATE_FORMAT(a.updated_time,'%Y-%m-%d %H:%i:%s') updateTime,DATE_FORMAT(a.created_time,'%Y-%m-%d %H:%i:%s') createTime FROM sku_info a"
  objFields:
    attrs: object
  etlCondition: "where updated_time>={0}"
  commitBatch: 3000
```

## 5.2.5 测试数据监听发送

### 1. Canal-Adapter同步MySQL数据
请求canal-adapter同步接口
```shell
http://127.0.0.1:8081/etl/es7/mytest_user.yml
```

### 2. 验证ES是否接收数据
```json
GET product_index/_search
```

**ES有数据说明同步成功**