<template>
  <div id="app">
    <mt-header fixed title="斤斗铺" ref="appHeader"></mt-header>
    <router-view style="margin: 40px 0 55px 0" :apprefs="$refs"></router-view>
    <mt-tabbar v-model="selected" ref="appFooter" fixed>
      <mt-tab-item id="home" @click.native="changeHash">
        <img  slot="icon" src="./assets/logo.png" width="24" height="24">
        首页
      </mt-tab-item>
      <mt-tab-item id="member" @click.native="changeHash">
        <img  slot="icon" src="./assets/logo.png">
        会员
      </mt-tab-item>
      <mt-tab-item id="shopcart" @click.native="changeHash">
        <img slot="icon" src="./assets/logo.png">
        购物车
      </mt-tab-item>
      <mt-tab-item id="search" @click.native="changeHash">
        <img slot="icon" src="./assets/logo.png">
        查找
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      selected:'',
    }
  },
  methods:{
    changeHash(){
      //输出的值 是上一次的值，
      //该调用 早于了 子组件赋值给父组件的selected
      //console.log(this.selected);
      this.$nextTick(() => {
        //等vuex渲染完之后 调用
        //console.log(this.selected);
        this.$router.push({
          name:this.selected
        })
      })
    },
    hello(){
      console.log('hello')
    }
  },
  /*watch:{
    selected:function(newVal,oldVal){
      console.log(newVal);
      this.$router.push({
        name:newVal
      })
    }
  }*/
}
</script>

<style lang="less">
  @import "./assets/rest.less";
</style>
