var normalWebRenderer = (function(){

    var colors = ["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#9E9E9E", "#607D8B"];

    var imgNames = ["banner", "next", "back"];

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

        var totalImages = colors.length * 2 + 2 + imgNames.length;
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

        var checkImage = new Image();
        checkImage.src = "./img/check.png";
        checkImage.onload = markImageLoaded;
        imgs["check"] = checkImage;

        var bgImage = new Image();
        bgImage.src = "./img/bg.png";
        bgImage.onload = function(){
                if (!bgSize) bgSize = {width: bgImage.width, height: bgImage.height};
                markImageLoaded();
        };
        imgs["bg"] = bgImage;

        var bannerImage = new Image();
        bannerImage.src = "./img/banner.svg";
        bannerImage.onload = function(){
                markImageLoaded();
        };
        imgs['banner'] = bannerImage;

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

        imgNames.forEach(function(imgName){
            var img = new Image();
            img.src = "./img/" + imgName + ".png";
            img.onload = markImageLoaded;
            imgs[imgName] = img;
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
        if (color){
            context.drawImage(imgs["alg" + color.replace("#","")],
                x,y,width,height);
        }
        else{
            context.drawImage(imgs["alg"+ "03A9F4"],
                x,y,width,height);
        }

    }

    function drawEgg(x,y,width,height,color){
        if (!assetsLoaded) return;

        if (color){
            context.drawImage(imgs["egg" + color.replace("#","")],
                x,y,width,height);
        }
        else{
            context.drawImage(imgs["egg"+ "03A9F4"],
                x,y,width,height);
        }
    }

    function drawDummy(x,y,width,height,color){
        //Add a placeholder function for browsers that don't have setLineDash()
        if (!context.setLineDash) {
            context.setLineDash = function () {}
        }
        if (!assetsLoaded) return;
        // Draw the square
        context.beginPath();
        context.lineWidth = 1.25;
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
        var trashRatio = getTrashSize().width / getTrashSize().height;
        context.globalAlpha = .4;
        context.drawImage(imgs["trash"],
            (x + width/2) - height * trashRatio/2,y,height * trashRatio,height);
        context.globalAlpha = 1;
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
        context.fillRect(x - 40,y,40,40);
        context.fillStyle = "#999";
        context.fillRect(x-23, y+10, 6, 25);
        context.fillRect(x-35, y+5, 30, 6);
    }
    function drawRightArrow(x,y,rw,rh,good){
        var w,h;
        if (rw > rh){
            w = rh;
            h = rh;
            x += (rw-w)/2;
        }else if (rh > rw){
            h = rw;
            w = rw;
            y += (rh-h)/2;
        }

        context.fillStyle = good ? "#cfc" : "#fcc";
        context.beginPath();
        context.moveTo(x,y+h*.2);
        context.lineTo(x+w-w*.5,y+h*.2);
        context.lineTo(x+w-w*.5,y);
        context.lineTo(x+w,y + h/2);
        context.lineTo(x+w-w*.5,y+h);
        context.lineTo(x+w-w*.5,y+h-h*.2);
        context.lineTo(x,y+h-h*.2);
        context.fill();
        context.closePath();
    }
    function drawPlus(x,y,w,h){
        context.fillStyle = "#ddd";
        context.fillRect(x, y + h/3, w, h/3);
        context.fillRect(x + w/3,y, w/3,h);
    }
    function drawCheck(x,y,w,h){
        if (!assetsLoaded) return;
        context.globalAlpha = .4;
        context.drawImage(imgs["check"],
            x,y,w,h);
        context.globalAlpha = 1;
    }

    function drawBanner(x,y,width,height){
        if (!assetsLoaded) return;
        var ul_x = x - (width/2); // x, upper left corner
        var ul_y = y - (height/2); // y, upper left corner
        context.drawImage(imgs["egg009688"],ul_x,ul_y,width,height);
    }

	function drawBanner(x,y,width,height){
        while (!assetsLoaded);
        var ul_x = x - (width/2); // x, upper left corner
        var ul_y = y - (height/2); // y, upper left corner
        context.drawImage(imgs["banner"],ul_x,ul_y,width,height);
	}

	function drawBgImg(){
            screenSize = getScreenSize();
   			context.drawImage(imgs["bg"],0,0,screenSize.width, screenSize.height);
	}

    //x and y are center of button
    function drawButton(x,y,width,height,text){
        var ul_x = x - (width/2); // x, upper left corner
        var ul_y = y - (height/2); // y, upper left corner
        context.beginPath();
        context.rect(ul_x, ul_y, width, height);
        context.fillStyle = 'green'
        context.fill();
        context.closePath();
        context.lineWidth = 7;
        context.strokeStyle = 'black';
        context.stroke();
        context.font = "30px Patrick Hand";
        context.fillStyle = 'yellow'
        context.textAlign = 'center';
        context.fillText(text, x, y+10)
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
    function getTrashSize(){
        return {
            width: imgs["trash"].width,
            height: imgs["trash"].height
        };
    }

    function drawImgButton(imgName,x,y,width,height){
        while (!assetsLoaded);
        var ul_x = x - (width/2); // x, upper left corner
        var ul_y = y - (height/2); // y, upper left corner
        context.drawImage(imgs[imgName],ul_x,ul_y,width,height);
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
        "drawCheck": drawCheck,
        "drawTrash": drawTrash,
        "drawRightArrow": drawRightArrow,
        "getAlligatorSize": getAlligatorSize,
        "getEggSize": getEggSize,
        "getScreenSize": getScreenSize,
        "colors": colors,
        "drawBanner": drawBanner,
        "drawBgImg": drawBgImg,
        "drawButton": drawButton,
        "drawImgButton": drawImgButton
    };
})();
