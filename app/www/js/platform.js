var platform = (function(){

    // platformType: "web", "android", "ios"
    // platformVersion: nothing yet
    function initialize(platformType, platformVersion){
        window.renderer = webRenderer;
        window.scene = simplerScene;
        window.ui = webUI;

        renderer.initialize();
        scene.initialize();
        ui.initialize();
        /* //Sample Scene
        scene.drawScene(
            [
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

            ]
        );
        */
    }

    return {
        "initialize": initialize
    }
})();
