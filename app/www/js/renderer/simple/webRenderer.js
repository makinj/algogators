var webRenderer = (function(){

    var eApp, eCanvas;

    var context;

    var assetsLoaded = false;

    function initialize(){
        console.log("Initializing Renderer...");
        eApp = $(".app")[0];
        eCanvas = $("<canvas></canvas>")[0];
        eCanvas.width = window.innerWidth;
        eCanvas.height = window.innerHeight;
        $(eApp).append(eCanvas);
        context = eCanvas.getContext("2d");
        initCanvas();
        loadImages(onImagesLoaded);
    }

    function onImagesLoaded(){
        assetsLoaded = true;
        console.log("Images loaded...");
    }

    function loadImages(onFinish){
        // TODO actually load images
        console.log("Loading images...");
        onFinish();
    }

    function initCanvas(){
        clearCanvas("#fff");
    }

    function clearCanvas(color){
        context.fillStyle = color;
        context.fillRect(0,0,eCanvas.width, eCanvas.height);
    }

    function drawAlligator(x, y, width, height, color){
        if (!assetsLoaded) return;
        context.fillStyle = color;
        context.fillRect(x,y,width,height);
        console.log("Drawing alligator ",x,y,width,height,color);
    }

    function drawEgg(x,y,width,height,color){
        if (!assetsLoaded) return;
        context.fillStyle = color;
        context.beginPath();
        context.arc(x + width/2,y + height/2,height/2,0,Math.PI*2);
        context.fill();
        context.closePath();
        // context.fillRect(x,y,width,height);
        console.log("Drawing Egg ",x,y,width,height,color);
    }

    function getAlligatorSize(){
        return {
            width:2,
            height:1
        };
    }
    function getEggSize(){
        return {
            width:1,
            height:1
        };
    }
    function getScreenSize(){
        return {
            width: window.innerWidth,
            height:window.innerHeight
        };
    }

    return {
        "initialize": initialize,
        "clear": clearCanvas,
        "drawEgg": drawEgg,
        "drawAlligator": drawAlligator,
        "getAlligatorSize": getAlligatorSize,
        "getEggSize": getEggSize,
        "getScreenSize": getScreenSize
    };
})();
