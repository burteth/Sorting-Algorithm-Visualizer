//import React from 'react';

function selectionsort(bar_list) {
  //animation list: nested arrays contain the two items being compared and
  // a third item that if it exists is another array of two items that must
  //be interchanged
  var animations = [];
  var current_index = 0;
  var n = bar_list.length;
  //var temp;

//loop through every item in array
  while (current_index < n-1) {
    var lowest_index = current_index;

      for (var i = current_index+1; i < n; i++) {
        animations.push([current_index,i,0])

        if (bar_list[i]['len'] <= bar_list[lowest_index]['len']){
          lowest_index = i;

        }
      }
      animations.push([current_index,lowest_index,1])
      update_bar_list(bar_list,current_index,lowest_index)
      current_index++;


  }
  /*
  for (i = 0; i < animations.length; i++) {
    console.log(animations[i]);
  }
  */
  animations[animations.length-1][2] = 2
  return [bar_list,animations];

}
export default selectionsort;

function update_bar_list(bar_list,index1,index2){
  var temporary = bar_list[index1]
  bar_list[index1] = bar_list[index2]
  bar_list[index2] = temporary

  bar_list[index1]['id'] = index1
  bar_list[index2]['id'] = index2
}
