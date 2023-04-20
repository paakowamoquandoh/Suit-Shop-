const pageloader = document.querySelector(".loader")

const submitForm = document.querySelector(".submitButton");
const nameValue = document.querySelector("#name");
const emailValue = document.querySelector("#email");
const passwordValue = document.querySelector("#password");
const numberValue = document.querySelector("#number");
const termsAndConditions = document.querySelector("#termsAndConditions");
const notification = document.querySelector("#notification");



submitForm.addEventListener("click", () => {
    if (nameValue.value.length < 3) {
      showAlert("name must 3 letters or more")
    } else if (!emailValue.value.length){
        showAlert("enter a valid email")
    }else if (passwordValue.value.length < 8) {
        showAlert("password should be 8 letters long")
    } else if (!numberValue.value.length) {
        showAlert("enter phone number");
    }else if (!Number(numberValue.value) || numberValue.value.length < 10) {
        showAlert("invalid number, please enter valid number")
    }else if (!termsAndConditions.checked) {
        showAlert("you must agree to our terms and conditions");
    }else{
        //submit form
        pageloader.style.display = "block";
        sendData("/signup", {
            name: nameValue.value,
            email: emailValue.value,
            password: passwordValue.value,
            number: numberValue.value,
            termsAndConditions: termsAndConditions.checked,
            notification: notification.checked,
            seller: false
        })
    }
  });


  //send data
  const sendData = (path, data) => {
     fetch(path, {
        method: "post",
        headers: new Headers({"Content-Type": "application/json"}),
        body: JSON.stringify(data)
     }).then((res) => res.json())
     .then(response => {
        processData(response);
     })
  };

  const processData = (data) => {
    pageloader.style.display = null;
    if (data.alert) {
        showAlert(data.alert)
    }
  }


//alerf function
const showAlert = (msg) => {
    let alertArea = document.querySelector(".alertArea");
    let alertMessage = document.querySelector(".errorText");
    alertMessage.innerHTML = msg;
    alertArea.classList.add("show");
    setTimeout(() => {
        alertArea.classList.remove("show");
    }, 3000);
}