
function run_heapsort(bar_list){
    var values = [];
    var animations = [];

    for (var i = 0; i < bar_list.length; i++) {
      //creates an array of just the lengths of the bars
      values.push(bar_list[i]["len"]);
    }

    //make the bars into a heap
    create_heap(values, animations);

    //sort the heap
    for (var i = values.length - 1; i > 0; i--) {

      animations.push([i,0,"swap"])
      swap(values,i,0);
      heapify(values,i,0, animations);
    }

      return animations;
}
export default run_heapsort;



function heapify(heap, n, index, animations){


  var largest = index;
  var left = 2 * index + 1;
  var right = 2 * index + 2;

  if (left < n){
    animations.push([left,largest,"compare"])
    if (heap[left] > heap[largest]){
      largest = left
    }
  }

  if (right < n){
    animations.push([right,largest,"compare"])
    if (heap[right] > heap[largest]){
      largest = right
    }
  }

  if (largest !== index){
    animations.push([largest, index,"swap"])
    swap(heap, largest, index);
    heapify(heap, n, largest, animations)
  }

}

function create_heap(heap, animations){

  var len_heap = heap.length;

  var start_index = Math.floor(len_heap / 2 - 1)

  for (var i = start_index; i > -1; i--) {
    heapify(heap, len_heap, i, animations);
  }

}



function get_parent_index(heap,index){
    return(Math.ceil((index - 1) / 2));
}
function swap(input, index_A, index_B) {
   var temp = input[index_A];

   input[index_A] = input[index_B];
   input[index_B] = temp;
}




function test(){

  var test1 = [10,90,8,71,6,57,400,16,21,1]
  //console.log(test1);
  run_heapsort(test1);
  //console.log(test1);


}
test()
