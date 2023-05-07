var cards=document.getElementsByClassName("card")
var details=document.getElementsByClassName("detail")
var buttons=document.getElementsByTagName("button")
var items=document.getElementsByClassName("item")

for(let i=0;i<cards.length;i++){
    cards[i].addEventListener('mouseover',function name(params) {
        details[i].style.display="flex";
        details[i].style.justifyContent='center';
        details[i].style.alignItems='center';
    })
    cards[i].addEventListener('mouseout',function name(params) {
        details[i].style.display="none";
    })
}


document.addEventListener("mousemove",(e)=>{
    // 鼠标位置
    let mouseX = e.x;
    let mouseY = e.y;
    // 所有item
    let items = document.querySelectorAll(".item");
    items.forEach(item =>{
        // 距离左边和顶部的距离
       let offsetX = item.offsetLeft;
       let offsetY = item.offsetTop;
       
      //计算以item为原点鼠标在x,y轴上的位置
      let diffX = mouseX - offsetX;
      let diffY = mouseY - offsetY;
    //   求出item旋转角度
    //1° = Math.pI /180

    let hudu = Math.atan2(diffY,diffX);
    let angle = hudu / (Math.PI / 180);
    // 设置item旋转
    item.style.transform = `rotate(${angle}deg)`
    })
})