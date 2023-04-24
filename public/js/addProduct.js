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
let uploadImages = document.querySelectorAll(".fileUpload");
let imagePaths = []; // image path storage


uploadImages.forEach((fileUpload,index) => {
    fileUpload.addEventListener("change", () => {
        const file = fileUpload.files[0];
        let imageUrl;

        // if(file.type.includes("image")){
        //     fetch("/S3url").then(res => res.json())
        //     .then(url => {
        //         fetch(url, {
        //             method: "PUT",
        //             headers: new Headers({"Content-Type": "multipart/form-data"}),
        //             body: file
        //         }).then(res => {
        //             imageUrl = url.split("?")[0];
        //             imagePaths[index] = imageUrl;
        //             console.log(imageUrl);
        //         }) 
        //     })
        // }
    })
})