var webUI = (function(){

    function initialize(){
        window.addEventListener("click", windowClick);
    }

    function windowClick(e){
        scene.removeAt(e.pageX, e.pageY);
    }

    return {
        "initialize": initialize
    };
})();
