// export const mergeSort = (array) => {

//   if (array.length === 1) return array;

//   const middleIdx = Math.floor(array.length / 2);
//   const left = mergeSort(array.slice(0, middleIdx));
//   const right = mergeSort(array.slice(middleIdx));

//   const sortedArray = [];

//   let i=0, j=0;

//   while(i<left.length && j<right.length) {
//     if(left[i] < right[j]) {
//       sortedArray.push(left[i++]);
//     } else {
//       sortedArray.push(right[j++])
//     }
//   }

//   while (i<left.length) sortedArray.push(left[i++]);
//   while (j<right.length) sortedArray.push(right[j++]);

//   return sortedArray;
// }

export function mergeSort(array) {
  const animations = [];
  if (array.length === 1) return array;
  const auxArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxArray, animations);
  return animations;
}

// Function that divides the array in 2 parts and apply 
// the doMerge function to merge the arrays recursively.
function mergeSortHelper(
    mainArray, 
    startIdx, 
    endIdx, 
    auxArray, 
    animations
  ) {

  if(startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx)/2);
  mergeSortHelper(auxArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxArray, middleIdx+1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxArray, animations);

}

function doMerge(
    mainArray, 
    startIdx, 
    middleIdx, 
    endIdx, 
    auxArray, 
    animations
  ) {
  
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  // Iterating the array and comparing and pushing into animations array
  while (i<=middleIdx && j<=endIdx) {

    // This push is for coloring the comparing bars
    animations.push([i,j]);
    // This push is for coloring the new bars
    animations.push([i,j]);
    
    // Check which bar is smaller
    if (auxArray[i] <= auxArray[j]) {
      
      // Push the height of the smaller bar into animations array
      animations.push([k, auxArray[i]]);
      mainArray[k++] = auxArray[i++];
    
    } else {

      // Push the height of the smaller bar into animations array
      animations.push([k, auxArray[j]]);
      mainArray[k++] = auxArray[j++];
    
    }
  }

  // Checking for the rest of the elements in left array
  while (i<=middleIdx) {

    // This push is for coloring the comparing bars
    animations.push([i, i]);
    // This push is for coloring the new bars
    animations.push([i, i]);
    // Push the height of the smaller bar into animations array
    animations.push([k, auxArray[i]]);

    mainArray[k++] = auxArray[i++];
  }

  while (j<=endIdx) {
    
    // This push is for coloring the comparing bars
    animations.push([j, j]);
    // This push is for coloring the new bars
    animations.push([j, j]);
    // Push the height of the smaller bar into animations array
    animations.push([k, auxArray[j]]);

    mainArray[k++] = auxArray[j++];
  }
}