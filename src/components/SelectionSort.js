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
        animations.push([current_index,i,"compare"])

        if (bar_list[i]['len'] <= bar_list[lowest_index]['len']){
          lowest_index = i;

        }
      }
      animations.push([current_index,lowest_index,"swap"])

      //Swap out data from current index and lowest index
      var temporary = bar_list[current_index];
      bar_list[current_index] = bar_list[lowest_index];
      bar_list[lowest_index] = temporary;

      bar_list[current_index]['id'] = current_index;
      bar_list[lowest_index]['id'] = lowest_index;
      current_index++;


  }
  return animations;


}
export default selectionsort;
