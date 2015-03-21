var simpleScene=(function(){
    var screenSize={"width":0, "height":0};
    var alligatorRatio=1;
    var eggRatio=1;
    var childShrink=.6;
    var eggBase=.5;
    var spacer = 0.2;
    var border = .05;

    function initialize(){
        initSceneVars();
    }

    function initSceneVars(){
        screenSize = renderer.getScreenSize();
        alligatorRatio = renderer.getAlligatorSize().height / renderer.getAlligatorSize().width;
        eggRatio = renderer.getEggSize().height / renderer.getEggSize().width;
    }

    function calculateFamilySize(family){
        var gatorSize = 0;
        var foodChainSize = 0;

        var currRelativeSize = 0;
        if (family.gators){
            gatorSize = 1;
        }

        if (family.foodChain && family.foodChain.length){
            for ( var i = 0 ; i < family.foodChain.length ; i++){
                var element = family.foodChain[i]
                if (element.type == "egg"){
                    foodChainSize += eggBase;
                }
                else{
                    foodChainSize += (calculateFamilySize(element) * childShrink);
                }
                if (i != 0){
                    foodChainSize += spacer;
                }
            }
        }
        return Math.max(gatorSize , foodChainSize);
    }

    function calculateElemSize(foodChain){
        var alligatorSize = 1;
        var foodChainWidth = 0;
        var foodChainSize = 0;

        if (!foodChain){
            return 0;
        }
        for ( var i = 0 ; i < foodChain.length ; i++){
            var element = foodChain[i];
            if (element.type == "egg"){
                foodChainSize += eggBase;
            }
            else{
                foodChainSize += (calculateFamilySize(foodChain[i]));
            }
            if (i != 0){
                foodChainSize += spacer;
            }
        }
        return foodChainSize;
    }

    function placeFamily(family, alligatorSize, topLeft, bottomRight){
        var currentWidth = bottomRight.x - topLeft.x;
        var currentHeight = bottomRight.y - topLeft.y;


        var currentY = topLeft.y ;
        var currentX = topLeft.x + ((currentWidth * .5) - (alligatorSize * .5));
        console.log("left");
        console.log(topLeft);
        console.log(currentX);

        if (family.gators){
            for ( var i = 0 ; i < family.gators.length ; i++){
                console.log(currentX);

                renderer.drawAlligator(currentX, currentY, alligatorSize, alligatorSize * alligatorRatio, getColor(family.gators[i].colorId));
                currentY += (alligatorSize * alligatorRatio + alligatorSize * spacer);

            }
        }
        var currentX = topLeft.x + ((currentWidth * .5) - (.5 * calculateElemSize(family.foodChain) * alligatorSize * childShrink));

        if (family.foodChain){
            for ( var i = 0 ; i < family.foodChain.length ; i++){
                var element = family.foodChain[i];
                if (element.type == "egg"){
                    console.log(currentX);

                    renderer.drawEgg(currentX, currentY, eggBase * alligatorSize * childShrink, eggBase * alligatorSize * eggRatio * childShrink, getColor(element.colorId));
                    currentX += eggBase * alligatorSize * childShrink + alligatorSize * spacer * childShrink;

                }
                else{
                    console.log(currentX);

                    var newX = calculateFamilySize(element) * alligatorSize * childShrink + currentX;

                    placeFamily(element, alligatorSize * childShrink, {'x': currentX, 'y': currentY}, {'x': newX, 'y': bottomRight.y});

                    currentX = newX + alligatorSize * spacer * childShrink;
                }
            }
        }

    }

    function drawScene(foodChain){
        var currentWidth = screenSize.width * (1 - 2*border);
        var currentHeight = screenSize.height * (1 - 2*border);
        var alligatorSize = 150;

        var currentY = screenSize.height * border;
        var currentX = (screenSize.width * .5) - (.5 * calculateElemSize(foodChain) * alligatorSize) ;

        if (foodChain){
            for ( var i = 0 ; i < foodChain.length ; i++){
                var element = foodChain[i];
                if (element.type == "egg"){
                    var newX = calculateFamilySize(element)* alligatorSize + currentX;
                    renderer.drawEgg(currentX, currentY, eggBase * alligatorSize, eggBase * alligatorSize * eggRatio, getColor(element.colorId));
                    currentX += eggBase * alligatorSize +  alligatorSize * spacer;

                }
                else{
                    var newX = calculateFamilySize(element) * alligatorSize + currentX;
                    placeFamily(element, alligatorSize, {'x': currentX, 'y': currentY}, {'x': newX, 'y': (currentY+currentHeight)});
                    currentX = newX + alligatorSize * spacer;
                }
            }
        }
    }

    function getColor(colorId){
        return '#'+(colorId*2).toString()+'00';
    }

    return {
        "initialize": initialize,
        "drawScene": drawScene
    }
})();
