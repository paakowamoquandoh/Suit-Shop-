let loader = document.querySelector(".loader");

const sellerApplicant = document.querySelector(".sellerUser");
const productList = document.querySelector("#productListing");
const applicationForm = document.querySelector(".applicationForm");
const showApplication = document.querySelector("#applyBtn");

window.onload = () => {
  if (sessionStorage.user) {
    let user = JSON.parse(sessionStorage.user);
    if (sessionStorage.user) {
      if (!user.admin) {
        sellerApplicant.classList.remove("hide");
        applicationForm.classList.add("hide");
      } else {
        productList.classList.remove("hide");
        applicationForm.style.display = "none"
      }
    }
  } 
};

showApplication.addEventListener("click", () => {
  sellerApplicant.classList.add("hide");
  applicationForm.classList.remove("hide");
});

//submission
const applyFormButton = document.querySelector("#applicationFormBtn");
const businessName = document.querySelector("#businessName");
const address = document.querySelector("#addBusiness");
const about = document.querySelector("#about");
const number = document.querySelector("#number");
const tAndC = document.querySelector("#termsAndConditions");
const validInfo = document.querySelector("#validInfo");

const showAlert = (msg) => {
  let alertArea = document.querySelector(".alertArea");
  let alertMessage = document.querySelector(".errorText");
  alertMessage.innerHTML = msg;
  alertArea.classList.add("show");
  setTimeout(() => {
    alertArea.classList.remove("show");
  }, 3000);
};





applyFormButton.addEventListener("click", () => {
  if (
    !businessName.value.length ||
    !address.value.length ||
    !about.value.length ||
    !number.value.length
  ) {
    showAlert("fill all the Inputs");
  } else if (!tAndC.checked || !validInfo.checked) {
    showAlert("you must agree to our terms and conditions");
  } else {
    //making server request
    loader.style.display = "block";
    window.location.href = "/search.html";
  }
});
