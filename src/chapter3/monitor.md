# 3.4 ES状态监控

可以通过以下命令列出_cat参数允许查看的命令
```json
GET _cat/
```

举例一些常用的命令

### 3.4.1 查看所有节点状态
```json
GET _cat/nodes?v
```


### 3.4.2 查看健康状态
```json
GET _cat/health?v
```

### 3.4.3 查看所有节点详细信息
```json
GET _nodes/process
```

### 3.4.4 查看主节点
```json
GET _nodes/master?v
```

### 3.4.5 查看所有索引
```json
GET _nodes/indices?v
```

### 3.4.6 查看所有分片
```json
GET _nodes/shards?v
```
