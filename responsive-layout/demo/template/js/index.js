$(function(){
  createDom();
});
var createDom = function(){
  $.ajax({
    type:'get',
    url:'js/data.json',
    dataType:'json',
    success:function(data){
      var number = 123;
      console.log(data);
      var html = template('test',{content:data,number:number});
      $('.box').html(html);
    }
  })
};
// var data = [
//   {"name":"wpc","age":"18"},
//   {"name":"ll","age":"18"}
// ]
// var html = template('test', {content:data});
// document.querySelector('.box').innerHTML = html;
