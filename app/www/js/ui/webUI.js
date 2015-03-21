var webUI = (function(){

    function initialize(){
        window.addEventListener("click", windowClick);
    }

    function windowClick(e){
        console.log(scene.getIdAt(e.pageX, e.pageY));
    }

    return {
        "initialize": initialize
    };
})();
