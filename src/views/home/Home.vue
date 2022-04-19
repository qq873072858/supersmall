
<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <scroll class="content" ref="scroll" 
            :probe-type="3" :pull-up-load="true"
            @scroll="contentScroll" @pullingUp="loadMore">
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control class="tab-control" 
        :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    
    <back-top @click.native="backClick()" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommendView from './childComps/RecommendView.vue'
  import FeatureView from './childComps/FeatureView.vue'

  import NavBar from 'components/common/navbar/NavBar.vue'
  import TabControl from 'components/content/tabControl/TabControl.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'
  import Scroll from 'components/common/scroll/Scroll.vue'
  import BackTop from 'components/content/backTop/BackTop.vue'

  import { getHomeMultidata, getHomeGoods } from 'network/home'
import { clearTimeout, setTimeout } from 'timers';

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': { page: 0, list: [] },
          'new': { page: 0, list: [] },
          'sell': { page: 0, list: [] }
        },
        currentType: 'pop',
        isShowBackTop: false
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list;
      }
    },
    methods: {
      /**
       * 防抖函数
       */
      debounce(func, delay){
        let timer = null
        return function(...args) {
          if(timer) clearTimeout(timer)
          
          timer = setTimeout(() => {
            func.apply(this, args)
          }, delay)
        }
      },

      /**
       * 事件监听相关方法
       */
      tabClick(index) {
        switch(index){
          case 0: 
            this.currentType = 'pop'
            break
          case 1: 
            this.currentType = 'new'
            break
          case 2: 
            this.currentType = 'sell'
            break
        }
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 500);
      },
      contentScroll(position) {
        this.isShowBackTop = -position.y > 1000
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },

      /**
       * 网络请求相关
       */
      getHomeMultidata() {
        // 1.请求多个数据
        getHomeMultidata().then(res => {
          //console.log(res)
          this.banners = res.data.data.banner.list
          this.recommends = res.data.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        // 2.请求商品数据
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.data.list)
          this.goods[type].page += 1

          // 完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      }
    },
    created() {

      // 利用promise保证必须请求完数据才能渲染
      new Promise(() => {
        this.getHomeMultidata()

        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')
      });

    },
    mounted() {

      const refreshFun = this.debounce(this.$refs.scroll.refresh, 300)

      //监听item中图片加载成功
      this.$bus.$on('itemImageLoad', () => {

        refreshFun();

        //console.log('------------')
        //this.$refs.scroll.refresh()
      })
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;

    z-index: 2;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }

  .content {
    height: calc(100vh - 49px - 40px);
    margin-top: 44px;
    /* height: 500px; */
  }
</style>
