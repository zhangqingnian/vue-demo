<template>
    <div :style="{height: viewHeight}">
      <nav-bar title="商品展示" />
      <mt-loadmore
        :auto-fill=false
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        style="margin-bottom: 50px"
        ref="loadmore">
        <ul>
          <li v-for="goods in goodslist" :key="goods.id">
            <router-link  :to="{name:'goodsdetail',query:{id:goods.id}}">
              <img width="100%" height="150" :src="goods.img_url">
              <div class="title">{{goods.title | converStr(22)}}</div>
              <div class="desc">
                <div class="sell clearfix">
                  <span>￥{{goods.sell_price}}</span>
                  <s>￥{{goods.market_price}}</s>
                </div>
                <div class="detail clearfix">
                  <div class="hot">热卖中</div>
                  <div class="count">还剩{{goods.stock_quantity}}件</div>
                </div>
              </div>
            </router-link >
          </li>
        </ul>
      </mt-loadmore>
    </div>
</template>

<script>
  /*
  * 网络图片 img  src随意
  * 本地图片  需要告知webpack 帮助移动到未来的dist目录
  * import Imgsrc from './../xxxx.png'
  * <img :scr="Imgsrc">
  * */
    import NavBar from "../common/NavBar.vue";

    export default {
      props:['apprefs'],
      components: {NavBar},
      data() {
        return {
          goodslist:[],
          page:1,
          viewHeight:0, //视口高度
          allLoaded:false  //是否加载
        }
      },
      created() {
        this.page = this.$route.query.goodsId || 1;
        this.getgoodslist(this.page);
      },
      mounted(){
        //接受apprefs中的数据(头尾高度)
        //中间视口高度 = 设备高度 - 头高 - 尾高
        this.viewHeight = document.body.clientHeight -
         this.apprefs.appHeader.$el.offsetHeight -
         this.apprefs.appFooter.$el.offsetHeight
      },
      methods: {
        //获取数据
        getgoodslist(page){
          this.$axios.get('getgoods?pageindex='+page)
            .then(res => {
              console.log(res.data.message)
              this.goodslist = res.data.message;
              this.page++;
            })
            .catch(err => {
              console.log('goodslist get err')
            })
        },
        addgoodslist(page){
          this.$axios.get('getgoods?pageindex='+page)
            .then(res => {
              //判断是否还有数据
              if(res.data.message.length === 0){
                //为true 时 禁止下拉操作
                this.allLoaded = true;
                this.$toast('没有数据了！');
                this.$refs.loadmore.onBottomLoaded();//重新定位
                return
              }
              this.goodslist = this.goodslist.concat(res.data.message);
              this.$refs.loadmore.onBottomLoaded();//重新定位
              this.page++;
            })
            .catch(err => {
              console.log('goodslist get err')
            })
        },
        //下拉触发
        // index.html <!DOCTYPE html> 会导致loadBottom 无效
        loadBottom(){
          //自动检测， 如果内容不够会自动调用；
          //如果不希望使用这一机制，可以将 auto-fill 设为 false
          this.addgoodslist(this.page);
          console.log('loadBottom 被调用！');

        }

      }
    }
</script>

<style scoped>
  img {
    display: block;
  }
  ul{
    overflow: hidden;
  }
  li{
    width: 50%;
    float: left;
    padding: 6px;
    box-sizing: border-box;
  }

  li > a:not(.mui-btn){
    display: block;
    width: 100%;
    margin: 0;
    padding: 0;
    border: 1px solid #5c5c5c;
    box-shadow: 0 0 4px #666;
  }

  .sell > span {
    float: left;
    color: red;
    text-align: left;
  }

  .detail >.hot{
    float: left;
    text-align: left;
    font-size: 15px;
  }
  .detail >.count{
    float: right;
    text-align: right;
    font-size: 15px;
  }
  .desc{
    background: #ccc;
  }
</style>
