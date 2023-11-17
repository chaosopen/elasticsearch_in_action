(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{322:function(a,t,_){a.exports=_.p+"assets/img/4-1.77bff7af.png"},359:function(a,t,_){"use strict";_.r(t);var s=_(14),e=Object(s.a)({},(function(){var a=this,t=a._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"_4-1-架构设计"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-1-架构设计"}},[a._v("#")]),a._v(" 4.1 架构设计")]),a._v(" "),t("h2",{attrs:{id:"_4-1-1-核心概念"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-1-1-核心概念"}},[a._v("#")]),a._v(" 4.1.1 核心概念")]),a._v(" "),t("h3",{attrs:{id:"_1-node-节点"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-node-节点"}},[a._v("#")]),a._v(" 1. Node 节点")]),a._v(" "),t("p",[a._v("ES的节点分为两类，一类是Master，一类是DataNode。")]),a._v(" "),t("h4",{attrs:{id:"_1-master"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-master"}},[a._v("#")]),a._v(" 1. Master")]),a._v(" "),t("p",[a._v("在ES启动时，会选举出来一个Master。")]),a._v(" "),t("ol",[t("li",[a._v("当节点启动的时候，会从配置列表找到其他节点，建立连接。")]),a._v(" "),t("li",[a._v("并从候选主节点中选举出一个主节点。")])]),a._v(" "),t("ul",[t("li",[a._v("Master 负责内容：")])]),a._v(" "),t("p",[a._v("管理索引（创建、删除）、分配分片"),t("br"),a._v("\n维护元数据信息"),t("br"),a._v("\n管理集群所有节点状态"),t("br"),a._v("\n不负责数据处理")]),a._v(" "),t("h4",{attrs:{id:"_2-datanode"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-datanode"}},[a._v("#")]),a._v(" 2. DataNode")]),a._v(" "),t("p",[a._v("在ES集群中，可以有N多个DataNode节点。")]),a._v(" "),t("ul",[t("li",[a._v("DataNode 负责内容：")])]),a._v(" "),t("p",[a._v("数据操作（写入、数据检索）")]),a._v(" "),t("p",[a._v("压力都在DataNode节点上，配置最好大一些。")]),a._v(" "),t("h3",{attrs:{id:"_2-cluster-集群"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-cluster-集群"}},[a._v("#")]),a._v(" 2. Cluster 集群")]),a._v(" "),t("p",[a._v("多个节点组合成的一个团队就是集群，由一个Master，多个DataNode组成。")]),a._v(" "),t("h3",{attrs:{id:"_3-shards-分片"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-shards-分片"}},[a._v("#")]),a._v(" 3. Shards 分片")]),a._v(" "),t("p",[a._v("一个索引可以有多个分片，数据会分散存储到多个分片上，即一个分片包含一部分的数据，每一个分片都是一个 Lucene 的实例。创建索引时，分片数量一但确定，不可更改。")]),a._v(" "),t("p",[a._v("分片会分布在多个DataNode节点上面，分散请求压力。在集群扩大或缩小时，ES会自动迁移分片，使数据均匀分布在集群里。")]),a._v(" "),t("h3",{attrs:{id:"_4-replicas-备份"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-replicas-备份"}},[a._v("#")]),a._v(" 4. Replicas 备份")]),a._v(" "),t("p",[a._v("为了防止节点宕机，导致分片数据缺失，从而衍生出来了 Replica ，分片的副本，也成为副分片。")]),a._v(" "),t("p",[a._v("每个分片可以创建N个副本，相当于主分片的替代品，保护数据不丢失的冗余备份。")]),a._v(" "),t("h3",{attrs:{id:"_5-index-索引"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_5-index-索引"}},[a._v("#")]),a._v(" 5. Index 索引")]),a._v(" "),t("p",[a._v("数据存储的地方，数据会分布在多个分片里。")]),a._v(" "),t("h3",{attrs:{id:"_6-type-类型"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_6-type-类型"}},[a._v("#")]),a._v(" 6. Type 类型")]),a._v(" "),t("p",[a._v("ES7后面只有一个type，"),t("code",[a._v("_doc")]),a._v("，旧版本不过多讲解。")]),a._v(" "),t("h3",{attrs:{id:"_7-document-文档"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_7-document-文档"}},[a._v("#")]),a._v(" 7. Document 文档")]),a._v(" "),t("p",[a._v("具体的数据记录，序列化成JSON并存储到ElasticSearch中，指定了唯一ID")]),a._v(" "),t("h3",{attrs:{id:"_8-field-字段"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_8-field-字段"}},[a._v("#")]),a._v(" 8. Field 字段")]),a._v(" "),t("p",[a._v("数据的字段")]),a._v(" "),t("h3",{attrs:{id:"_9-id-主键"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_9-id-主键"}},[a._v("#")]),a._v(" 9. Id 主键")]),a._v(" "),t("p",[a._v("数据的唯一ID")]),a._v(" "),t("h2",{attrs:{id:"_4-1-2-分层设计"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-1-2-分层设计"}},[a._v("#")]),a._v(" 4.1.2 分层设计")]),a._v(" "),t("p",[t("img",{attrs:{src:_(322),alt:"图4-1"}})]),a._v(" "),t("p",[t("strong",[a._v("说明：")])]),a._v(" "),t("ul",[t("li",[a._v("Elasticsearch是基于Lucene架构实现的，所以其核心层为Lucene")]),a._v(" "),t("li",[a._v("Elasticsearch 目前支持HTTP、Thrift、Memcache三种协议，默认是HTTP")]),a._v(" "),t("li",[a._v("JMX指在Elasticsearch中对 Java 的管理架构，用来管理Elasticsearch应用")])])])}),[],!1,null,null,null);t.default=e.exports}}]);