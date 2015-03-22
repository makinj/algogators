var test_data = [{
    "type": "family",
    "id": 1,
    "gators": [
        {
            "type": "gator",
            "id": 2,
            "colorId": 1
        }, {
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
            "id": 5,
            "colorId": 1
        },
        {
            "type": "family",
            "id": 6,
            "gators": [
                {
                    "type": "gator",
                    "id": 7,
                    "colorId": 3
                }, {
                    "type": "gator",
                    "id": 8,
                    "colorId": 4
                }
            ],
            "foodChain": [
                {
                    "type": "egg",
                    "id": 9,
                    "colorId": 4
                }
            ]
        }
    ]
}];

var platform = (function(){

    // platformType: "web", "android", "ios"
    // platformVersion: nothing yet
    function initialize(platformType, platformVersion){
        window.renderer = webRenderer;
        window.animatedScene = animatedScene;
        window.scene = simplerScene;

        window.ui = webUI;
        window.animator = animateController;

        renderer.initialize(function(){
            scene.initialize();
            ui.initialize();
            controller.initialize();
            controller.startGame();
            animator.initialize(renderer.getScreenSize(), 0,0);
            animator.startVisualize(test_data,'and',1);

        });
    }

    return {
        "initialize": initialize
    }
})();
