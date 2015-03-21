var platform = (function(){

    // platformType: "web", "android", "ios"
    // platformVersion: nothing yet
    function initialize(platformType, platformVersion){
        window.renderer = webRenderer;
        window.scene = simplerScene;

        renderer.initialize();
        scene.initialize();
    }

    return {
        "initialize": initialize
    }
})();
