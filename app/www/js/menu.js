var menu = (function(){

    var active;

    var screen;

    var currentWindow;

    var eventFunction;
    var renderFunction;

    var clickObjects = [];

    function initialize(){
        screen = renderer.getScreenSize();
    }

    function openMainMenu(){
        console.log("Main Menu Opening");
        currentWindow = "main";
        activate();
        clickObjects = [];
        // eventFunction = mainMenuEventFunction;
        renderFunction = mainMenuRenderFunction;
        clickObjects.push({
            x: screen.width/2-100,
            y: screen.height/1.25 - 50,
            w: 200,
            h: 100,
            mousedown: function(){
                openChallengeMenu();
            }
        });
        renderFunction();
    }

    function mainMenuRenderFunction(){
        renderer.drawBgImg();
        renderer.drawButton(
            screen.width/2 ,screen.height/1.25,
            200,100,
            "Play!");
        renderer.drawBanner(
            screen.width/2,200,
            400,200);
    }

    function openChallengeMenu(){
        currentWindow = "challenge";
        activate();
        clickObjects = [];
        // eventFunction = mainMenuEventFunction;
        renderFunction = challengeRenderFunction;
        // clickObjects.push({
        //     x: screen.width/2-100,
        //     y: screen.height/1.25 - 50,
        //     w: 200,
        //     h: 100,
        //     mousedown: function(){
        //         openChallengeMenu();
        //     }
        // });
        renderFunction();
    }

    function challengeRenderFunction(){
        renderer.drawBgImg();
        renderer.drawImgButton("back",50, screen.height/2, 50, 100);
        renderer.drawImgButton("next",screen.width-50, screen.height/2, 50, 100);
    }

    function activate(){
        active = true;
    }

    function deactivate(){
        active = false;
    }

    function uiMouseUp(x,y){
        // eventFunction("mouseup", x,y);
        clickObjects.forEach(function(obj){
            if (obj.mouseup){
                obj.mouseup(x,y);
            }
        });
    }
    function uiMouseDown(x,y){
        // eventFunction("mousedown", x,y);
        clickObjects.forEach(function(obj){
            if (obj.mousedown){
                obj.mousedown(x,y);
            }
        });
    }
    function uiMouseMove(x,y){
        // eventFunction("mousemove", x,y);
        clickObjects.forEach(function(obj){
            if (obj.mousemove){
                obj.mousemove(x,y);
            }
        });
    }

    return {
        activate : activate,
        deactivate: deactivate,
        isActive: function(){return active},
        openMainMenu: openMainMenu,
        initialize: initialize,
        uiMouseUp: uiMouseUp,
        uiMouseDown: uiMouseDown,
        uiMouseMove: uiMouseMove
    };
})();
