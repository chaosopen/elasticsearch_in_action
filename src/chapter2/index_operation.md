# 2.1 索引操作

## 2.1.1 创建索引

### 1. DSL语法

```json
PUT /indexname
{
  "settings": {
    "number_of_shards": 1,
    "number_of_replicas": 1
  },
  "mappings": {
    "properties": {
      "name1":{
         "type": "text"
      },
      "name2":{
        "type": "integer"
      }
    }
  }
}
```
#### 1. 参数说明：

**settings：索引信息设置**
> number_of_shards：每个索引的主分片数，这个配置在索引创建后不能修改
>
> number_of_replicas：每个主分片的副本数，这个配置可以随时修改。

**mappings：索引映射定义**
> properties：字段定义
> properties里是json配置，key为字段名称（自定义名称），value是个嵌套json，`type`是字段的类型

#### 2. 语句运行：

* 语句可以直接复制在kibana中执行，选择 `home` 下拉选择 `Management` 下的 `Dev Tools` 进行操作（Kibana只做简单介绍）

<img alt='图2-2' src='../imgs/2-2.png' width='40%' />

* 在cerebro中操作，选择 `rest` 编辑DSL语句，点击 `send` 请求（要操作的地方已经标红）

![图2-1](../imgs/2-1.png)

右侧是创建成功结果
```json
{ - 
  "acknowledged": true,
  "shards_acknowledged": true,
  "index": "indexname"
}
```

cerebro创建索引其他方式：选择 `more` 里面有很多配置， 点击 `create index` 也可以创建索引

### 2. Java API
在第一章已经介绍过一些创建索引的代码了

```java
    //从Spring容器获取client对象
    @Autowired
    private RestHighLevelClient client;

    public Boolean createIndex(String indexName) {
        //创建索引请求类，构造函数参数为索引名称
        CreateIndexRequest request = new CreateIndexRequest(indexName);
        //设置source映射字符串，直接把语句复制里面
        request.source(
                "{\n" +
                        "  \"settings\": {\n" +
                        "    \"number_of_shards\": 1,\n" +
                        "    \"number_of_replicas\": 1\n" +
                        "  },\n" +
                        "  \"mappings\": {\n" +
                        "    \"properties\": {\n" +
                        "      \"name1\":{\n" +
                        "         \"type\": \"text\"\n" +
                        "      },\n" +
                        "      \"name2\":{\n" +
                        "        \"type\": \"integer\"\n" +
                        "      }\n" +
                        "    }\n" +
                        "  }\n" +
                        "}",
                XContentType.JSON);
        try {
            //调用创建索引语法
            client.indices().create(request, RequestOptions.DEFAULT);
            return true;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return false;
    }
```

<font color="red">注意这里调用的方法是source，不是mapping</font>
> mapping方法是仅设置字段
>
> source方法是带上settings内容一块调用的

## 2.1.2 删除索引

### 1. DSL语法
```json
DELETE /indexname
```
直接调用执行，以下返回结果为成功
```json
{ - 
  "acknowledged": true
}
```
### 2. Java API

```java
    //从Spring容器获取client对象
    @Autowired
    private RestHighLevelClient client;

    @RequestMapping("/deleteIndex")
    public Boolean deleteIndex(String indexName) {
        //删除索引请求类，构造函数参数为索引名称
        DeleteIndexRequest deleteIndexRequest = new DeleteIndexRequest(indexName);
        try {
            //调用删除索引语法
            client.indices().delete(deleteIndexRequest, RequestOptions.DEFAULT);
            return true;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return false;
    }
```


## 2.1.3 开启/关闭索引

### 1. 关闭索引

#### 1. DSL语法
```json
POST /indexname/_close
```
直接调用执行，以下返回结果为成功
```json
{ - 
  "acknowledged": true,
  "shards_acknowledged": true,
  "indices": { - 
    "indexname": { - 
      "closed": true
    }
  }
}
```
#### 2. Java API

```java
    @RequestMapping("/closeIndex")
    public Boolean closeIndex(String indexName) {
        CloseIndexRequest closeIndexRequest = new CloseIndexRequest(indexName);
        try {
            client.indices().close(closeIndexRequest, RequestOptions.DEFAULT);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return true;
    }
```

### 2. 开启索引

#### 1. DSL语法
```json
POST /indexname/_open
```
直接调用执行，以下返回结果为成功
```json
{ - 
  "acknowledged": true,
  "shards_acknowledged": true
}
```
#### 2. Java API

```java
    @RequestMapping("/openIndex")
    public Boolean openIndex(String indexName) {
        OpenIndexRequest openIndexRequest = new OpenIndexRequest(indexName);
        try {
            client.indices().open(openIndexRequest, RequestOptions.DEFAULT);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return true;
    }
```

## 2.1.4 索引别名

### 1. 设置别名


### 2. 删除别名