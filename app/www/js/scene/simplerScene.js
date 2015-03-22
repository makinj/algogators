var simplerScene = (function(){

    // Expression window height
    var expWindowX,expWindowY;
    var expWindowWidth,expWindowHeight;
    var ioPanel;
    var colorPanelWidth, colorPanelHeight;
    var colorPanelX, colorPanelY;
    var selectionPanelWidth, selectionPanelHeight;
    var selectionPanelX, selectionPanelY;
    var colors;
    var margin = .1;
    var elementArray = [];
    var colorElements = [];

    var dragging = false;
    var currentElementId ;
    var currentElementIndex ;
    var currentElement ;

    function initialize(){
        var windowSize = renderer.getScreenSize();
        colors = renderer.colors;
        expWindowY = 0;
        expWindowX = windowSize.width/2;
        expWindowWidth = windowSize.width/2;
        expWindowHeight = windowSize.height * 5/8;
        colorPanelWidth = windowSize.width;
        colorPanelHeight = windowSize.height * 3/8 * 1/4;
        colorPanelX = 0;
        colorPanelY = expWindowHeight;
        selectionPanelWidth = windowSize.width;
        selectionPanelX = 0;
        selectionPanelY = expWindowHeight + colorPanelHeight;
        selectionPanelHeight = windowSize.height - selectionPanelY;
        ioPanel = {
            width: windowSize.width/2,
            height: expWindowHeight,
            x: 0,
            y:0
        };
    }

    function loadUIElements(foodChain){
        colorElements = [];
        var highestColor = controller.getHighestColor(foodChain);
        var boxSize = Math.min(colorPanelWidth / highestColor, colorPanelHeight);
        for (var i = 0;i<highestColor;i++){
            var colorElement = {
                color: colors[i],
                position:{
                    x: colorPanelWidth/2 - boxSize * highestColor /2 + boxSize/2 + boxSize *i,
                    y: colorPanelY,
                },
                width: boxSize,
                height:boxSize
            };
            colorElements.push(colorElement);
        }
    }

    function loadFoodChain(foodChain, testFoodChains){
        elementArray = [];
        for (var i =0;i<foodChain.length;i++){
            addElement(foodChain[i], expWindowX + i * (expWindowWidth/foodChain.length),expWindowY,(expWindowWidth/foodChain.length), expWindowHeight);
        }
        for (var u = 0;u < testFoodChains.length;u++){
            var input = testFoodChains[u].input;
            var output = testFoodChains[u].output;
            for (var i =0;i<input.length;i++){
                addElement(input[i],
                    ioPanel.x + i * (ioPanel.width/input.length/3),ioPanel.y + (ioPanel.height / testFoodChains.length) * u,
                    (ioPanel.width/input.length/3), ioPanel.height / testFoodChains.length, false);
            }
            for (var i =0;i<output.length;i++){
                addElement(output[i],
                    ioPanel.x + ioPanel.width/3*2 + i * (ioPanel.width/output.length/2),ioPanel.y+ (ioPanel.height / testFoodChains.length) * u,
                    (ioPanel.width/output.length/3), ioPanel.height / testFoodChains.length, false);
            }
        }
        loadUIElements(foodChain);
        render(foodChain);
    }

    function render(foodChain){
        renderer.clear("#fff");
        renderer.drawIOPanel(ioPanel.x,ioPanel.y,ioPanel.width,ioPanel.height);
        renderer.drawColorPanel(colorPanelX,colorPanelY,colorPanelWidth,colorPanelHeight);
        renderer.drawSelectionPanel(selectionPanelX,selectionPanelY,selectionPanelWidth,selectionPanelHeight);
        drawElementArray();
        colorElements.forEach(function(colorElement){
            renderer.drawColorBox(
                colorElement.position.x, colorElement.position.y,
                colorElement.width, colorElement.height,
                colorElement.color
            );
        });
    }

    function addElement(element, x, y, szx, szy, draggable){
        draggable = !(draggable===false);
        if (element.type == "family" || element.type == "dummyFamily"){
            var totalElements = element.gators.length + 1;

            // Box size for gators
            var bxx = szx;
            var bxy = szy / totalElements;

            if (bxy > bxx * .75){
                bxy = bxx * .75;
            }

            for (var i = 0;i < element.gators.length;i++){
                addElement(element.gators[i], x, y + bxy * i, bxx, bxy, draggable);
            }

            // Box size for foodChain
            bxx = szx / element.foodChain.length;

            for (var i = 0;i < element.foodChain.length;i++){
                addElement(element.foodChain[i], x + bxx * i, y + bxy * (totalElements - 1), bxx, bxy, draggable);
            }

        } else if ( element.type == "gator" ){
            addAlligator(x,y,szx,szy,colors[element.colorId],element.id, draggable);
        } else if ( element.type == "egg" ){
            addEgg(x,y,szx,szy,colors[element.colorId],element.id, draggable);
        }else if ( element.type == "dummy" ){
            addDummy(x,y,szx,szy,colors[element.colorId],element.id, draggable);
        }

    }

    function addAlligator(x,y,w,h,color, id, draggable){
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

        elementArray.push({'topLeft': {'x' : x , 'y' : y }, 'bottomRight': {'x' : x+w , 'y' : y+h }, 'size': {'x': aw , 'y':ah}, 'id': id, 'color' : color,  'type':'gator', draggable: draggable});
    }

    function addDummy(x,y,w,h,color, id, draggable){

        var aw = w - w * margin * 2;
        var ah = h - h * margin * 2;

        x = x + w/2 - aw/2 ;
        y = y + h/2 - ah/2 ;

        elementArray.push({'topLeft': {'x' : x , 'y' : y }, 'bottomRight': {'x' : x+w , 'y' : y+h }, 'size': {'x': aw , 'y':ah}, 'id': id,  'type':'dummy', draggable: draggable});
    }

    function addEgg(x,y,w,h,color,id, draggable){

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

        elementArray.push({'topLeft': {'x' : x , 'y' : y }, 'bottomRight': {'x' : x+w , 'y' : y+h }, 'size': {'x': aw , 'y':ah}, 'id': id,   'color' : color,'type':'egg', draggable: draggable});

    }

    function drawElementArray(){
        for (var i = 0 ; i < elementArray.length ; i++){
            if (!(dragging && elementArray[i].draggable && elementArray[i].id == currentElementId)){
                drawSingleElement(elementArray[i]);
            }
        }
    }

    function drawSingleElement(e){
        if (!e){
            return;
        }
        if ( e.type == "gator" ){
            renderer.drawAlligator(e.topLeft.x,e.topLeft.y,e.size.x,e.size.y,e.color);
        } else if ( e.type == "egg" ){
            renderer.drawEgg(e.topLeft.x,e.topLeft.y,e.size.x,e.size.y,e.color);
        } else if ( e.type == "dummy" ){
            renderer.drawDummy(e.topLeft.x,e.topLeft.y,e.size.x,e.size.y,e.color);
        }
    }

    var currentElementOffset;
    function uiMouseDown(x,y){
        var selectedElementId = getIdAt(x,y);
        if (selectedElementId && elementArray[getObjectIndexAtId(selectedElementId)].draggable){
            dragging = true;
            currentElementId = selectedElementId;
            currentElementIndex = getObjectIndexAtId(currentElementId);
            currentElement = JSON.parse(JSON.stringify(elementArray[currentElementIndex]));
            currentElementOffset = {
                x: x - currentElement.topLeft.x,
                y: y - currentElement.topLeft.y
            };

        }

    }

    function uiMouseUp(x,y){
        var selectedElementId = getIdAt(x,y);
        if (selectedElementId && elementArray[getObjectIndexAtId(selectedElementId)].draggable){
            dragging = false;
            controller.swapElements(selectedElementId,currentElementId);
        }
        else{
            dragging = false;
        }
        render();
    }

    function uiMouseMove(x,y){
        if (dragging){
            var hoverElement = getIdAt(x,y);

            hoverElementIndex = getObjectIndexAtId(hoverElement);
            var e = elementArray[hoverElementIndex];

            currentElement.topLeft.x = x - currentElementOffset.x;
            currentElement.topLeft.y = y - currentElementOffset.y;
            currentElement.bottomRight.x = x+currentElement.size.x - currentElementOffset.x;
            currentElement.bottomRight.y = y+currentElement.size.y - currentElementOffset.y;
            render();
            drawSingleElement(currentElement);
            if (e){
                renderer.drawHighlight(e.topLeft.x,e.topLeft.y,e.size.x,e.size.y,e.color);
            }
        }

    }


    function getIdAt(x,y){
        for (var i = 0 ; i < elementArray.length ; i++){
            var element = elementArray[i];
            if (element.draggable && x >= element.topLeft.x && x <= element.bottomRight.x){
                if (y >= element.topLeft.y && y <= element.bottomRight.y){
                    return element.id;
                }
            }
        }
        return null;
    }

    function getObjectIndexAtId(id){
        for (var i = 0 ; i < elementArray.length ; i++){
            if (elementArray[i].draggable &&  elementArray[i].id == id){
                return i;
            }
        }
        return null;
    }

    return {
        "initialize": initialize,
        "loadScene": loadFoodChain,
        "getIdAt": getIdAt,
        "uiMouseDown": uiMouseDown,
        "uiMouseUp": uiMouseUp,
        "uiMouseMove": uiMouseMove
    };
})();
