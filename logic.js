function reduce(foodChain){
  if(len(foodChain[0]->gators)>0){//alpha reduce or done
    eater = foodChain[0]->gators[0];
    food = families[1];
    //search through of eater's eggs recursively for matching gatorId to gatorId and replace with equivalent family to food
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
			if (!isEqual(element1.foodChain, element2.foodChain)) return o;
		}
	}
	return 1;
}

/*
family:
  id
  gators = []//gators
  foodChain = []//eggs or families

gator:
  id
  colorId

egg:
  id
  colorId

*/
