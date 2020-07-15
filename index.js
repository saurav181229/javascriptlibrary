console.log('hello ')

let i=0;

//constructor 
function Book(name,author,type){
    this.name=name;
    this.author=author;
    this.type=type;
}

//display constructor 
function Display(){

}

let d1=new Display();


Display.prototype.showBook=function(book){    //to get each book and store it in local storage

    key=localStorage.getItem('key');
    let obj=[];
    if(key==null){
     obj=[];
    }
    else {
   
    obj=JSON.parse(key);   //string to obj
    }
    obj.push(book);
    console.log(obj);
    localStorage.setItem('key',JSON.stringify(obj)); //makes the object as string an stores it in the local object for easy retrieval



}


Display.prototype.show=function(){        // display the contents when the page is reloaded

    let obj=[]
    key=localStorage.getItem('key');
    if(key==null){
      console.log('error');  
       }
       else {
     
        obj=JSON.parse(key);  //converts the local storage string into object which can be iterated 
     
       
       let tableBody=document.getElementById('tableBody');
       let ulString='';
      Array.from(obj).forEach(function (element,index) {
          
         ulString=` <tr>
        
        <td>${element.name}</td>
        <td>${element.author}</td>
        <td>${element.type}</td>
    </tr>`
      tableBody.innerHTML+=ulString
      })
     
     
       
    
    
    }
    }

d1.show();

Display.prototype.add=function(book){     //add each book to the screen
 
        

i+=1;
    let tableBody=document.getElementById('tableBody');
    let uiString=` <tr>
    <td>${book.name}</td>
    <td>${book.author}</td>
    <td>${book.type}</td>
</tr>
`

tableBody.innerHTML+=uiString;
}


Display.prototype.clear=function(){       //to clear the enteries after the book has been added
    let libraryForm=document.getElementById('libraryForm');
    libraryForm.reset();
} 

Display.prototype.validate = function (book) {  // validates the credentials entered by the user
    if (book.name.length >2 || book.author.length >2) {
        return true
    }
    else {
        return false;
    }
}

Display.prototype.message=function(type,displayMessage){

 let message =document.getElementById('message')
 
 message.innerHTML=
 `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
     <strong>message:</strong>${displayMessage} 
     <button type="button" class="close" data-dismiss="alert" aria-label="Close">
       <span aria-hidden="true">&times;</span>
     </button>
   </div>`;
   setTimeout(function(){message.innerHTML=" " },2000)


}


let libraryForm=document.getElementById('libraryForm');
libraryForm.addEventListener('submit',libraryFormSubmit);
function libraryFormSubmit(e){
console.log('you have submitted library form');
e.preventDefault();

let name = document.getElementById('bookname').value;
let author = document.getElementById('author').value;


let fiction= document.getElementById('fiction');
let programming= document.getElementById('programming');
let cooking= document.getElementById('cooking');

if(fiction.checked==true){
    type=fiction.value;
}
else if(programming.checked==true){  // checked returns true or false value depending upon the checked radio button
    type=programming.value;
}
else {
    type=cooking.value;
}



let book=new Book(name,author,type);
console.log(book);
let display= new Display();



if(display.validate(book)){

    display.add(book);
    display.clear();
    display.message('success','your book has been added successfully');
    display.showBook(book)
    
}
else {
    display.message('danger','you cannot add the book')
}

e.preventDefault();  // prevent the default behavior of the page after the form has been submitted
}
