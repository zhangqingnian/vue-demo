<template>
  <div>
    <nav-bar title="图文详情"></nav-bar>
    <div class="photo-title">
      <h3>{{imginfo.title}}</h3>
      <span>发起日期:{{imginfo.add_time | converTime('YYYY-MM-DD')}}</span>
      <span>{{imginfo.click}}次浏览</span>
      <span>分类:民生经济</span>
    </div>
    <vue-preview :slides="imgs" ></vue-preview>
    <!--<ul>
      <li v-for="(item,index) in imgs" :key="index">
        <img :src="item.src"/>
      </li>
    </ul>-->
    <div class="photo-desc">
      <p v-html="imginfo.content"></p>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
              imginfo:{},
              imgs:[]
            }
        },
        created(){
          let id = this.$route.query.id;
          this.getimginfo(id);
          this.getimg(id);
        },
        methods:{
          getimginfo(id){
            this.$axios.get('getimageInfo/'+id)
              .then(res =>{
                //console.log(res.data.message)
                this.imginfo = res.data.message[0];

              })
              .catch(err => {
                console.log('newlist err')
              })
          },
          getimg(id){
            this.$axios.get('getthumimages/'+id)
              .then(res =>{
                console.log(res.data.message)
                this.imgs = res.data.message;
                this.imgs.forEach(item => {
                   item.msrc = item.src,
                   item.w = 600,
                   item.h = 400
                })

              })
              .catch(err => {
                console.log('newlist err')
              })
          },
        }
    }
</script>

<style>
</style>
