const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});
sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});
const signUpForm = document.querySelector("#formsignup");
const signInForm = document.querySelector("#formlogin");
// -----------signup--------------
signUpForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let name = document.querySelector("#signup_name").value;
    let email = document.querySelector("#signup_email").value;
    let mobile = document.querySelector("#signup_mobile").value;
    let password = document.querySelector("#signup_password").value;
    //   let role = document.querySelectorAll("#signup_user_type");
    const userTypeRadios = document.getElementsByName("userType");
    let selectedValue = "";
    for (const radio of userTypeRadios) {
        if (radio.checked) {
            role = radio.value;
            break;
        }
    }
    if (
        name == "" ||
        email == "" ||
        mobile == "" ||
        password == "" ||
        role === ""
    ) {
        alert("Please fill the form");
    } else {
        let obj = {
            name,
            email,
            mobile,
            password,
            role,
        };
        console.log(obj);
        signup_fetch(obj);
    }
});
let url = "https://legal-guidance.onrender.com/"
async function signup_fetch(obj) {
    try {
        let responce = await fetch(`${url}user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(obj),
        });
        if (responce.ok) {
            let res = await responce.json();
            alert(res.message);
            window.location.reload();
            console.log("hello");
            console.log(res);
        }
    } catch (error) {
        console.log("error", error);
        alert("Something Went Wrong");
    }
}
// ---------------login--------------------------
signInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let email = document.querySelector("#login_email").value;
    let password = document.querySelector("#login_password").value;
    if (email == "" && password == "") {
        alert("Fill the all credentials");
    } else {
        let obj = { email, password };
        loginFetch(obj);
    }
});
async function loginFetch(obj) {
    try {
        let responce = await fetch(`${url}user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(obj),
        });
        if (responce.ok) {
            let ans = await responce.json();
            if (ans.userData.role === "lawyer") {
                window.location.replace("../LawyersPage/lawyer.html");
            } else if (ans.userData.role === "client") {
                window.location.replace("../Clients/lawyers.card.html");
            } else {
                window.reload();
            }
            localStorage.setItem("auth", JSON.stringify(ans));
            ans.lawyer._id && localStorage.setItem("lawyerId", ans.lawyer._id);
        }
    } catch (error) {
        console.log(error);
    }
}