var stop, staticx;
var img = new Image();
img.src = 

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
    this.y = this.fn.y(this.y, this.y);
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
