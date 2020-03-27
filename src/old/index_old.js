import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Bars extends React.Component {
  render() {
    var rows = [];
    for (var i = 0; i < this.props.values.length; i++) {
      rows.push(<div id="bar" style={{ height: this.props.values[i] * 5 }} />);
    }
    return rows;
  }
}

class SortButton extends React.Component {
  render() {
    return <button onClick={() => this.props.randomizebars()}>Sort</button>;
  }
}

class Visualizer extends React.Component {
  constructor() {
    super();
    this.state = {
      bar_values: GenerateBars(150)
    };
  }
  randomizebars() {
    this.setState({ bar_values: GenerateBars(150) });
  }
  render() {
    return (
      <div id="UI_container">
        <div id="button_container">
          <SortButton randomizebars={() => this.randomizebars()} />
        </div>
        <div id="bar_container">
          <Bars values={this.state.bar_values} />
        </div>
      </div>
    );
  }
}

function GenerateBars(len, min, max) {
  var lst = [];
  for (var i = 0; i < len; i++) {
    lst.push(getRandomInt(5, 150));
  }

  return lst;
}

ReactDOM.render(<Visualizer />, document.getElementById("root"));

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
