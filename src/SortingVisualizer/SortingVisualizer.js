import React, { Component } from 'react';

import './SortingVisualizer.css';
import * as sortingAlgorithms from '../sortingAlgorithms/sortingAlgorithms';

class SortingVisualizer extends Component {

  state = {
    array: []
  }

  componentDidMount = () => {
    this.resetArray();
  }

  resetArray = () => {
    const arr = [];
    for (let i=0; i < 300; i++) {
      arr.push(randomIntFromInterval(10, 600));
    }

    this.setState({ array: arr });
  }

  mergeSort = () => {
    const jsSorted = this.state.array.slice().sort((a,b) => a-b);
    const sortedArr = sortingAlgorithms.mergeSort(this.state.array);

    console.log(areArraysEqual(jsSorted, sortedArr));
  }

  testSortingAlgorithms = () => {
    for(let i=0; i<100; i++) {
      const array = [];
      const bound = randomIntFromInterval(1, 1000);
      for(let j=0; j < bound; j++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const jsSorted = array.slice().sort((a,b) => a-b);
      const sortedArr = sortingAlgorithms.mergeSort(array);
      console.log(areArraysEqual(jsSorted, sortedArr));
    }
  }

  render() {
    const {array} = this.state;

    return (
      <div className="arr-container">
        {array.map((value, idx) => (
          <div 
            className="arr-bar" 
            key={idx}
            style={{height: `${value}px`}}></div>
        ))}
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.testSortingAlgorithms()}>Test Sorts</button>
      </div>
    );

  }

}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max-min+1) + min);
}

function areArraysEqual(arrOne, arrTwo) {
  if (arrOne.length !== arrTwo.length) return false;
  for (let i=0; i<arrOne.length; i++) {
    if (arrOne[i] !== arrTwo[i]) return false;
  }
  return true;
}

export default SortingVisualizer;