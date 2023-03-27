function way(){
    const canvar =document.getElementById("canvas");
    const ctx=canvar.getContext("2d");
    canvar.width=window.innerWidth;
    canvar.height=window.innerHeight;

    const Num=100;
    const line=120;
    const colorRGB='254,250,224';
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
            let color='rgba(${colorRGB},${1-size/3})';
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
                    ctx.stockStyle ="rgba(${colorRGB},${1-dist/Num})";
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

way();


// (function() {
// 	const canvas = document.getElementById('canvas');
// 	const ctx = canvas.getContext('2d');
// 	canvas.width = window.innerWidth;
// 	canvas.height = window.innerHeight;
// 	const particleNum = 100;
// 	const lineDistance = 120;
// 	const colorRGB = '254, 250, 224';
// 	let particles = [];
// 	let interactionParticle = null;
// 	class Particle {
// 		constructor(x, y, velocityX, velocityY, size, color) {
// 			this.x = x;
// 			this.y = y;
// 			this.velocityX = velocityX;
// 			this.velocityY = velocityY;
// 			this.size = size;
// 			this.color = color;
// 		}
// 		draw() {
// 			ctx.beginPath();
// 			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
// 			ctx.fillStyle = this.color;
// 			ctx.fill();
// 		}
// 		update() {
// 			if (this.x > canvas.width || this.x < 0) {
// 				this.velocityX *= -1;
// 			}
// 			if (this.y > canvas.height || this.y < 0) {
// 				this.velocityY *= -1;
// 			}
// 			this.x += this.velocityX;
// 			this.y += this.velocityY;
// 			this.draw();
// 		}
// 	}
	
// 	function getRandomArbitrary(min, max) {
// 		return Math.random() * (max - min) + min;
// 	}

// 	function createParticles() {
// 		for (let i = 0; i < particleNum; i++) {
// 			let size = getRandomArbitrary(1, 3);
// 			let x = Math.random() * canvas.width;
// 			let y = Math.random() * canvas.height;
// 			let velocityX = getRandomArbitrary(-2, 2);
// 			let velocityY = getRandomArbitrary(-2, 2);
// 			let color = `rgba(${colorRGB}, ${1 - size / 3})`;
// 			particles.push(new Particle(x, y, velocityX, velocityX, size, color));
// 		}
// 	}
	
// 	function animate() {
// 		requestAnimationFrame(animate);
// 		ctx.clearRect(0, 0, canvas.width, canvas.height);
// 		particles.forEach(particle => particle.update());
// 		connect();
// 	}

// 	function connect() {
// 		for (let i = 0; i < particles.length; i++) {
// 			for (let j = i + 1; j < particles.length; j++) {
// 				const p1 = particles[i];
// 				const p2 = particles[j]
// 				let distance = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
// 				if (distance < lineDistance) {
// 					ctx.strokeStyle = `rgba(${colorRGB}, ${1 - distance / lineDistance})`;
// 					ctx.beginPath();
// 					ctx.lineWidth = .8;
// 					ctx.moveTo(p1.x, p1.y);
// 					ctx.lineTo(p2.x, p2.y);
// 					ctx.stroke();
// 				}
// 			}
// 		}
// 	}
	
// 	function bindEvents() {
// 		canvas.addEventListener('mouseout', e => {
// 			interactionParticle.x = null;
// 			interactionParticle.y = null;
// 		});
// 		canvas.addEventListener('mouseover', e => {
// 			if (!interactionParticle) {
// 				interactionParticle = new Particle(e.x, e.y, 0, 0, 2, `rgba(${colorRGB}, 1)`);
// 				particles.push(interactionParticle);
// 			}
// 		});
// 		canvas.addEventListener('mousemove', e => {
// 			interactionParticle.x = e.x;
// 			interactionParticle.y = e.y;
// 		});
// 	}

// 	bindEvents();
// 	createParticles();
// 	animate();
// }());