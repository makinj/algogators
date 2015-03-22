var webUI = (function(){

    function initialize(){
        window.addEventListener("mousedown", windowMouseDown);
        window.addEventListener("mouseup", windowMouseUp);
        window.addEventListener("mousemove", windowMouseMove);
        window.addEventListener("touchstart", windowTouchStart);
        window.addEventListener("touchend", windowTouchEnd);
        window.addEventListener("touchmove", windowTouchMove);
    }

    function windowTouchStart(e) {
        //console.log("Touch Start");
        if (scene.isActive()){
            scene.uiMouseDown(e.pageX, e.pageY);
        }else if (menu.isActive()){
            menu.uiMouseUp(e.pageX, e.pageY);
        }
    }
    function windowTouchEnd(e) {
        //console.log("Touch End");
        if (scene.isActive()){
            scene.uiMouseUp(e.pageX, e.pageY);
        }else if (menu.isActive()){
            menu.uiMouseUp(e.pageX, e.pageY);
        }
    }
    function windowTouchMove(e) {
        //console.log("Touch Move");
        e.preventDefault()
        if (scene.isActive()){
            scene.uiMouseMove(e.pageX, e.pageY);
        }else if (menu.isActive()){
            menu.uiMouseMove(e.pageX, e.pageY);
        }
    }
    function windowMouseDown(e){
            //console.log("Mouse Down");
        if (scene.isActive()){
            scene.uiMouseDown(e.pageX,e.pageY);
        }else if (menu.isActive()){
            menu.uiMouseDown(e.pageX, e.pageY);
        }
    }
    function windowMouseUp(e){
            //console.log("Mouse Up");
        if (scene.isActive()){
            scene.uiMouseUp(e.pageX,e.pageY);
        }else if (menu.isActive()){
            menu.uiMouseUp(e.pageX, e.pageY);
        }
    }
    function windowMouseMove(e){
            //console.log("Mouse Move");
         if (scene.isActive()){
             scene.uiMouseMove(e.pageX,e.pageY);
         }else if (menu.isActive()){
             menu.uiMouseMove(e.pageX, e.pageY);
         }
    }

    return {
        "initialize": initialize
    };
})();
