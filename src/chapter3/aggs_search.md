# 3.3 聚合搜索
聚合是搜索中很重要的一个功能，本章对一些基础的分桶、指标计算做一个简单的讲解。

本章开始前先创建以下索引：
```json
PUT test_aggs_index
{
  "mappings": {
    "properties": {
      "name": {
        "type": "keyword"
      },
      "course": {
        "type": "keyword"
      },
      "class": {
        "type": "keyword"
      },
      "score": {
        "type": "float"
      }
    }
  }
}
```
并添加样例数据：
```json
PUT _bulk
{"create":{"_index":"test_aggs_index","_id":1}}
{"name":"刘一","course": "java", "class": "1班", "score": 98.4}
{"create":{"_index":"test_aggs_index","_id":2}}
{"name":"陈二","course": "php", "class": "3班", "score": 37}
{"create":{"_index":"test_aggs_index","_id":3}}
{"name":"张三","course": "php", "class": "3班", "score": 67}
{"create":{"_index":"test_aggs_index","_id":4}}
{"name":"李四","course": "java", "class": "2班", "score": 48}
{"create":{"_index":"test_aggs_index","_id":5}}
{"name":"王五","course": "php", "class": "1班", "score": 80}
{"create":{"_index":"test_aggs_index","_id":6}}
{"name":"赵六","course": "java", "class": "1班", "score": 99}
{"create":{"_index":"test_aggs_index","_id":7}}
{"name":"孙七","course": "python", "class": "3班", "score": 94}
{"create":{"_index":"test_aggs_index","_id":8}}
{"name":"周八","course": "python", "class": "2班", "score": 64}
{"create":{"_index":"test_aggs_index","_id":9}}
{"name":"吴九","course": "python", "class": "1班", "score": 87}
{"create":{"_index":"test_aggs_index","_id":10}}
{"name":"郑十","course": "java", "class": "2班", "score": 68}
```

## 3.3.1 分桶聚合
分桶聚合类似MySQL的Group By查询，按照指定条件，进行分组统计

### 1. 全局统计
查询各个科目考试的有多少人
```json
GET test_aggs_index/_search
{
  "size":0,
  "aggs": {
    "my_aggs_name": {
      "terms": {
        "field": "course",
        "size": 10,
        "order": {
          "_count": "asc"
        }
      }
    }
  }
}
```
**参数介绍：**
size：结果条数，只要聚合结果设置0
aggs：聚合函数  
my_aggs_name：**这个位置写自定义名称**，查询结果会以这个名称为 `key` 返回结果  
terms：指定字段  
field：字段名称  
size：返回数量  
order：聚合结果排序，当前设置按照数量排序，默认 `_key` 按照名称排序

### 2. 条件统计
只查询 `1班` 的聚合结果
```json
GET test_aggs_index/_search
{
  "size":0,
  "query": {
    "term": {
      "class": {
        "value": "1班"
      }
    }
  },
  "aggs": {
    "my_aggs_name": {
      "terms": {
        "field": "course",
        "size": 10,
        "order": {
          "_count": "asc"
        }
      }
    }
  }
}
```

## 3.3.2 指标聚合
在分桶后进行指标计算，例如Avg(平均值)、Max(最大值)、Min(最小值)、Sum(求和)、Cardinality(去重)等。

### 1. Avg、Max、Min、Sum
查询每个科目成绩的平均分、最高分、最低分、总分
```json
GET test_aggs_index/_search
{
  "size": 0,
  "aggs": {
    "my_aggs_name": {
      "terms": {
        "field": "course",
        "size": 10
      },
      "aggs": {
        "avg_score": {
          "avg": {
            "field": "score"
          }
        },
        "max_score": {
          "max": {
            "field": "score"
          }
        },
        "min_score": {
          "min": {
            "field": "score"
          }
        },
        "sum_score": {
          "sum": {
            "field": "score"
          }
        }
      }
    }
  }
}
```
该语句包含嵌套聚合，在科目分桶基础上，对每个科目计算指标

### 2. Cardinality 去重
对字段去重统计数量，类似MySQL的 Distinct + Count

查询科目数量
```json
GET test_aggs_index/_search
{
  "size": 0,
  "aggs": {
    "count": {
      "cardinality": {
        "field": "course"
      }
    }
  }
}
```

### 3. 指标统计汇总
有一个函数 `stats` ，可以把一般的聚合指标计算后返回

```json
GET test_aggs_index/_search
{
  "size": 0,
  "aggs": {
    "my_aggs_name": {
      "terms": {
        "field": "course",
        "size": 10
      },
      "aggs": {
        "my_stats": {
          "stats": {
            "field": "score"
          }
        }
      }
    }
  }
}
```

### 4. 百分位统计
对数据进行百分位的统计，函数为：`percentiles`

```json
GET test_aggs_index/_search
{
  "size": 0,
  "aggs": {
    "my_aggs_name": {
      "terms": {
        "field": "course",
        "size": 10
      },
      "aggs": {
        "my_percentiles": {
          "percentiles": {
            "field": "score"
          }
        }
      }
    }
  }
}
```
会输出 1~99 的分布数值

可以指定指标统计范围，例如只想要 1、50、99的数据
```json
GET test_aggs_index/_search
{
  "size": 0,
  "aggs": {
    "my_aggs_name": {
      "terms": {
        "field": "course",
        "size": 10
      },
      "aggs": {
        "my_percentiles": {
          "percentiles": {
            "field": "score",
            "percents": [1, 50, 99]
          }
        }
      }
    }
  }
}
```

该函数更多操作请参考官方文档