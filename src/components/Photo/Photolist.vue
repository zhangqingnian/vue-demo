<template>
  <div id="photolist">
    <nav-bar title="图文列表"></nav-bar>
    <div class="photo-header">
      <ul ref="nav">
        <li v-for="item in categorys" :key="item.id">
          <a @click="setrouterparams(item.id)" href="javascript:;">{{item.title}}</a>
        </li>
      </ul>
    </div>
    <div class="photo-list">
      <ul>
        <li v-for="img in imgs" :key="img.id">
          <router-link :to="{name:'photodetail',query:{id:img.id}}">
            <!--:src="img.img_url"
              遍历的时候 加上:key  否则图片有“缓存”， 采坑坑坑坑！！！
            -->
            <img width="100%" height="240" v-lazy="img.img_url"/>
            <div class="textwarp">
              <h3>{{img.title}}</h3>
              <span>{{img.zhaiyao}}</span>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    import NavBar from "../common/NavBar.vue";


    export default {
      components: {NavBar},
      name: '',
      data() {
          return {
            imgs:[],
            categorys:[]
          }
      },
      created(){
        let categoryId = this.$route.params.categoryId;
        this.loadImg(categoryId);
        this.getNavData();
      },
      beforeRouteUpdate (to, from, next) {
        // 在当前路由改变，但是该组件被复用时调用
        // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
        // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 可以访问组件实例 `this`
        //等于 ====》》》 路由不变 参数(query | params)改变
        //console.log(to.params.categoryId);
        let newCategoryId = to.params.categoryId;
        this.loadImg(newCategoryId);
        next();
      },
      methods:{
        //修改路由参数
        setrouterparams:function (categoryId) {
          this.$router.push({
            name:'photolist',
            params:{categoryId:categoryId}
          })
          //用户点击改变参数 =》触发 beforeRouteUpdate =》 重新调用 loadImg()更新数据
        },
        //根据id获取数据
        loadImg(categoryId){
          this.$axios.get('getimages/'+categoryId)
            .then(res =>{
              //console.log(res.data.message)
              this.imgs = res.data.message;
              if(this.imgs.length === 0){
                this.$toast({
                  message: '没有图片了！',
                  iconClass: 'iconfont icon-meiyoudingdan-01',
                });
              }
            })
            .catch(err => {
              console.log('newlist err')
            })
        },
        //获取导航分类数据
        getNavData(){
          this.$axios.get('getimgcategory')
            .then(res =>{
              this.categorys = res.data.message;
              this.categorys.unshift({
                id:0,title:'全部'
              });
              this.$nextTick(() => {
                let nav = this.$refs.nav;
                let oneWidth = nav.firstChild.offsetWidth;
                let len = this.categorys.length;
                nav.style.width = oneWidth * len + 'px';
                console.log(nav.style.width);
              })
            })
            .catch(err => {
              console.log('newlist err')
            })
        }
      }
    }
</script>

<style scoped lang="less">
  /*scoped 在组件中 独立作用域
   元素在nextTick()之后才会有 所以加上不生效
   解决: 全局引入样式
  .mint-toast-icon{
    font-size: 36px;
  }*/
  #photolist{

    image[lazy=loading] {
      width: 40px;
      height: 300px;
      margin: auto;
    }

    .photo-header{
      position: relative;
      height: 30px;
      width: 100%;
      overflow: hidden;
      overflow-x: scroll;
      /*&::-webkit-scrollbar {
        display: none;
      }*/
      ul{
        /*width: 500%;*/
        box-sizing: border-box;
        li{
          float: left;
          width: 75px;
          a{
            display: block;
            line-height: 30px;
            text-align: center;
          }
        }
      }

    }
    .photo-list{
      li{
        position: relative;
        img{
          display: block;
        }

        .textwarp{
          position: absolute;
          bottom: 0;
          background: rgba(0,0,0,.5);
          color: #fff;
          font-size: 12px;
          padding: 5px;
          box-sizing: border-box;
        }
      }
    }
  }

</style>
