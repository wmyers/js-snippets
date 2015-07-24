/*
Finds one array inside another using two repeat loops, and repeated
clones of a reference array of indexes.

A generally not very performant alternative to nested loops. Works
with the implicit matching provided by Array.prototype.indexOf(), however
it requires too many edge-case adjustments and repeated cloning, which make it slow.

This function could arguably be a considered an option if searching for a sequence
in a very large array that had lots of near misses. E.g. searching for ['c', 'c', 'c'] in
['c', 'c', 'd', 'c', 'c', 'd', 'c', 'c', 'd', 'c', 'c', 'd', 'c', 'c', 'd', ...a few thousand indexes later... 'c', 'c', 'c']
*/

var findABArrayMatchCount = function (a, b) {

  //a master copy array of b-array item indexes
  var i, xs = [], nx, blen;
  for (i = 0, blen = b.length; i < blen; i++){
    nx = b.indexOf(b[i]);
    if(xs[nx]){
      xs[nx].unshift(i);
    }else{
      xs[nx] = [i];
    }
  }

  //helper for copying one-level nested arrays
  var copyArr = function(arr){
    var carr =  arr.map(function(narr) {
        return narr.slice();
    });
    return carr;
  };

  //mc - match-count
  //ax - index of a-item in b-array
  //bx - b-array item index
  //bxs - b-array item index array
  //bxxs - b-array item index arrays

   var alen, mc = 0, bx, ax, bxs, bxxs = copyArr(xs);
   for (i = 0, alen = a.length; i < alen; i++){
      ax = b.indexOf(a[i]);
      bxs = bxxs[ax] || [-1];
      bx = bxs.pop();
      if(bx === 0){
         mc = 1;
      }else if(bx === mc){
         mc++;
      }else{
         mc = 0;
         bxxs = copyArr(xs);
         //if re-starting partway thru
         if(ax === 0){
           bxxs[0].pop();
           mc = 1;
         }
      }
      if(mc === blen){
        return i - ( mc-1 );
      }
   }
   return -1;
}
