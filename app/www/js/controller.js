var controller = (function(){

    var data, testData;

    function initialize(){
        data = [
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
        scene.loadScene(data,testData);
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
        var largestColorId = 0;
        traverseChild(getDataAsFamily(foodChain), function(element){
            if (element.colorId && element.colorId > largestColorId){
                largestColorId = element.colorId;
            }
        });
        return largestColorId;
    }

    return {
        "initialize": initialize,
        "swapElements": swapElements,
        "getHighestColor": getHighestColor,
        "startGame": startGame
    };
})();
