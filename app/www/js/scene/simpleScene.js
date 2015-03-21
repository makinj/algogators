var simpleScene=(function(){
    var screenSize={"width":0, "height":0};
    var alligatorRatio=1;
    var eggRatio=1;
    var childShrink=.6;
    var eggBase=.5;
    var spacer = .2;
    var border = .2;

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
        var alligatorSize = screenSize.width * (1 - 2*border);
        console.log("foodChainSize");
        console.log(foodChainSize);
        console.log("screenSize");
        console.log(alligatorSize);
        alligatorSize = alligatorSize / (1/foodChainSize) ;
        console.log("alligatorSize");
        console.log(alligatorSize);

        return alligatorSize;
    }

    function placeFamily(family, alligatorSize, topLeft, bottomRight){
        var currentWidth = topLeft.x - bottomRight.x ;
        var currentHeight = topLeft.y - bottomRight.y ;


        var currentY = topLeft.y ;
        var currentX = topLeft.x + (currentWidth * .5) - (alligatorSize * .5);

        if (family.gators){
            for ( var i = 0 ; i < family.gators.length ; i++){
                renderer.drawAlligator(currentX, currentY, alligatorSize, alligatorSize * alligatorRatio, getColor(family.gators[i].colorID));
            }
            currentY += alligatorSize * alligatorRatio + alligatorSize * spacer;
        }
        if (family.foodChain){
            for ( var i = 0 ; i < family.foodChain.length ; i++){
                var element = family.foodChain[i];
                if (element.type == "egg"){
                    renderer.drawEgg(currentX, currentY, eggBase * alligatorSize, eggBase * alligatorSize * eggRatio, getColor(element.colorID));
                }
                else{
                    var newX = calculateFamilySize(element) * alligatorSize + currentX;
                    placeFamily(element, alligatorSize * childShrink, {'x': currentX, 'y': currentY}, {'x': newX, 'y': bottomRight.y});
                    currentX = newX + alligatorSize * spacer;
                }
            }
        }

    }

    function drawScene(foodChain){
        var currentWidth = screenSize.width * (1 - 2*border);
        var currentHeight = screenSize.height * (1 - 2*border);
        var alligatorSize = calculateElemSize(foodChain);

        var currentY = screenSize.height * border;
        var currentX = ((screenSize.width * .5) - (alligatorSize * .5));

        if (foodChain){
            console.log("TEST");
            console.log(foodChain);
            for ( var i = 0 ; i < foodChain.length ; i++){
                var element = foodChain[i];
                if (element.type == "egg"){
                    renderer.drawEgg(currentX, currentY, eggBase * alligatorSize, eggBase * alligatorSize * eggRatio, getColor(element.colorID));
                    console.log(element);
                    console.log(currentX, currentY, eggBase * alligatorSize, eggBase * alligatorSize * eggRatio, getColor(element.colorID));
                }
                else{
                    var newX = calculateFamilySize(element) * alligatorSize + currentX;
                    placeFamily(element, alligatorSize * childShrink, {'x': currentX, 'y': currentY}, {'x': newX, 'y': (screenSize.height - screenSize.height * border)});
                    currentX = newX + alligatorSize * spacer;
                }
            }
        }
    }

    function getColor(colorID){
        return '#f00';
    }

    return {
        "initialize": initialize,
        "drawScene": drawScene
    }
})();
