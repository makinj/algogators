var platform = (function(){

    // platformType: "web", "android", "ios"
    // platformVersion: nothing yet
    function initialize(platformType, platformVersion){
        window.renderer = webRenderer;
        window.scene = simplerScene;
        window.ui = webUI;

        renderer.initialize(function(){
            scene.initialize();
            ui.initialize();
            // /* //TODO sample scene- this should be removed
            scene.loadScene(
                [
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
                        "type": "dummyFamily",
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

                ]
            );
            // */
        });

    }
    return {
        "initialize": initialize
    }
})();
