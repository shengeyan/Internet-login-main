
var bt=document.getElementById("login");//按钮元素
var em_nb=document.getElementById("em_nb");//账号元素
var passwd=document.getElementById("password");//密码元素
var lis = document.getElementsByTagName("li");
var imgs=document.getElementsByClassName("img3");

var ball=document.getElementById("img1");//球图片
var people=document.getElementById("img2");//人图片
var w=5,h=5;
var x=0,y=0;
var xSpeed=1;  //横坐标的行进速度
var ySpeed=1;  //纵坐标的行进速度

//浮动函数


//进行账户与密码判断
function pan(a,b){
    if(a=="12101060123"&&b=="123456")
        return 0;
    else
        if(a=="12101060123")
            return 1;
        else
            if(b=="123456")
                return 2;
            else
                return 3;

}
//判断有输入
function pan2(a,b){
    if(a==""&&b==""){
        alert("请进行输入");
        return 0;
    }
    else if(b==""){
        alert("请进行密码");
        return 0;
        
    }
    else if(a==""){
        alert("请输入账户");
        return 0;
    }
    else
        return 1;
}
//top 跳转
for(var i=0;i<lis.length;i++){
    lis[i].addEventListener("click",function(){
        window.location.href="https://shengeyan.gitee.io/";
    });
}
//进行登录页面判断转跳
bt.addEventListener("click",function(){
    if(pan2(em_nb.value,passwd.value)){
        switch (pan(em_nb.value,passwd.value)) {
            case 0:window.location.href="http://www.baidu.com/";break;
            case 1:alert("密码错误");break;
            case 2:alert("账号错误");break;
            case 3:alert("输入错误");break;
            default:
                break;
        }
    }
})
//QQ 微信导航
imgs[0].addEventListener("click",function(){window.location.href="https://im.qq.com/index/"});
imgs[1].addEventListener("click",function(){window.location.href="https://wx.qq.com/"});
