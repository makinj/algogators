var simplerScene = (function(){

    var initialX,initialY;
    var colors = ["#f00","#0f0","#00f","#ff0","#0ff","#f0f"];
    var margin = .1;

    function initialize(){
        var windowSize = renderer.getScreenSize();
        initialX = windowSize.width;
        initialY = windowSize.height;
    }


    function rootDrawScene(foodChain){
        for (var i =0;i<foodChain.length;i++){
            drawElement(foodChain[i], i * initialX,0,initialX, initialY);
        }
    }

    function drawElement(element, x, y, szx, szy){

        if (element.type == "family"){
            var totalElements = element.gators.length + 1;

            // Box size for gators
            var bxx = szx;
            var bxy = szy / totalElements;

            for (var i = 0;i < element.gators.length;i++){
                drawElement(element.gators[i], x, y + bxy * i, bxx, bxy);
            }

            // Box size for foodChain
            bxx = szx / element.foodChain.length;

            for (var i = 0;i < element.foodChain.length;i++){
                drawElement(element.foodChain[i], x + bxx * i, y + bxy * (totalElements - 1), bxx, bxy);
            }

        } else if ( element.type == "gator" ){
            fitAlligator(x,y,szx,szy,colors[element.colorId]);
        } else if ( element.type == "egg" ){
            fitEgg(x,y,szx,szy,colors[element.colorId]);
        }

    }

    function fitAlligator(x,y,w,h,color){
        var aw = w - w * margin * 2;
        var ah = h - h * margin * 2;

        var algSize = renderer.getAlligatorSize();
        var ih = aw * algSize.height / algSize.width;

        if (ih <= ah){
            ah = ih;
        }else{
            aw = ah * algSize.width / algSize.height;
        }

        x = x + w/2 - aw/2
        y = y + h/2 - ah/2

        renderer.drawAlligator(
            x, y,
            aw, ah,
            color);
    }

    function fitEgg(x,y,w,h,color){

        var aw = w - w * margin * 2;
        var ah = h - h * margin * 2;

        var eggSize = renderer.getEggSize();
        var ih = aw * eggSize.height / eggSize.width;

        if (ih <= ah){
            ah = ih;
        }else{
            aw = ah * eggSize.width / eggSize.height;
        }

        x = x + w/2 - aw/2
        y = y + h/2 - ah/2

        renderer.drawEgg(x,y,aw,ah,color);
    }


    return {
        "initialize": initialize,
        "drawScene": rootDrawScene
    };
})();
