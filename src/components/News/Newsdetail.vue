<template>
  <div class="tmpl">
    <nav-bar title="新闻详情"></nav-bar>
    <div class="news-title">
      <p>{{newsDetail.title}}</p>
      <div>
        <span>{{newsDetail.click}}次点击</span>
        <span>分类:民生经济</span>
        <span>添加时间:{{newsDetail.add_time | converTime('YYYY-MM-DD')}}</span>
      </div>
    </div>
    <div class="news-content" v-html="newsDetail.content"></div>
  </div>

</template>

<script>
    export default {
      name: '',
      data() {
          return {
            newsDetail:{}
          }
      },
      created(){
        let id = this.$route.query.id;
        this.$axios.get('getnew/'+id)
          .then(res =>{
            console.log(res.data.message)
            this.newsDetail = res.data.message[0];
          })
          .catch(err => {
            console.log('newlist err')
          })
      }
    }
</script>

<style>
</style>
