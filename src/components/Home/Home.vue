<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-if="imgs.length"
                     v-for="(item,key) in imgs"
                     :key="key">
        <img :src="item.img" alt="">
      </mt-swipe-item>
    </mt-swipe>

    <div class="grid">
      <ul >
        <li>
          <router-link :to="{name:'newslist'}">
            <span class="nav-bg"></span>
            <p>新闻资讯</p>
          </router-link>
        </li>
        <li>
          <router-link :to="{name:'photolist',params:{categoryId:0}}">
            <span class="nav-bg"></span>
            <p>图文分享</p>
          </router-link>
        </li>
        <li>
          <router-link :to="{name:'goodslist',query:{goodsId:1}}">
            <span class="nav-bg"></span>
            <p>商品列表</p>
          </router-link>
        </li>
        <li>
          <a href="#">
            <span class="nav-bg"></span>
            <p>新闻资讯</p>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="nav-bg"></span>
            <p>新闻资讯</p>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="nav-bg"></span>
            <p>新闻资讯</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        imgs:[]
      }
    },
    created(){
      this.$nextTick(() => {
        this.$axios.get('getlunbo')
          .then(res => {
            this.imgs = res.data.message;
          })
          .catch(err => {
            console.log(err)
          })
      })

    }
  }
</script>

<style scoped lang="less">
  .mint-swipe{
    height: 160px;
    background: #eeeeee;
    img{
      width: 100%;
      height: 100%;
    }
  }

  .grid{
    ul{
      clear: both;
      overflow: hidden;
      li{
        float: left;
        width: 33.333%;
        text-align: center;
        height: 100px;
        background: #ccc;
        padding: 10px 0;
        box-sizing: border-box;
        a{
          //display: block;
          .nav-bg{
            display: inline-block;
            width: 50px;
            height: 50px;
            background: url("../../assets/images/nav.png") no-repeat;

          }
        }
        &:nth-child(2){
          a{
            .nav-bg{
              background-position-y: -50px;
            }
          }

        }
        &:nth-child(3){
          a{
            .nav-bg{
              background-position-y: -100px;
            }
          }

        }
        &:nth-child(4){
          a{
            .nav-bg{
              background-position-y: -150px;
            }
          }

        }
        &:nth-child(5){
          a{
            .nav-bg{
              background-position-y: -200px;
            }
          }

        }
        &:nth-child(6){
          a{
            .nav-bg{
              background-position-y: -250px;
            }
          }

        }

      }
    }
  }
</style>
