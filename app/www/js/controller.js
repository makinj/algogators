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
            }, {
              "type": "egg",
              "id": 5,
              "colorId": 2
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
        scene.initialize();
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
        var interval = setInterval(function(){
            i++;
            console.log(i);
            if (i == results[index].steps.length){
                clearInterval(interval);
                return;
            }
            console.log(results[index].steps[i].events);
            var eaten_obj_id;
            var eating_obj_id;

            function eats(events){
                console.log("events", events);
                for (var a = 0; a < events.length; a++){
                    console.log("events[a].action", events[a]);
                    if (events[a] && events[a].action && events[a].action == "eat"){
                        eaten_obj_id = events[a].food;
                        console.log("a", a);
                        console.log("eaten_obj_id", eaten_obj_id);
                        eating_obj_id = events[a].gator;
                        return true;
                    }
                }
            }
            if (!repeat && eats(results[index].steps[i].events)){
                console.log("Now", results[index].steps[i].events);
                console.log("Prev", results[index].steps[i-1].events);

                console.log("eats");
                repeat = true;
                renderer.clear("#fff");
                scene.initialize();
                var intermidiate = JSON.parse(JSON.stringify(results[index].steps[i].state));
                intermidiate.splice(1, 0, {
                      "id": eaten_obj_id,
                      "type": "family",
                      "gators":[],
                      "foodChain":[]
                });
                if (intermidiate[0].gators.length > 0){
                    intermidiate[0].gators.splice(0,0, {"id": eaten_obj_id, "colorId":0, "type":"blank"});
                }

                scene.loadScene(intermidiate);
                i = i-1;
            }
            else{
                console.log("no eats");
                repeat = false;
                loadAnimation(results, index, i);


            }
            console.log(results[index].steps[i].state);
        }, 1500);
    }


    return {
        "initialize": initialize,
        "swapElements": swapElements,
        "startGame": startGame,
        "loadAnimation": loadAnimation

    };
})();
