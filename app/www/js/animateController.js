var controller = (function(){

    var data;

    function initialize(){
    }

    function startGame(){
        // scene.loadScene(data);
        var results = loadTestCase([{
            "type": "family",
            "id": 1,
            "gators": [
                {
                    "type": "gator",
                    "id": 2,
                    "colorId": 1
                }, {
                    "type": "gator",
                    "id": 3,
                    "colorId": 2
                }
            ],
            "foodChain": [
                {
                    "type": "egg",
                    "id": 4,
                    "colorId": 1
                },
                {
                    "type": "egg",
                    "id": 5,
                    "colorId": 1
                },
                {
                    "type": "family",
                    "id": 6,
                    "gators": [
                        {
                            "type": "gator",
                            "id": 7,
                            "colorId": 3
                        }, {
                            "type": "gator",
                            "id": 8,
                            "colorId": 4
                        }
                    ],
                    "foodChain": [
                        {
                            "type": "egg",
                            "id": 9,
                            "colorId": 4
                        }
                    ]
                }
            ]
        }], 'and', 2);
        loadAnimation(results, 0);
        startAnimation(results, 0);
    }

    function getDataAsFamily(){
        return {type:"family",gators:[],foodChain:data};
    }

    function swapElements(id1, id2){
        console.log(JSON.stringify(data,4));
        traverseChild(getDataAsFamily(), function(child1, parent1, child1Name){
            if (child1.id == id1){
                traverseChild(getDataAsFamily(), function(child2, parent2, child2Name){
                    if (child2.id == id2){
                        console.log("Found");
                        parent2[child2Name] = child1;
                        parent1[child1Name] = child2;
                        return true;
                    }
                });
                return true;
            }
        });
        scene.loadScene(data);
        console.log(JSON.stringify(data,4));
    }

    function traverseChild(element, callback){
        if (element.type == "family"){
            if (element.gators.some(function(gator, index){
                if (callback(gator, element.gators, index)){
                    return true;
                }
            })) return true;
            if (element.foodChain.some(function(child, index){
                if (callback(child, element.foodChain, index)){
                    return true;
                }
                if (traverseChild(child, callback)){
                    return true;
                }
            })) return true;
        }
    }


    function loadTestCase(foodchain, testcase){
        var results = interpreter.test(foodchain, testcase);
        return results;
    }

    function loadAnimation(results, index, step){
        renderer.clear("#fff");
        scene.initialize(false);
        if (step){
            scene.loadScene(results[index].steps[step].state);
        }
        else{
            scene.loadScene(results[index].steps[0].state);
        }
    }

    function startAnimation(results, index){
        var i = 0;
        console.log(results[index].steps);
        var repeat = false;
        var transitiontime = 1000;
        var time = 0;
        var increment = 2;
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

        var interval = setInterval(function(){
            stateTime += increment;
            time += increment;
            // console.log(i);
            if (stateTime > transitiontime){
                stateTime = 0;
                time = 0;
                console.log(i);
                console.log(results[index].steps[i].state);
                i++;
                if (i == results[index].steps.length){
                    clearInterval(interval);
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
                    move = scene.calcEat(eatingGatorId, topEatenId);
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
                    scene.moveObject(eatingGatorId,
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
                        renderer.clear("#fff");
                        scene.initialize(false);
                        scene.loadScene(intermidiate);
                    }
                }
                else if (state == 4){ //Not Hatch
                    renderer.clear("#fff");
                    scene.initialize(false);
                    scene.loadScene(intermidiate);
                }
            }
        }, increment);



}


return {
    "initialize": initialize,
    "swapElements": swapElements,
    "startGame": startGame,
    "loadAnimation": loadAnimation

};
})();
