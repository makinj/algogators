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
        });
    }

    return {
        "initialize": initialize
    }
})();
