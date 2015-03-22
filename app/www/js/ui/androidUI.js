var webUI = (function(){

    function initialize(){
        //window.addEventListener("mousedown", windowMouseDown);
        //window.addEventListener("mouseup", windowMouseUp);
        //window.addEventListener("mousemove", windowMouseMove);
        window.addEventListener("touchstart", windowTouchStart);
        window.addEventListener("touchend", windowTouchEnd);
        window.addEventListener("touchmove", windowTouchMove);
    }

    function windowTouchStart(e) {
        scene.uiMouseDown(e.touches[0].pageX, e.touches[0].pageY);
    }
    function windowTouchEnd(e) {
        console.log("end");
        scene.uiMouseUp(e.touches[0].pageX, e.touches[0].pageY);
    }
    function windowTouchMove(e) {
        e.preventDefault()
        scene.uiMouseMove(e.touches[0].pageX, e.touches[0].pageY);
    }
    /*
    function windowMouseDown(e){
            //console.log("Mouse Down");
        scene.uiMouseDown(e.pageX,e.pageY);
    }*
    function windowMouseUp(e){
        scene.uiMouseUp(e.pageX,e.pageY);
    }
    function windowMouseMove(e){
            //console.log("Mouse Move");
         scene.uiMouseMove(e.pageX,e.pageY);
    }
    */

    return {
        "initialize": initialize
    };
})();
