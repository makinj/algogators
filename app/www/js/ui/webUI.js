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
        scene.uiMouseDown(e.pageX, e.pageY);
    }
    function windowTouchEnd(e) {
        //console.log("Touch End");
        scene.uiMouseUp(e.pageX, e.pageY);
    }
    function windowTouchMove(e) {
        //console.log("Touch Move");
        e.preventDefault()
        scene.uiMouseMove(e.pageX, e.pageY);
    }
    function windowMouseDown(e){
            //console.log("Mouse Down");
        scene.uiMouseDown(e.pageX,e.pageY);
    }
    function windowMouseUp(e){
            //console.log("Mouse Up");
        scene.uiMouseUp(e.pageX,e.pageY);
    }
    function windowMouseMove(e){
            //console.log("Mouse Move");
         scene.uiMouseMove(e.pageX,e.pageY);
    }

    return {
        "initialize": initialize
    };
})();
