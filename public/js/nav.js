const mobileMenu = document.getElementById("mobileMenu");
const navMenuItems = document.getElementById("navItems");
const navMenuClose = document.getElementById("mobileMenuClose");
const shopICon = document.querySelector(".mobileNav");
const shopBagde = document.querySelector(".cartBox");
const secondNav = document.querySelector(".secondHeader");
const userIcon = document.querySelector(".personIcon");


// Mobile and Tablet NAvbar implementation//
if (mobileMenu) {
   mobileMenu.addEventListener("click", () => {
       navMenuItems.classList.add("active");
       userIcon.style.display = "flex"; 
       mobileMenu.style.display = "none";
       shopICon.style.display = "none";
       shopBagde.style.display = "none";
       secondNav.style.display = "none"
       navMenuClose.style.display = "flex"; 
   })    
}


if (navMenuClose) {
 navMenuClose.addEventListener("click", () => {
      navMenuItems.classList.remove("active");
      mobileMenu.style.display = "flex" 
      shopICon.style.display = "flex";     
      secondNav.style.display = "flex" 
      userIcon.style.display = "none"; 
    })
}