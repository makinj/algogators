var controller = (function(){

    var data;

    function initialize(){
        data = [
                  {
                    "type": "family",
                    "id": 1,
                    "gators": [
                      {
                        "type": "dummy",
                        "id": 2,
                        "colorId": 1
                      },
                      {
                        "type": "gator",
                        "id": 3,
                        "colorId": 2
                      }
                    ],
                    "foodChain": [
                      {
                        "type": "egg",
                        "id": 4,
                        "colorId": 1
                      }
                    ]
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
                        "id": 13,
                        "gators": [
                          {
                            "type": "gator",
                            "id": 14,
                            "colorId": 5
                          },
                          {
                            "type": "gator",
                            "id": 15,
                            "colorId": 6
                          }
                        ],
                        "foodChain": [
                          {
                            "type": "egg",
                            "id": 16,
                            "colorId": 5
                          }
                        ]
                    }
                  ]
              },
              {
                "type": "family",
                "id": 9,
                "gators": [
                  {
                    "type": "gator",
                    "id": 10,
                    "colorId": 2
                  },
                  {
                    "type": "gator",
                    "id": 11,
                    "colorId": 1
                  }
                ],
                "foodChain": [
                  {
                    "type": "egg",
                    "id": 12,
                    "colorId": 2
                  }
                ]
            },
            {
                "type": "dummy",
                "id": 16,
            },
            {
                "type": "dummyFamily",
                "id": 17,
                "gators": [
                  {
                    "type": "dummy",
                    "id": 10,
                  }
                ],
                "foodChain": [
                  {
                    "type": "dummy",
                    "id": 12,
                  }
                ]
            }

        ];
    }

    function startGame(){
        scene.rootDrawScene(data);
    }

    function swapElements(id1, id2){
        traverseChild(data, function(child1, parent1, child1Name){
            if (child.id == id1){
                traverseChild(data, function(child2, parent2, child2Name){
                    if (child.id == id2){
                        parent2[child2Name] = child1;
                        parent1[child1Name] = child2;
                        return true;
                    }
                });
                return true;
            }
        });
    }

    function traverseChild(element, callback){
        if (element.gators){
            element.gators.forEach(function(gator, index){
                if (callback(gator, element.gators, index)){
                    return true;
                }
            });
            element.foodChain.forEach(function(child, index){
                if (callback(child, element.foodChain, index)){
                    return true;
                }
                if (traverseChild(child, callback)){
                    return true;
                }
            });
        }
    }

    return {
        "initialize": initialize,
        "swapElements": swapElements,
        "startGame": startGame
    };
})();
