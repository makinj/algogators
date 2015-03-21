var webRenderer = (function(){

    var colors = ["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#9E9E9E", "#607D8B"];

    var imgs = {};

    var eApp, eCanvas;

    var context;

    var assetsLoaded = false;

    function initialize(onFinish){
        console.log("Initializing Renderer...");
        eApp = $(".app")[0];
        eCanvas = $("<canvas></canvas>")[0];
        eCanvas.width = window.innerWidth;
        eCanvas.height = window.innerHeight;
        $(eApp).append(eCanvas);
        context = eCanvas.getContext("2d");
        initCanvas();
        loadImages(function(){
            onImagesLoaded();
            onFinish();
        });
    }

    function onImagesLoaded(){
        assetsLoaded = true;
        console.log("Images loaded...");
    }

    function loadImages(onFinish){

        var totalImages = colors.length * 2;
        var loadedImages = 0;
        function markImageLoaded(){
            loadedImages ++;
            if (loadedImages == totalImages){
                onFinish();
            }
        }

        colors.forEach(function(color){
            // Load the colored egg and alligator
            var algImage = new Image();
            algImage.src = "./img/alligators/gator" + color.replace("#","") + ".svg";
            algImage.onload = markImageLoaded;
            imgs["alg" + color.replace("#","")] = algImage;

            var eggImage = new Image();
            eggImage.src = "./img/eggs/egg" + color.replace("#","") + ".svg";
            eggImage.onload = markImageLoaded;
            imgs["egg" + color.replace("#","")] = eggImage;
        });
        console.log("Loading images...");
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
        // context.fillStyle = color;
        // context.fillRect(x,y,width,height);
        context.drawImage(imgs["alg" + color.replace("#","")],
            x,y,width,height);
    }

    function drawEgg(x,y,width,height,color){
        if (!assetsLoaded) return;
        // context.fillStyle = color;
        // context.beginPath();
        // context.arc(x + width/2,y + height/2,height/2,0,Math.PI*2);
        // context.fill();
        // context.closePath();
        context.drawImage(imgs["egg" + color.replace("#","")],
            x,y,width,height);
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
        "getScreenSize": getScreenSize,
        "colors": colors
    };
})();
