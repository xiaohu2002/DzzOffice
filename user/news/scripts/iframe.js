document.addEventListener("DOMContentLoaded",()=>{
  if($(".joe_detail__article-video").length>0){
      const e=$(".joe_detail__article-video .play iframe").attr("data-player");$(".joe_detail__article-video .episodes .item").on("click",function(){
          $(this).addClass("active").siblings().removeClass("active");const t=$(this).attr("data-src");$(".joe_detail__article-video .play iframe").attr({src:e+t})
      }),$(".joe_detail__article-video .episodes .item").first().click()
  }
});