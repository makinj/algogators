var platform = (function(){

    // platformType: "web", "android", "ios"
    // platformVersion: nothing yet
    function initialize(platformType, platformVersion){
        window.renderer = normalWebRenderer;
        window.scene = simplerScene;
        window.ui = webUI;

        renderer.initialize(function(){
            scene.initialize();
            ui.initialize();
            controller.initialize();
            controller.startGame();
            /*
            renderer.drawBgImg();
            renderer.drawButton(800,450,200,100, "Play!");
            renderer.drawBanner(800,250,400,400);
            */
        });
    }

    return {
        "initialize": initialize
    };
})();
