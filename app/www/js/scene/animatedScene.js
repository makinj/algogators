var animatedScene = (function(){

    var initialX,initialY;
    var colors;
    var margin = .1;
    var elementArray = [];

    var dragging = false;
    var currentElementId ;
    var currentElementIndex ;
    var currentElement ;
    var interactive = true;
    var topLeft ;
    function initialize(height, width, tL, draggable){
        colors = renderer.colors;
        initialX = width;
        initialY = height;
        topLeft = tL;
        interactive = draggable;
        margin = .1;
        elementArray = [];
        dragging = false;
    }

    function reset(){
        elementArray = [];
        dragging = false;
    }


    function rootDrawScene(foodChain){
        elementArray = [];
        for (var i =0;i<foodChain.length;i++){
            addElement(foodChain[i], i * (initialX/foodChain.length),0,(initialX/foodChain.length), initialY);
        }
    }

    function addElement(element, x, y, szx, szy){

        if (element.type == "family" || element.type == "dummyFamily"){
            var totalElements = 0;
            if (element.gators && element.gators.length > 0){
                totalElements = element.gators.length + 1;
            }
            else{
                totalElements = 2;
            }

            // Box size for gators
            var bxx = szx;
            var bxy = szy / totalElements;

            for (var i = 0;i < element.gators.length;i++){
                addElement(element.gators[i], x, y + bxy * i, bxx, bxy);
            }

            // Box size for foodChain
            bxx = szx / element.foodChain.length;

            for (var i = 0;i < element.foodChain.length;i++){
                addElement(element.foodChain[i], x + bxx * i, y + bxy * (totalElements - 1), bxx, bxy);
            }

        } else if ( element.type == "gator" ){
            addAlligator(x,y,szx,szy,colors[element.colorId],element.id);
        } else if ( element.type == "egg" ){
            addEgg(x,y,szx,szy,colors[element.colorId],element.id);
        }else if ( element.type == "dummy" ){
            addDummy(x,y,szx,szy,colors[element.colorId],element.id);
        }

    }

    function addAlligator(x,y,w,h,color, id){
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

        elementArray.push({
                'topLeft': {'x' : x , 'y' : y },
                'bottomRight': {'x' : x+aw , 'y' : y+ah },
                'size': {'x': aw , 'y':ah},
                'id': id, 'color' : color,
                'type':'gator'
                });
    }

    function addDummy(x,y,w,h,color, id){

        var aw = w - w * margin * 2;
        var ah = h - h * margin * 2;

        x = x + w/2 - aw/2 ;
        y = y + h/2 - ah/2 ;

        elementArray.push({
            'topLeft': {'x' : x , 'y' : y },
            'bottomRight': {'x' : x+aw , 'y' : y+ah },
            'size': {'x': aw , 'y':ah},
            'id': id,
            'type':'dummy'
            });
    }

    function addEgg(x,y,w,h,color,id){

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

        elementArray.push({
            'topLeft': {'x' : x , 'y' : y },
            'bottomRight': {'x' : x+aw , 'y' : y+ah },
            'size': {'x': aw , 'y':ah},
            'id': id,
            'color' : color,
            'type':'egg'
            });

    }

    function drawElementArray(){
        for (var i = 0 ; i < elementArray.length ; i++){
            if (!(dragging && elementArray[i].id == currentElementId)){
                drawSingleElement(elementArray[i]);
            }
        }
    }

    function drawSingleElement(e){
        if (!e){
            return;
        }
        if ( e.type == "gator" ){
            renderer.drawAlligator(e.topLeft.x+topLeft.x,e.topLeft.y+topLeft.y,e.size.x,e.size.y,e.color);
        } else if ( e.type == "egg" ){
            renderer.drawEgg(e.topLeft.x+topLeft.x,e.topLeft.y+topLeft.y,e.size.x,e.size.y,e.color);
        } else if ( e.type == "dummy" ){
            renderer.drawDummy(e.topLeft.x+topLeft.x,e.topLeft.y+topLeft.y,e.size.x,e.size.y,e.color);
        }
    }

    var currentElementOffset;

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
            if (elementArray[i].id == id){
                return i;
            }
        }
        return null;
    }

    function calcEat(gatorId, familyTopId){
        var Gator = elementArray[getObjectIndexAtId(gatorId)];
        var Family = elementArray[getObjectIndexAtId(familyTopId)]
        // console.log(elementArray);
        // console.log(gatorId,Gator);
        // console.log(getObjectIndexAtId(familyTopId),familyTopId,Family);
        return {
            'x':Gator.bottomRight.x - Family.topLeft.x,
            'y':Gator.topLeft.y - Family.topLeft.y,
            'pos':{
                'x':Gator.topLeft.x,
                'y':Gator.topLeft.y,
            }
        }
    }

    function calcMove(gatorId, familyTopId){
        var Gator = elementArray[getObjectIndexAtId(gatorId)];
        var Family = elementArray[getObjectIndexAtId(familyTopId)]

        return{
            'x':Gator.bottomRight.x - Family.topLeft.x,
            'y':Gator.topLeft.y - Family.topLeft.y
            }
    }

    function moveObject(id, x, y){
        var objId = getObjectIndexAtId(id);
        // console.log(id, getObjectIndexAtId(id),elementArray[objId]);
        elementArray[objId].topLeft.x = x;
        elementArray[objId].topLeft.y = y;
        elementArray[objId].bottomRight.x = x+elementArray[objId].size.x;
        elementArray[objId].bottomRight.y = y+elementArray[objId].size.y;
        // console.log(elementArray[objId]);
    }

    function render(){
        if (elementArray.length > 0){

            renderer.drawColorPanel(topLeft.x, topLeft.y,initialX,initialY, '#f00');
            renderer.drawSelectionPanel(topLeft.x, topLeft.y,initialX,initialY);
            drawElementArray();
        }

    }

    return {
        "initialize": initialize,
        "loadScene": rootDrawScene,
        "getIdAt": getIdAt,
        "calcMove":calcMove,
        "calcEat":calcEat,
        "moveObject":moveObject,
        "render":render,
        "reset":reset
    };
})();
