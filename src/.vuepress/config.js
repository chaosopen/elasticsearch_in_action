module.exports = {
    title: '《ElasticSearch入门到实战》电子书',
    description: '在这个ES教程网站上，你将学习如何使用Elasticsearch进行入门学习搭建安装、查询优化以及集群配置等方面的知识。',
    base: '/',   // 设置站点根路径
    dest: './docs',  // 设置输出目录
    port: 8088,
    head: [
      ['meta', { name: 'keywords', content: 'elasticsearch,es教程,elasticsearch入门指南,数据分析'}],
      [
        'script',
        {},
        `var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?b0231d3d61fb3ebcedfd5248c5a48a40";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();`
      ]
    ],
    plugins: [
      ['sitemap', {
          hostname: "https://es.chaosopen.top",
          // 排除无实际内容的页面
          exclude: ["/404.html"]
        }
      ],
      [
        'vuepress-plugin-baidu-autopush'
      ]
    ],
    themeConfig: {
        // 添加导航栏
        nav: [
            { text: '主页', link: '/' },
            { text: '作者联系方式', link: '/guide/' },
            {
                text: '赞助',
                link: '/sponsor'
            },
            { text: "GitHub", link: 'https://github.com/chaosopen/elasticsearch_in_action'}
        ],
        // 为以下路由添加左侧边栏
        sidebar: [
            {
              title:"首页",
              path:"/"
            },
            {
              title:"第一章：起步",
              path:"/chapter1/index",
              collapsable: false,
              children:[
                '/chapter1/elastic_search_intro',
                '/chapter1/install_elastic_search',
                '/chapter1/elastic_search_client',
                '/chapter1/elastic_search_client_coding',
              ]
            },
            {
              title:"第二章：ElasticSearch基础操作",
              path:"/chapter2/index",
              collapsable: false,
              children:[
                '/chapter2/index_operation',
                '/chapter2/mapping_operation',
                '/chapter2/document_operation',
              ]
            },
            {
              title:"赞助",
              path:"/sponsor"
            }],
        sidebarDepth: 2,//左侧导航显示的层级
        lastUpdated: 'Last Updated'
    }
}
