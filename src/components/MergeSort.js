

function mergesort(i) {

  if (i.length < 2){
    return i
  }

  var len_i = Math.floor(i.length / 2);

  var left = i.slice(0,len_i);
  var right = i.slice(len_i);


  var left = mergesort(left);
  var right = mergesort(right);

  return merge(left, right);
}



function merge(left, right) {

  var len_l = left.length - 1;
  var len_r = right.length - 1;

  var i = 0;
  var j = 0;
  var k = 0;

  var result = [];

  while (i <= (len_l) & j <= (len_r)){

    if (left[i] <= right[j]) {
      result.push(left[i]);
      i += 1;
    } else {
      result.push(right[j]);
      j += 1;
    }
    k += 1;
  }

  while (i <= len_l){
    result.push(left[i]);
    i += 1;
  }
  while (j <= len_r){
    result.push(right[j]);
    j += 1;
  }
  return result;
}



export default mergesort;

function test(){

  var test1 = [];
  var test2 = [];
  for (var i = 0; i < 20; i++) {
    test1 = []
    test2 = [];
    for (var j = 0; j < getRandomInt(1,20); j++) {
      var num = getRandomInt(0,100)
      test1.push(num);
      test2.push(num);
    }
    test1.sort((a,b) => a-b);

    console.log(mergesort(test2));
    console.log(test1);
    console.log("");

  }

}
test()
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
