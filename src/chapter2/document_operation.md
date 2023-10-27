# 2.3 文档数据操作

本章节我们讲对于ES数据的基本操作。

先创建一个索引，便于后续演示
```json
PUT index_operation
{
  "settings": {
    "number_of_shards": 1,
    "number_of_replicas": 1
  },
  "mappings": {
    "properties": {
      "name":{
         "type": "keyword"
      },
      "age":{
        "type": "integer"
      },
      "description":{
         "type": "text"
      }
    }
  }
}
```

## 2.3.1 单条插入文档


### 1. DSL语法
```json
PUT index_operation/_doc/1
{
  "name":"张三",
  "age":18,
  "description":"一个学习ES的学生"
}
```
添加一条指定ID为1的数据

返回以下结果说明成功
```json
{ - 
  "_index": "index_operation",
  "_type": "_doc",
  "_id": "1",
  "_version": 1,
  "result": "created",
  "_shards": { - 
    "total": 2,
    "successful": 1,
    "failed": 0
  },
  "_seq_no": 0,
  "_primary_term": 1
}
```
指定ID插入数据时，ES会先拿着指定的id去对比一遍所有数据，如果没有新增，有则覆盖。

> ID可以手动指定，也可以自动生成

随机ID插入数据如下所示：
```json
POST index_operation/_doc
{
  "name":"李四",
  "age":21,
  "description":"一个学习Java的学生"
}
```
返回以下结果说明成功
```json
{ - 
  "_index": "index_operation",
  "_type": "_doc",
  "_id": "TKc8a4sBNugPcqcoa9uX",
  "_version": 1,
  "result": "created",
  "_shards": { - 
    "total": 2,
    "successful": 1,
    "failed": 0
  },
  "_seq_no": 1,
  "_primary_term": 1
}
```
我们发现ID变成了`TKc8a4sBNugPcqcoa9uX`，这是ES自动生产的ID

### 2. Java API
```java
    @Autowired
    private RestHighLevelClient client;

    @RequestMapping("/addDoc")
    public Boolean addDoc() throws IOException {
        IndexRequest request = new IndexRequest().index("index_operation");
        // 指定ID，也可以不指定随机生成
        request.id("21");
        // 这里用Map，也可以创建Java对象操作
        HashMap<String, Object> map = new HashMap<>();
        map.put("name", "张三");
        map.put("age", 18);
        map.put("description", "一个学习ES的学生");
        // map转换json字符串
        request.source(JSON.toJSONString(map), XContentType.JSON);
        // 请求es
        client.index(request, RequestOptions.DEFAULT);
        return true;
    }
```

## 2.3.2 批量插入文档

**批量操作使用cerebro不能执行，需要kibana执行。**

一般情况是用程序读取数据库执行插入，手动插入情况比较少见。
### 1. DSL语法
```json
POST _bulk
{"create":{"_index":"index_operation","_id":4}}
{"name":"张三4","age":18,"description":"测试4"}
{"create":{"_index":"index_operation","_id":5}}
{"name":"张三5","age":18,"description":"测试5"}
```

### 2. Java API
```java
    @Autowired
    private RestHighLevelClient client;

    @RequestMapping("/addBatchDoc")
    public Boolean addBatchDoc() throws IOException {
        // 批量插入数据
        BulkRequest request = new BulkRequest();
        // 生成10条数据
        for (int i = 0; i < 10; i++) {
            // 创建对象
            HashMap<String, Object> map = new HashMap<>();
            map.put("name", "张三");
            map.put("age", 18 + i);
            map.put("description", "一个学习ES的学生");
            // 添加文档数据
            IndexRequest source = new IndexRequest().index("index_operation");
            source.source(JSON.toJSONString(map), XContentType.JSON);
            request.add(source);
        }
        // 请求es
        client.bulk(request, RequestOptions.DEFAULT);
        return true;
    }
```

## 2.3.3 通过ID查询文档

### 1. DSL语法
```json
GET index_operation/_doc/1
```
返回结果
```json
{ - 
  "_index": "index_operation",
  "_type": "_doc",
  "_id": "1",
  "_version": 1,
  "_seq_no": 3,
  "_primary_term": 1,
  "found": true,
  "_source": { - 
    "name": "张三",
    "age": 18,
    "description": "一个学习ES的学生"
  }
}
```
### 2. Java API
```java
    @Autowired
    private RestHighLevelClient client;

    @RequestMapping("/getDoc")
    public GetResponse getDoc() throws IOException {
        GetRequest request = new GetRequest()
                .index("index_operation")
                .id("1");
        GetResponse getResponse = client.get(request, RequestOptions.DEFAULT);
        return getResponse;
    }
```

## 2.3.4 条件查询文档

查询这里我们简单了解下，后续会详细讲解查询语法

### 1. DSL语法
1. 查询全部
```json
GET index_operation/_search
```
2. 查询 `age=18` 的数据
```json
GET index_operation/_search
{
    "query":{
        "term":{
            "age": 18
        }
    }
}
```
3. 查询 `age=18` 并且 `name=张三` 的数据
```json
GET index_operation/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "term": {
            "age": 18
          }
        },
        {
          "term": {
            "name": "张三"
          }
        }
      ]
    }
  }
}
```

### 2. Java API
1. 查询 `age=18` 的数据
```java
    @Autowired
    private RestHighLevelClient client;

    @RequestMapping("/select")
    public SearchHit[] select() throws IOException {
        SearchRequest request = new SearchRequest("index_operation");
        SearchSourceBuilder builder = new SearchSourceBuilder();
        builder.query(QueryBuilders.termQuery("age", 18));
        request.source(builder);
        SearchResponse searchResponse = client.search(request, RequestOptions.DEFAULT);
        SearchHit[] searchHits = searchResponse.getHits().getHits();
        return searchHits;
    }
```
2. 查询 `age=18` 并且 `name=张三` 的数据
```java
    @Autowired
    private RestHighLevelClient client;

    @RequestMapping("/select2")
    public SearchHit[] select2() throws IOException {
        SearchRequest request = new SearchRequest("index_operation");
        SearchSourceBuilder builder = new SearchSourceBuilder();
        BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery();
        boolQueryBuilder.must(QueryBuilders.termQuery("age", 18));
        boolQueryBuilder.must(QueryBuilders.termQuery("name", "张三"));
        builder.query(boolQueryBuilder);
        request.source(builder);
        SearchResponse searchResponse = client.search(request, RequestOptions.DEFAULT);
        SearchHit[] searchHits = searchResponse.getHits().getHits();
        return searchHits;
    }
```

## 2.3.5 单条更新文档

### 1. DSL语法

1. 覆盖数据，对应ID的文档按照新的数据，这种方法修改时，需要带上所有字段，否则没带的字段会消失
```json
PUT index_operation/_doc/1
{
  "name":"张三1",
  "age":20
}
```
2. 修改数据，对应ID的文档按照新的数据，例如我想只修改age为21，其他信息不改，就采用_update方法
```json
POST index_operation/_update/1
{
  "doc": {
    "age": 21
  }
}
```
### 2. Java API

1. 覆盖数据

**参考携带ID的添加数据**，覆盖数据就是添加数据加上ID，这里不过多演示

2. 修改数据
```java
    @Autowired
    private RestHighLevelClient client;

    @RequestMapping("/update")
    public Boolean update() throws IOException {
        // 创建对象
        HashMap<String, Object> map = new HashMap<>();
        map.put("name", "张三1");
        map.put("age", 20);
        UpdateRequest request = new UpdateRequest().index("index_operation");
        request.id("1");
        // 添加文档数据
        request.doc(JSON.toJSONString(map), XContentType.JSON);
        // 请求es
        client.update(request, RequestOptions.DEFAULT);
        return true;
    }
```

## 2.3.6 批量更新文档

**批量操作使用cerebro不能执行，需要kibana执行。**

### 1. DSL语法
```json
POST _bulk
{"update":{"_index":"index_operation","_id":4}}
{"doc":{"name":"张三41","age":18,"description":"测试4"}}
{"update":{"_index":"index_operation","_id":5}}
{"doc":{"name":"张三51","age":18,"description":"测试5"}}
```

### 2. Java API
```java
    @Autowired
    private RestHighLevelClient client;

    @RequestMapping("/batchUpdate")
    public Boolean batchUpdate() throws IOException {
        BulkRequest request = new BulkRequest();

        HashMap<String, Object> map1 = new HashMap<>();
        map1.put("name", "张三41");
        map1.put("age", 18);
        map1.put("description", "测试4");
        IndexRequest source1 = new IndexRequest().index("index_operation").id("4");
        source1.source(JSON.toJSONString(map1), XContentType.JSON);

        HashMap<String, Object> map2 = new HashMap<>();
        map2.put("name", "张三51");
        map2.put("age", 18);
        map2.put("description", "测试5");
        IndexRequest source2 = new IndexRequest().index("index_operation").id("5");
        source2.source(JSON.toJSONString(map2), XContentType.JSON);
        request.add(source1);
        request.add(source2);
        // 请求es
        client.bulk(request, RequestOptions.DEFAULT);
        return true;
    }
```
## 2.3.7 条件更新文档
某些情况，需要根据条件更新

### 1. DSL语法

* 修改 `age=18` 的数据，name修改为`成年人`
```json
POST index_operation/_update_by_query
{
  "query": {
    "term":{
      "age": 18
    }
  },
  "script": {
    "source": "ctx._source['name']='成年人'",
    "lang": "painless"
  }
}
```
该语句使用 `query` 条件查询，配合脚本进行指定字段修改，脚本操作后续会有详细讲解，在本章我们先做简单了解

`script` 设置要修改的内容可以多个值多个用 `;` 隔开

* 修改 `age > 18 and age < 25` 的数据，name修改为`青少年`
```json
POST index_operation/_update_by_query
{
  "query": {
    "range":{
      "age": {
        "gt": 18,
        "lt": 25
      }
    }
  },
  "script": {
    "source": "ctx._source['name']='青少年'",
    "lang": "painless"
  }
}
```

### 2. Java API

* 修改 `age=18` 的数据，name修改为`成年人`
```java
    @Autowired
    private RestHighLevelClient client;

    @RequestMapping("/updateCondition1")
    public Boolean updateCondition1() throws IOException {
        UpdateByQueryRequest updateByQuery  = new UpdateByQueryRequest("index_operation");
        updateByQuery.setQuery(QueryBuilders.termQuery("age", 18));
        updateByQuery.setScript(new Script("ctx._source['name']='成年人'"));
        client.updateByQuery(updateByQuery, RequestOptions.DEFAULT);
        return true;
    }
```

* 修改 `age > 18 and age < 25` 的数据，name修改为`青少年`
```java
    @Autowired
    private RestHighLevelClient client;

    @RequestMapping("/updateCondition2")
    public Boolean updateCondition2() throws IOException {
        UpdateByQueryRequest updateByQuery  = new UpdateByQueryRequest("index_operation");
        updateByQuery.setQuery(QueryBuilders.rangeQuery("age").gt(18).lt(25));
        updateByQuery.setScript(new Script("ctx._source['name']='青少年'"));
        client.updateByQuery(updateByQuery, RequestOptions.DEFAULT);
        return true;
    }
```

## 2.3.8 单条删除文档

通过ID删除数据

### 1. DSL语法
```json
DELETE index_operation/_doc/1
```

### 2. Java API

```java
    @Autowired
    private RestHighLevelClient client;

    @RequestMapping("/delete")
    public Boolean delete() throws IOException {
        DeleteRequest deleteRequest = new DeleteRequest("index_operation").id("1");
        client.delete(deleteRequest, RequestOptions.DEFAULT);
        return true;
    }
```

## 2.3.9 条件删除文档

### 1. DSL语法

* 删除 `age=18` 的数据
```json
POST index_operation/_delete_by_query
{
  "query": {
    "term":{
      "age": 18
    }
  }
}
```

* 删除 `age > 18 and age < 25` 的数据
```json
POST index_operation/_delete_by_query
{
  "query": {
    "range":{
      "age": {
        "gt": 18,
        "lt": 25
      }
    }
  }
}
```
* 清空所有数据

`match_all` 语法相当于查询全部数据，这种情况建议 `删索引重建`

```json
POST index_operation/_delete_by_query
{
  "query": {
    "match_all": {}
  }
}
```

<font color='red'>**注意：删除完成后，执行以下脚本回收索引空间**</font>

```json
POST index_operation/_forcemerge?max_num_segments=1
```

### 2. Java API

* 删除 `age=18` 的数据

```java
    @Autowired
    private RestHighLevelClient client;

    @RequestMapping("/deleteCondition1")
    public Boolean deleteCondition1() throws IOException {
        DeleteByQueryRequest updateByQuery  = new DeleteByQueryRequest("index_operation");
        updateByQuery.setQuery(QueryBuilders.termQuery("age", 18));
        client.deleteByQuery(updateByQuery, RequestOptions.DEFAULT);
        return true;
    }
```
* 删除 `age > 18 and age < 25` 的数据
```java
    @Autowired
    private RestHighLevelClient client;

    @RequestMapping("/deleteCondition2")
    public Boolean deleteCondition2() throws IOException {
        DeleteByQueryRequest updateByQuery  = new DeleteByQueryRequest("index_operation");
        updateByQuery.setQuery(QueryBuilders.rangeQuery("age").gt(18).lt(25));
        client.deleteByQuery(updateByQuery, RequestOptions.DEFAULT);
        return true;
    }
```

* 清空所有数据
```java
    @Autowired
    private RestHighLevelClient client;

    @RequestMapping("/deleteAll")
    public Boolean deleteAll() throws IOException {
        DeleteByQueryRequest updateByQuery  = new DeleteByQueryRequest("index_operation");
        updateByQuery.setQuery(QueryBuilders.matchAllQuery());
        client.deleteByQuery(updateByQuery, RequestOptions.DEFAULT);
        return true;
    }
```