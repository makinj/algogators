
maxId = 0;
maxColorId = 0;

mainFoodChain = JSON.parse('[ { "type": "family", "id": 1, "gators": [ { "type": "gator", "id": 2, "colorId": 1 } ], "foodChain": [ { "type": "egg", "id": 3, "colorId": 1 }, { "type": "family", "id": 4, "gators": [ { "type": "gator", "id": 6, "colorId": 2 }, { "type": "gator", "id": 7, "colorId": 3 } ], "foodChain": [ { "type": "egg", "id": 8, "colorId": 3 } ] }, { "type": "family", "id": 5, "gators": [ { "type": "gator", "id": 9, "colorId": 4 }, { "type": "gator", "id": 10, "colorId": 5 } ], "foodChain": [ { "type": "egg", "id": 11, "colorId": 4 } ] } ] }, { "type": "family", "id": 12, "gators": [ { "type": "gator", "id": 13, "colorId": 6 }, { "type": "gator", "id": 14, "colorId": 7 } ], "foodChain": [ { "type": "egg", "id": 15, "colorId": 6 } ] }]');

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
    gator = foodChain[0].gators[0];
    food = families[1];
    replaceEggs(foodChain[0], gator.colorId, food);
    //search through eater's foodChain recursively and replace eggs with a matching
  }else{//eta reduce

  }
}

function isEqual(foodChain1, foodChain2) {
	if (foodChain1.length != foodChain2.length) return 0;
	for (var i = 0; i < foodChain1.length; i++)
		if (foodChain1[i].type != foodChain2[i].type) return 0;
	var eggMap = {};
	var gatorMap = {};
	// Iterate over families and eggs (elements)
	for (var i = 0; i < foodChain1.length; i++) {
		var element1 = foodChain1[i];
		var element2 = foodChain2[i];
		if (element1.type == "egg") {
			if (element1.colorid in eggMap && eggMap[element1.colorid] != element2.colorid)
				return 0;
			else if (!(element1 in eggMap))
				eggMap[element1.colorid] = element2.colorid;
		}
		else if (element1.type == "family") {
			if (element1.gators.length != element2.gators.length) return 0;
			if (element1.foodChain.length != element2.foodChain.length) return 0;
			// Iterate over gators
			var gators1 = element1.gators;
			var gators2 = element2.gators;
			for (var i = 0; i < gators1.length(); i++) {
				if (gators1[i].colorid in gatorMap) && gatorMap[gators1[i].colorid] != gators2[i].colorid)
					return 0;
				else if (!(gators1[i] in gatorMap))
					gatorMap[gators1[i].colorid] = gators2[i].colorid;
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
      family.foodChain[i].type="family";
    }
  }
}

function copyFamily(family, colorMap){

  newFamily = {type:"family", id:maxId++, gators:[], foodChain:[]};//create blank family with new Id

  for (var i=0; i < family.gators.length; i++){//add each gator over with new Id's and new color Id's
    newFamily.gators[i]={type:"gator", id:maxId++, colorId:maxColorId++};
    colorMap[family.gators[i].colorId]=maxColorId;//mark that this colorId is changed for all children eggs
  }


  for (var i=0; i < family.foodChain.length; i++){
    if(family.foodChain[i].type=="family"){
      newFamily.foodChain[i] = copyFamily(family.foodChain[i], colorMap);
    }else{
      newFamily.foodChain[i] = {type:"egg", id:maxId++};

      if(family.foodChain[i].colorId in colorMap){
        newFamily.foodChain[i].colorId = colorMap[family.foodChain[i].colorId];
      }else{
        newFamily.foodChain[i].colorId = family.foodChain[i].colorId;
      }
    }
  }
  return newFamily;

}

getMaxIds(mainFoodChain);
console.log(JSON.stringify(copyFamily(mainFoodChain[1], {})));
console.log(maxId);
console.log(maxColorId);

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
<<<<<<< HEAD

*/
