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

POST _bulk
{"create":{"_index":"product_index","_id":1}}
{"productName":"苹果12手机 Apple iPhone 12 苹果手机 国行全网通 黑色","price":2689,"createTime":"2023-10-30 17:46:13"}
{"create":{"_index":"product_index","_id":2}}
{"productName":"Apple iPhone 15 Pro Max (A3108) 256GB 黑色手机","price":9999,"createTime":"2023-10-31 17:46:13"}
{"create":{"_index":"product_index","_id":3}}
{"productName":"Apple iPhone 13 Pro Max 苹果13pro苹果13promax 5G国行二手手机","price":9999,"createTime":"2023-9-21 17:46:13"}
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

### 1. match查询
match会把字符串先分词，后检索
```json
GET product_index/_search
{
	"query":{
		"match":{
			"productName":"苹果12手机"
		}
	}
}
```
> 根据 `productName` 字段设置的IK分词器，则为:['苹果','12','手机']
>
> 只要匹配任何一个则会进行返回
>
该情况类似 `or` 条件，如果需要所有词都满足才查询出来，需要设置 `and` 条件
```json
GET product_index/_search
{
	"query":{
		"match":{
			"productName":{
			  "query": "苹果12手机",
			  "operator": "and"
			}
		}
	}
}
```
`operator` 的值用来设置分词后的匹配规则，默认是 `or` 。


### 2. match_all查询
match_all 查询全部
```json
GET product_index/_search
{
  "query": {
    "match_all": {}
  }
}
```

### 3. match_phrase查询
match_phrase为短语查询，对应的的都要进行匹配，相对于match的operator的and。
不同的是 `slop` 可以控制分词匹配距离

例如样例数据：
> Apple iPhone 15

搜索语句：
```json
GET product_index/_search
{
	"query": {
		"match_phrase": {
			"productName": {
			  "query": "Apple 15",
			  "slop": 2
			}
		}
	}
}
```
如果slop=0，是没有结果的。  
slop参数默认为0，slop参数为两组词之间的最大可移动的间隔和顺序，在搜索的时候更加灵活。

### 4. match_phrase_prefix查询
match_phrase_prefix 是最左前缀匹配,类似match_phrase ,差异点是根据分词器进行前缀匹配

```json
GET product_index/_search
{
	"query": {
		"match_phrase_prefix": {
			"productName": {
			  "query": "苹果手",
			  "max_expansions": 5
			}
		}
	}
}
```
根据分词器然后进行最左前缀匹配

参数：
> max_expansions：前缀查询对性能影响很大，所以再使用的时候会对结果集进行限制，默认不进行限制

### 5. multi_match查询
相对于前面几种都是单字段查询，而multi_match则是多字段查询

```json
GET product_index/_search
{
  "query": {
    "multi_match": {
      "query": "Apple",
      "fields": [
        "productName"
      ],
      "type": "phrase"
    }
  }
}
```
根据分词器然后进行最左前缀匹配

参数：
> type：
>
> phrase: 实现 match_phrase的方法
>
> phrase_prefix : 实现match_phrase_prefixd的方法



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

