<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <Navbar
      v-if="shouldShowNavbar"
      @toggle-sidebar="toggleSidebar"
      ref="nav"
    />

    <div
      class="sidebar-mask"
      @click="toggleSidebar(false)"
    />

    <Sidebar
      :items="sidebarItems"
      @toggle-sidebar="toggleSidebar"
    >
      <template #top>
        <slot name="sidebar-top"/>
      </template>
      <template #bottom>
        <slot name="sidebar-bottom"/>
      </template>
    </Sidebar>

    <Home v-if="$page.frontmatter.home"/>

    <Page
      v-else
      :sidebar-items="sidebarItems"
    >

      <template #bottom>
        <div style="text-align: center">
          <!-- <ArticleSquareAd></ArticleSquareAd> -->
          <!-- <img src="/assets/imgs/wx.jpg" width="200" /> -->
          <!-- <div> 请作者喝杯咖啡 </div> -->
        </div>
        <div class='copyright'> 版权所有，禁止私自转发、克隆网站。</div>
      </template>
    </Page>
  </div>
</template>

<script>
  import Home from '@theme/components/Home.vue'
  import Navbar from '@theme/components/Navbar.vue'
  import Page from '@theme/components/Page.vue'
  import Sidebar from '@theme/components/Sidebar.vue'
  import {resolveSidebarItems} from '@vuepress/theme-default/util'
  import ArticleSquareAd from '../../components/ArticleDownAd.vue'

  let _hmt;


  export default {
    name: 'Layout',

    components: {
      Home,
      Page,
      Sidebar,
      Navbar,
      ArticleSquareAd
    },

    data() {
      return {
        isSidebarOpen: false,
        showBook: false,
      }
    },

    computed: {
      shouldShowNavbar() {
        const {themeConfig} = this.$site
        const {frontmatter} = this.$page
        if (
          frontmatter.navbar === false
          || themeConfig.navbar === false) {
          return false
        }
        return (
          this.$title
          || themeConfig.logo
          || themeConfig.repo
          || themeConfig.nav
          || this.$themeLocaleConfig.nav
        )
      },

      shouldShowSidebar() {
        const {frontmatter} = this.$page
        return (
          !frontmatter.home
          && frontmatter.sidebar !== false
          && this.sidebarItems.length
        )
      },

      sidebarItems() {
        return resolveSidebarItems(
          this.$page,
          this.$page.regularPath,
          this.$site,
          this.$localePath
        )
      },

      pageClasses() {
        const userPageClass = this.$page.frontmatter.pageClass
        return [
          {
            'no-navbar': !this.shouldShowNavbar,
            'sidebar-open': this.isSidebarOpen,
            'no-sidebar': !this.shouldShowSidebar
          },
          userPageClass
        ]
      }
    },

    mounted() {
    },

    methods: {


      toggleSidebar(to) {
        this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
        this.$emit('toggle-sidebar', this.isSidebarOpen)
      },

      // side swipe
      onTouchStart(e) {
        this.touchStart = {
          x: e.changedTouches[0].clientX,
          y: e.changedTouches[0].clientY
        }
      },

      onTouchEnd(e) {
        const dx = e.changedTouches[0].clientX - this.touchStart.x
        const dy = e.changedTouches[0].clientY - this.touchStart.y
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
          if (dx > 0 && this.touchStart.x <= 80) {
            this.toggleSidebar(true)
          } else {
            this.toggleSidebar(false)
          }
        }
      }
    }
  }
</script>

<style>
  .copyright {
    text-align: center;
    margin: 50px 16px 8px 16px;
    color: grey;
    font-size: .9em;
  }

  .f-links a {
    font-weight: normal;
    text-decoration: underline;
    font-size: .9em;
    color: dodgerblue !important;
  }

  .f-links a:hover {
    opacity: .8 !important;
  }

  .book {
    transition: 200ms box-shadow;
    max-width: 180px;
    box-shadow: 2px 2px 5px #aaa;
    cursor: pointer;
  }

  .book:hover {
    box-shadow: 5px 5px 8px #888;
  }

</style>