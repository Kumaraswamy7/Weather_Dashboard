let theme1 = document.querySelector(".theme1");
let theme2= document.querySelector(".theme2")
const sun = document.querySelector(".sun");
const moon = document.querySelector(".moon");

theme1.addEventListener("click",()=>{
  sun.classList.add("hide");
   setTimeout(()=> {
   theme1.style.display = 'none';
   theme2.style.display = 'inline';
   theme2.style.animation = "slide-in 2s ease-out 1s infinite alternate forwards";
   },500);
});
theme2.addEventListener("click",()=>{
  moon.classList.add("hide");
  setTimeout(() => {
   theme1.style.display = 'inline';
   theme2.style.display = 'none';
   sun.classList.remove("hide");
   moon.classList.remove("hide");
  }, 300);
});