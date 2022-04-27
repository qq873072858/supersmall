<template>
  <div class="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
  </div>
</template>

<script>
  import { getDetail } from 'network/detail'

  import DetailNavBar from "./childComps/DetailNavBar.vue"
  import DetailSwiper from "./childComps/DetailSwiper.vue"

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper
    },
    data() {
      return {
        iid: null,
        topImages: []
      }
    },
    created() {
      this.iid = this.$route.params.iid

      getDetail(this.iid).then(res => {
        //1.获取顶部的图片轮播数据
        this.topImages = res.data.result.itemInfo.topImages
        console.log(this.topImages)
        console.log('created', new Date())
      })

    },
    mounted() {
      console.log('mounted', new Date())
    }
  }
</script>

<style scoped>

</style>