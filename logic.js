maxId = 0;
maxColorId = 0;

NOT = { "type": "family", "id": 1, "gators": [ { "type": "gator", "id": 2, "colorId": 1 } ], "foodChain": [ { "type": "egg", "id": 3, "colorId": 1 }, { "type": "family", "id": 4, "gators": [ { "type": "gator", "id": 5, "colorId": 2 }, { "type": "gator", "id": 6, "colorId": 3 } ], "foodChain": [ { "type": "egg", "id": 7, "colorId": 3 } ] }, { "type": "family", "id": 8, "gators": [ { "type": "gator", "id": 9, "colorId": 4 }, { "type": "gator", "id": 10, "colorId": 5 } ], "foodChain": [ { "type": "egg", "id": 11, "colorId": 4 } ] } ] };

AND = { "type": "family", "id": 1, "gators": [ { "type": "gator", "id": 2, "colorId": 1 }, { "type": "gator", "id": 3, "colorId": 2 } ], "foodChain": [ { "type": "egg", "id": 4, "colorId": 1 }, { "type": "egg", "id": 5, "colorId": 2 }, { "type": "family", "id": 6, "gators": [ { "type": "gator", "id": 7, "colorId": 3 }, { "type": "gator", "id": 8, "colorId": 4 } ], "foodChain": [ { "type": "egg", "id": 9, "colorId": 4 } ] } ] };

OR = { "type": "family", "id": 1, "gators": [ { "type": "gator", "id": 2, "colorId": 1 }, { "type": "gator", "id": 3, "colorId": 2 } ], "foodChain": [ { "type": "egg", "id": 4, "colorId": 1 }, {"type": "family", "id": 5, "gators": [ { "type": "gator", "id": 6, "colorId": 3 }, { "type": "gator", "id": 7, "colorId": 4 } ], "foodChain": [ { "type": "egg", "id": 8, "colorId": 3 } ] }, { "type": "egg", "id": 9, "colorId": 2 }] };

FALSE = { "type": "family", "id": 1, "gators": [ { "type": "gator", "id": 2, "colorId": 1 }, { "type": "gator", "id": 3, "colorId": 2 } ], "foodChain": [ { "type": "egg", "id": 4, "colorId": 2 } ] };

TRUE = { "type": "family", "id": 1, "gators": [ { "type": "gator", "id": 2, "colorId": 1 }, { "type": "gator", "id": 3, "colorId": 2 } ], "foodChain": [ { "type": "egg", "id": 4, "colorId": 1 } ] };

function getMaxIds(foodChain){
  for (var i = 0; i < foodChain.length; i++) {
    if(foodChain[i].id>maxId){
      maxId = foodChain[i].id;
    }

    if(foodChain[i].type=="family"){
      getMaxIds(foodChain[i].foodChain);

      for (var j = 0; j < foodChain[i].gators.length; j++) {
        if(foodChain[i].gators[j].colorId > maxColorId){
          maxColorId = foodChain[i].gators[j].colorId;
        }

        if(foodChain[i].gators[j].id>maxId){
          maxId = foodChain[i].id;
        }
      }
    }else{
      if(foodChain[i].colorId > maxColorId){
        maxColorId = foodChain[i].colorId;
      }
    }
  }
}

function reduce(foodChain){
  if(foodChain[0].gators.length>0){//alpha reduce or done
    if(foodChain.length==1){
      console.log("donezo");
      return 0;
    }
    console.log("alpha");

    gator = foodChain[0].gators[0];
    food = foodChain[1];
    replaceEggs(foodChain[0], gator.colorId, food);
    foodChain.splice(1, 1);//removes the food
    foodChain[0].gators.splice(0,1);//removes the gator
  }else{//eta reduce
    console.log("eta");
    Array.prototype.unshift.apply(foodChain, foodChain.shift().foodChain);
  }
  return 1;
}


function isEqual(foodChain1, foodChain2) {
	if (foodChain1.length != foodChain2.length) return 0;
	for (var i = 0; i < foodChain1.length; i++)
		if (foodChain1[i].type != foodChain2[i].type) return 0;
	var eggMap1 = {};
	var eggMap2 = {};
	var gatorMap1 = {};
	var gatorMap2 = {};
	// Iterate over families and eggs (elements)
	for (var i = 0; i < foodChain1.length; i++) {
		var element1 = foodChain1[i];
		var element2 = foodChain2[i];
		if (element1.type == "egg") {
			// if we already have a mapping for this color but it's different now, the food-chains are different
			if ((element1.colorId in eggMap1) && eggMap1[element1.colorId] != element2.colorId)
				return 0;
			if ((element2.colorId in eggMap2) && eggMap2[element2.colorId] != element1.colorId)
				return 0;
			// if we haven't seen this color yet, add this mapping
			if (!(element1 in eggMap1))
				eggMap1[element1.colorId] = element2.colorId;
			if (!(element2 in eggMap2))
				eggMap2[element2.colorId] = element1.colorId;
		}
		else if (element1.type == "family") {
			if (element1.gators.length != element2.gators.length) return 0;
			if (element1.foodChain.length != element2.foodChain.length) return 0;
			// Iterate over gators
			var gators1 = element1.gators;
			var gators2 = element2.gators;
			for (var j = 0; j < gators1.length; j++) {
				// if we already have a mapping for this color but it's different now, the food-chains are different
				if ((gators1[j].colorId in gatorMap1) && gatorMap1[gators1[j].colorId] != gators2[j].colorId)
					return 0;
				if ((gators2[j].colorId in gatorMap2) && gatorMap2[gators2[j].colorId] != gators1[j].colorId)
					return 0;
				// if we haven't seen this color yet, add this mapping
				if (!(gators1[j] in gatorMap1))
					gatorMap1[gators1[j].colorId] = gators2[j].colorId;
				if (!(gators2[i] in gatorMap2))
					gatorMap2[gators2[j].colorId] = gators1[j].colorId;
			}
			// Recurse for sub-foodChains
			if (!isEqual(element1.foodChain, element2.foodChain)) return 0;
		}
	}
	return 1;
}


function replaceEggs(family, colorId, newFamily){
  for (var i = 0; i < family.foodChain.length; i++) {
    if(family.foodChain[i].type=="family"){
      replaceEggs(family.foodChain[i], colorId, newFamily);
    }else{
      if(family.foodChain[i].colorId==colorId){
        family.foodChain[i] = copyFamily(newFamily, {});
      }
    }
  }
}

function copyFamily(family, colorMap){
  colorMap = colorMap || {};
  newFamily = {type:"family", id:++maxId, gators:[], foodChain:[]};//create blank family with new Id

  for (var i=0; i < family.gators.length; i++){//add each gator over with new Id's and new color Id's
    newFamily.gators[i]={type:"gator", id:++maxId, colorId:++maxColorId};
    colorMap[family.gators[i].colorId]=maxColorId;//mark that this colorId is changed for all children eggs
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

getMaxIds([OR]);

mainFoodChain = [OR, copyFamily(TRUE), copyFamily(TRUE)];

console.log(JSON.stringify(mainFoodChain));
reduce(mainFoodChain);
console.log(JSON.stringify(mainFoodChain));
reduce(mainFoodChain);
console.log(JSON.stringify(mainFoodChain));
reduce(mainFoodChain);
console.log(JSON.stringify(mainFoodChain));
reduce(mainFoodChain);
console.log(JSON.stringify(mainFoodChain));
reduce(mainFoodChain);
console.log(JSON.stringify(mainFoodChain));
reduce(mainFoodChain);
console.log(JSON.stringify(mainFoodChain));
reduce(mainFoodChain);
console.log(JSON.stringify(mainFoodChain));
reduce(mainFoodChain);
console.log(JSON.stringify(mainFoodChain));

//console.log(isEqual(mainFoodChain, mainFoodChain2));

/*
family:
  type="family"
  id
  gators = []//gators
  foodChain = []//eggs or families

gator:
  type="gator"
  id
  colorId

egg:
  type="egg"
  id
  colorId
*/
