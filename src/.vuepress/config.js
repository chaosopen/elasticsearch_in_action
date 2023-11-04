module.exports = {
    title: '《ElasticSearch入门到实战》电子书',
    description: '本书由浅入深的介绍了ElasticSearch从安装、基础使用，进阶高级语法，实战场景，底层原理等，更好的帮助读者学习ES的知识。',
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
          hm.src = "https://hm.baidu.com/hm.js?cf62495503806b1a59f15409bcb76089";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();`
      ]
    ],
    plugins: [
      ['sitemap', {
          hostname: "https://es.chaosopen.cn",
          // 排除无实际内容的页面
          exclude: ["/404.html"]
        }
      ],
      [
        'vuepress-plugin-baidu-autopush'
      ],
      ['one-click-copy', {
        copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'], // String or Array
        copyMessage: '复制成功!', // default is 'Copied successfully!'
        toolTipMessage: '复制', // default is ''Copy to clipboard'
        duration: 800, // prompt message display time
      }
    ]
    ],
    themeConfig: {
        // 添加导航栏
        nav: [
            { text: '主页', link: '/' },
            { text: '一起交流', link: '/guide/' },
            { text: '赞助', link: '/sponsor' },
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
                '/chapter2/field_type_intro',
                '/chapter2/segment_word_search',
              ]
            },
            {
              title:"第三章：ElasticSearch进阶高级搜索",
              path:"/chapter3/index",
              collapsable: false,
              children:[
                '/chapter3/select_grammar',
                '/chapter3/rank_search',
                '/chapter3/aggs_search',
              ]
            },
            {
              title:"第四章：抽丝剥茧深入底层精通ES",
              path:"/chapter4/index",
              collapsable: false,
              children:[
                '/chapter4/architecture_design',
                '/chapter4/workflow',
                '/chapter4/inverted_index',
                '/chapter4/score_model',
              ]
            },
            {
              title:"第五章：电商搜索引擎实战",
              path:"/chapter5/index",
              collapsable: false,
              children:[
                '/wait',
              ]
            },
            {
              title:"第六章：海量日志平台建设",
              path:"/chapter5/index",
              collapsable: false,
              children:[
                '/wait',
              ]
            },
            {
              title:"第七章：高阶API文档",
              path:"/chapter7/index",
              collapsable: false,
              children:[
                '/chapter7/query_operation',
                '/chapter7/update_operation',
              ]
            },
            {
              title:"第八章：ES性能优化",
              path:"/chapter5/index",
              collapsable: false,
              children:[
                '/wait',
              ]
            },
            {
              title:"ES报错信息指南（持续更新总结）",
              path:"/chapter3/index",
              collapsable: false,
              children:[
                '/wait',
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