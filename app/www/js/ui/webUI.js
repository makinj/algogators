var webUI = (function(){

    function initialize(){
        window.addEventListener("mousedown", windowMouseDown);
        window.addEventListener("mouseup", windowMouseUp);
        window.addEventListener("mousemove", windowMouseMove);
    }

    function windowMouseDown(e){
         scene.uiMouseDown(e.pageX,e.pageY);
    }
    function windowMouseUp(e){
        scene.uiMouseUp(e.pageX,e.pageY);
    }
    function windowMouseMove(e){
        scene.uiMouseMove(e.pageX,e.pageY);
    }

    return {
        "initialize": initialize
    };
})();
