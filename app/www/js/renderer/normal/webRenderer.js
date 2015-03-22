var webRenderer = (function(){

    var colors = ["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#9E9E9E", "#607D8B"];

    var imgs = {};

    var eApp, eCanvas;

    var algSize, eggSize;

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

        var totalImages = colors.length * 2 + 1;
        var loadedImages = 0;
        function markImageLoaded(){
            loadedImages ++;
            if (loadedImages == totalImages){
                onFinish();
            }
        }

        var trashImage = new Image();
        trashImage.src = "./img/trash.png";
        trashImage.onload = markImageLoaded;
        imgs["trash"] = trashImage;

        colors.forEach(function(color){
            // Load the colored egg and alligator
            var algImage = new Image();
            algImage.src = "./img/alligators/gator" + color.replace("#","") + ".svg";
            algImage.onload = function(){
                if (!algSize) algSize = {width: algImage.width, height: algImage.height};
                markImageLoaded();
            };
            imgs["alg" + color.replace("#","")] = algImage;

            var eggImage = new Image();
            eggImage.src = "./img/eggs/egg" + color.replace("#","") + ".svg";
            eggImage.onload = function(){
                if (!eggSize) eggSize = {width: eggImage.width, height: eggImage.height};
                markImageLoaded();
            };
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
        context.drawImage(imgs["alg" + color.replace("#","")],
            x,y,width,height);
    }

    function drawEgg(x,y,width,height,color){
        if (!assetsLoaded) return;
        context.drawImage(imgs["egg" + color.replace("#","")],
            x,y,width,height);
    }

    function drawDummy(x,y,width,height,color){
        //Add a placeholder function for browsers that don't have setLineDash()
        if (!context.setLineDash) {
            context.setLineDash = function () {}
        }
        if (!assetsLoaded) return;
        // Draw the square
        context.beginPath();
        context.setLineDash([5,2]);
        context.rect(x,y,width,height);
        context.stroke();
        if (color){
            context.fillStyle = color;
            context.fill();
        }
        context.closePath();
    }

    function drawTrash(x,y,width,height){
        if (!assetsLoaded) return;
        context.drawImage(imgs["trash"],
            x,y,width,height);
    }

    function drawHighlight(x,y,width,height,color){
        //Add a placeholder function for browsers that don't have setLineDash()
        if (!context.setLineDash) {
            context.setLineDash = function () {}
        }
        if (!assetsLoaded) return;
        // Draw the square
        context.beginPath();
        context.setLineDash([1,0]);
        context.rect(x,y,width,height);
        context.stroke();
        context.closePath();
    }

    function drawColorPanel(x,y,width,height){
        context.fillStyle = "#aaa";
        context.fillRect(x,y,width,height);
    }

    function drawColorBox(x,y,width,height, color){
        context.fillStyle = color;
        context.fillRect(x,y,width,height);
    }

    function drawSelectionPanel(x,y,width,height){
        context.fillStyle = "#ddd";
        context.fillRect(x,y,width,height);
    }

    function drawIOPanel(x,y,w,h){
        context.fillStyle = "#eee";
        context.fillRect(x,y,w,h);
    }
    function drawPlus(x,y,w,h){
        context.fillStyle = "#ddd";
        context.fillRect(x, y + h/3, w, h/3);
        context.fillRect(x + w/3,y, w/3,h);
    }


    function getAlligatorSize(){
        return algSize;
    }
    function getEggSize(){
        return eggSize;
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
        "drawDummy": drawDummy,
        "drawHighlight": drawHighlight,
        "drawColorBox": drawColorBox,
        "drawColorPanel": drawColorPanel,
        "drawIOPanel": drawIOPanel,
        "drawSelectionPanel": drawSelectionPanel,
        "drawPlus": drawPlus,
        "getAlligatorSize": getAlligatorSize,
        "getEggSize": getEggSize,
        "getScreenSize": getScreenSize,
        "colors": colors
    };
})();
