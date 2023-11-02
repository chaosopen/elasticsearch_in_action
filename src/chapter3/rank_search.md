# 3.2 排序

排序很重要，实际场景中检索出来很多数据后按照相关性排序，一般用户只看前几页，所以高质量内容一定要在前面，第一页是精华，不然用户会认为检索不到有用的信息。

很多做搜索引擎竞价排名、电商平台花钱买搜索广告就是为了让排序靠前。

**正如你在找教程，我的资料排行靠前，你才能看到这样的好教程（如果不好你干嘛看到第三章？）**

有问题在GitHub提issue哦

## 3.2.1 字段值排序

### Sort 排序

允许在特定字段上添加一个或多个排序。每个排序也可以颠倒。 排序是在每个字段级别上定义的，具有_score的特殊字段名称按分数排序。

```json
POST indexname/_search
{
  "sort": [
    {
      "age": {
        "order": "desc"
      }
    },
    {
      "name": {
        "order": "asc"
      }
    }
  ],
  "query": {
    "term": {
      "name": "张三"
    }
  }
}
```

* 排列顺序

排序选项可以有以下值：

选项描述 `asc` 升序 `desc` 降序在对 `_score` 进行排序时，该顺序默认为 `desc`，在对其他排序时默认为 `asc`。

### 排序注意事项

排序时，相关的排序字段值将加载到内存中。这意味着每个分片应该有足够的内存来容纳它们。

> 对于基于字符串的类型，排序的字段类型需要是 `keyword` 不能用 `text` 类型。
>
> 对于数字类型，如果可能，建议将类型显式设置为较窄类型，如`short`、`integer`、`float`。

## 3.2.2 自定义排序

### 1. 查询权重排序

查询会计算相关性（TF/IDF）的分数（使用filter没有）

可以用 `boost` 属性来控制每个查询的权重，权重越高，排序越靠前
该值不写默认为1

例如查询 苹果 手机，手机的权重写 2
```json
GET product_index/_search
{
  "query": {
    "bool": {
      "should": [
        {
          "term": {
            "productName": {
              "value": "苹果",
              "boost": 1
            }
          }
        },
        {
          "term": {
            "productName": {
              "value": "手机",
              "boost": 2
            }
          }
        }
      ]
    }
  }
}
```
真实场景中，会有各种 `苹果` 字符的商品标题，和各种 `手机` 的商品标题，两者都查询的时候，如果用 `must` 查询，会导致结果较少。

**实际上会尽可能的推荐类似相关的产品，例如其他品牌的 `手机`，但 `吃的苹果` 排序不能在`手机`前面。**

### 2. 脚本排序

```json
POST indexname/_search
{
  "query": {
    "term": {
      "name": "张三"
    }
  },
  "track_scores": true,
  "sort": {
    "_script": {
      "type": "number",
      "script": {
        "lang": "painless",
        "source": "doc['age'].value * params.factor",
        "params": {
          "factor": 2
        }
      },
      "order": "asc"
    }
  }
}
```

根据脚本语法在 `source` 里写 `painless` 语法的代码，`params` 是传递参数，track_scores设置true，会计算和跟踪分数

### 2. function_score 排序

`function_score` 功能很强大，这里举例常用的函数，详情见官网：
[function_score](https://www.elastic.co/guide/en/elasticsearch/reference/7.9/query-dsl-function-score-query.html#score-functions)

`function_score` 提供了很多评分函数，以下主要参数：

* `functions` 字段权重评分

  * `weight` 权重评分，配合 `score_mode` 使用
  * `random_score` 随机评分，生成从0到但不包括1的均匀分布的分数。默认情况下，它使用内部 Lucene doc id 作为随机源。
* `script_score` script脚本评分
* `score_mode` 函数评分模式
  * multiply 相乘-默认
  * sum 求和
  * avg 平均分
  * first 使用具有匹配过滤器的第一个函数的得分
  * max 使用最高分
  * min 使用最低分
* `boost_mode` 函数查询分数累计模式
  * multiply 查询得分和函数得分相乘-默认
  * replace 仅使用函数得分，查询得分被忽略
  * sum 查询得分和函数得分求和
  * avg 查询得分和函数得分取平均值
  * max 取查询得分和函数得分的最大值
  * min 取查询得分和函数得分的最小值

#### 3. functions + weight 模式

举例子，查询 `iphone` ，名称包含 `13` 词设置50分，替换分数累计模式，让 iphone 13 排到第一位
```json
GET product_index/_search
{
  "query": {
    "function_score": {
      "score_mode": "sum",
      "boost_mode": "replace",
      "query": {
        "bool": {
          "should": [
            {
              "term": {
                "productName": {
                  "value": "iphone",
                  "boost": 1
                }
              }
            }
          ]
        }
      },
      "functions": [
        {
          "filter": {
            "term": {
              "productName": "13"
            }
          },
          "weight": 50
        }
      ]
    }
  }
}
```

#### 2. functions + script 模式

查询 `iphone` ，名称包含 `13` 词设置50分，价格低于8000的加20分，不用脚本也可以实现（此处强行做例子）

同样替换分数累计模式，让价格低于8000的 iphone 13 排到第一位

```json
GET product_index/_search
{
  "query": {
    "function_score": {
      "score_mode": "sum",
      "boost_mode": "replace",
      "query": {
        "bool": {
          "should": [
            {
              "term": {
                "productName": {
                  "value": "iphone",
                  "boost": 1
                }
              }
            }
          ]
        }
      },
      "functions": [
        {
          "filter": {
            "term": {
              "productName": "13"
            }
          },
          "weight": 50
        },
        {
          "script_score": {
            "script": {
              "source": "double score = 0; if(doc['price'].value<8000){score=20} return score;",
              "lang": "painless"
            }
          }
        }
      ]
    }
  }
}
```