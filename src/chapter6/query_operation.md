# 6.1 查询相关操作

## 6.1.1 深分页游标查询 scroll

改动index.max_result_window参数值的大小，只能解决一时的问题，当索引的数据量持续增长时，在查询全量数据时还是会出现问题。而且会增加ES服务器内存大结果集消耗完的风险。采用`scroll`可以更高效的请求大量数据集。

### 1. 查询命令增加`scroll=1m`参数，说明采用游标查询，保持游标窗口一分钟。

```json
GET product_index/_search?scroll=1m
{
  "size": 1
}
```
查询结果会多一个参数：`_scroll_id`游标id。
```json
{
  "_scroll_id" : "FGluY2x1ZGVfY29udGV4dF91dWlkDXF1ZXJ5QW5kRmV0Y2gBFFE3VXkyNHNCcnhYTHFjTnZBamU1AAAAAAAB-ZQWQkc5RkdrNFBUSldMenoxX3oxd2d2dw==",
  "took" : 1
}
```

### 2. 翻页带着游标id查询，每次查询数量和上次size一样。
```json
GET /_search/scroll
{
    "scroll": "1m", 
    "scroll_id" : "FGluY2x1ZGVfY29udGV4dF91dWlkDXF1ZXJ5QW5kRmV0Y2gBFFE3VXkyNHNCcnhYTHFjTnZBamU1AAAAAAAB-ZQWQkc5RkdrNFBUSldMenoxX3oxd2d2dw=="
}
```
多次根据scroll_id游标查询，直到没有数据返回则结束查询。采用游标查询索引全量数据，更安全高效，限制了单次对内存的消耗。