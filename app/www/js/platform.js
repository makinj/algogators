var platform = (function(){

    // platformType: "web", "android", "ios"
    // platformVersion: nothing yet
    function initialize(platformType, platformVersion){
        window.renderer = webRenderer;
        window.scene = simpleScene;

        renderer.initialize();
        simpleScene.initialize();
        simpleScene.drawScene([
    {
                "type": "family",
                "id": 1,
                "gators": [
                    {
                        "type": "gator",
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
                    },
                    {
                        "type": "egg",
                        "id": 4,
                        "colorId": 1
                    }
                ]
            },
            {
                "type": "family",
                "id": 1,
                "gators": [
                    {
                        "type": "gator",
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
                "id": 1,
                "gators": [
                    {
                        "type": "gator",
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
                "id": 1,
                "gators": [
                    {
                        "type": "gator",
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
            }
        ]);
    }

    return {
        "initialize": initialize
    }
})();
