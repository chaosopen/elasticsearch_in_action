# 3.1 查询排序

排序很重要，实际场景中检索出来很多数据后按照相关性排序，一般用户只看前几页，所以高质量内容一定要在前面，第一页是精华，不然用户会认为检索不到有用的信息。

很多做搜索引擎竞价排名、电商平台花钱买搜索广告就是为了让排序靠前。

## 3.1.1 字段值排序

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


### 基于脚本排序
允许基于自定义脚本排序

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

### 排序注意事项

排序时，相关的排序字段值将加载到内存中。这意味着每个分片应该有足够的内存来容纳它们。

> 对于基于字符串的类型，排序的字段类型需要是 `keyword` 不能用 `text` 类型。
>
> 对于数字类型，如果可能，建议将类型显式设置为较窄类型，如`short`、`integer`、`float`。

