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
            if (true){
                scene.initialize();
                ui.initialize();
                controller.initialize();
                controller.startGame();
            }
            else{
                animatedScene.initialize();
                animator.startVisualize();
            }
        });
    }

    return {
        "initialize": initialize
    }
})();
