FALSE = {
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
      "colorId": 2
    }
  ]
};

TRUE = {
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
    }
  ]
};

NOT = {
  "type": "family",
  "id": 1,
  "gators": [
    {
      "type": "gator",
      "id": 2,
      "colorId": 1
    }
  ],
  "foodChain": [
    {
      "type": "egg",
      "id": 3,
      "colorId": 1
    },
    {
      "type": "family",
      "id": 4,
      "gators": [
        {
          "type": "gator",
          "id": 5,
          "colorId": 2
        },
        {
          "type": "gator",
          "id": 6,
          "colorId": 3
        }
      ],
      "foodChain": [
        {
          "type": "egg",
          "id": 7,
          "colorId": 3
        }
      ]
    },
    {
      "type": "family",
      "id": 8,
      "gators": [
        {
          "type": "gator",
          "id": 9,
          "colorId": 4
        },
        {
          "type": "gator",
          "id": 10,
          "colorId": 5
        }
      ],
      "foodChain": [
        {
          "type": "egg",
          "id": 11,
          "colorId": 4
        }
      ]
    }
  ]
};

AND = {
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
};

OR = {
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
      "type": "family",
      "id": 5,
      "gators": [
        {
          "type": "gator",
          "id": 6,
          "colorId": 3
        }, {
          "type": "gator",
          "id": 7,
          "colorId": 4
        }
      ],
      "foodChain": [
        {
          "type": "egg",
          "id": 8,
          "colorId": 3
        }
      ]
    }, {
      "type": "egg",
      "id": 9,
      "colorId": 2
    }
  ]
};


LOOP = [
  {
    "type":"family",
    "id":1,
    "gators":[
      {
        "type":"gator",
        "id":2,
        "colorId":1
      }
    ],
    "foodChain":[
      {
        "type":"egg",
        "id":3,
        "colorId":1
      },{
        "type":"egg",
        "id":4,
        "colorId":1
      }
    ]
  },{
    "type":"family",
    "id":5,
    "gators":[
      {
        "type":"gator",
        "id":6,
        "colorId":2
      }
    ],
    "foodChain":[
      {
        "type":"egg",
        "id":7,
        "colorId":2
      },{
        "type":"egg",
        "id":8,
        "colorId":2
      }
    ]
  }
];


var interpreter = (function(){

  var maxId = 0;

  var colorIds = {};

  tests ={
    "and":[
      {
        "input":[FALSE, FALSE],
        "output":[FALSE]
      },{
        "input":[FALSE, TRUE],
        "output":[FALSE]
      },{
        "input":[TRUE, FALSE],
        "output":[FALSE]
      },{
        "input":[TRUE, TRUE],
        "output":[TRUE]
      }
    ],
    "or":[
      {
        "input":[FALSE, FALSE],
        "output":[FALSE]
      },{
        "input":[FALSE, TRUE],
        "output":[TRUE]
      },{
        "input":[TRUE, FALSE],
        "output":[TRUE]
      },{
        "input":[TRUE, TRUE],
        "output":[TRUE]
      }
    ],
    "not":[
      {
        "input":[FALSE],
        "output":[TRUE]
      },{
        "input":[TRUE],
        "output":[FALSE]
      }
    ]
  };

  function refreshIds(foodChain, notFirst){//notFirst is hacky do not change or pass it as a param.  pls ignore
    notFirst = notFirst||0;
    if(!notFirst){
      colorIds = {};
    }
    for (var i = 0; i < foodChain.length; i++) {
      if(foodChain[i].id>maxId){
        maxId = foodChain[i].id;
      }

      if(foodChain[i].type=="family"){
        refreshIds(foodChain[i].foodChain,1);

        for (var j = 0; j < foodChain[i].gators.length; j++) {
          if(foodChain[i].gators[j].id>maxId){
            maxId = foodChain[i].id;
          }
          colorIds[foodChain[i].gators[j].colorId] = 1;
        }
      }else{
        colorIds[foodChain[i].colorId] = 1;
      }
    }
  }

  function nextColorId(){
    i=1;
    while (colorIds[i]==1){
      i++
    }
    console.log(i);
    return i;
  }

  function reduce(foodChain){
    refreshIds(foodChain);
    step = {"events":[]};
    if(foodChain[0].gators.length>0){//alpha reduce or done
      if(foodChain.length==1){
        return 0;
      }
      gator = foodChain[0].gators[0];
      food = foodChain[1];
      step.events[0]={"action":"eat"}
      step.events[0].gator = gator.id;
      step.events[0].food = food.id;
      step.events = step.events.concat(replaceEggs(foodChain[0], gator.colorId, food));
      foodChain.splice(1, 1);//removes the food
      foodChain[0].gators.splice(0,1);//removes the gator
    }else{//eta reduce
      step.events[0]={"action":"moveUp", "family":foodChain[0].id};
      Array.prototype.unshift.apply(foodChain, foodChain.shift().foodChain);

    }
    step.state = JSON.parse(JSON.stringify(foodChain));
    return step;
  }


  function isEqual(foodChain1, foodChain2, colorMap1, colorMap2) {
  	if (foodChain1.length != foodChain2.length) return 0;
  	for (var i = 0; i < foodChain1.length; i++)
  		if (foodChain1[i].type != foodChain2[i].type) return 0;

    colorMap1 = colorMap1 || {};
    colorMap1 = JSON.parse(JSON.stringify(colorMap1));//hacky javascript object copy

    colorMap2 = colorMap2 || {};
    colorMap2 = JSON.parse(JSON.stringify(colorMap2));//hacky javascript object copy
  	// Iterate over families and eggs (elements)
  	for (var i = 0; i < foodChain1.length; i++) {
  		var element1 = foodChain1[i];
  		var element2 = foodChain2[i];
  		if (element1.type == "egg") {
  			// if we already have a mapping for this color but it's different now, the food-chains are different
  			if ((element1.colorId in colorMap1) && colorMap1[element1.colorId] != element2.colorId)
  				return 0;
  			// if we haven't seen this color yet, add this mapping
  			if (!(element1 in colorMap1))
  				colorMap1[element1.colorId] = element2.colorId;

        if ((element2.colorId in colorMap2) && colorMap2[element2.colorId] != element1.colorId)
          return 0;
        // if we haven't seen this color yet, add this mapping
        if (!(element2 in colorMap2))
          colorMap2[element2.colorId] = element1.colorId;
  		}
  		else if (element1.type == "family") {
  			if (element1.gators.length != element2.gators.length) return 0;
  			// Iterate over gators
  			var gators1 = element1.gators;
  			var gators2 = element2.gators;
  			for (var j = 0; j < gators1.length; j++) {
  				// if we already have a mapping for this color but it's different now, the food-chains are different
  				if ((gators1[j].colorId in colorMap1) && colorMap1[gators1[j].colorId] != gators2[j].colorId)
  					return 0;
  				// if we haven't seen this color yet, add this mapping
  				if (!(gators1[j] in colorMap1))
  					colorMap1[gators1[j].colorId] = gators2[j].colorId;

          if ((gators2[j].colorId in colorMap2) && colorMap2[gators2[j].colorId] != gators1[j].colorId)
            return 0;
          // if we haven't seen this color yet, add this mapping
          if (!(gators2[j] in colorMap2))
            colorMap2[gators2[j].colorId] = gators1[j].colorId;
  			}
  			// Recurse for sub-foodChains
  			if (!isEqual(element1.foodChain, element2.foodChain, colorMap1, colorMap2)) return 0;
  		}
  	}
  	return 1;
  }


  function replaceEggs(family, colorId, newFamily){
    events = [];
    for (var i = 0; i < family.foodChain.length; i++) {
      if(family.foodChain[i].type=="family"){
        events = events.concat(replaceEggs(family.foodChain[i], colorId, newFamily));
      }else{
        if(family.foodChain[i].colorId==colorId){
          events[events.length]={"action":"hatch", "egg":family.foodChain[i].id};
          family.foodChain[i] = copyFamily(newFamily, {});
          events[events.length-1].family = family.foodChain[i].id
        }
      }
    }
    return events;
  }

  function copyFamily(family, colorMap){
    colorMap = colorMap || {};
    newFamily = {type:"family", id:++maxId, gators:[], foodChain:[]};//create blank family with new Id

    for (var i=0; i < family.gators.length; i++){//add each gator over with new Id's and new color Id's
      newFamily.gators[i]={type:"gator", id:++maxId};
      if(family.gators[i].colorId in colorMap){
        newFamily.gators[i].colorId=colorMap[family.gators[i].colorId];//mark that this colorId is changed for all children eggs
      }else{
        newFamily.gators[i].colorId=family.gators[i].colorId
      }
    }


    for (var i=0; i < family.foodChain.length; i++){
      if(family.foodChain[i].type=="family"){
        newFamily.foodChain[i] = copyFamily(family.foodChain[i], colorMap);
      }else{
        newFamily.foodChain[i] = {type:"egg", id:++maxId};

        if(family.foodChain[i].colorId in colorMap){
          newFamily.foodChain[i].colorId = colorMap[family.foodChain[i].colorId];
        }else{
          newFamily.foodChain[i].colorId = family.foodChain[i].colorId;
        }
      }
    }
    return newFamily;
  }

  function fullyReduce(mainFoodChain, inputs){
    inputs = inputs||[];
    mainFoodChain = JSON.parse(JSON.stringify(mainFoodChain));
    refreshIds(mainFoodChain);
    for(var i=0;i<inputs.length;i++){
      mainFoodChain[mainFoodChain.length]=copyFamily(inputs[i]);
    }
    steps = [{"state":JSON.parse(JSON.stringify(mainFoodChain)), "events":[]}];
    step = reduce(mainFoodChain);
    while(step!=0 && steps.length<100){
      steps[steps.length]=step;
      step = reduce(mainFoodChain);
    }
    return steps
  }

  function test(foodChain, testName){
    test = tests[testName];
    results = [];
    for (var i = 0; i < test.length; i++){
      steps = fullyReduce(foodChain, test[i].input);
      results[i] = {"input":test[i].input,"output":test[i].output, "steps":steps};
      if(isEqual(steps[steps.length-1].state, test[i].output)){
        results[i].passed=1;
      }else{
        results[i].passed=0;
      }
    }
    return results;
  }

  return {
    "refreshIds":refreshIds,
    "reduce":reduce,
    "isEqual":isEqual,
    "replaceEggs":replaceEggs,
    "copyFamily":copyFamily,
    "fullyReduce":fullyReduce,
    "test": test
  };
})();
console.log(JSON.stringify(interpreter.test([NOT], 'not')));
// console.log(JSON.stringify(interpreter().test([OR] , 'or' )));
// console.log(JSON.stringify(interpreter().test([NOT], 'not')));
