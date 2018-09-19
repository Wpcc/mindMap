/**
 * Created by zhousg on 2017/10/16.
 */
$(function(){
  banner();
});
var banner = function(){
  // 获取轮播图数据  ==>  ajax
  // 根据数据动态渲染  ==>  判断屏幕宽度
  // 运用模板引擎进行渲染
  // 测试功能

  $.ajax({
    type:'get',
    url:'lib/data.json',
    dataType:'json',
    success:function(data){
      var isMob = true;
      $(window).width() < 768 ? isMob = true : false;

      console.log(isMob);
    },
    error:function(){

    }
  })
}
