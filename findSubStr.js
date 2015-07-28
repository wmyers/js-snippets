function subStringFinder(str, subStr){

  var idx = 0, //the starting index of the subStr in str, if it exists
      indx_off = 0, //the offset of a potential starting point in a previous check
      j = 0, // count for subStr
      ii = 0, //the string index with an offset applied
      len = str.length,
      subLen = subStr.length,
      startVal = subStr[0],
      lastIndx = len-subLen;

   while(true){

      //if the current char in the str is equal to the j-index of subStr
      if(str[ii] == subStr[j]){

//          console.log('matching', str[ii], 'to', subStr[j]);


         //check if a non-starting char is a potential starting char
         //allows for 0-index, can only be done once per subStr check
         if(str[ii] == startVal && j > 0 && indx_off == 0){
            indx_off = j;
//             console.log('calculating new starting offset', indx_off, 'at', ii);
         }


         //advance j by 1 to check the next i char
//          console.log('advancing j by 1');

         j++;



      }else{

         if(j > 0){
            //reset j
            j = 0;

            //starting again here, so check if you came across any non-0 position
            //potential starting points that could also have been part of the sequence
            //and apply them to your last starting point and make that the current
            //starting point

//             console.log('applying offset, resetting ii from', ii, 'to', (idx  + indx_off));

            if(indx_off > 0){
               ii = idx  + indx_off;
            }


//             console.log('ii is now ', ii);

            //reset indx_off
            indx_off = 0;
         }

      }

      //now update the index count
      //need to update here because the next checks effectively refer to the the next 'round'
      ii ++;

      //now check for a starting point or a match
      if(j == 0){
        //store the possibly correct return value whenever j is 0
        //this is also the CURRENT STARTING POINT
        idx = ii;
      }else if (j == subLen){
        // if j reaches the same value as subLen then you have a match
        return idx;
      }

      //or check if you have gone out of range
      if(idx > lastIndx){
         return -1;
      }
  }

}

//need to fix bug for stopping and restarting partway thru

//i.e. it finds a potential match and then continues thru
//the string, only to find it doesn't work out later, by which
//time it has passed the index in str where it should have started

//the fix for this is to make sure any potential starting value is
//tested for a match from 0

var moby = "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people's hats off—then, I account it high time to get to sea as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the ship. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the ocean with me. There now is your insular city of the Manhattoes, belted round by wharves as Indian isles by coral reefs—commerce surrounds it with her surf. Right and left, the streets take you waterward. Its extreme downtown is the battery, where that noble mole is washed by waves, and cooled by breezes, which a few hours previous were out of sight of land. Look at the crowds of water-gazers there. Circumambulate the city of a dreamy Sabbath afternoon. Go from Corlears Hook to Coenties Slip, and from thence, by Whitehall, northward. What do you see?—Posted like silent sentinels all around the town, stand thousands upon thousands of mortal men fixed in ocean reveries. Some leaning against the spiles; some seated upon the pier-heads; some looking over the bulwarks of ships from China; some high aloft in the rigging, as if striving to get a still better seaward peep. But these are all landsmen; of week days pent up in lath and plaster—tied to counters, nailed to benches, clinched to desks. How then is this? Are the green fields gone? What do they here? But look! here come more crowds, pacing straight for the water, and seemingly bound for a dive. Strange! Nothing will content them but the extremest limit of the land; loitering under the shady lee of yonder warehouses will not suffice. No. They must get just as nigh the water as they possibly can without falling in. And there they stand—miles of them—leagues. Inlanders all, they come from lanes and alleys, streets and avenues—north, east, south, and west. Yet here they all unite. Tell me, does the magnetic virtue of the needles of the compasses of all those ships attract them thither? Once more. Say you are in the country; in some high land of lakes. Take almost any path you please, and ten to one it carries you down in a dale, and leaves you there by a pool in the stream. There is magic in it. Let the most absent-minded of men be plunged in his deepest reveries—stand that man on his legs, set his feet a-going, and he will infallibly lead you to water, if water there be in all that region. Should you ever be athirst in the great American desert, try this experiment, if your caravan happen to be supplied with a metaphysical professor. Yes, as every one knows, meditation and water are wedded for ever. But here is an artist. He desires to paint you the dreamiest, shadiest, quietest, most enchanting bit of romantic landscape in all the valley of the Saco. What is the chief element he employs? There stand his trees, each with a hollow trunk, as if a hermit and a crucifix were within; and here sleeps his meadow, and there sleep his cattle; and up from yonder cottage goes a sleepy smoke. Deep into distant woodlands winds a mazy way, reaching to overlapping spurs of mountains bathed in their hill-side blue. But though the picture lies thus tranced, and though this pine-tree shakes down its sighs like leaves upon this shepherd's head, yet all were vain, unless the shepherd's eye were fixed upon the magic stream before him. Go visit the Prairies in June, when for scores on scores of miles you wade knee-deep among Tiger-lilies—what is the one charm wanting?—Water—there is not a drop of water there! Were Niagara but a cataract of sand, would you travel your thousand miles to see it? Why did the poor poet of Tennessee, upon suddenly receiving two handfuls of silver, deliberate whether to buy him a coat, which he sadly needed, or invest his money in a pedestrian trip to Rockaway Beach? Why is almost every robust healthy boy with a robust healthy soul in him, at some time or other crazy to go to sea? Why upon your first voyage as a passenger, did you yourself feel such a mystical vibration, when first told that you and your ship were now out of sight of land? Why did the old Persians hold the sea holy? Why did the Greeks give it a separate deity, and own brother of Jove? Surely all this is not without meaning. And still deeper the meaning of that story of Narcissus, who because he could not grasp the tormenting, mild image he saw in the fountain, plunged into it and was drowned. But that same image, we ourselves see in all rivers and oceans. It is the image of the ungraspable phantom of life; and this is the key to it all."
// var mobyArr = moby.split(' ');

var haystack = ['a', 'a', 'b', 'c', 'c', 'd', 'd', 'e', 'c', 'c', 'd', 'e', 'e', 'c', 'c', 'd', 'e', 'c', 'c'];
var needle = ['e', 'c', 'c', 'd', 'e', 'c'];

// var needle = ['a', 'a', 'b', 'c', 'c'];

var t1 = new Date().getTime();

// console.log(subStringFinder('abbcdabbbbbck', 'bbbck'));
// console.log('result', subStringFinder(mobyArr, mobyArr));
console.log('result', subStringFinder(moby, 'Whenever I find myself growing grim'));

// console.log(subStringFinder(haystack, needle));
var t2 = new Date().getTime();
console.log(t2 - t1, 'ms');