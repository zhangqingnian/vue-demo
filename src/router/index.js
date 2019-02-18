import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
//import HelloWorld from '@/components/HelloWorld'

/*import Home from '@/components/Home/Home'
import Member from '@/components/Member/Member'
import Shopcart from '@/components/Shopcart/Shopcart'
import Search from '@/components/Search/Search'
import Newslist from '@/components/News/Newslist'
import Newsdetail from '@/components/News/Newsdetail'
import Photolist from '@/components/Photo/Photolist'
import Photodetail from '@/components/Photo/Photodetail'
import Goodslist from '@/components/Goods/Goodslist'
import Goodsdetail from '@/components/Goods/Goodsdetail'*/

/*
* 性能优化 路由懒加载
* 需要安装插件 syntax-dynamic-import 并在.babelrc文件中配置
* */
const  Home =() => import('@/components/Home/Home');
const  Member =() => import('@/components/Member/Member');
const  Shopcart =() => import('@/components/Shopcart/Shopcart');
const  Search =() => import('@/components/Search/Search');
const  Newslist =() => import('@/components/News/Newslist');
const  Newsdetail =() => import('@/components/News/Newsdetail');
const  Photolist =() => import('@/components/Photo/Photolist');
const  Photodetail =() => import('@/components/Photo/Photodetail');
const  Goodslist =() => import('@/components/Goods/Goodslist');
const  Goodsdetail =() => import('@/components/Goods/Goodsdetail');

export default new Router({
  routes: [
    { path: '/',
      redirect: '/home' },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/member',
      name: 'member',
      component: Member
    },
    {
      path: '/shopcart',
      name: 'shopcart',
      component: Shopcart
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    //新闻列表
    {
      path: '/news/list',
      name: 'newslist',
      component: Newslist
    },
    //新闻详情
    {
      path: '/news/detail',
      name: 'newsdetail',
      component: Newsdetail
    },
    //图片列表
    {
      path: '/photo/list/:categoryId',
      name: 'photolist',
      component: Photolist
    },
    //图片详情
    {
      path: '/photo/detail',
      name: 'photodetail',
      component: Photodetail
    },
    //商品列表
    {
      path: '/goods/list',
      name: 'goodslist',
      component: Goodslist
    },
    //商品详情
    {
      path: '/goods/detail',
      name: 'goodsdetail',
      component: Goodsdetail
    },
  ]
})
