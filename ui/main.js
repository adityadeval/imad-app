console.log('Loaded main.js!');
//alert("Hi(2)");

/*
var element=document.getElementById("divForJs");
element.innerHTML="Changed original using javascript !";
*/

/*
var element2=document.getElementById("divForMovingImgbyJs");
            element2.onclick=function(){
                element2.style.marginLeft='100px';
            };
*/

/*
var button=document.getElementById("buttonName");
var span=document.getElementById("spanName");
var cnt=0;
button.onclick=function(){
    cnt=cnt+1;
    span.innerHTML=cnt.toString();
};
*/

var button=document.getElementById("buttonName");
var span=document.getElementById("spanName");
button.onclick=function(){
  
  var request=new XMLHttpRequest();
  request.open('GET','http://adityadeval27.imad.hasura-app.io/counter',true);
  request.send(null);
  
  request.onreadystatechange=function(){                //if request state changes execute this function
       if(request.readyState==XMLHttpRequest.DONE){     //if current state of request = successfully completed    
           if(request.status===200){                    //request has successfully completed
               var cnt=request.responseText;            //request.responseText gives access to the response value(a number in this case)
               span.innerHTML=cnt.toString();
           }
       }          
  };
};