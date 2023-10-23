module.exports = {
    title: '《ElasticSearch入门到实战》电子书',
    description: '《ElasticSearch入门到实战》电子书',
    base: '/',   // 设置站点根路径
    dest: './ROOT',  // 设置输出目录
    head: [],
    plugins: [],
    themeConfig: {
        // 添加导航栏
        nav: [
            { text: '主页', link: '/' },
            { text: '工作指南', link: '/guide/' },
            { text: '作者联系方式', link: '/life/' },
            {
                text: '捐赠',
                items: [
                    { text: '支付宝', link: '/#支付宝捐赠二维码' },
                    { text: '微信', link: '/#微信捐赠二维码' },
                ]
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
              ]
            }],
        sidebarDepth: 2,//左侧导航显示的层级
        lastUpdated: 'Last Updated'
    }
}
