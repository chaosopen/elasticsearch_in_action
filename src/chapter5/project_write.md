# 5.3 搜索实战项目示例

项目示例源码：[https://github.com/chaosopen/elasticsearch_in_action_source_code/tree/master/chapter5](https://github.com/chaosopen/elasticsearch_in_action_source_code/tree/master/chapter5)

将项目克隆本地，运行 `chapter5` 模块下的项目。

## 5.3.1 操作商品数据

### 1. 添加数据
POST请求地址：http://localhost:8080/addProduct

参数
```json
{
    "spuId":"1",
    "categoryName":"手机",
    "productName":"新款现货Apple/苹果 iPhone 14 Pro国行苹果14promax双卡正品手机",
    "price":6349,
    "attrs":"[{\"name\":\"颜色\",\"value\":\"黑色\"},{\"name\":\"内存\",\"value\":\"64G\"}]"
}
```
### 2. 修改数据
POST请求地址：http://localhost:8080/updateProduct

参数
```json
{
    "id":"11",
    "price":6675
}
```
### 3. 删除数据
POST请求地址：http://localhost:8080/deleteProduct

参数
```json
{
    "id":"11"
}
```

## 5.3.2 搜索商品数据

### 1. 关键词搜索
GET请求地址：[http://localhost:8080/keywordSearch?keyword=苹果手机](http://localhost:8080/keywordSearch?keyword=苹果手机)


**其他方式的搜索不做演示，读者可根据前面章节的知识进行扩展**

<font color="red">**有兴趣读者可以补充项目代码，提交到GitHub，一起完善项目。**</font>