/*
Assume a dynamic string such as:
     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, lorem ipsum sunt in culpa qui officia deserunt mollit anim id est laborum

Taking N consecutive words together, find the top X most frequent.

For example if N=2, we should take words by pairs, and count occurrences of:
	“Lorem ipsum”  -> count = 2
	“ipsum dolor”  -> count = 1
	“dolor sit”    -> count = 1
	...

Finally we would return the most frequent X results.

Note: code should be optimized.
*/

//WIP

function getNumConsecutiveWords(numConsecutive, string){
  //check there is at least a numConsecutive value of 1
  if(numConsecutive < 1){
    return 'numConsecutive must be >= 1';
  }

  //clean '.'s and ','s and uppercase from the string
  string = string.replace(/[,.]/g, '').toLowerCase();

  var i, j, k;

  //create an array of words from the string
  var arr = string.split(' ');

  //arr length adjusted for the size of the occurrence
  var arrLimit = arr.length - (numConsecutive-1);

  //a record to store the results
  var record = {};

  //loop thru the array with each word as the starting point for the occurrence
  for (i = 0; i < arrLimit; i++){

    //create a sub array of the occurrence group
    var occ = [], n = 0;
    while (true) {
      occ.push(arr[i+n]);
      if(n === numConsecutive-1){
        break;
      }
      n++;
    }

    var occString = occ.join(' '), occlen;

    //check you haven't already processed this occurrence
    if(!record[occString]){
       //now loop through the array again, looking for this occurrence
       for (j = 0; j < arrLimit; j++){
          var match = true;
          //inner loop compares the occurrence
          for (k = 0, occlen = occ.length; k < occlen; k++){
            if(occ[k] !== arr[j+k]){
              match = false;
              break;
            }
          }

         //if you find a match, store it in the record
         if(match){
           if(record[occString]){
             record[occString]++;
           }else{
             record[occString] = 1;
           }
         }
       }
    }
  }

  //sort the record into an array - can have holes
  var sortedRecord = [], r, n;
  for (r in record){
    n = record[r];
    if(sortedRecord[n]){
      sortedRecord[n].push(r);
    }else{
      sortedRecord[n] = [r];
    }
  }

  //display the results in descending order
  var resArrIndex = sortedRecord.length, resArr, resArrLen, resIndex
  while (resArrIndex--){
    resArr = sortedRecord[resArrIndex];
    if(resArr){
      for(resIndex = 0, resArrLen = resArr.length; resIndex < resArrLen; resIndex++){
        console.log(resArr[resIndex], '-> count =', resArrIndex);
      }
    }
  }
}

getNumConsecutiveWords(2, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, lorem ipsum sunt in culpa qui officia deserunt mollit anim id est laborum");
