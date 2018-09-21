/**
 * Created by zhousg on 2017/10/16.
 */
$(function(){
  banner();
  initMobile();
});
var banner = function(){
  // 1.获取轮播图数据  ==>  ajax
  // 2.根据数据动态渲染  ==>  判断屏幕宽度
  // 3.运用模板引擎进行渲染
  // 4.测试功能
  // 5.添加滑动手势

  var getData = function(){
    /*
    判断全局变量中是否存在数据
    如果存在进行动态渲染
    不存则通过ajax获取数据
     */
    if(window.data){
      render&&render(window.data);
    }else{
      $.ajax({
        type:'get',
        url:'lib/data.json',
        dataType:'json',
        success:function(data){
          window.data = data;
          render&&render(window.data);
        },
        error:function(xhr){
          alter(xhr.status);
        }
      })
    }
  }
  // 动态渲染
  var render = function(data){
    var isMob = true;
    $(window).width() < 768 ? isMob = true : isMob = false;
    // 使用模板引擎
    var slidesHtml = template('slidesT',{content:data,isMob:isMob});
    var pointsHtml = template('pointsT',{content:data});

    $('.carousel-indicators').html(pointsHtml);
    $('.carousel-inner').html(slidesHtml);
  }
/*
测试数据：
  1.当窗口发生改变的时候出发ajax事件并动态渲染。
  2.为了减少过多的ajax请求，在测试阶段启动缓存，将ajax内容赋值给全局变量
 */
  $(window).on('resize',function(){
    getData();
  }).trigger('resize');
}

// 添加滑动手势
var startX = 0;
var distanceX = 0;
var isMov = false;
// jquery总的e做了特殊了封装，元素的touches需要通过originalEvent
$('.wjs_banner').on('touchstart',function(e){
  console.log(e);
  startX = e.originalEvent.touches[0].clientX;
}).on('touchmove',function(e){
  var moveX = e.originalEvent.touches[0].clientX;
  distanceX = moveX - startX;
  isMov = true;
}).on('touchend',function(e){
  // 如果移动距离大于50px并且出现移动的话
  if(isMov==true && Math.abs(distanceX)>50){
    // lefe
    if(distanceX<0){
      $('.carousel').carousel('next');
    }
    // right
    else{
      $('.carousel').carousel('prev');
    }
    // 初始化全局变量
    stratX = 0;
    distanceX = 0;
    isMov = false;
  }
})
// product===产品模块nav在mobile中自适应
var initMobile = function(){
  // 定义title（滑动模块）的宽度
  var width = 0;
  var ul = $('.nav-tabs');
  ul.find('li').each(function(){
    width += $(this).outerWidth(true);
  })
  console.log(width);
  ul.width(width);
  // 使用iScroll插件解决nav滑动
  new IScroll($('.nav_parents')[0],{
    scrollX:true,
    scrollY:false,
    click:true
  })
}
