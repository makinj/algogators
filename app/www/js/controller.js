var controller = (function(){

    var data;

    function initialize(){
        data = [
            {
                "type": "egg",
                "id": 4,
                "colorId": 1
            },
            {
                "type": "family",
                "id": 5,
                "gators": [
                    {
                        "type": "gator",
                        "id": 6,
                        "colorId": 3
                    },
                    {
                        "type": "gator",
                        "id": 7,
                        "colorId": 4
                    }
                ],
                "foodChain": [
                    {
                        "type": "egg",
                        "id": 8,
                        "colorId": 4
                    },
                    {
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
                    }
                ]
            },
            {
                "type": "family",
                "id": 13,
                "gators": [
                    {
                        "type": "gator",
                        "id": 14,
                        "colorId": 2
                    },
                    {
                        "type": "gator",
                        "id": 15,
                        "colorId": 1
                    }
                ],
                "foodChain": [
                    {
                        "type": "egg",
                        "id": 16,
                        "colorId": 2
                    }
                ]
            },
            {
                "type": "dummy",
                "id": 17,
            },
            {
                "type": "family",
                "id": 18,
                "gators": [
                    {
                        "type": "dummy",
                        "id": 19,
                    }
                ],
                "foodChain": [
                    {
                        "type": "dummy",
                        "id": 20,
                    }
                ]
            }

        ];
    }

    function startGame(){
        scene.loadScene(data);
    }

    function getDataAsFamily(){
        return {type:"family",gators:[],foodChain:data};
    }

    function swapElements(id1, id2){
        console.log(JSON.stringify(data,4));
        traverseChild(getDataAsFamily(), function(child1, parent1, child1Name){
            if (child1.id == id1){
                traverseChild(getDataAsFamily(), function(child2, parent2, child2Name){
                    if (child2.id == id2){
                        console.log("Found");
                        parent2[child2Name] = child1;
                        parent1[child1Name] = child2;
                        return true;
                    }
                });
                return true;
            }
        });
        scene.loadScene(data);
        console.log(JSON.stringify(data,4));
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

    return {
        "initialize": initialize,
        "swapElements": swapElements,
        "startGame": startGame
    };
})();
