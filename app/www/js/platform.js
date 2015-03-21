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
        controller.initialize();

        controller.startGame();
    }

    return {
        "initialize": initialize
    }
})();
