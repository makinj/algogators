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
    var currentColor;
    var plusElement;
    var hoverElement;

    var dragging = false;
    var currentElementId ;
    var currentElementIndex ;
    var currentElement;

    var renderNextFrame;

    function initialize(){
        var windowSize = renderer.getScreenSize();
        colors = renderer.colors;
        expWindowY = 0;
        expWindowX = 0;
        expWindowWidth = windowSize.width - 50;
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
            x: windowSize.width/2,
            y:0,
            closedX: windowSize.width,
            openX: windowSize.width/2,
            open:true
        };
        plusElement = {
            x:windowSize.width - 40,
            y:windowSize.height/2 - 100,
            width:30,
            height:30
        };
        currentColor = 0;
        setInterval(function(){
            animateIOPanel();
            if (renderNextFrame){
                render();
                renderNextFrame = false;
            }
        },1000/30);
    }

    function loadUIElements(foodChain){
        colorElements = [];
        var highestColor = controller.getHighestColor(foodChain);
        var boxSize = Math.min(colorPanelWidth / highestColor, colorPanelHeight);
        for (var i = 0;i<highestColor;i++){
            var colorElement = {
                color: i,
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
                    ioPanel.openX + i * (ioPanel.width/input.length/3),ioPanel.y + (ioPanel.height / testFoodChains.length) * u,
                    (ioPanel.width/input.length/3), ioPanel.height / testFoodChains.length, false);
            }
            for (var i =0;i<output.length;i++){
                addElement(output[i],
                    ioPanel.openX + ioPanel.width/3*2 + i * (ioPanel.width/output.length/2),ioPanel.y+ (ioPanel.height / testFoodChains.length) * u,
                    (ioPanel.width/output.length/3), ioPanel.height / testFoodChains.length, false);
            }
            addElement({
                "type": "rightArrow",
                "id": Math.floor(Math.random() * 9999999)
            }, ioPanel.openX + ioPanel.width/3, ioPanel.y + (ioPanel.height / testFoodChains.length) * u,
               ioPanel.width/3, ioPanel.height/testFoodChains.length, false);
        }
        loadUIElements(foodChain);
        addDraggys();
        render(foodChain);
    }

    function render(){
        renderer.clear("#fff");
        renderer.drawColorPanel(colorPanelX,colorPanelY,colorPanelWidth,colorPanelHeight);
        renderer.drawSelectionPanel(selectionPanelX,selectionPanelY,selectionPanelWidth,selectionPanelHeight);
        renderer.drawPlus(plusElement.x,plusElement.y,plusElement.width,plusElement.height);
        drawElementArray();
        colorElements.forEach(function(colorElement){
            renderer.drawColorBox(
                colorElement.position.x, colorElement.position.y,
                colorElement.width, colorElement.height,
                colors[colorElement.color]
            );
        });
        renderer.drawIOPanel(ioPanel.x,ioPanel.y,ioPanel.width,ioPanel.height);
        drawIOPanelElements();

        if (dragging){
            hoverElementIndex = getObjectIndexAtId(hoverElement);
            var e = elementArray[hoverElementIndex];
            drawSingleElement(currentElement);
            if (e){
                renderer.drawHighlight(e.topLeft.x,e.topLeft.y,e.size.x,e.size.y,e.color);
            }

        }
    }

    function drawIOPanelElements(){
        for (var i = 0 ; i < elementArray.length ; i++){
            if (!elementArray[i].draggable){
                //TODO remove, this is really bad
                drawSingleElement(elementArray[i],ioPanel.x - ioPanel.openX, ioPanel.y - ioPanel.openY);
            }
        }
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


        // UI Elements (TODO remove these)
        if (element.type == "trash"){
            elementArray.push({
                topLeft:{
                    x: x,
                    y: y
                },
                bottomRight:{
                    x: x + szx,
                    y: y + szy
                },
                size:{
                    x:szx,
                    y:szy
                },
                id: element.id,
                type: element.type,
                draggable: true
            });
        }else if (element.type == "rightArrow"){
            elementArray.push({
                topLeft:{
                    x: x,
                    y: y
                },
                bottomRight:{
                    x: x + szx,
                    y: y + szy
                },
                size:{
                    x:szx,
                    y:szy
                },
                id: element.id,
                type: element.type,
                draggable: draggable
            });
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
            if (!(dragging && elementArray[i].draggable && elementArray[i].id == currentElementId) && elementArray[i].draggable){
                drawSingleElement(elementArray[i]);
            }
        }
    }

    //TODO remove the offset, that's just a hacky solution to the ioPanel offset problem
    function drawSingleElement(e,offx,offy){
        offx = offx || 0;
        offy = offy || 0;
        if (!e){
            return;
        }
        if ( e.type == "gator" ){
            renderer.drawAlligator(e.topLeft.x+offx,e.topLeft.y+offy,e.size.x,e.size.y,e.color);
        } else if ( e.type == "egg" ){
            renderer.drawEgg(e.topLeft.x+offx,e.topLeft.y+offy,e.size.x,e.size.y,e.color);
        } else if ( e.type == "dummy" ){
            renderer.drawDummy(e.topLeft.x+offx,e.topLeft.y+offy,e.size.x,e.size.y,e.color);
        } else if ( e.type == "trash"){
            renderer.drawTrash(e.topLeft.x+offx,e.topLeft.y+offy,e.size.x,e.size.y);
        } else if ( e.type == "rightArrow" ){
            renderer.drawRightArrow(e.topLeft.x+offx,e.topLeft.y+offy,e.size.x,e.size.y);
        }
    }

    function animateIOPanel(){
        if (ioPanel.open){
            ioPanel.x -= (ioPanel.x - ioPanel.openX)/4;
        }else{
            ioPanel.x -= (ioPanel.x - ioPanel.closedX)/4;
        }
        // TODO this is called every frame which is bad
        renderNextFrame = true;
    }

    function closeIOPanel(){
        if (!ioPanel.open) return;
        ioPanel.open = false;
    }

    function openIOPanel(){
        if (ioPanel.open) return;
        ioPanel.open = true;
    }

    var currentElementOffset;
    function uiMouseDown(x,y){

        if (ioPanel.open && x > ioPanel.x){
            return;
        }else if (!ioPanel.open && x > ioPanel.x - 40&&
                  y < ioPanel.y + 40){
            openIOPanel();
        }else{
            closeIOPanel();
        }

        if (x > plusElement.x && x < plusElement.x + plusElement.width &&
            y > plusElement.y && y < plusElement.y + plusElement.height){
                controller.newFamily({
                    "type":"family",
                    "id": Math.floor(Math.random() * 9999999),
                    "gators":[{
                        "id": Math.floor(Math.random() * 9999999),
                        "type":"dummy"
                    }],
                    "foodChain":[{
                        "id": Math.floor(Math.random() * 9999999),
                        "type":"dummy"
                    }]
                });
                return;
        }

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

        colorElements.forEach(function(element){
            if (x > element.position.x && x < element.position.x + element.width &&
                y > element.position.y && y < element.position.y + element.height){
                    changeDraggyColor(element.color);
            }
        });

    }

    function changeDraggyColor(newColor){
        currentColor = newColor;
        elementArray.forEach(function(element){
            if (element.id == "DRAGGY_GATOR" || element.id == "DRAGGY_EGG"){
                element.colorId = currentColor;
                element.color = colors[currentColor];
            }
        });
        renderNextFrame = true;
    }

    function addDraggys(){
        // One alligator, one egg and one family
        addElement({
            "type": "trash",
            "id":"DRAGGY_TRASH"
        },  selectionPanelX, selectionPanelY + selectionPanelHeight/4,
            selectionPanelWidth/3, selectionPanelHeight/2,
            true);
        addElement({
            type: "gator",
            id:"DRAGGY_GATOR",
            colorId: currentColor,
            color:colors[currentColor],
        },  selectionPanelX + selectionPanelWidth/4, selectionPanelY + selectionPanelHeight/4,
            selectionPanelWidth/3, selectionPanelHeight/2,
            true);
        addElement({
            type: "egg",
            id:"DRAGGY_EGG",
            colorId: currentColor,
            color:colors[currentColor],
        },  selectionPanelX + selectionPanelWidth/4*2, selectionPanelY + selectionPanelHeight/4,
            selectionPanelWidth/3, selectionPanelHeight/2,
            true);
        addElement({
            type: "dummy",
            id:"DRAGGY_DUMMY",
            colorId: currentColor,
            color:colors[currentColor],
        },  selectionPanelX + selectionPanelWidth/4*3, selectionPanelY + selectionPanelHeight/4,
            selectionPanelWidth/3, selectionPanelHeight/2,
            true);
    }

    function uiMouseUp(x,y){
        var selectedElementId = getIdAt(x,y);
        if (currentElementId == "DRAGGY_GATOR"){
            dragging = false;
            controller.insertElement({
                "type": "gator",
                "colorId": currentColor
            },selectedElementId);
        }else if (currentElementId == "DRAGGY_EGG"){
            dragging = false;
            controller.insertElement({
                "type": "egg",
                "colorId": currentColor
            },selectedElementId);
        }else if (currentElementId == "DRAGGY_DUMMY"){
            dragging = false;
            controller.makeFamily(selectedElementId);
        }else if (selectedElementId == "DRAGGY_TRASH"){
            dragging = false;
            controller.deleteElement(currentElementId);
        }else if (selectedElementId && elementArray[getObjectIndexAtId(selectedElementId)].draggable){
            dragging = false;
            controller.swapElements(selectedElementId,currentElementId);
        }
        else{
            dragging = false;
        }
        renderNextFrame = true;
    }

    function uiMouseMove(x,y){
        if (dragging){
            hoverElement = getIdAt(x,y);

            hoverElementIndex = getObjectIndexAtId(hoverElement);
            var e = elementArray[hoverElementIndex];

            currentElement.topLeft.x = x - currentElementOffset.x;
            currentElement.topLeft.y = y - currentElementOffset.y;
            currentElement.bottomRight.x = x+currentElement.size.x - currentElementOffset.x;
            currentElement.bottomRight.y = y+currentElement.size.y - currentElementOffset.y;

            renderNextFrame = true;
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
        "redraw": render,
        "uiMouseDown": uiMouseDown,
        "uiMouseUp": uiMouseUp,
        "uiMouseMove": uiMouseMove,
        "debugGetElementArray": function(){return elementArray;}
    };
})();
