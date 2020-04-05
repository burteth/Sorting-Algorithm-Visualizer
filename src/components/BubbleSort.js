


function bubblesort(bar_list) {
  //animation list: nested arrays contain the two items being compared and
  // a third item that if it exists is another array of two items that must
  //be interchanged
  
  var animations = [];
  var going_to = bar_list.length-1;

  while (going_to > 1) {

    for (var i = 0; i < going_to; i++) {
      if(bar_list[i]['len'] > bar_list[i+1]['len']){

        animations.push([i,i+1,1]);
        swap(bar_list,i,i+1);
      }else{
        animations.push([i,i+1,0]);
      }
    }
    going_to--;
  }
  animations[animations.length-1][2] = 2;

  return [bar_list,animations];


  }
export default bubblesort;


function swap(bar_list,index1,index2){

  var temp = bar_list[index1];
  bar_list[index1] = bar_list[index2];
  bar_list[index2] = temp;
  bar_list[index1]['id'] = index1;
  bar_list[index2]['id'] = index2;

}
