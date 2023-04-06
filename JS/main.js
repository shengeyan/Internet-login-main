var i_s =document.getElementsByTagName("i");
var li_s=document.getElementsByTagName("li");

var mySwiper = new Swiper ('.swiper', {
    autoplay:true,//等同于以下设置
    direction: 'horizontal', // 水平切换
    loop: true, // 循环模式选项
    mousewheel: true,//鼠标滚轮
    autoplay: {
        delay: 1000,//1秒切换一次
        disableOnInteraction: false,
    },

    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    },

    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
})

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

way()