var simplerScene = (function(){

    var initialX,initialY;
    var colors = ["#f00","#0f0","#00f","#ff0","#0ff","#f0f"];
    var margin = .1;
    var elementArray = [];
    function initialize(){
        var windowSize = renderer.getScreenSize();
        initialX = windowSize.width;
        initialY = windowSize.height;
    }


    function rootDrawScene(foodChain){
        for (var i =0;i<foodChain.length;i++){
            drawElement(foodChain[i], i * (initialX/foodChain.length),0,(initialX/foodChain.length), initialY);
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
            fitAlligator(x,y,szx,szy,colors[element.colorId],element.id);
        } else if ( element.type == "egg" ){
            fitEgg(x,y,szx,szy,colors[element.colorId],element.id);
        }else if ( element.type == "dummy" ){
            fitDummy(x,y,szx,szy,colors[element.colorId],element.id);
        }

    }

    function fitAlligator(x,y,w,h,color, id){
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
        elementArray.push({'topLeft': {'x' : x , 'y' : y }, 'bottomRight': {'x' : x+w , 'y' : y+h }, 'id': id});
    }

    function fitDummy(x,y,w,h,color, id){

        renderer.drawDummy(
            x, y,
            w, h
            );
        elementArray.push({'topLeft': {'x' : x , 'y' : y }, 'bottomRight': {'x' : x+w , 'y' : y+h }, 'id': id});
    }

    function fitEgg(x,y,w,h,color,id){

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
        elementArray.push({'topLeft': {'x' : x , 'y' : y }, 'bottomRight': {'x' : x+w , 'y' : y+h }, 'id': id});

    }

    function getIdAt(x,y){
        for (var i = 0 ; i < elementArray.length ; i++){
            var element = elementArray[i];
            if (x >= element.topLeft.x && x <= element.bottomRight.x){
                if (y >= element.topLeft.y && y <= element.bottomRight.y){
                    return element.id;
                }
            }
        }
        return null;
    }

    return {
        "initialize": initialize,
        "drawScene": rootDrawScene,
        "getIdAt": getIdAt
    };
})();
