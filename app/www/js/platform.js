var platform = (function(){

    // platformType: "web", "android", "ios"
    // platformVersion: nothing yet
    function initialize(platformType, platformVersion){
        window.renderer = webRenderer;
        window.scene = simpleScene;

        renderer.initialize();
        simpleScene.initialize();
        simpleScene.drawScene({
          "maxId": 4,
          "maxColor": 2,
          "foodchain": [
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
              "foodchain": [
                {
                  "type": "egg",
                  "id": 4,
                  "colorId": 1
                }
              ]
            }
          ]
        });
    }

    return {
        "initialize": initialize
    }
})();
