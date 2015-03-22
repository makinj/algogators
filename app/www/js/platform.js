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
            renderer.drawButton(800,400,200,100, "Just the worst");
            renderer.drawBanner(800,200,200,100);
            */
        });
    }

    return {
        "initialize": initialize
    }
})();
