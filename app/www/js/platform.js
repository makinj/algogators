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
						renderer.drawBgImg();
						renderer.drawButton(800,450,200,100, "Play!");
						renderer.drawBanner(800,200,400,300);

            controller.initialize();
            controller.startGame();
        });
    }

    return {
        "initialize": initialize
    }
})();
