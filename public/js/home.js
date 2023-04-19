const productContainers = [...document.querySelectorAll(".products")];
const next = [...document.querySelectorAll(".nextBtn")];
const previous = [...document.querySelectorAll(".previousBtn")];

productContainers.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    next[i].addEventListener("click", () => {
        item.scrollLeft += containerWidth;
    })

    previous[i].addEventListener("click", () =>{
        item.scrollLeft -= containerWidth
    })
})