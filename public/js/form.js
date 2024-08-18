
(() => {
  'use strict'


const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()


let darkbtn=document.querySelector(".darkbutton");
let darkbutton=document.querySelector(".darkbtn");
let body=document.querySelector("body")
darkbtn.addEventListener("click",()=>{
let tax=document.querySelectorAll(".tax");
for(tax of tax){
  if(tax.style.display=="none"){
       tax.style.display="inline"
  }
  else{
    tax.style.display="none"
  }
}
})
darkbutton.addEventListener("click",()=>{
  let tax=document.querySelectorAll(".tax");
  for(tax of tax){
    if(tax.style.display=="none"){
         tax.style.display="inline"
    }
    else{
      tax.style.display="none"
    }
  }
  })