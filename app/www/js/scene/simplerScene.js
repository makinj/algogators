var simplerScene = (function(){

    var initialX,initialY;
    var colors = ["#f00","#0f0","#00f","#ff0","#0ff","#f0f"];
    var margin = .1;
    var elementArray = [];

    var dragging = false;
    var currentElementId ;
    var currentElementIndex ;
    function initialize(){
        var windowSize = renderer.getScreenSize();
        initialX = windowSize.width;
        initialY = windowSize.height;
    }


    function rootDrawScene(foodChain){
        for (var i =0;i<foodChain.length;i++){
            drawElement(foodChain[i], i * (initialX/foodChain.length),0,(initialX/foodChain.length), initialY);
        }
        drawElementArray();
    }

    function drawElement(element, x, y, szx, szy){

        if (element.type == "family" || element.type == "dummyFamily"){
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

        x = x + w/2 - aw/2 ;
        y = y + h/2 - ah/2 ;

        elementArray.push({'topLeft': {'x' : x , 'y' : y }, 'bottomRight': {'x' : x+w , 'y' : y+h }, 'size': {'x': aw , 'y':ah}, 'id': id, 'color' : color,  'type':'gator'});
    }

    function fitDummy(x,y,w,h,color, id){

        var aw = w - w * margin * 2;
        var ah = h - h * margin * 2;

        x = x + w/2 - aw/2 ;
        y = y + h/2 - ah/2 ;

        elementArray.push({'topLeft': {'x' : x , 'y' : y }, 'bottomRight': {'x' : x+w , 'y' : y+h }, 'size': {'x': aw , 'y':ah}, 'id': id,  'type':'dummy'});
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

        elementArray.push({'topLeft': {'x' : x , 'y' : y }, 'bottomRight': {'x' : x+w , 'y' : y+h }, 'size': {'x': aw , 'y':ah}, 'id': id,   'color' : color,'type':'egg'});

    }

    function drawElementArray(){
        for (var i = 0 ; i < elementArray.length ; i++){
            var e = elementArray[i];

            if ( elementArray[i].type == "gator" ){
                renderer.drawAlligator (e.topLeft.x,e.topLeft.y,e.size.x,e.size.y,e.color);
            } else if ( elementArray[i].type == "egg" ){
                renderer.drawEgg (e.topLeft.x,e.topLeft.y,e.size.x,e.size.y,e.color);
            } else if ( elementArray[i].type == "dummy" ){
                renderer.drawDummy (e.topLeft.x,e.topLeft.y,e.size.x,e.size.y,e.color);
            }
        }
    }

    function uiMouseDown(x,y){
        var selectedElementId = getIdAt(x,y);
        if (selectedElementId){
            dragging = true;
            currentElementId = selectedElement;
            currentElementIndex = getObjectIndexAtId(currentElementId);

        }

    }

    function uiMouseUp(x,y){
        var selectedElementId = getIdAt(x,y);
        if (selectedElementId){
            dragging = false;
            controller.swapElements(selectedElement,currentElement);
        }

    }

    function uiMouseMove(x,y){
        var hoverElement = getIdAt(x,y);
        hoverElementIndex = getObjectIndexAtId(currentElementId);
        var e = elementArray[hoverElementIndex];

        var current = elementArray[currentElementIndex];
        current.topLeft.x = x;
        current.topLeft.y = y;
        current.bottomRight.x = x+current.size.x;
        current.bottomRight.y = y+current.size.y;
        clearCanvas();
        drawElementArray();
        renderer.drawHighlight (e.topLeft.x,e.topLeft.y,e.size.x,e.size.y,e.color);

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

    function getObjectIndexAtId(id){
        for (var i = 0 ; i < elementArray.length ; i++){
            var element = elementArray[i];
            if (element.id == id){
                return i;
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
