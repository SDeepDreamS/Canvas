---
lang: zh-tw
---

HW1 - Canvas
===

**[English version](/features)**
**[中文版](/features-tw)**

### Scoring

| **Basic components**                             | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Basic control tools                              | 30%       | Y         |
| Text input                                       | 10%       | Y         |
| Cursor icon                                      | 10%       | Y         |
| Refresh button                                   | 10%       | Y         |

| **Advanced tools**                               | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Different brush shapes                           | 15%       | Y         |
| Un/Re-do button                                  | 10%       | Y         |
| Image tool                                       | 5%        | Y         |
| Download                                         | 5%        | Y         |

| **Other useful widgets**                         | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Name of widgets                                  | 1~5%     | Y         |


---


# 全部功能展示
首先以影片展示此canvas所有的功能。

{%vimeo 407515148 %}

## 繪筆功能
在點選下方canvas列表後，左邊有個長這樣的按鈕： <i class="fa fa-paint-brush"></i>
點選按鈕即可開始繪畫，繪畫顏色default為<font color="#00B16A">這個顏色</font>。
畫出來會像下面這樣：

![](https://i.imgur.com/99lUVH9.png)

#### 調整畫筆大小
在工具列裡的brush settings部分，調整size數值可以改變畫筆大小。
**size下面的綠條寬度即為畫出來的寬度，會隨數值改變。**

![](https://i.imgur.com/rMnQ5OW.png)

例如把size調為50，綠條寬就會變成50px。

![](https://i.imgur.com/fuuFPll.png)

#### 選擇畫筆顏色

畫筆顏色可由兩個part去調整，一是brush settings下方的color，二是工具列最右手邊的palette。Palette選到的顏色陰影處會變少，滑過去會有彈鋼琴的感覺。**選擇畫筆顏色時，工具列上方的那條線顏色也會跟著做修改。**

## 橡皮擦功能
 ![](https://i.imgur.com/nZZ7Zfn.png) 在點選下方canvas列表後，左邊有個長這樣的按鈕。


點選按鈕即可開始使用橡皮擦。橡皮擦可以擦掉canvas繪筆筆跡、直線、圖形還有上傳的圖片。
**調整橡皮擦大小**：橡皮擦大小會跟現今畫筆大小一樣，調整畫筆大小即可更改橡皮擦大小。

## 繪圖功能
點按滑鼠開始畫圖，按住不放拖曳可以改變大小，放開滑鼠完成繪圖。
線段粗細和顏色的調整和繪筆部分相同。
畫出來的圖案將是空心圖案。

#### 直線：點選此按鈕即可繪製直線。
![](https://i.imgur.com/JGkWYJO.png) 

#### 矩形：點選此按鈕即可繪製矩形。
![](https://i.imgur.com/s4ByWtR.png)

#### 三角形：點選此按鈕即可繪製三角形。
![](https://i.imgur.com/ZRATm7f.png)

#### 圓形：點選此按鈕即可繪製圓形。
![](https://i.imgur.com/n6grq1M.png)


## 文字功能
![](https://i.imgur.com/1Mc66nu.png)  點擊對話框的圖案，即可開始輸入文字。


#### 選擇文字字型
![](https://i.imgur.com/34Qq4YJ.png)

在TEXT AND UPLOAD下方，FONTSTYLE可以選擇文字字型。此次提供做為選擇的字型有：
- sans-serif
- Verdana
- Times New Roman
- Courier New
#### 調整文字大小
在TEXT AND UPLOAD下方，size可以調整文字大小，輸入數字將會改變當下的size作為預覽。(如下方的33的大小就是等等文字打出來應該有的大小)

![](https://i.imgur.com/vRadbA3.png)

#### 調整文字顏色
文字顏色同畫筆顏色調整方式。
#### 文字輸入範例
使用不同字型、大小、顏色所得的模樣。

![](https://i.imgur.com/VlcBnLq.png)


## Undo && Redo
![](https://i.imgur.com/agwJFpV.png)  ![](https://i.imgur.com/IGUOz68.png)


左為Undo，右為Redo，點擊即可達成Undo、Redo的效果。
需要注意的是，由於點擊Undo、Redo後如果要再畫圖，程式會不知道你要畫直線還是繪筆還是幹嘛，所以要再點擊想使用的功能才能繪畫。
( Undo、Redo點擊後直接將游標移到畫面上的話，會是not-allowed的游標，代表不能畫圖。)

**若已經將畫面移到一開始，則會出現 "不能再往前了" 的提示框，而若已經將畫面移到最後，則會出現 "現在是最新的了" 的提示框"。**

## All clear
![](https://i.imgur.com/0tA6qcW.png) 點擊垃圾桶，清除所有畫面。

會清除畫面上所有文字、圖案、繪圖以及**紀錄**。
因此在使用All clear之後，按Undo會是 "不能再往前了"。


## Upload
![](https://i.imgur.com/Rv3ozAQ.png)

**Upload的位置在文字設定的下方**，可以上傳圖片檔。
由於大部分圖片都蠻大張的，因此在drawImage的部分我將img.width和img.height同時乘以0.3做等比例縮放。

## Download
![](https://i.imgur.com/InNnzvb.png) 點擊save可以下載現在canvas的模樣。

下載下來的檔案將為png檔，黑色背景是我自己設定的畫面而已，下載下來的背景會是白色的。




## 游標切換
![](https://i.imgur.com/YKfPlrp.png)

上方為此次自定義的游標，由左至右分別代表畫圓、橡皮擦、繪圖、畫正方形、畫三角形。除此之外，畫線部分使用style.cursor裡的crosshair，文字則是使用text，其餘皆為not-allowed。

而當現在鼠標處於**工具列**(也就是在有顏色的線下方)時，游標會是pointer。
:::success
default游標為七彩羽毛筆，當游標為not-allowed時是不能畫畫的哦。
:::


## function解釋
以下解釋一些主要function的作用。

一、繪圖三步驟：down、move、up。
>用isDown當作flag來記錄按下及放開，並且在up時呼叫saveToHistory()來將記錄保存。
>下面move中的 event.type == "touchmove"等部分是用來支援觸控事件的，因此這個canvas也可以在手機上做操作。
  
```javascript=
function down( event ){ 
    event = event.touches ? event.touches[0] : event;
    isDown = true;
    var { x, y } = getPos(event);//取得滑鼠位置
    points.push({x, y});
    beginPoint = {x, y};
    context.save();
    if(toolSelected === 'paint' || toolSelected === 'line' || toolSelected === 'triangle' || toolSelected === 'square' || toolSelected === 'circle') redraw(context);
}

function move( event ) {
    event = event.touches ? event.touches[0] : event
    const { x, y } = getPos(event)
    if (!isDown) return;
    points.push({x, y});
    if( toolSelected === 'line' or 'triangle' or 'square' or 'circle' ){
        分別使用：drawLine1、drawTri、drawSqu、drawCir;
        redraw(context);
    }
    else if(toolSelected === 'eraser' || toolSelected === 'paint'){
        if (points.length > 3) {
            const lastTwoPoints = points.slice(-2);
            const controlPoint = lastTwoPoints[0];
            const endPoint = {
                x: (lastTwoPoints[0].x + lastTwoPoints[1].x) / 2,
                y: (lastTwoPoints[0].y + lastTwoPoints[1].y) / 2,
            }
            drawLine(beginPoint, controlPoint, endPoint);
            beginPoint = endPoint;
        }
        if(toolSelected === 'paint') redraw(context);
    }
    if(event.type == "touchmove" || event.type == "touchstart"){
        mouse_position = get_mouse_position(canvas, event.touches[0]);
        addClick(mouse_position.x, mouse_position.y, true)
    }
    else{
        mouse_position = get_mouse_position(canvas, event);
        addClick(mouse_position.x, mouse_position.y, true);
    }
}

function up(event) {
    if (!isDown) return;
    var { x, y } = points[ points.length - 1 ];
    points.push({x, y});
    if( toolSelected === 'line' or 'triangle' or 'square' or 'circle' ){
        分別使用：drawLine1、drawTri、drawSqu、drawCir;
        redraw(context);
    }else if(toolSelected === 'eraser' || toolSelected === 'paint'){
        if (points.length > 3) {
            const lastTwoPoints = points.slice(-2);
            const controlPoint = lastTwoPoints[0];
            const endPoint = lastTwoPoints[1];
            drawLine(beginPoint, controlPoint, endPoint);
        }
    context.restore();
    saveToHistory();
    beginPoint = null;
    isDown = false;
    points = [];
}

//這個code的部分內容是pesudo code
```

二、畫直線
>畫直線的function內先設定畫筆資訊，再做以下步驟。
```javascript=1
context.beginPath();
context.moveTo(beginPoint.x, beginPoint.y);
context.lineTo( endPoint.x, endPoint.y );
context.stroke();
```

三、畫圓形
>畫圓形的function內先設定畫筆資訊，再做以下步驟。
```javascript=1
context.beginPath();//開始繪製
let xlength = Math.abs(endPoint.x-beginPoint.x);
let ylength = Math.abs(endPoint.y-beginPoint.y);
let mylength = Math.sqrt(Math.pow(xlength,2)+Math.pow(ylength,2));
context.arc(beginPoint.x, beginPoint.y, mylength, 0, 2 * Math.PI, false);
context.stroke();
//mylength為半徑長
```

四、畫矩形
>畫矩形的function內先設定畫筆資訊，再做以下步驟。
```javascript=1
context.beginPath();//開始繪製
context.moveTo(beginPoint.x, beginPoint.y);//移到那一個坐標點 (X,Y)
context.lineTo(beginPoint.x, endPoint.y);
context.lineTo(endPoint.x, endPoint.y);
context.lineTo(endPoint.x, beginPoint.y);
context.lineTo(beginPoint.x, beginPoint.y);
context.stroke();
//lineTo表示要從現在得知的位置畫到哪，因此矩形四條線會有四個LineTo
```
五、畫三角形
>畫三角形的function內先設定畫筆資訊，再做以下步驟。
```javascript=1
context.beginPath();//開始繪製
context.moveTo(beginPoint.x, beginPoint.y);//移到那一個坐標點 (X,Y)
context.lineTo(endPoint.x, beginPoint.y);//從x點到y點
context.lineTo(beginPoint.x, endPoint.y);
context.lineTo(beginPoint.x, beginPoint.y);
context.stroke();
//三條線，三個lineTo
```
六、Text input
>在得到text的指令後，利用hasInput跟inputflag兩個flag來實作功能。
>handle Ente讓enter按下時有反應，drawText在Canvas上畫出東西。
```javascript=1
var mytext = document.getElementById('text');
mytext.addEventListener('click', function(event){
    Inputflag = true;
    canvas.style.cursor = "text";
}, false);

canvas.onclick = function(e) {
  if (!Inputflag) return;
  if (hasInput) return;
  addInput(e.clientX, e.clientY);
}

function addInput(x, y) {
    let input = document.createElement('input');
    input.各種設定;
    input.onkeydown = handleEnter;
    document.body.appendChild(input);
    input.focus();
    hasInput = true;
}

function handleEnter(e) {
    var keyCode = e.keyCode;
    if (keyCode === 13) {
        drawText(this.value, parseInt(this.style.left, 10), parseInt(this.style.top, 10));
        document.body.removeChild(this);
        hasInput = false;
    }
}

function drawText(txt, x, y) {
    context.textBaseline = 'top';
    context.textAlign = 'left';
    context.font = fontsize + 'px ' + fontstyle;
    context.fillStyle = strokeColorSetting;
    context.fillText(txt, x - 4, y - 4);
    //font設定字體大小及字型，fillStyle設定顏色
}
```
七、cursor icon
>用 canvas.style.cursor來更改。
>如果是自訂的，格式為 canvas.style.cursor = "url('路徑'), default";

八、Refresh
> 清掉所有東西，也清掉History。
```javascript=1
function resetCanvas(){
    clickX = new Array();
    clickY = new Array();
    clickDrag = new Array();
    clickColor = new Array();
    clickSize = new Array();
    canvas.style.background = "none";
    context.putImageData( canvasHistory[0], 0, 0 );
    step = 1;
    canvasHistory.length = step;
}
```
九、Redo/Undo
>用context.putImageData( canvasHistory[你想放的狀態],0,0)來達成。
>當跑到畫面最前或是最後方時，會用alert。
```javascript==1
var undoButton = document.getElementById('undo');
undoButton.addEventListener('click', function(event){
    canvas.style.cursor = "not-allowed";
    if( step > 1 ){
        context.putImageData( canvasHistory[ --step - 1 ], 0, 0 );
    } else {
        alert( "不能再往前了" );
    }
    Inputflag = false;
    console.log(context);
}, false);

var redoButton = document.getElementById('redo');
redoButton.addEventListener('click', function(event){
    canvas.style.cursor = "not-allowed";
    if( step < canvasHistory.length ){
        context.putImageData( canvasHistory[ step++ ], 0, 0 );
    } else {
        alert( "現在是最新的了" );
    }
    Inputflag = false;
    console.log(context);
}, false);
```
十、Upload image
>在用handleFileSelect得到檔案資料後，用drawToCanvas來把它畫到canvas上。
```javascript==1
function drawToCanvas(imgData){
	var img = new Image;
	img.src = imgData;
	img.onload = function(){//必須onload之後再畫
	    context.drawImage(img,0,0,img.width*0.3,img.height*0.3);
	    strDataURI = canvas.toDataURL();//獲取canvas base64資料
	}
}
//img.width和img.height乘以0.3來縮小大小
```
十一、Download
>用創建element "a"的方式來下載圖片。
```javascript==1
var saveButton = document.getElementById('save');
saveButton.addEventListener('click', function(event){
    canvas.style.cursor = "not-allowed";
    let dataString = canvas.toDataURL("image/png");
    let link = document.createElement("a");
    link.download = 'image.png';
    link.href = dataString;
    link.click();
    Inputflag = false;
}, false);
```

## Gitlab page link

https://107062211.gitlab.io/AS_01_WebCanvas/
    
## Others
額外的一些小彩蛋(或是補充)。
:::info
1. Title會動態變化，在跳離頁面時會是「你的畫還沒畫完！」，反之若在當前頁面則會是「來畫畫 :D」。
2. 這個canvas的版面會隨著螢幕大小調整，在手機中也可以用，版型不會跑掉(除了手機中有些小地方字放不下之外)。
3. canvas左下方兩個圖示滑鼠移過去時會閃爍，但是它除了叫出一個一樣的頁面之外沒有任何功能。我原本想要找骷髏頭，但fa fa icon上面沒有，自己找圖還要去背所以作罷。
:::
