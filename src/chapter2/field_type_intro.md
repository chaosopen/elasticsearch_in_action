# 2.4 字段类型介绍

学习了文档操作后，基本已经入门ES了，我们会见到书中举例的一些数据类型，到本章节我们详细介绍ES中的基本数据类型和复杂的数据类型。不过在此之前要先带大家了解下`倒排索引`。

## 2.4.1 什么是倒排索引

ES采用的是倒排索引（Inverted Index）存储数据, 也称为反向索引。 有反向索引，也会有正向索引。

俗话说的好：**生平不识倒排索引,学懂ES也枉然**。这是ES的核(面)心(试)点(题)。

### 1. 正向索引
正排索引是以文档的ID作为关键字，并且记录文档中每个字段的值信息，通过查询id来把整条文档拿出来。

但是在查询某一个keyword存在于哪些文档的时候， 需要对所有文档进行扫描匹配。这样检索效率比较低下。

![图2-6](../imgs/2-6.png)


### 2. 倒排索引
倒排索引以字或词作为关键字索引，去找对应ID， 倒排索引建立的是分词（Term）和文档（Document）之间的映射关系。

![图2-7](../imgs/2-7.png)

对于0基础的同学如果还不懂，可以先用Map的结构理解，后续我们会更详细讲解。
> 把关键词作为Key，对应数据的ID作为value的list集合，通过关键词查询一组对应的ID数据

举个例子：
> 数据集：[{"id":1, "name": java},{"id":2, "name": java},{"id":3, "name": golang}]  
> map定义：(java)=[1,2]，(golang)=[3]  
> 查询过程就是拿关键词java查询ID，获取ID为1、2，然后将整条数据返回给我们

**<font color="red">具体实现过程肯定不是这样，但是为了新手容易理解，先对倒排索引有初步概念，后续会详细讲解倒排索引</font>**

## 2.4.2 基础数据类型

### 1. keyword类型
`keyword` 类型是 `不进行分词` 的字符串类型，可以理解数据库的字符串类型，`不进行分词` 含义指的是：不会对keyword字段内容进行分词，直接构建 `倒排索引` ，keyword类型应用场景比较多，一般用于对文档的过滤、排序和聚合等。

添加 `keyword` 映射字段
```json
POST indexname/_mapping
{
  "properties":{
    "remarks":{
      "type":"keyword"
    }
  }
}
```

### 2. text类型
`text` 类型是可进行切分的字符串类型。这里的 `可切分` 指的是：在索引时，可按照相应的切词算法对文本内容进行切分，然后构建倒排索引；

添加 `text` 映射字段
```json
POST indexname/_mapping
{
  "properties":{
    "summary":{
      "type":"text"
    }
  }
}
```

### 3. 数值类型
ES支持的数值类型

- long -- 带符号的64位整数，最小值-263，最大值263-1
- integer -- 带符号的32位整数，最小值-231，最大值231-1
- short -- 带符号的16位整数，最小值-32768，最大值32767
- byte -- 带符号的8位整数，最小值-128，最小值127
- double -- 双精度64位IEEE 754 浮点数
- float -- 单精度32位IEEE 754 浮点数
- half_float -- 半精度16位IEEE 754 浮点数
- scaled_float -- 带有缩放因子的缩放类型浮点数

添加 `integer` 映射字段
```json
POST indexname/_mapping
{
  "properties":{
    "age":{
      "type":"integer"
    }
  }
}
```

为节约存储空间并提升搜索和索引的效率，因为 **`内存很贵`**，在实际应用中，在满足需求的情况下应尽可能选择范围小的数据类型。
### 4. 布尔类型
`boolean` 类型用于业务中的二值表示，例如商品是否上架、数据是否失效。

添加 `boolean` 映射字段
```json
POST indexname/_mapping
{
  "properties":{
    "isAdmin":{
      "type":"boolean"
    }
  }
}
```

### 5. 日期类型
`date` 类型用于存储日期

一般使用如下形式表示日期类型数据：
- 格式化的日期字符串
- 毫秒级的长整型，表示从1970年1月1日0点到现在的毫秒数
- 秒级别的整型，表示从1970年1月1日0点到现在的秒数。
- 日期类型的默认格式为strict_date_time||epoch_millis.其中，strict_date_optional_time的含义是严格的时间类型，支持yyyy-MM-dd、yyyyMMdd、yyyyMMddHHmmss、yyyy-MM-ddTHH:mm:ss、yyyy-MM-ddTHH:mm:ss.SSS和yyyy-MM-ddTHH:mm:ss.SSSZ等格式，epoch_millis的含义是从1970年1月1日0点到现在的毫秒数。

添加 `date` 映射字段
```json
POST indexname/_mapping
{
  "properties":{
    "createTime":{
      "type":"date"
    }
  }
}
```
## 2.4.3 复杂数据类型

### 1. 对象类型（object）

一个字段下需要多种类型的属性字段，属性 `attr` 有身高、体重，添加映射语句如下：

```json
POST indexname/_mapping
{
  "properties": {
    "attr": {
      "properties": {
        "height": {
          "type": "double"
        },
        "weight": {
          "type": "double"
        }
      }
    }
  }
}
```

对象类型新增数据语法
```json
PUT indexname/_doc/1
{
  "attr": {
    "height": 176.3,
    "weight": 64
  }
}
```
筛选查询新增的数据
```json
GET indexname/_search
{
  "query":{
    "term":{
      "attr.weight": "64"
    }
  }
}
```


### 2. 数组类型
ELasticsearch没有专用的数组类型，默认情况下任何字段都可以包含一个或者多个值，但是一个数组中的值要是同一种类型。
- 字符数组: [ "one", "two" ]
- 整型数组：[1,3]
- 对象数组：[ { "name": "长度", "value": "10" }, { "name": "内存", "value": "16" }]

keyword数组，创建keyword字段

```json
POST indexname/_mapping
{
  "properties": {
    "skills": {
      "type": "keyword"
    }
  }
}
```

新增数据
```json
PUT indexname/_doc/2
{
  "skills": ["java", "c++"]
}
```

对象数组，创建对象字段

```json
POST indexname/_mapping
{
  "properties": {
    "attrs": {
      "properties": {
        "name": {
          "type": "keyword"
        },
        "value": {
          "type": "keyword"
        }
      }
    }
  }
}
```

新增数据
```json
PUT indexname/_doc/3
{
  "attrs": [
    {
      "name": "长度",
      "value": "10"
    },
    {
      "name": "内存",
      "value": "16"
    }
  ]
}
```

### 3. 嵌套文档（nested）
nested嵌套类型是object中的一个特例，可以让`对象数组`类型独立索引和查询。

项目场景中弥补对象数组的一些查询问题

接着前面创建的对象数组 `attrs` 先添加几条数据
```json
POST _bulk
{"create":{"_index":"indexname","_id":20}}
{"attrs":[{"name":"长度","value":"64"},{"name":"内存","value":"32"}]}
{"create":{"_index":"indexname","_id":21}}
{"attrs":[{"name":"长度","value":"64"},{"name":"内存","value":"64"}]}
{"create":{"_index":"indexname","_id":22}}
{"attrs":[{"name":"长度","value":"64"}]}
```
现在业务需求：需要 `属性=长度 且 值=32` 的数据（目前数据里没有），我们来写查询语法。
```json
GET indexname/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "term": {
            "attrs.name": "长度"
          }
        },
        {
          "term": {
            "attrs.value": "32"
          }
        }
      ]
    }
  }
}
```
> 运行后发现居然有数据，为什么呢？我们后面原理篇会讲。
> 
> 怎么解决这种问题呢？使用 `nested` 类型即可解决。

添加映射字段

```json
POST indexname/_mapping
{
  "properties": {
    "attrsNested": {
      "type": "nested",
      "properties": {
        "name": {
          "type": "keyword"
        },
        "value": {
          "type": "keyword"
        }
      }
    }
  }
}
```
添加几条数据
```json
POST _bulk
{"create":{"_index":"indexname","_id":20}}
{"attrsNested":[{"name":"长度","value":"64"},{"name":"内存","value":"32"}]}
{"create":{"_index":"indexname","_id":21}}
{"attrsNested":[{"name":"长度","value":"64"},{"name":"内存","value":"64"}]}
{"create":{"_index":"indexname","_id":22}}
{"attrsNested":[{"name":"长度","value":"64"}]}
```
查询数据
```json
GET indexname/_search
{
  "query": {
    "nested": {
      "path": "attrsNested",
      "query": {
        "bool": {
          "must": [
            {
              "term": {
                "attrsNested.name": "长度"
              }
            },
            {
              "term": {
                "attrsNested.value": "32"
              }
            }
          ]
        }
      }
    }
  }
}
```
已经查不到数据了，问题完美解决

### 4. 子字段

`text`类型不能用于排序、聚合。为什么呢？因为它的属性 `fielddata` 默认是false，设置为true就可以了，但是不建议使用，会增加内存的压力。

添加字段映射（不建议设置true）：
```json
POST indexname/_mapping
{
  "properties": {
    "address": {
      "type": "text",
      "fielddata":true
    }
  }
}
```
直接使用 `keyword` 类型可以进行排序、聚合。


想必会有同学有疑问：
> 同样是字符串类型，干脆直接都用keyword类型不就行了。
>
如果你不需要 `分词` 那么你用keyword完全可以，如果你需要对字段值分词，那你还是需要用text。

那么有没有不增加压力，而且不用两个字段的方法呢？ 当然有，就是做子字段！

```json
POST indexname/_mapping
{
  "properties": {
    "address": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    }
  }
}
```
`address` 字段下增加了 `keyword` 名字的字段，类型是 `keyword`，设置256长度

对应查询子字段`keyword`的语句
```json
GET indexname/_search
{
  "query": {
    "term":{
      "address.keyword": ""
    }
  }
}
```
### 5. 地理类型
`geo_point` 是地理类型。移动互联网的时代，移动设备越来越多，要根据地理位置搜索地址，可以把地址的经纬度数据设置地理数据类型。

```json
POST indexname/_mapping
{
  "properties": {
    "location": {
      "type": "geo_point"
    }
  }
}
```

添加一条地理位置数据

```json
PUT indexname/_doc/6
{
  "location": {
    "lat": 41.07,
    "lon": 116.64
  }
}
```
- lat（经度）
- lon（纬度）

根据（41.07，116.14）坐标，查询100km内的位置信息
```json
GET indexname/_search
{
  "query": {
    "geo_distance": {
      "distance": "100km",
      "location": {
        "lat": 41.07,
        "lon": 116.14
      }
    }
  }
}
```

根据（23.6,32.2）位置，对查询结果进行远近排序
```json
GET indexname/_search
{
  "query": {
    "match_all": {}
  },
  "sort": [
    {
      "_geo_distance": {
        "location": "23.6,32.2",
        "unit": "km"
      }
    }
  ]
}
```