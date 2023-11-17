(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{323:function(t,_,v){t.exports=v.p+"assets/img/4-2.8880a625.png"},324:function(t,_,v){t.exports=v.p+"assets/img/4-3.c2e9f155.png"},363:function(t,_,v){"use strict";v.r(_);var r=v(14),e=Object(r.a)({},(function(){var t=this,_=t._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[_("h1",{attrs:{id:"_4-3-深入理解倒排索引"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_4-3-深入理解倒排索引"}},[t._v("#")]),t._v(" 4.3 深入理解倒排索引")]),t._v(" "),_("p",[t._v("讲倒排索引之前我们先说一下正排索引。")]),t._v(" "),_("p",[t._v("以MySQL为例，在MySQL表中，每一行数据都有一个主键，查询数据会先找到ID，然后查整行数据，这种索引形式为正排索引，通过ID查value。而倒排索引恰好相反，是通过value查ID。")]),t._v(" "),_("h2",{attrs:{id:"_4-3-1-倒排索引基本原理"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_4-3-1-倒排索引基本原理"}},[t._v("#")]),t._v(" 4.3.1 倒排索引基本原理")]),t._v(" "),_("p",[t._v("举例索引数据如下：")]),t._v(" "),_("table",[_("thead",[_("tr",[_("th",[t._v("文档ID")]),t._v(" "),_("th",[t._v("value")])])]),t._v(" "),_("tbody",[_("tr",[_("td",[t._v("1")]),t._v(" "),_("td",[t._v("学习java")])]),t._v(" "),_("tr",[_("td",[t._v("2")]),t._v(" "),_("td",[t._v("学习golang 复习c")])]),t._v(" "),_("tr",[_("td",[t._v("3")]),t._v(" "),_("td",[t._v("复习java")])])])]),t._v(" "),_("p",[t._v("对文档分词，得到以下倒排索引结构")]),t._v(" "),_("table",[_("thead",[_("tr",[_("th",[t._v("单词（term）")]),t._v(" "),_("th",[t._v("文档ID集合")])])]),t._v(" "),_("tbody",[_("tr",[_("td",[t._v("学习")]),t._v(" "),_("td",[t._v("1,2")])]),t._v(" "),_("tr",[_("td",[t._v("复习")]),t._v(" "),_("td",[t._v("2,3")])]),t._v(" "),_("tr",[_("td",[t._v("java")]),t._v(" "),_("td",[t._v("1,3")])]),t._v(" "),_("tr",[_("td",[t._v("golang")]),t._v(" "),_("td",[t._v("2")])]),t._v(" "),_("tr",[_("td",[t._v("c")]),t._v(" "),_("td",[t._v("2")])])])]),t._v(" "),_("p",[t._v("搜索 "),_("code",[t._v("java")]),t._v(" 的时候，从倒排索引匹配 词=java，找到对应文档集合查询数据")]),t._v(" "),_("ul",[_("li",[t._v("倒排索引的term会对应1个或多个文档")]),t._v(" "),_("li",[t._v("倒排索引的term会按照词的从小到大排序")])]),t._v(" "),_("h2",{attrs:{id:"_4-3-2-倒排索引结构"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_4-3-2-倒排索引结构"}},[t._v("#")]),t._v(" 4.3.2 倒排索引结构")]),t._v(" "),_("p",[t._v("根据概念，我们可以用一个Map来简单描述这个结构，key是term，这部分组成了Dictionary，称为索引表。")]),t._v(" "),_("p",[t._v("另一个部分是 Postings List，称为记录表，对应上述的Map的value部分集合。")]),t._v(" "),_("p",[t._v("记录表是多个Postings组成，每个Postings包含以下信息：")]),t._v(" "),_("ul",[_("li",[t._v("文档 id（DocId, Document Id），包含term的所有文档唯一 id，用于去正排索引中查询原始数据。")]),t._v(" "),_("li",[t._v("词频（TF，Term Frequency），记录 Term 在每篇文档中出现的次数，用于后续相关性算分。")]),t._v(" "),_("li",[t._v("位置（Position），记录 Term 在每篇文档中的分词位置（多个），用于做词语搜索（Phrase Query）。")]),t._v(" "),_("li",[t._v("偏移（Offset），记录 Term 在每篇文档的开始和结束位置，用于高亮显示等。")])]),t._v(" "),_("h2",{attrs:{id:"_4-3-3-倒排索引实现"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_4-3-3-倒排索引实现"}},[t._v("#")]),t._v(" 4.3.3 倒排索引实现")]),t._v(" "),_("p",[t._v("全文检索在海量数据的情况下需要大量存储数据，所以会有以下问题：")]),t._v(" "),_("ul",[_("li",[t._v("索引表很大，搜索字段会有几千万个term")]),t._v(" "),_("li",[t._v("记录表会占据大量存储空间，一个term对应几百万个文档")])]),t._v(" "),_("p",[t._v("因此使用Map存储是不靠谱的。")]),t._v(" "),_("p",[t._v("海量数据情况下，存储空间和检索性能带来了很大的问题，所以巧妙运用存储倒排索引的数据结构和算法，让倒排索引"),_("strong",[t._v("节省空间、快读快写")])]),t._v(" "),_("p",[t._v("接下来会讲解索引表和记录表，分析倒排索引的实现。")]),t._v(" "),_("h3",{attrs:{id:"_1-索引表-term-dictionary"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_1-索引表-term-dictionary"}},[t._v("#")]),t._v(" 1. 索引表（term dictionary）")]),t._v(" "),_("p",[t._v("ES在几千万个数据快速找到某个term，需要先把索引表数据排序，然后二分查找法去找term。")]),t._v(" "),_("p",[t._v("但是索引表数据量很大，不能一次性加载到内存中。也不能一个文件存储，所以分多个block方式存储，但多次读文件会损耗性能，至此衍生出来了term index。")]),t._v(" "),_("h3",{attrs:{id:"_2-term-index"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_2-term-index"}},[t._v("#")]),t._v(" 2. term index")]),t._v(" "),_("p",[t._v("ES使用 "),_("code",[t._v("Burst-Trie")]),t._v(" 结构来实现term index，这是 "),_("code",[t._v("字典树")]),t._v(" 的一种变种，它主要是将后缀进行了压缩，降低了Trie的高度，从而获取更好查询性能。")]),t._v(" "),_("p",[t._v("没有了解过字典树的读者，可以参考图浅了解：")]),t._v(" "),_("p",[_("img",{attrs:{src:v(323),alt:"图4-2"}})]),t._v(" "),_("p",[_("img",{attrs:{src:v(324),alt:"图4-3"}})]),t._v(" "),_("p",[t._v("term index全部在缓存中，查找时，先快速定位到索引表大致位置，然后读取磁盘文件查找对应term，减少磁盘读取，由此来提高性能。")]),t._v(" "),_("ol",[_("li",[t._v("term index 在内存中是以 FST（finite state transducers）的形式保存的，其特点是非常节省内存。")]),t._v(" "),_("li",[t._v("term dictionary 的block内部利用公共前缀压缩，比如都是 Ab 开头的单词就可以把 Ab 省去，这样省空间。")])]),t._v(" "),_("h3",{attrs:{id:"_3-postings"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_3-postings"}},[t._v("#")]),t._v(" 3. Postings")]),t._v(" "),_("p",[t._v("PostingList 包含文档 id、词频、位置等多个信息，这些数据之间本身是相对独立的，因此 Lucene 将 Postings List 被拆成三个文件存储：")]),t._v(" "),_("ul",[_("li",[t._v("doc后缀文件：记录 Postings 的 docId 信息和 Term 的词频")]),t._v(" "),_("li",[t._v("pay后缀文件：记录 Payload 信息和偏移量信息")]),t._v(" "),_("li",[t._v("pos后缀文件：记录位置信息")])]),t._v(" "),_("p",[t._v("基本所有的查询都会用 .doc 文件获取文档 id，且一般的查询仅需要用到 .doc 文件就足够了。")]),t._v(" "),_("p",[t._v(".doc 文件存储的是每个 Term 对应的文档 Id 和词频。每个 Term 都包含一对 TermFreqs 和 SkipData 结构。")]),t._v(" "),_("h4",{attrs:{id:"termfreqs"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#termfreqs"}},[t._v("#")]),t._v(" TermFreqs")]),t._v(" "),_("p",[t._v("TermFreqs 存放 docId 和词频信息。")]),t._v(" "),_("h4",{attrs:{id:"skipdata"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#skipdata"}},[t._v("#")]),t._v(" SkipData")]),t._v(" "),_("p",[t._v("在搜索中存在将每个 Term 对应的 DocId 集合进行取交集的操作，即判断某个 Term 的 DocId 在另一个 Term 的 TermFreqs 中是否存在。TermFreqs 中每个 Block 中的 DocId 是有序的，可以采用顺序扫描的方式来查询，但是如果 Term 对应的 doc 特别多时搜索效率就会很低，同时由于 Block 的大小是不固定的，我们无法使用二分的方式来进行查询。因此 Lucene 为了减少扫描和比较的次数，采用了 SkipData 这个跳表结构来实现快速跳转。")])])}),[],!1,null,null,null);_.default=e.exports}}]);