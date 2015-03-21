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

                    "type": "egg",
                    "id": 4,
                    "colorId": 1
                }
            ]);
    }

    return {
        "initialize": initialize
    }
})();
