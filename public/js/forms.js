//redirect to hompage if user is logged on
window.onload = () => {
    if (sessionStorage.user) {
        // if (compareToken(user.authToken, user.email)) {
            location.replace("/");            
        // }        
    }
}

const pageloader = document.querySelector(".loader")

const submitForm = document.querySelector(".submitButton");
const nameValue = document.querySelector("#name") || null;
const emailValue = document.querySelector("#email");
const passwordValue = document.querySelector("#password");
const numberValue = document.querySelector("#number") || null;
const termsAndConditions = document.querySelector("#termsAndConditions") || null;
const notification = document.querySelector("#notification") || null;



submitForm.addEventListener("click", () => {
    if (nameValue != null) {
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
              }).then(response => {
                // Assuming response contains information about the successful signup,
                // you can redirect to "index.html" here
                if (response.name && response.email) {
                  window.location.href = "/index.html";
                }
              });
          }        
    } else{
        //login
        if (!emailValue.value.length || !passwordValue.value.length) {
            showAlert("fill all the inputs");          
        }else {
            pageloader.style.display = "block";
              sendData("/login", {
                  
                  email: emailValue.value,
                  password: passwordValue.value,
                  
                }).then(response => {
                    // Assuming response contains information about successful login,
                    // you can redirect to "index.html" here
                    if (response.name && response.email) {
                      window.location.href = "/index.html";
                    }
                  });
        }
    }
  });


 //send data
const sendData = () => {
    
  };
  
  

  const processData = (data) => {
    pageloader.style.display = null;
    if (data.alert) {
        showAlert(data.alert)
    }else if(data.name){
        //create auth
        // data.authToken = generateToken(data.email);
        sessionStorage.user = JSON.stringify(data);
        location.replace("/admin")
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





