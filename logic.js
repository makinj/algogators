maxId = 0;
maxColorId = 0;

mainFoodChain1 = JSON.parse('[ { "type": "family", "id": 1, "gators": [ { "type": "gator", "id": 2, "colorId": 1 } ], "foodChain": [ { "type": "egg", "id": 3, "colorId": 1 }, { "type": "family", "id": 4, "gators": [ { "type": "gator", "id": 6, "colorId": 2 }, { "type": "gator", "id": 7, "colorId": 3 } ], "foodChain": [ { "type": "egg", "id": 8, "colorId": 3 } ] }, { "type": "family", "id": 5, "gators": [ { "type": "gator", "id": 9, "colorId": 4 }, { "type": "gator", "id": 10, "colorId": 5 } ], "foodChain": [ { "type": "egg", "id": 11, "colorId": 4 } ] } ] } ]');
mainFoodChain2 = JSON.parse('[ { "type": "family", "id": 1, "gators": [ { "type": "gator", "id": 2, "colorId": 1 } ], "foodChain": [ { "type": "egg", "id": 3, "colorId": 1 }, { "type": "family", "id": 4, "gators": [ { "type": "gator", "id": 6, "colorId": 2 }, { "type": "gator", "id": 7, "colorId": 3 } ], "foodChain": [ { "type": "egg", "id": 8, "colorId": 3 } ] }, { "type": "family", "id": 5, "gators": [ { "type": "gator", "id": 9, "colorId": 4 }, { "type": "gator", "id": 10, "colorId": 5 } ], "foodChain": [ { "type": "egg", "id": 11, "colorId": 4 } ] } ] } ]');

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
  if(len(foodChain[0].gators)>0){//alpha reduce or done
    if(len())
    gator = foodChain[0].gators[0];
    food = families[1];
    //search through eater's foodChain recursively and replace eggs with a matching
  }else{//eta reduce

  }
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
			//console.log(eggMap);
		}
		else if (element1.type == "family") {
			if (element1.gators.length != element2.gators.length) return 0;
			if (element1.foodChain.length != element2.foodChain.length) return 0;
			// Iterate over gators
			var gators1 = element1.gators;
			var gators2 = element2.gators;
			for (var i = 0; i < gators1.length; i++) {
				console.log("1: ", gators1[i]);
				console.log("2: ", gators2[i]);
			}
			for (var i = 0; i < gators1.length; i++) {
				// if we already have a mapping for this color but it's different now, the food-chains are different
				if ((gators1[i].colorId in gatorMap1) && gatorMap1[gators1[i].colorId] != gators2[i].colorId)
					return 0;
				if ((gators2[i].colorId in gatorMap2) && gatorMap2[gators2[i].colorId] != gators1[i].colorId)
					return 0;
				// if we haven't seen this color yet, add this mapping
				if (!(gators1[i] in gatorMap1))
					gatorMap1[gators1[i].colorId] = gators2[i].colorId;
				if (!(gators2[i] in gatorMap2))
					gatorMap2[gators2[i].colorId] = gators1[i].colorId;
				//console.log(gatorMap);
			}
			// Recurse for sub-foodChains
			if (!isEqual(element1.foodChain, element2.foodChain)) return 0;
		}
	}
	return 1;
}

function replaceEggs(family, colorId, newFamily){
  for (var i = 0; i >= family.foodChain.length; i++) {
    if(family.foodChain[i].type=="family"){
      replaceEggs(family.foodChain[i], colorId, newFamily);
    }
  }
}

getMaxIds(mainFoodChain1);
//console.log(maxId);
//console.log(maxColorId);
console.log(isEqual(mainFoodChain1, mainFoodChain2));

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
