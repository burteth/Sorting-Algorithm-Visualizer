import React from "react";
import Bars from "./Bars";

import run_quicksort from "./QuickSort"
import run_mergesort from "./MergeSort"
import selectionsort from "./SelectionSort"
import bubblesort from "./BubbleSort"

var num_bars = 200;
const min_bar = 10;
const max_bar = 500;
//const color1 = '#007bff'; (0, 123, 255)
const speed_max = 100;
const highlight_color = "red";
const gradient = false;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bar_list: GenerateBars(num_bars, min_bar, max_bar)
    };

  }

  componentDidMount() {

    this.stopCurrentSort = this.stopCurrentSort.bind(this);
    this.updatebars = this.updatebars.bind(this);
    this.updateBarsFromState = this.updateBarsFromState.bind(this);
    this.clearCounters = this.clearCounters.bind(this);
    this.timeouts = [];

  }

  clearCounters = () => {
    document.getElementById('compairsons').innerText = 0;
    document.getElementById('swaps').innerText = 0;
    document.getElementById('total_ops').innerText = 0;
  }

  randomizebars = () => {
    this.stopCurrentSort();
    this.setState({
      bar_list: GenerateBars(num_bars, min_bar, max_bar)
    });
    this.clearCounters();

  }

  //Update the bars based on the current state of bar_list
  updateBarsFromState = () => {

    var bar_docs = document.getElementsByClassName("bar");
    var current_bars = []
    for (var j = 0; j < bar_docs.length; j++) {
      current_bars.push({
        color: bar_docs[j].style.backgroundColor,
        id: j,
        len: parseInt(bar_docs[j].style.height)
      })
    }
    this.setState({bar_list: current_bars});

  }

  //Interrupts the current sorting process
  stopCurrentSort = () => {

    //Clear all timeouts
    for (var i = 0; i < this.timeouts.length; i++) {
      clearTimeout(this.timeouts[i]);
    }

    //Remove the bars that are currently red
    var bar_docs = document.getElementsByClassName("bar");
    for (var i = 0; i < bar_docs.length; i++) {
      if (bar_docs[i].style.backgroundColor === highlight_color) {
        bar_docs[i].style.backgroundColor = colorpernum(min_bar, max_bar, parseInt(bar_docs[i].style.height));
      }
    }

    //Update the current state with the bars that are visable
    this.updateBarsFromState();
  }

  render() {
    const {bar_list} = this.state;

    return (<div>
      <div id="UI_container">
        <div className="header">
          <div id="banner">
            <h1>Sorting Algorithm Visualizer</h1>
          </div>
          <div id="button_container">
            <button className="navbar_btn" onClick={() => this.randomizebars()}>Randomize</button>
            <button className="navbar_btn" onClick={() => this.updatebars(selectionsort(JSON.parse(JSON.stringify(this.state.bar_list))))}>Selection Sort</button>
            <button className="navbar_btn" onClick={() => this.updatebars(run_mergesort((JSON.parse(JSON.stringify(this.state.bar_list)))))}>Merge Sort</button>
            <button className="navbar_btn" onClick={() => this.updatebars(run_quicksort((JSON.parse(JSON.stringify(this.state.bar_list)))))}>Quick Sort</button>
            <button className="navbar_btn">Heap Sort</button>
            <button className="navbar_btn" onClick={() => this.updatebars(bubblesort(JSON.parse(JSON.stringify(this.state.bar_list))))}>Bubble Sort</button>
          </div>
        </div>
        <div className="bars_and_data">

          <div id="data_viz_outer">
            <div id="data_viz">

              <div id="counter_container">
              <div>
                <div className="data_header">Number of compairsons
                  <div className="data_caption" id="compairsons">0</div>
                </div>
              </div>
              <div>
                <div className="data_header">Number of swaps
                  <div className="data_caption" id="swaps">0</div>
                </div>
              </div>
              <div>
                <div className="data_header">Total number of operations
                  <div className="data_caption" id="total_ops">0</div>
                </div>
              </div>
              </div>

              <div id="range_container">

                <div className="data_header">Number of bars</div>
                <input type="range" className="slider" id="numberange" min="1" max="100" defaultValue="70"></input>

                <div className="data_header">Sorting Speed</div>
                <input type="range" className="slider" id="speedrange" min="50" max="100" defaultValue='75'></input>

              </div>

              <div className="control_button_container">

                <button className="control_button">Start</button>
                <button className="control_button" onClick={() => this.stopCurrentSort()}>Stop</button>

              </div>

            </div>
          </div>
          <div id="bar_container_outer">
            <Bars bar_list={bar_list}/>
          </div>
        </div>
      </div>
    </div>);
  }

  updatebars = (animations) => {

    this.clearCounters();

    this.timeouts = [];

    var bar_docs = document.getElementsByClassName("bar");
    var counter = 0;
    var k = 0;

    var temp;
    var temporary_color = [0, 0]

    var num_compairsons = 0;
    var num_swaps = 0;

    //linear
    var speed = Math.abs((((-1 * (document.getElementById("speedrange").value)) * speed_max / 100.0) + speed_max));

    //testing
    var test_init = [];
    var test_1 = set_bar_list(bar_docs);
    for (var i = 0; i < test_1.length; i++) {
      test_init.push(test_1[i]["color"])
    }
    //console.log(test_init);


    while (counter < animations.length) {



      this.timeouts.push(setTimeout(() => {
        var first_index = animations[k][0];
        var second_index = animations[k][1];

        //If the while loop has begun then change the color of the last two bars back into what they were
        if (k > 0) {

          bar_docs[animations[k - 1][0]].style.backgroundColor = temporary_color[0];
          bar_docs[animations[k - 1][1]].style.backgroundColor = temporary_color[1];

        }

        if (animations[k][2] === "compare") { //Compare the bars without swapping

          temporary_color[0] = bar_docs[first_index].style.backgroundColor;
          temporary_color[1] = bar_docs[second_index].style.backgroundColor;
          bar_docs[first_index].style.backgroundColor = highlight_color;
          bar_docs[second_index].style.backgroundColor = highlight_color;

          num_compairsons += 1;
          document.getElementById('compairsons').innerText = num_compairsons;

        } else if (animations[k][2] === "swap") { //Swap the bars out

          temp = bar_docs[first_index].style.height;
          bar_docs[first_index].style.height = bar_docs[second_index].style.height;
          bar_docs[second_index].style.height = temp;
          temporary_color[0] = bar_docs[second_index].style.backgroundColor;
          temporary_color[1] = bar_docs[first_index].style.backgroundColor;
          bar_docs[first_index].style.backgroundColor = highlight_color;
          bar_docs[second_index].style.backgroundColor = highlight_color;

          num_swaps += 1;
          document.getElementById('swaps').innerText = num_swaps;

        } else if (animations[k][2] === "mergesort swap"){
          //Only used my mergesort because the swapping is different

          //store height and color of bars that are being changed
          temporary_color[0] = bar_docs[second_index].style.backgroundColor;
          temporary_color[1] = bar_docs[second_index - 1].style.backgroundColor;
          temp = bar_docs[second_index].style.height;

          //shift up the bars one place to the right
            for (var i = second_index; i > first_index; i--) {
                bar_docs[i].style.height = bar_docs[i - 1].style.height;
                bar_docs[i].style.backgroundColor = bar_docs[i - 1].style.backgroundColor;
              }
          //update the height of the first index with the height of the second index bar
          bar_docs[first_index].style.height = temp;

          //highlight the bars being compared
          bar_docs[first_index].style.backgroundColor = highlight_color;
          bar_docs[second_index].style.backgroundColor = highlight_color;


          num_swaps += 1;
          document.getElementById('swaps').innerText = num_swaps;


        }

        if (k === animations.length - 1) {
          //This occurs if it is the final animation
          bar_docs[first_index].style.backgroundColor = temporary_color[0];
          bar_docs[second_index].style.backgroundColor = temporary_color[1];

          //update the bars in the current state
          this.setState({bar_list: set_bar_list(bar_docs)});

        }

        document.getElementById('total_ops').innerText = num_swaps + num_compairsons;

        k++;

      }, counter * speed));
      counter++;
    };

  }

}

//Helper Functions

function GenerateBars(len, min, max) {
  var lst = [];
  for (var i = 0; i < len; i++) {
    var random = getRandomInt(min, max);
    lst.push({
      id: i,
      len: random,
      color: colorpernum(min, max, random)
    });
    colorpernum(min, max, random);
  }

  return lst;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function colorpernum(min, max, number) {

  var colors = [0, 91, 246] /* Main Color */

if (gradient) {
  for (var i = 0; i < colors.length; i++) {
        colors[i] = Math.floor(colors[i] * (number - min) / (max - min));
  }
}
  var color = "rgb(" + colors[0] + "," + colors[1] + "," + colors[2] + ")";


  return color;
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}


function set_bar_list(div_bars){
    var state_bars = [];

    for (var i = 0; i < div_bars.length; i++) {
      state_bars.push({"color":div_bars[i].style.backgroundColor,"id":i,"len":parseInt((div_bars[i].style.height).slice(0,-2))});
    }
    return state_bars
}
