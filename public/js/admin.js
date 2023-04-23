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
  } else {
    location.replace("/login");
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

//send data
const sendData = (path, data) => {
  fetch(path, {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((response) => {
      processData(response);
    });
};

const processData = (data) => {
  console.log(data);
  loader.style.display = null;
  if (data.alert) {
    showAlert(data.alert);
  } else if (data.name) {
    //create auth
    // data.authToken = generateToken(data.email);
    sessionStorage.user = JSON.stringify(data);
    location.replace("/");
  } else if (data == true) {
    //admin page
    let user = JSON.parse(sessionStorage.user);
    user.admin = true;
    sessionStorage.user = JSON.stringify(user);
    location.reload();
  }
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
    sendData("/admin", {
      name: businessName.value,
      address: address.value,
      about: about.value,
      number: number.value,
      tAndC: tAndC.checked,
      validInfo: validInfo.checked,
      email: JSON.parse(sessionStorage.user).email,
    });
  }
});
