<template>
  <div class="header-nav">
    <h1 @click="goback">&lt;</h1>
    <h2 class="title">{{title}}</h2>
  </div>
</template>

<script>
    export default {
        name: 'nav-bar',
        props:['title'],
        data() {
            return {}
        },
        methods:{
          goback(){
            this.$router.go(-1);
          }
        }
    }
</script>

<style scoped lang="less">
  .header-nav{
    height:40px;
    background: #f7f7f7;
    h1,h2{
      vertical-align: top;
      display: inline-block;
      height: 40px;
      line-height: 40px;
      margin-top: 0;
      margin-bottom: 0;
    }
    .title{
      margin-left: 25%;
    }
  }
</style>
