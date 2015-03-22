var platform = (function(){

    // platformType: "web", "android", "ios"
    // platformVersion: nothing yet
    function initialize(platformType, platformVersion){
        window.renderer = normalWebRenderer;
        window.scene = simplerScene;

        window.ui = webUI;
        window.animator = animateController;

        renderer.initialize(function(){
            scene.initialize();
            ui.initialize();
            menu.initialize();

            controller.initialize();
            controller.openMainMenu();
        });
    }

    return {
        "initialize": initialize
    };
})();
