// 初始化canvas
var canvas = document.getElementById('paint')
canvas.width = document.documentElement.clientWidth
canvas.height = document.documentElement.clientHeight 
var context = canvas.getContext('2d') 

// 自适应
window.onresize = function(){
    canvas.width = document.documentElement.clientWidth
    canvas.height = document.documentElement.clientHeight 
}

// 开始画图
function drawLine(x1,y1,x2,y2){
    context.beginPath()
    context.moveTo(x1,y1)
    context.lineCap = "round"
    context.lineJoin = "round"
    context.lineWidth = lineWidth
    context.lineTo(x2,y2)
    context.stroke()
    context.closePath() 
}

// 默认关闭绘画模式   
var startUsing = false                                                
var lastPoint = {x: undefined, y: undefined}   
var lineWidth = 6

// 特性检测:是否是触屏设备
if(document.body.ontouchstart !== undefined){
    // 触屏设备
    canvas.ontouchstart = function(start){
        var x = start.touches[0].clientX
        var y = start.touches[0].clientY
        if(eraserEnabled){
            startUsing = true
            context.clearRect(x-15,y-15,30,30)
        }else{
            startUsing = true
            lastPoint = {"x": x, "y": y}
        } 
    }
    canvas.ontouchmove = function(move){    
        var x = move.touches[0].clientX
        var y = move.touches[0].clientY
        if(eraserEnabled){
            if(startUsing){
                context.clearRect(x-15,y-15,30,30)
            }
        }else{
            if(startUsing){
                var newPoint = {"x": x, "y": y}
                drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
                lastPoint = newPoint
            }  
        }       
    }
    canvas.ontouchend = function(end){
        startUsing = false
    }
}else{
    // 非触屏设备
    canvas.onmousedown = function(down){
        var x = down.clientX
        var y = down.clientY
        if(eraserEnabled){
            startUsing = true
            context.clearRect(x-15,y-15,30,30)
        }else{
            startUsing = true
            lastPoint = {"x": x, "y": y}
        } 
    }

    canvas.onmousemove = function(move){
        var x = move.clientX
        var y = move.clientY
        if(eraserEnabled){
            if(startUsing){
                context.clearRect(x-15,y-15,30,30)
            }
        }else{
            if(startUsing){
                var newPoint = {"x": x, "y": y}
                drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
                lastPoint = newPoint
            }  
        }       
    }

    canvas.onmouseup = function(up){
        startUsing = false
    }
}   

// 增加橡皮擦  
var eraserEnabled = false            
wipe.onclick = function(){
    eraserEnabled = true
    wipe.classList.add('active')
    draw.classList.remove('active')
}
draw.onclick = function(){
    eraserEnabled = false
    draw.classList.add('active')
    wipe.classList.remove('active')
}

// 改变画笔颜色
red.onclick = function(){
    context.strokeStyle = 'red'
}
orange.onclick = function(){
    context.strokeStyle = 'orange'
}
yellow.onclick = function(){
    context.strokeStyle = 'yellow'
}
green.onclick = function(){
    context.strokeStyle = 'green'
}
cyan.onclick = function(){
    context.strokeStyle = 'cyan'
}
blue.onclick = function(){
    context.strokeStyle = 'blue'
}
purple.onclick = function(){
    context.strokeStyle = 'purple'
}
pink.onclick = function(){
    context.strokeStyle = 'pink'
}
grey.onclick = function(){
    context.strokeStyle = 'grey'
}
black.onclick = function(){
    context.strokeStyle = 'black'
}

//设置画笔粗细
veryThin.onclick = function(){
    lineWidth = 1
}
thin.onclick = function(){
    lineWidth = 3
}
normal.onclick = function(){
    lineWidth = 6
}
bold.onclick = function(){
    lineWidth = 9
}
veryBold.onclick = function(){
    lineWidth = 12
}

//添加清空按钮
clearAll.onclick = function(){
    context.clearRect(0, 0, canvas.width, canvas.height)
}

//添加下载功能
downLoad.onclick = function(){
    var url = canvas.toDataURL("image/png")
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = "作品"
    a.target = "_blank"
    a.click()
}


   