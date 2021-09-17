/* REF CODE: http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/ */
/* Colors from http://flatuicolorpicker.com */
/* Symbols from http://fortawesome.github.io/Font-Awesome/ */
var kit_dict = {
    'tools': [
        ['paint','fa-paint-brush'],
        ['line','fas fa-minus'],
        ['eraser','fas fa-eraser'],
        ['save','fa-floppy-o'],
        ['delete','fa-trash-o'],//前面就會是他的id，可以用getelementbyid
        ['undo','fas fa-undo'],
        ['redo','fas fa-redo'],
        ['triangle','fas fa-caret-up'],
        ['square','far fa-square'],
        ['circle','far fa-circle'],
        ['text', 'fas fa-comment']
    ],
    'paints': ["#00B16A","#4ECDC4","#A2DED0","#87D37C","#90C695","#26A65B","#03C9A9","#68C3A3","#65C6BB","#1BBC9B","#1BA39C","#66CC99","#36D7B7","#C8F7C5","#86E2D5","#2ECC71","#16a085","#3FC380","#019875","#03A678","#4DAF7C","#2ABB9B","#1E824C","#049372","#26C281","#446CB3","#E4F1FE","#4183D7","#59ABE3","#81CFE0","#52B3D9","#C5EFF7","#22A7F0","#3498DB","#2C3E50","#19B5FE","#336E7B","#22313F","#6BB9F0","#1E8BC3","#3A539B","#34495E","#67809F","#2574A9","#1F3A93","#89C4F4","#4B77BE","#5C97BF","#EC644B","#D24D57","#F22613","#D91E18","#96281B","#EF4836","#D64541","#C0392B","#CF000F","#E74C3C","#DB0A5B","#F64747","#F1A9A0","#D2527F","#E08283","#F62459","#E26A6A","#DCC6E0","#663399","#674172","#AEA8D3","#913D88","#9A12B3","#BF55EC","#BE90D4","#8E44AD","#9B59B6","#e9d460","#FDE3A7","#F89406","#EB9532","#E87E04","#F4B350","#F2784B","#EB974E","#F5AB35","#D35400","#F39C12","#F9690E","#F9BF3B","#F27935","#E67E22","#ececec","#6C7A89","#D2D7D3","#EEEEEE","#BDC3C7","#ECF0F1","#95A5A6","#DADFE1","#ABB7B7","#F2F1EF","#BFBFBF","#EC644B","#D24D57","#F22613","#D91E18","#96281B","#EF4836","#D64541","#C0392B","#CF000F","#E74C3C","#DB0A5B","#F64747","#F1A9A0","#D2527F","#E08283","#F62459","#E26A6A","#DCC6E0","#663399","#674172","#AEA8D3","#913D88","#9A12B3","#BF55EC","#BE90D4","#8E44AD","#9B59B6","#446CB3","#E4F1FE","#4183D7","#59ABE3","#81CFE0","#52B3D9","#C5EFF7","#22A7F0","#3498DB","#2C3E50","#19B5FE","#336E7B","#22313F","#6BB9F0","#1E8BC3","#3A539B","#34495E","#67809F","#2574A9","#1F3A93","#89C4F4","#4B77BE","#5C97BF","#4ECDC4","#A2DED0","#87D37C","#90C695","#26A65B","#03C9A9","#68C3A3","#65C6BB","#1BBC9B","#1BA39C","#66CC99","#36D7B7","#C8F7C5","#86E2D5","#2ECC71","#16a085","#3FC380","#019875","#03A678","#4DAF7C","#2ABB9B","#00B16A","#1E824C","#049372","#26C281","#e9d460","#FDE3A7","#F89406","#EB9532","#E87E04","#F4B350","#F2784B","#EB974E","#F5AB35","#D35400","#F39C12","#F9690E","#F9BF3B","#F27935","#E67E22","#ececec","#6C7A89","#D2D7D3","#EEEEEE","#BDC3C7","#ECF0F1","#95A5A6","#DADFE1","#ABB7B7","#F2F1EF","#BFBFBF"]
};

var penAttibutes = {                       // 畫筆數據
    width : 4,
    lineCap : "round",
    lineJoin : "round",
    strokeStyle: "#000",
    fillStyle: "#000",
    globalCompositeOperation: "source-over",
    globalAlpha : 1
}

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var clickColor = new Array();
var clickSize = new Array();
var paint;
var paintingModal = 'paint'; //畫筆模式 今天要用
var toolSelected = 'paint';
var nowFunction = "source-over";
var nowcursor;
var fontsize = 14;
var fontstyle = 'sans-serif';
var hasInput = false;
var Inputflag = false;

// Settings
var strokeColorSetting = "#00b16a";
var strokeSizeSetting = 5;

// Another way to draw
var points = [];
var beginPoint = null;
var isDown = false;

// Elements
var canvas = document.getElementById("canvas");
var control = document.getElementById("control");
var context = canvas.getContext("2d");
var brushDisplay = document.getElementById('brush');
var fontsizeDisplay = document.getElementById('fontsize');
var fontstyleDisplay = document.getElementById('fontstyle');
var colorDisplay = document.getElementById('color');
var paintList = document.getElementsByClassName("tool-thin");
var toolList = document.getElementsByClassName("tool");
var paintKit = document.getElementById('paints');
var toolKit = document.getElementById('tools');

//實現撤銷和重做

let canvasHistory = [];                    // 在每次畫線和橡皮擦使用後保存數據
let step = 0;     

function setTitle(){
    window.onblur = function(){
        document.title = "你的畫還沒畫完！"
    }
    window.onfocus = function(){
        document.title = "來畫畫 :D"
    }
}

function saveToHistory()
{
    if(step === canvasHistory.length){
        let nowImage = context.getImageData( 0, 0, canvas.width, canvas.height );
        canvasHistory.push( nowImage );
        step++;
    } else {
        canvasHistory.length = step;    //截斷數組
    }
    context = canvas.getContext("2d");
}


// Document function
function initializeDocument(){
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight - control.clientHeight*0.33;
    //canvas.style.cursor = nowcursor;
    saveToHistory();
    setTitle();
    //saveTitle;
    for (var i = 0; i < kit_dict['paints'].length; i++){
        paintKit.innerHTML += "<div class='tool-thin' style='background:" + kit_dict['paints'][i] + "!important' " + "color='"+ kit_dict['paints'][i] +"'" +"></div>\n";
    }
    for (var i = 0; i < kit_dict['tools'].length; i++){
        toolKit.innerHTML += "<div class='tool' id='" + kit_dict['tools'][i][0] + "'>\n<i class='fa "+ kit_dict['tools'][i][1] +"'></i>\n<h2>" + kit_dict['tools'][i][0] + "</h2></div>\n";
    }
    brushDisplay.setAttribute("style", "border-width: " + brushDisplay.value + "px");
    fontsizeDisplay.setAttribute("style", "font-size: " + fontsizeDisplay.value + "px");
    fontstyleDisplay.setAttribute("style", "font-family: " + fontstyleDisplay.value);
    context.globalCompositeOperation=nowFunction;
    var paintButton = document.getElementById("paint");
    paintList[0].classList.add("selected");
    paintButton.classList.add("selected");
}

function get_mouse_position(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
};

// Drawing functions
function addClick(x, y, dragging){
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
    clickColor.push(strokeColorSetting);
    clickSize.push(strokeSizeSetting);
}

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

function clearCanvas(context){
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

function redraw(context){
    //clearCanvas(context);
    penAttibutes.lineJoin = "round";
    for (var i = 0; i < clickX.length; i++){
        penAttibutes.lineWidth = clickSize[i];
        penAttibutes.strokeStyle = clickColor[i];
        context.stroke();
    }   
}

// main:
initializeDocument();

// Drawing board event functions
/*function handleStart(event){
    if (toolSelected == 'paint'){
        mouse_position = get_mouse_position(canvas, event);
        var mouseX = mouse_position.x;
        var mouseY = mouse_position.y;
        paint = true;
        addClick(mouse_position.x, mouse_position.y);
        redraw(context);
    }
}
//paint 只是個flag
function handleMove(event){
    //event.preventDefault();
    if(paint && toolSelected == 'paint'){
        if(event.type == "touchmove" || event.type == "touchstart"){
            mouse_position = get_mouse_position(canvas, event.touches[0]);
            addClick(mouse_position.x, mouse_position.y, true)
        }
        else{
            mouse_position = get_mouse_position(canvas, event);
            addClick(mouse_position.x, mouse_position.y, true);
        }
        redraw(context);
    }
}

function handleEnd(event){
    if (toolSelected == 'paint'){
        paint = false;
    }
    saveToHistory();
}*/

var Painter = document.getElementById('paint');
Painter.addEventListener('click', function(event){
    toolSelected = 'paint';
    penAttibutes.globalCompositeOperation = "source-over";
    canvas.style.cursor = "url('./img/pen.PNG'), default";
    Inputflag = false;
}, false);

var Line = document.getElementById('line');
Line.addEventListener('click', function(event){
    toolSelected = 'line';
    penAttibutes.globalCompositeOperation = "source-over";
    canvas.style.cursor = "crosshair";
    Inputflag = false;
}, false);

var Tri = document.getElementById('triangle');
Tri.addEventListener('click', function(event){
    toolSelected = 'triangle';
    penAttibutes.globalCompositeOperation = "source-over";
    canvas.style.cursor = "url('./img/triangle.PNG'), default";
    Inputflag = false;
}, false);

var Squ = document.getElementById('square');
Squ.addEventListener('click', function(event){
    toolSelected = 'square';
    penAttibutes.globalCompositeOperation = "source-over";
    canvas.style.cursor = "url('./img/square.PNG'), default";
    Inputflag = false;
}, false);

var Cir = document.getElementById('circle');
Cir.addEventListener('click', function(event){
    toolSelected = 'circle';
    penAttibutes.globalCompositeOperation = "source-over";
    canvas.style.cursor = "url('./img/cursor1.PNG'), default";
    Inputflag = false;
}, false);

var Eraser = document.getElementById('eraser');
Eraser.addEventListener('click', function(event){
    toolSelected = 'eraser';
    penAttibutes.globalCompositeOperation = "destination-out"; 
    canvas.style.cursor = "url('./img/eraser.png'), default";
    Inputflag = false;
}, false);

function down( event ){ 
    event = event.touches ? event.touches[0] : event;
    isDown = true;
    var { x, y } = getPos(event);
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
    if( toolSelected === 'line' ){
        drawLine1( beginPoint, { x, y } );
        redraw(context);
    }
    else if( toolSelected === 'triangle'){
        drawTri( beginPoint, { x, y } );
        redraw(context);
    }
    else if( toolSelected === 'square'){
        drawSqu( beginPoint, { x, y } );
        redraw(context);
    }
    else if(toolSelected === 'circle'){
        drawCir( beginPoint, { x, y } );
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
    if( toolSelected === 'line' ){
        drawLine1( beginPoint, { x, y } );
        redraw(context);
    }else if(toolSelected === 'eraser' || toolSelected === 'paint'){
        if (points.length > 3) {
            const lastTwoPoints = points.slice(-2);
            const controlPoint = lastTwoPoints[0];
            const endPoint = lastTwoPoints[1];
            drawLine(beginPoint, controlPoint, endPoint);
        }
        if(toolSelected === 'paint') redraw(context);
    }else if(toolSelected === 'triangle'){
        drawTri( beginPoint, { x, y } );
        redraw(context);
    }else if(toolSelected === 'square'){
        drawSqu( beginPoint, { x, y } );
        redraw(context);
    }else if(toolSelected === 'circle'){
        drawCir( beginPoint, { x, y } );
        redraw(context);
    }
    context.restore();
    saveToHistory();
    beginPoint = null;
    isDown = false;
    points = [];
}

// 直線
function drawLine1( beginPoint, endPoint ) {
    context.putImageData( canvasHistory[ step - 1 ], 0, 0 );
    context.lineWidth = penAttibutes.width;
    context.lineCap = penAttibutes.lineCap;
    context.strokeStyle = penAttibutes.strokeStyle;
    context.fillStyle = penAttibutes.fillStyle;
    context.globalCompositeOperation = penAttibutes.globalCompositeOperation;
    context.globalAlpha = penAttibutes.globalAlpha;
    context.beginPath();
    context.moveTo(beginPoint.x, beginPoint.y);
    context.lineTo( endPoint.x, endPoint.y );
    context.stroke();
}

// 三角形
function drawTri( beginPoint, endPoint ) {
    context.putImageData( canvasHistory[ step - 1 ], 0, 0 );
    context.lineWidth = penAttibutes.width;
    context.lineCap = penAttibutes.lineCap;
    context.strokeStyle = penAttibutes.strokeStyle;
    context.fillStyle = penAttibutes.fillStyle;
    context.globalCompositeOperation = penAttibutes.globalCompositeOperation;
    context.globalAlpha = penAttibutes.globalAlpha;
    context.beginPath();//開始繪製
    context.moveTo(beginPoint.x, beginPoint.y);//移到那一個坐標點 (X,Y)
    context.lineTo(endPoint.x, beginPoint.y);//從x點到y點
    context.lineTo(beginPoint.x, endPoint.y);
    context.lineTo(beginPoint.x, beginPoint.y);
    context.stroke();
}

//畫圓
function drawCir( beginPoint, endPoint ) {
    context.putImageData( canvasHistory[ step - 1 ], 0, 0 );
    context.lineWidth = penAttibutes.width;
    context.lineCap = penAttibutes.lineCap;
    context.strokeStyle = penAttibutes.strokeStyle;
    context.fillStyle = penAttibutes.fillStyle;
    context.globalCompositeOperation = penAttibutes.globalCompositeOperation;
    context.globalAlpha = penAttibutes.globalAlpha;
    context.beginPath();//開始繪製
    let xlength = Math.abs(endPoint.x-beginPoint.x);
    let ylength = Math.abs(endPoint.y-beginPoint.y);
    let mylength = Math.sqrt(Math.pow(xlength,2)+Math.pow(ylength,2));
    context.arc(beginPoint.x, beginPoint.y, mylength, 0, 2 * Math.PI, false);
    context.stroke();
}

// 畫正方形
function drawSqu( beginPoint, endPoint ) {
    context.putImageData( canvasHistory[ step - 1 ], 0, 0 );
    context.lineWidth = penAttibutes.width;
    context.lineCap = penAttibutes.lineCap;
    context.strokeStyle = penAttibutes.strokeStyle;
    context.fillStyle = penAttibutes.fillStyle;
    context.globalCompositeOperation = penAttibutes.globalCompositeOperation;
    context.globalAlpha = penAttibutes.globalAlpha;
    context.beginPath();//開始繪製
    context.moveTo(beginPoint.x, beginPoint.y);//移到那一個坐標點 (X,Y)
    context.lineTo(beginPoint.x, endPoint.y);
    context.lineTo(endPoint.x, endPoint.y);
    context.lineTo(endPoint.x, beginPoint.y);
    context.lineTo(beginPoint.x, beginPoint.y);
    context.stroke();
}

// 橡皮擦 || 畫
function drawLine(beginPoint, controlPoint, endPoint) {
    context.lineWidth = penAttibutes.width;
    context.lineCap = penAttibutes.lineCap;
    context.lineJoin = penAttibutes.lineJoin;
    context.strokeStyle = penAttibutes.strokeStyle;
    context.fillStyle = penAttibutes.fillStyle;
    context.globalCompositeOperation = penAttibutes.globalCompositeOperation;
    context.globalAlpha = penAttibutes.globalAlpha;
    context.beginPath();
    context.moveTo(beginPoint.x, beginPoint.y);
    context.quadraticCurveTo(controlPoint.x, controlPoint.y, endPoint.x, endPoint.y);
    context.stroke();
}

function getPos( event ) {
    return {
        x: event.clientX,
        y: event.clientY
    }
}

// Drawing board events
/*canvas.addEventListener('mousedown', handleStart, false);
canvas.addEventListener('mousemove', handleMove, false);
canvas.addEventListener('mouseup', handleEnd, false);
canvas.addEventListener('mouseleave', handleEnd, false);
canvas.addEventListener("touchstart", handleStart, false);
canvas.addEventListener("touchend", handleEnd, false);
canvas.addEventListener("touchcancel", handleEnd, false);
canvas.addEventListener("touchmove", handleMove, false);*/
canvas.addEventListener('mousedown', down, false);
canvas.addEventListener('mousemove', move, false);
canvas.addEventListener('mouseup', up, false);
canvas.addEventListener('mouseleave', up, false);
canvas.addEventListener("touchstart", down, false);
canvas.addEventListener("touchend", up, false);
canvas.addEventListener("touchcancel", up, false);
canvas.addEventListener("touchmove", move, false);

var clearButton = document.getElementById('delete');
clearButton.addEventListener('click', function(event){
    canvas.style.cursor = "not-allowed";
    //clearCanvas(context);
    resetCanvas(context);
    Inputflag = false;
}, false);

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


for (var i = 0; i < paintList.length; i++) {
    paintList[i].addEventListener('click', function(event){
        for (var i = 0; i < paintList.length; i++) {
            paintList[i].classList.remove("selected");
        }
        strokeColorSetting = this.getAttribute("color");
        control.setAttribute("style","border-color: " + strokeColorSetting + "!important");
        colorDisplay.value = strokeColorSetting;
        colorDisplay.setAttribute("style", "border-color: " + strokeColorSetting + "!important" );
        this.classList.add("selected");
    }, false);
}

brushDisplay.addEventListener('change', function(event){
    strokeSizeSetting = this.value;
    this.setAttribute("style", "border-width: " + strokeSizeSetting + "px!important" );
    penAttibutes.width = parseInt(strokeSizeSetting);
}, false);

fontsizeDisplay.addEventListener('change', function(event){
    fontsize = this.value;
    console.log(fontsize);
    this.setAttribute("style", "font-size: " + fontsize + "px!important");
}, false);

fontstyleDisplay.addEventListener('change', function(event){
    fontstyle = this.value;
    console.log(fontstyle);
    this.setAttribute("style", "font-family: " + fontstyle);
}, false);

colorDisplay.addEventListener('change', function(event){
    for (var i = 0; i < paintList.length; i++) {
        paintList[i].classList.remove("selected");
    }
    strokeColorSetting = this.value;
    control.setAttribute("style","border-color: " + strokeColorSetting + "!important");
    this.setAttribute("style", "border-color: " + strokeColorSetting + "!important" );
}, false);

control.addEventListener('click', function(event){
    document.getElementById('gt').classList.remove('down');
    document.getElementById('wb').classList.remove('down');
    this.classList.remove('down');
}, false)

control.addEventListener('mouseleave', function(event){
    document.getElementById('gt').classList.add('down');
    document.getElementById('wb').classList.add('down');
    this.classList.add('down');
}, false)

for (var i = 0; i < toolList.length; i++) {
    toolList[i].addEventListener('click', function(event){
        for (var i = 0; i < toolList.length; i++) {
            toolList[i].classList.remove("selected");
        }
        toolSelected = this.getAttribute("id");
        this.classList.add("selected");
    }, false);
}

//upload file
function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      	// Only process image files.
      	if (!f.type.match('image.*')) {
        	continue;
      	}

      	var reader = new FileReader();

      	// Closure to capture the file information.
      	reader.onload = (function(theFile) {
        	return function(e) {
	          	// Render thumbnail.
	          	var span = document.createElement('span');
	          	console.log(span);
	          	span.innerHTML = ['<img class="thumb" src="', e.target.result,
	                            '" title="', escape(theFile.name), '"/>'].join('');
	          	document.getElementById('preview').insertBefore(span, null);
        	};
    	})(f);

    	// Read in the image file as a data URL.
		reader.readAsDataURL(f);
		reader.onload = function(e){
        drawToCanvas(this.result);
        }
    }
}

function drawToCanvas(imgData){
	var img = new Image;
	img.src = imgData;
	img.onload = function(){//必須onload之後再畫
	context.drawImage(img,0,0,img.width*0.3,img.height*0.3);
	strDataURI = canvas.toDataURL();//獲取canvas base64資料
    }
    saveToHistory();
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);


//text input

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

    input.type = 'text';
    input.style.position = 'fixed';
    input.style.left = x + 'px';
    input.style.top = y + 'px';
    input.style.border= "0 none";
    input.style.padding = "2px 1px";
    input.style.background = "white";
    input.style.color = "black";

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
    //console.log(strokeColorSetting);
    //console.log(context.font);
    //console.log(fontsize);
    context.fillStyle = strokeColorSetting;
    context.fillText(txt, x - 4, y - 4);
}

