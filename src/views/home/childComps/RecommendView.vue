<template>
  <div class="recommend">
    <div class="recommend-item" v-for="item in recommends" :key="item.title">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div class="title">{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RecommendView',
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    text-align: center;
    border-bottom: 8px solid #eee;
    padding: 10px 0;
  }
  .recommend-item {
    flex: 1;
  }
  .recommend img {
    width: 90%;
  }
</style>