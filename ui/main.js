console.log('Loaded main.js!');
//alert("Hi(2)");
//var element=document.getElementById("divForJs");
//element.innerHTML="Changed original using javascript !";

//var element2=document.getElementById("divForMovingImgbyJs");
//            element2.onclick=function(){
//                element2.style.marginLeft='100px';
//            };

var button=document.getElementById("buttonName");
var span=document.getElementById("spanName");
var cnt=0;
button.onclick=function(){
    cnt=cnt+1;
    span.innerHTML=cnt.toString();
};