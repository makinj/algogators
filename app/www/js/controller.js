var controller = (function(){

    var data, testData;

    function initialize(){
        data = [
            {
                "type": "family",
                "id": 5,
                "gators": [
                    {
                        "type": "dummy",
                        "id": 20
                    }
                ],
                "foodChain": [
                    {
                        "type": "dummy",
                        "id": 21
                    }
                ]
            }
        ];
        testData = [
            {
                input: [{
                    "type": "egg",
                    "id": 8,
                    "colorId": 4
                }],
                output: [{
                    "type": "egg",
                    "id": 8,
                    "colorId": 4
                }]
            },
            {
                input: [{
                    "type": "family",
                    "id": 9,
                    "gators": [
                        {
                            "type": "gator",
                            "id": 10,
                            "colorId": 5
                        },
                        {
                            "type": "gator",
                            "id": 11,
                            "colorId": 6
                        }
                    ],
                    "foodChain": [
                        {
                            "type": "egg",
                            "id": 12,
                            "colorId": 5
                        }
                    ]
                }],
                output: [{
                    "type": "family",
                    "id": 9,
                    "gators": [
                        {
                            "type": "gator",
                            "id": 10,
                            "colorId": 5
                        },
                        {
                            "type": "gator",
                            "id": 11,
                            "colorId": 6
                        }
                    ],
                    "foodChain": [
                        {
                            "type": "egg",
                            "id": 12,
                            "colorId": 5
                        }
                    ]
                }]
            },
        ];
    }

    function startGame(){
        scene.activate();
        scene.loadScene(data,testData);
    }

    function stopGame(){
        scene.deactivate();
    }

    function getDataAsFamily(data){
        return {type:"family",gators:[],foodChain:data};
    }

    function swapElements(id1, id2){
        traverseChild(getDataAsFamily(data), function(child1, parent1, child1Name){
            if (child1.id == id1){
                traverseChild(getDataAsFamily(data), function(child2, parent2, child2Name){
                    if (child2.id == id2){
                        parent2[child2Name] = child1;
                        parent1[child1Name] = child2;
                        return true;
                    }
                });
                return true;
            }
        });
        scene.loadScene(data,testData);
    }

    function insertElement(element, intoObjectId){
        var uid = Math.floor(Math.random() * 99999999);
        //TODO check that id is unique
        var copiedObject = JSON.parse(JSON.stringify(element));
        copiedObject.id = uid;
        traverseChild(getDataAsFamily(data), function(child,parentArray, index){
            if (child.id == intoObjectId){
                parentArray.splice(index,0, copiedObject);
                return true;
            }
        });
        scene.loadScene(data, testData);
    }

    function makeFamily(elementId){
        // Note* this can't be done to eggs
        var uid = Math.floor(Math.random() * 99999999);
        //TODO check that id is unique
        traverseChild(getDataAsFamily(data), function(child, parent, index){
            if (child.id == elementId && child.type == "gator"){
                parent[index] = {
                    "type": "family",
                    "id": uid,
                    "gators":[child],
                    "foodChain":[{
                        "id": uid+1,
                        "type": "dummy"
                    }]
                };
                return true;
            }
        });
        scene.loadScene(data, testData);
    }

    function newFamily(family){
        data.push(family);
        scene.loadScene(data,testData);
    }

    function deleteElement(elementId){
        traverseChild(getDataAsFamily(data), function(child,parent,index){
            if (child.id == elementId){
                parent.splice(index,1);
                return true;
            }
        });
        validateAndCorrect(data);
        scene.loadScene(data,testData);
    }

    function traverseChild(element, callback){
        if (element.type == "family"){
            if (element.gators.some(function(gator, index){
                if (callback(gator, element.gators, index)){
                    return true;
                }
            })) return true;
            if (element.foodChain.some(function(child, index){
                if (callback(child, element.foodChain, index)){
                    return true;
                }
                if (traverseChild(child, callback)){
                    return true;
                }
            })) return true;
        }
    }

    function getHighestColor(foodChain){
        var largestColorId = 5;
        traverseChild(getDataAsFamily(foodChain), function(element){
            if (element.colorId && element.colorId > largestColorId){
                largestColorId = element.colorId;
            }
        });
        return largestColorId;
    }

    function validateAndCorrect(data){
        traverseChild(getDataAsFamily(data), function(child,parent,index){
            if (child.type == "family"){
                if (child.gators.length == 0 || child.foodChain.length == 0){
                    parent.splice(index,1);
                    validateAndCorrect(data);
                    return true;
                }
            }
        });
    }

    function openMainMenu(){
        menu.openMainMenu();
    }

    return {
        "initialize": initialize,
        "swapElements": swapElements,
        "makeFamily":makeFamily,
        "newFamily": newFamily,
        "insertElement": insertElement,
        "deleteElement": deleteElement,
        "getHighestColor": getHighestColor,
        "startGame": startGame,
        "openMainMenu": openMainMenu
    };
})();
