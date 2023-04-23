let user = JSON.parse(sessionStorage.user || null);
let loader = document.querySelector(".loader");

//check user
window.onload = () => {
    if(user){
        if(!user.email){
            location.replace("/login");
        }
    }else {
        location.replace("./login");
    }
}

//product prices
const actualPrice = document.querySelector("#actualPrice");
const discountPercent = document.querySelector("#discount");
const sellingPrice = document.querySelector("#sellingPrice");

discountPercent.addEventListener("input", () => {
    if (discountPercent.value > 100) {
        discountPercent.value = 90     
    }else{
        let discount = actualPrice.value * discountPercent.value / 100;
        sellingPrice.value = actualPrice - discount;  
    }
})

sellingPrice.addEventListener("input", () => {
    let discount = (sellingPrice.value / actualPrice.value) *100;
    discountPercent.value = discount;  
})

//image upload
let uploadedImages = document.querySelectorAll(".fileUpload");
let imagePaths = []; // image path storage


fetch("/S3url").then(res => res.json())
.then(url => console.log(url));