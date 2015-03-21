var normalWebRenderer = (function(){

    var colors = ["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#9E9E9E", "#607D8B"];

    var imgs = {};

    var eApp, eCanvas;

    var algSize, eggSize, bgSize;

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

				var bgImage = new Image();
				bgImage.src = "./img/bg.png";
				bgImage.onload = function(){
						if (!bgSize) bgSize = {width: bgImage.width, height: bgImage.height};
						markImageLoaded();
				};
                imgs['bgImage.png'] = bgImage
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

	function drawBanner(width,height){
        if (!assetsLoaded) return;
        var ul_x = x - (width/2); // x, upper left corner
        var ul_y = y - (height/2); // y, upper left corner
        context.drawImage(imgs["logo"],ul_x,ul_y,width,height);
	}

	function drawBgImg(){
            screenSize = getScreenSize();
   			context.drawImage(imgs["bgImage.png"],0,0,screenSize.width, screenSize.height);
	}

    //x and y are center of button
    function drawButton(x,y,width,height,text){
        var ul_x = x - (width/2); // x, upper left corner
        var ul_y = y - (height/2); // y, upper left corner
        context.rect(ul_x, ul_y, width, height);
        context.fillStyle = 'green'
        context.fill();
        context.lineWidth = 7;
        context.strokeStyle = 'black';
        context.stroke();
        context.font = "30px Font";
        context.fillStyle = 'yellow'
        context.textAlign = 'center';
				context.fillText(text, x, y);
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
        "getAlligatorSize": getAlligatorSize,
        "getEggSize": getEggSize,
        "getScreenSize": getScreenSize,
        "colors": colors,
				"drawBanner": drawBanner,
				"drawBgImg": drawBgImg,
				"drawButton": drawButton
    };
})();
