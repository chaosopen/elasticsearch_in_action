# 3.2 查询语法
本章全面讲解查询语法，在开展学习之前，先创建以下索引并添加测试数据。

```json
PUT product_index
{
  "mappings": {
    "properties": {
      "productName":{
         "type": "text",
         "analyzer": "ik_smart"
      },
      "price":{
         "type": "double"
      },
      "createTime":{
         "type": "keyword"
      }
    }
  }
}
```

## 3.2.1 查询 Query
查询请求体中的query元素允许通过Query DSL来定义一个查询。
```json
POST indexname/_search
{
  "query": {
    "term": {
      "name": "张三"
    }
  }
}
```

## 3.2.2 match查询


## 3.2.3 term查询

## 3.2.4 分页（From / Size）

结果的分页可以通过使用from和size参数来完成。 from参数定义了您要提取的第一个结果的偏移量。 size参数允许您配置要返回的最大匹配数。

虽然from和size可以设置为请求参数，但它们也可以在搜索正文中设置。from默认值为0，size默认为10。

```json
POST indexname/_search
{
  "from": 0,
  "size": 10,
  "query": {
    "term": {
      "name": "张三"
    }
  }
}
```

数据量比较多得时候，注意from + size不能超过索引设置的 `index.max_result_window`，默认为10000。 有关深入滚动的更有效方法，请参阅Scroll或Search After API。



## 3.2.5 指定返回字段

设置 `_source` 字段，选择需要返回的字段

* 要禁用 `_source` 的提取可以设置其为false（设置后不再返回字段）：
```json
POST indexname/_search
{
  "_source": false,
  "query": {
    "term": {
      "name": "张三"
    }
  }
}
```
* 可以使用通配符来控制返回字段，例如设置 `na` 开头的字段：
```json
POST indexname/_search
{
  "_source": "na*",
  "query": {
    "term": {
      "name": "张三"
    }
  }
}
```
* 可以用数组表达
```json
POST indexname/_search
{
  "_source": ["na*","age*"],
  "query": {
    "term": {
      "name": "张三"
    }
  }
}
```

* 指定包含和排除模式
```json
POST indexname/_search
{
  "_source": {
    "includes": [
      "name"
    ],
    "excludes": [
      "age"
    ]
  },
  "query": {
    "term": {
      "name": "张三"
    }
  }
}
```
`includes` 包含字段， `excludes` 排除字段，一般情况下使用一个就可以，非一般情况也不举例了。

