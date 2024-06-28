const menuButton = document.getElementById("menuButton");
const buttonIcon = document.getElementById("butIcon");
const menuButton1 = document.getElementById("floatBut1");
const menuButton2 = document.getElementById("floatBut2");
const menuButton3 = document.getElementById("floatBut3");
let buttons = [];
buttons.push(menuButton1,menuButton2,menuButton3);
let menuOpen = false;
document.addEventListener('DOMContentLoaded', () => {
    buttonIcon.innerHTML = `<i class="fa-solid fa-angles-right"></i>`;

});

function menuswitch() {
  if (!menuOpen) {
    buttonIcon.innerHTML = `<i class="fa-solid fa-angles-up"></i>`;
    buttons.forEach((button)=>{
        button.classList.remove('floatBut-hide');
        button.classList.add('floatBut-show');
    });
    menuOpen = !menuOpen;
  }else{
    buttonIcon.innerHTML = `<i class="fa-solid fa-angles-right"></i>`;
    buttons.forEach((button)=>{
        button.classList.add('floatBut-hide');
        button.classList.remove('floatBut-show');
    });
    menuOpen = !menuOpen;
  }
}
