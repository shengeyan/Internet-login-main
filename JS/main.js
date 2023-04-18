var i_s =document.getElementsByTagName("i");
var li_s=document.getElementsByTagName("li");
var videos=document.getElementsByTagName('video');

var mySwiper = new Swiper ('.swiper', {
    autoplay:true,//等同于以下设置
    direction: 'horizontal', // 水平切换
    loop: true, // 循环模式选项
    mousewheel: true,//鼠标滚轮
    centeredSlides: true,
    autoplay: {
        delay: 1000,//1秒切换一次
        disableOnInteraction: false,
    },

    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
})



//链接添加函数
function a (){
    i_s[0].addEventListener("click",function(){
        window.location.href="https://github.com/shengeyan?tab=repositories";
    })
    
    i_s[1].addEventListener("click",function(){
        window.location.href="https://im.qq.com/index/";
    })
    
    for(var i=0;i<li_s.length;i++){
        li_s[i].addEventListener("click",function(){
            window.location.href="https://shengeyan.gitee.io/";
        })
    }    
}
//粒子效果函数
function way(){
    const canvar =document.getElementById("canvas");
    const ctx=canvar.getContext("2d");
    canvar.width=window.innerWidth;
    canvar.height=window.innerHeight;

    const Num=150;
    const line=120;
    const colorRGB='0,0,0';
    let par=[];
    let interactionParticle =null;
    //创建粒子类
    class li_zi {
        constructor(x,y,v_x,v_y,size,color){
            this.x=x;
            this.y=y;
            this.v_x=v_x;
            this.v_y=v_y;
            this.color=color;
            this.size=size;
        }
        //添加单个粒子方法
        draw(){
            ctx.beginPath();
            ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
            ctx.fillStyle=this.color;
            ctx.fill();
        }
        //更新动画方法
        update(){
            if(this.x<0||this.x>canvar.width){
                this.v_x*=-1;
            }
            if(this.y<0||this.y>canvar.height){
                this.v_y*=-1;
            }
            this.x+=this.v_x;
            this.y+=this.v_y;
            this.draw();
        }
    }
    //获取随机数
    function getRandomNum(min,max){
        return Math.random()*(max-min)+min;
    }

    //随机生成粒子
    function create_li_zi(){
        for(let i=0;i<Num;i++){
            let size =getRandomNum(1,3);
            let x=Math.random()*canvar.width;
            let y=Math.random()*canvar.height;
            let v_x=getRandomNum(-2,2);
            let v_y=getRandomNum(-2,2);
            let color=`rgba(${colorRGB},${1-size/3})`;
            par.push(new li_zi(x,y,v_x,v_y,size,color));
        
        }
    }
    //添加动画
    function animate(){
        requestAnimationFrame(animate);
        //清除画布
        ctx.clearRect(0,0,canvar.width,canvar.height);
        par.forEach(li_zi=>{
            li_zi.update();
        });
        connect ();
    }
    //粒子连接线条
    function connect (){
        for(let i=0;i<par.length;i++){
            for(let j=i+1;j<par.length;j++){
                const one=par[i];
                const two=par[j];
                let dist=Math.sqrt(Math.pow(one.x-two.x,2)+Math.pow(one.y-two.y,2));
                if(dist<line){
                    ctx.strokeStyle = `rgba(${colorRGB}, ${1 - dist / line})`;
                    ctx.beginPath();
                    ctx.lineWidth = .8;
                    ctx.moveTo(one.x,one.y);
                    ctx.lineTo(two.x,two.y);
                    ctx.stroke();
                }
            }
        }
    }
    //鼠标交互
	function bindEvents() {
		canvar.addEventListener('mouseout', e => {
			interactionParticle.x = null;
			interactionParticle.y = null;
		});
		canvar.addEventListener('mouseover', e => {
			if (!interactionParticle) {
				interactionParticle = new li_zi(e.x, e.y, 0, 0, 2, `rgba(${colorRGB}, 1)`);
				par.push(interactionParticle);
			}
		});
		canvar.addEventListener('mousemove', e => {
			interactionParticle.x = e.x;
			interactionParticle.y = e.y;
		});
	}

    bindEvents();
    create_li_zi();
    animate();
   
}

function fly(){
    var stop, staticx;
    var img = new Image();
    img.src = "../IMG/biaoqing.png";
    
    //创建樱花元素
    function Sakura(x, y, s, r, fn) {
        this.x = x;
        this.y = y;
        this.s = s;
        this.r = r;
        this.fn = fn;
    }
    //樱花动作画布
    Sakura.prototype.draw = function(cxt) {
        cxt.save();
        var xc = 40 * this.s / 4;
        cxt.translate(this.x, this.y);
        cxt.rotate(this.r);
        cxt.drawImage(img, 0, 0, 40 * this.s, 40 * this.s)
        cxt.restore();
    }
    //樱花更新动作
    Sakura.prototype.update = function() {
        this.x = this.fn.x(this.x, this.y);
        this.y = this.fn.y(this.x,this.y);
        this.r = this.fn.r(this.r);
        if (this.x > window.innerWidth || this.x < 0 || this.y > window.innerHeight || this.y < 0) {
            this.r = getRandom('fnr');
            if (Math.random() > 0.4) {
                this.x = getRandom('x');
                this.y = 0;
                this.s = getRandom('s');
                this.r = getRandom('r');
            } else {
                this.x = window.innerWidth;
                this.y = getRandom('y');
                this.s = getRandom('s');
                this.r = getRandom('r');
            }
        }
    }
    //樱花数组
    SakuraList = function() {
        this.list = [];
    }
    //将樱花推入数组
    SakuraList.prototype.push = function(sakura) {
        this.list.push(sakura);
    }
    //樱花数组每一个进行更新
    SakuraList.prototype.update = function() {
        for (var i = 0, len = this.list.length; i < len; i++) {
            this.list[i].update();
        }
    }
    //樱花数组每一个进行绘画
    SakuraList.prototype.draw = function(cxt) {
        for (var i = 0, len = this.list.length; i < len; i++) {
            this.list[i].draw(cxt);
        }
    }
    //得到樱花数据的某一个元素
    SakuraList.prototype.get = function(i) {
        return this.list[i];
    }
    //得到樱花数组长度
    SakuraList.prototype.size = function() {
        return this.list.length;
    }
    //随机函数
    function getRandom(option) {
        var ret, random;
        switch (option) {
        case 'x':
            ret = Math.random() * window.innerWidth;
            break;
        case 'y':
            ret = Math.random() * window.innerHeight;
            break;
        case 's':
            ret = Math.random();
            break;
        case 'r':
            ret = Math.random() * 6;
            break;
        case 'fnx':
            random = -0.5 + Math.random() * 1;
            ret = function(x, y) {
                return x + 0.5 * random - 1.7;
            }
            ;
            break;
        case 'fny':
            random = 1.5 + Math.random() * 0.7
            ret = function(x, y) {
                return y + random;
            }
            ;
            break;
        case 'fnr':
            random = Math.random() * 0.03;
            ret = function(r) {
                return r + random;
            }
            ;
            break;
        }
        return ret;
    }
    //樱花开始函数
    function startSakura() {
        requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame;
        var canvas = document.createElement('canvas'), cxt;
        staticx = true;
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        canvas.setAttribute('style', 'position: fixed;left: 0;top: 0;pointer-events: none;');
        canvas.setAttribute('id', 'canvas_sakura');
        document.getElementsByTagName('body')[0].appendChild(canvas);
        cxt = canvas.getContext('2d');
        var sakuraList = new SakuraList();
        for (var i = 0; i < 50; i++) {
            var sakura, randomX, randomY, randomS, randomR, randomFnx, randomFny;
            randomX = getRandom('x');
            randomY = getRandom('y');
            randomR = getRandom('r');
            randomS = getRandom('s');
            randomFnx = getRandom('fnx');
            randomFny = getRandom('fny');
            randomFnR = getRandom('fnr');
            sakura = new Sakura(randomX,randomY,randomS,randomR,{
                x: randomFnx,
                y: randomFny,
                r: randomFnR
            });
            sakura.draw(cxt);
            sakuraList.push(sakura);
        }
        stop = requestAnimationFrame(function() {
            cxt.clearRect(0, 0, canvas.width, canvas.height);
            sakuraList.update();
            sakuraList.draw(cxt);
            stop = requestAnimationFrame(arguments.callee);
        })
    }
    //触发事件函数
    window.onresize = function() {
        var canvasSnow = document.getElementById('canvas_snow');
    }
    //图片加载
    img.onload = function() {
        startSakura();
    }
    //停止函数
    function stopp() {
        if (staticx) {
            var child = document.getElementById("canvas_sakura");
            child.parentNode.removeChild(child);
            window.cancelAnimationFrame(stop);
            staticx = false;
        } else {
            startSakura();
        }
    }
    
}

way()
fly()
a()
for(let i=0;i<videos.length;i++){
    videos[i].addEventListener('mouseover',function(){
        setTimeout(() => {
            videos[i].play();   
        }, 1);
        
    })
    videos[i].addEventListener('click',function(){
        videos[i].pause();
    })
}