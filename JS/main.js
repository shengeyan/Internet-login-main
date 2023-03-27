var i_s =document.getElementsByTagName("i");
var li_s=document.getElementsByTagName("li");

i_s[0].addEventListener("click",function(){
    window.location.href="https://github.com/shengeyan?tab=repositories";
})

i_s[1].addEventListener("click",function(){
    window.location.href="https://github.com/shengeyan?tab=repositories";
})

for(var i=0;i<li_s.length;i++){
    li_s[i].addEventListener("click",function(){
        window.location.href="https://shengeyan.gitee.io/";
    })
}