function reduce(foodChain){
  if(len(foodChain[0]->gators)>0){//alpha reduce or done
    eater = foodChain[0]->gators[0];
    food = families[1];
    //search through of eater's eggs recursively for matching gatorId to gatorId and replace with equivalent family to food
  }else{//eta reduce

  }
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