import React, { Component } from 'react';

import './SortingVisualizer.css';
import * as sortingAlgorithms from '../sortingAlgorithms/sortingAlgorithms';

// Speed const for sorting in milli-second
const SPEED = 3

class SortingVisualizer extends Component {

  state = {
    array: []
  }

  // Reset the array when the app is reloaded
  componentDidMount = () => {
    this.resetArray();
  }

  // Function to reset the array
  resetArray = () => {
    const arr = [];
    for (let i=0; i < 300; i++) {
      arr.push(randomIntFromInterval(10, 600));
    }

    this.setState({ array: arr });
  }

  // Merge Sort function
  mergeSort = () => {
    const animations = sortingAlgorithms.mergeSort(this.state.array);

    // For every element in triplet in animations, we check the position of that element in that triplet
    // and then change color if position is 0 or 1 but if position is 2 then we swap the bars.
    for(let i=0; i < animations.length; i++) {
      // Getting all bars
      const arrayBars = document.getElementsByClassName('arr-bar');
      // Checking if we need to change color or not
      const isColorChange = i % 3 !== 2;
      
      // If yes, then access the DOM and change color
      if (isColorChange) {
        
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;

        // Change color to red, if we are comparing them
        // Change color to blue, if bars are new in comparison
        const color = i % 3 === 0 ? "red" : "#3498db";

        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * SPEED);
      
      } else {

        // We overwrite the height of the first bar
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * SPEED);
      
      }
    }

  }

  // Function to check the sorting algorithm
  testSortingAlgorithms = () => {
    for(let i=0; i<100; i++) {
      // Creating a new array everytime
      const array = [];
      // Providing a new upper bound to length of the array
      const bound = randomIntFromInterval(1, 1000);
      for(let j=0; j < bound; j++) {
        // Populating the array
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

// Function to check if arrays are equal or not
function areArraysEqual(arrOne, arrTwo) {
  if (arrOne.length !== arrTwo.length) return false;
  for (let i=0; i<arrOne.length; i++) {
    if (arrOne[i] !== arrTwo[i]) return false;
  }
  return true;
}

export default SortingVisualizer;