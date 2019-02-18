<template>
    <div>
      <mt-loadmore
        :top-method="loadTop"
        :bottom-method="loadBottom"
        @top-status-change="handleTopChange"
        ref="loadmore">
        <ul>
          <li v-for="item in list" :key="item">{{ item }}</li>
        </ul>
        <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
          <span v-show="topStatus === 'loading'">Loading...</span>
        </div>
      </mt-loadmore>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              topStatus: '',
              //控制是否继续下拉
              allLoaded:true,
              list:[1,2,3,4,5,6,7,8,9]
            }
        },
        created() {
        },
        methods: {
          //上拉触发
          loadTop(){
            console.log('loadTop 被调用！');
            this.$refs.loadmore.onTopLoaded(); //重新定位
          },
          //下拉触发
          loadBottom(){
            //自动检测， 如果内容不够会自动调用；
            //如果不希望使用这一机制，可以将 auto-fill 设为 false
            console.log('loadBottom 被调用！');
            //this.allLoaded = true;// 若数据已全部获取完毕
            //this.$refs.loadmore.onBottomLoaded();//重新定位
          },
          handleTopChange(status) {
            this.topStatus = status;
          },
        }
    }
</script>

<style>
</style>
