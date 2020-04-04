import React from "react";
//import uuid from "uuid";
import Bars from "./Bars";

import selectionsort from "./SelectionSort"



const num_bars = 100;
const min_bar = 20;
const max_bar = 500;
const color1 = '#007bff';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bar_list: []
    };
}

componentDidMount() {
  this.randomizebars();
}

  randomizebars = () => {
    this.setState({bar_list: GenerateBars(num_bars,min_bar,max_bar)});
  }

  updatebars = (updated_bars) => {

    var bar_docs = document.getElementsByClassName("bar");
    var counter = 0;
    var k = 0;
    var animations = updated_bars[1]

    var first;
    var second;

    var started = false;

    var temp;
    var temporary_color = [0,0]
    while(counter < animations.length){

      setTimeout(() => {
        if (started){
          bar_docs[animations[k-1][0]].style.backgroundColor = temporary_color[0];
          bar_docs[animations[k-1][1]].style.backgroundColor = temporary_color[1];
        }else{
          started = true;
        }

        if (animations[k][2] === 0){
          temporary_color[0] = bar_docs[animations[k][0]].style.backgroundColor;
          temporary_color[1] = bar_docs[animations[k][1]].style.backgroundColor;
          bar_docs[animations[k][0]].style.backgroundColor = 'red';
          bar_docs[animations[k][1]].style.backgroundColor = 'red';
        }else if (animations[k][2] === 1){

          temp = bar_docs[animations[k][0]].style.height;
          bar_docs[animations[k][0]].style.height = bar_docs[animations[k][1]].style.height;
          bar_docs[animations[k][1]].style.height = temp;
          temporary_color[0] = bar_docs[animations[k][1]].style.backgroundColor;
          temporary_color[1] = bar_docs[animations[k][0]].style.backgroundColor;
          bar_docs[animations[k][0]].style.backgroundColor = 'red';
          bar_docs[animations[k][1]].style.backgroundColor = 'red';

        }else{

          temp = bar_docs[animations[k][0]].style.height;
          bar_docs[animations[k][0]].style.height = bar_docs[animations[k][1]].style.height;
          bar_docs[animations[k][1]].style.height = temp;
          this.setState({bar_list:updated_bars[0]});
        }

        k++;


      },counter*2);
      counter++;
    };




  }

  render() {
    const { bar_list } = this.state;

    return (
      <div>
        <div id="UI_container">
          <div id="button_container">
            <button className="btn btn-primary" onClick={() => this.randomizebars()}>Randomize</button>
            <button className="btn btn-primary" onClick={() => this.updatebars(selectionsort(JSON.parse(JSON.stringify(this.state.bar_list))))}>Selection Sort</button>
            <button className="btn btn-primary">Merge Sort</button>
            <button className="btn btn-primary">Quick Sort</button>
            <button className="btn btn-primary">Heap Sort</button>
            <button className="btn btn-primary">Bubble Sort</button>
          </div>
            <Bars bar_list={bar_list} />
        </div>
      </div>
    );
  }
}






function GenerateBars(len, min, max) {
  var lst = [];
  for (var i = 0; i < len; i++) {
    var random = getRandomInt(min, max);
    lst.push({id: i, len: random,color: colorpernum(min,max,random)});
    //lst.push({id: uuid.v4(),len: random,color: colorpernum(min,max,random)});
    colorpernum(min,max,random);
  }

  return lst;
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function colorpernum(min,max,number){
  var place = Math.floor(255*(number - min) / (max - min));
  //var color = "rgb("+place +",0,0)";
  //var color = "rgb(0,"+place+",0)";
  var color = "rgb("+0+","+Math.floor(place*123/255)+","+place+")";
  //console.log(place,color);
  return color;
}



/*
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
*/
