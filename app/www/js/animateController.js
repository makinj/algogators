var animateController = (function(){

    var height = 0;
    var width = 0;
    var topLeft = {'x': 0 , 'y': 0};
    var interval = null;
    var played = false;
    var started = false;


    if (played){
        return;
    }
    var i = 0;
    var repeat = false;
    var transitiontime = 1000;
    var time = 0;
    var increment = 1000/30;
    var foodObjId = 0;
    var eatingGatorId = 0;
    var hatchingEggsIds = [];
    var stateTime = 0;
    var first = true;
    var eatLoops = false;
    var intermidiate;
    var hatchState;
    var currState;
    var divisor = 14;
    var state = 0;
    var topEatenId;
    var move;
    var gradient;
    var index = 0;

    function initialize(h,w, topLeftx,topLefty ){
        console.log("initialize",h,w, topLeftx,topLefty);

        height=h;
        width=w;
        topLeft.x = topLeftx;
        topLeft.y = topLefty;
        animatedScene.initialize(height,width,topLeft,false);
        played = false;
    }

    // EXAMPLE: animator.startVisualize(test_data,'and',1);
    function startVisualize(testCase, testCaseId, testNum){
        console.log("visulize",testCase, testCaseId, testNum);
        var results = loadTestCase(testCase, testCaseId, testNum);
        loadAnimation(results, testNum);
        startAnimation(results, testNum);
    }

    function loadTestCase(foodchain, testcase){
        var results = interpreter.test(foodchain, testcase);
        return results;
    }

    function loadAnimation(results, i, step){
        index = i;
        if (step){
            animatedScene.loadScene(results[index].steps[step].state);
        }
        else{
            animatedScene.loadScene(results[index].steps[0].state);
        }
    }

    function eats(events){
        for (var a = 0; a < events.length; a++){
            if (events[a] && events[a].action && events[a].action == "eat"){
                var foodObjId = events[a].food;
                var eatingGatorId = events[a].gator;
                return {'eat':true, 'foodObjId':foodObjId, 'eatingGatorId':eatingGatorId};
            }
        }
        return {'eat':false, 'foodObjId':0, 'eatingGatorId':0};

    }

    function hatches(events){
        var hatchingEggsIds = [];

        for (var a = 0; a < events.length; a++){
            if (events[a] && events[a].action && events[a].action == "hatch"){
                hatchingEggsIds.push( events[a].gator);
            }
        }
        if (hatchingEggsIds.length > 0){
            return  {'hatch':true, 'hatchingEggsIds':hatchingEggsIds};
        }
        else{
            return  {'hatch':false, 'hatchingEggsIds':[]};

        }
    }

    function startAnimation(results, indexParam){
        if (played){
            return;
        }
        index = indexParam;
        i = 0;
        console.log(results[index].steps);
        repeat = false;
        transitiontime = 1000;
        time = 0;
        increment = 1000/30;
        foodObjId = 0;
        eatingGatorId = 0;
        hatchingEggsIds = [];
        stateTime = 0;
        first = true;
        eatLoops = false;
        divisor = 14;
        state = 0;
        started =true;
    }

    function nextframe(){
        if (!started || played){
            return;
        }
        stateTime += increment;
        time += increment;
        // console.log(i);
        if (stateTime > transitiontime){
            stateTime = 0;
            time = 0;
            console.log(i);
            i++;
            if (i == results[index].steps.length){
                played = true;
                played = false;
                return;
            }
            hatchingEggsIds = [];
            eatLoops = false;

            var eatsState = eats(results[index].steps[i].events);
            foodObjId = eatsState.foodObjId;
            eatingGatorId = eatsState.eatingGatorId;
            if (!repeat && eatsState.eat){
                eatLoops = true;
                console.log("eats");
                repeat = true;
                intermidiate = JSON.parse(JSON.stringify(results[index].steps[i].state));
                hatchState = hatches(results[index].steps[i].events);
                hatchingEggsIds = hatchState.hatchingEggsIds;
                i = i-1;
                currState = results[index].steps[i].state;
                loadAnimation(results, index, i);
                intermidiate.splice(1, 0, {
                    "id": foodObjId,
                    "type": "family",
                    "gators":[],
                    "foodChain":[]
                });
                if (intermidiate[0].gators.length > 0){
                    intermidiate[0].gators.splice(0,0, {"id": foodObjId, "colorId":0, "type":"blank"});
                }
                state = 0;
                var topEatenId = 0;
                if (currState[1].gators.length > 0){
                    topEatenId = currState[1].gators[0].id;
                }
                else{
                    topEatenId = currState[1].foodChain[0].id;
                }
                move = animatedScene.calcEat(eatingGatorId, topEatenId);
                gradient = {
                    'x':-1* move.x / (3 * (transitiontime/divisor)),
                    'y':-1* move.y / (3 * (transitiontime/divisor)),
                }
                console.log("gradient",gradient);
            }
            else{
                console.log("no eats");
                repeat = false;
                loadAnimation(results, index, i);
            }
        }
        if (eatLoops){
            time += increment;
            if (state == 0){ //Wait
                if (time > (transitiontime/divisor)){
                    console.log("waitInterval",time);
                    time = 0;
                    state += 1;
                }
            }
            else if (state == 1){ //Move
                animatedScene.moveObject(eatingGatorId,
                    gradient.x * time + move.pos.x,
                    gradient.y * time + move.pos.y
                );
                if (time > 3 * (transitiontime/divisor)){
                    console.log("moveInterval",time);
                    time = 0;
                    state += 1;
                }
            }
            else if (state == 2){ //Eat
                //remove foodObjId
                if (time > 3 * (transitiontime/divisor)){
                    console.log("eatInterval",time);
                    time = 0;
                    state += 1;
                }
            }
            else if (state == 3){ //Die
                //remove eatingGatorId
                if (time > 3 * (transitiontime/divisor)){
                    console.log("dieInterval",time);
                    time = 0;
                    state += 1;
                }
            }
            else if (state == 4 && hatchState.hatch){ //Hatch
                // remove hatchingEggsIds and transition in intermidiate state
                if (time > 3 * (transitiontime/divisor)){
                    console.log("hatchInterval",time);
                    time = 0;
                    state += 1;
                    animatedScene.reset();
                    animatedScene.loadScene(intermidiate);
                }
            }
            else if (state == 4){ //Not Hatch
                animatedScene.reset();
                animatedScene.loadScene(intermidiate);
            }
        }
    }

    function stop(){
        started = false;
        console.log("reset");
        animatedScene.reset();

        return;
    }


return {
    "initialize": initialize,
    "startVisualize": startVisualize,
    "stop": stop,
    "nextframe":nextframe

};
})();
