//sets the 'Right' property of a child node in an ordered children array to the value of the next child in the array
//the last child in the array keeps a null 'Right' property value
//allows for children arrays with only one child

//TODO does not allow for gaps or properly reflect a tree structure with a SMF

function setRightProperty(node){
 if(node.Children){
   var childNode, children = node.Children;
   for(var i=0; i < children.length; i++){
     childNode = children[i];
     if(i < children.length-1){
       childNode.Right = children[i+1].name;
       console.log("setting", childNode.name, "Right to", children[i+1].name);
     }
     setRightProperty(childNode);
   }
 }
}

var r2_1 = {Right:null, name:"2_1"};
var r2_2 = {Right:null, name:"2_2"};
var r2_3 = {Right:null, name:"2_3" };

var r1_1 = {Right:null, name:"1_1", Children:[r2_1, r2_2, r2_3]};
var r1_2 = {Right:null, name:"1_2", Children:[]};
var r1_3 = {Right:null, name:"1_3", Children:[r2_3]};

var RootNode = {
  Children: [r1_1, r1_2, r1_3]
};

setRightProperty(RootNode);


//still only checks the children in the adjacent parent node up to a shallow level
function setRightProperty2(node, rightSibling){
 if(node.Children){
   var childNode, children = node.Children, rightChild = null;
   for(var i=0; i < children.length; i++){
     childNode = children[i];
     if(i < children.length-1){
       rightChild = children[i+1];
       childNode.Right = rightChild;
     //if the last node check any rightSibling
     }else if(rightSibling && rightSibling.children){
       childNode.Right = rightSibling.children[0];
     }
     setRightProperty(childNode, rightChild);
   }
 }
}
