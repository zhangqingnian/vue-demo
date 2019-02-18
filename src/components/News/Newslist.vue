<template>
  <div >
    <nav-bar title="新闻中心" />
    <ul id="newslist">
      <li class="clearfix" v-for="item in newslist">
        <router-link :to="{name:'newsdetail',query:{id:item.id}}">
          <img class="fl" :src="item.img_url" width="60" height="60"/>
          <div class="fl text">
            <p class="title" v-html="item.title"></p>
            <div>
              <span>点击数:{{item.click}}</span>
              <span>发表时间:{{item.add_time | converTime('YYYY-MM-DD')}}</span>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
      data() {
          return {
            newslist:[]
          }
      },
      created(){
          this.$axios.get('getnewslist')
            .then(res =>{
              console.log(res.data.message)
              this.newslist = res.data.message;
            })
            .catch(err => {
              console.log('newlist err')
            })
      }
    }
</script>

<style scoped lang="less">
  #newslist{
    font-size: 18px;
    li{
      border-bottom: 1px solid #eeeeee;
      .text{
        width:calc(~"100% - 60px");
        line-height: 30px;
        padding: 0 10px;
        box-sizing: border-box;
        .title{
          overflow: hidden;
          text-overflow:ellipsis;//文本溢出显示省略号
          white-space:nowrap;//文本不会换行（单行文本溢出）
          //width:calc(~"100% - 40px");
        }
        div{
          span{
            display: inline-block;
            color: #26a2ff;
            &:nth-child(2){
              margin-left: 10px;
            }
          }
        }
      }
    }
  }
</style>
