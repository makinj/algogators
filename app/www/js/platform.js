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

            /*
            renderer.drawBgImg();
            renderer.drawImgButton("next",1300, 350, 150, 300);
            renderer.drawImgButton("back",300, 350, 150, 300);

            renderer.drawButton(800,600,200,100, "Select");
            renderer.drawButton(800,450,200,100, "Play!");
            renderer.drawBanner(800,200,400,300);
            */

            controller.initialize();
            controller.startGame();

            /*
            renderer.drawBgImg();
            renderer.drawButton(800,450,200,100, "Play!");
            renderer.drawBanner(800,200,400,300);
            */
        });
    }

    return {
        "initialize": initialize
    };
})();
