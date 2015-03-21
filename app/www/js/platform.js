var platform = (function(){

    // platformType: "web", "android", "ios"
    // platformVersion: nothing yet
    function initialize(platformType, platformVersion){
        window.renderer = webRenderer;

        renderer.initialize();
    }

    return {
        "initialize": initialize
    }
})();
