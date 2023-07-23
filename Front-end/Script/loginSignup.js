const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

// -----------signup--------------
let loginForm = document.querySelector(".sign-in-form");
document.querySelector("#form").addEventListener("submit", function (e) {
    e.preventDefault()
    let name = document.querySelector("#name").value
    let email = document.querySelector("#email").value
    let number = document.querySelector("#phonenum").value
    let password = document.querySelector("#pass").value
    if (name == "" || email == "" || number == "" || password == "") {
        alert("Please fill the form")
    } else {
        let obj = { name, email, password, role: "user" };
        console.log(obj)
        signup_fetch(obj)
    }
})

async function signup_fetch(obj) {
    try {
        let responce = await fetch("http://localhost:8080/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(obj)
        });
        if (responce.ok) {
            let res = await responce.json()
            alert(res.msg)
            window.location.href = loginForm
            console.log("hello")
            console.log(res)
        }
    } catch (error) {
        console.log("error", error)

    }
}


// ---------------login--------------------------
document.querySelector("#formlogin").addEventListener("submit", (e) => {
    e.preventDefault()
    let email = document.querySelector("#useremail").value
    let password = document.querySelector("#userpassword").value
    if (email == "" && password == "") {
        alert("Fill the all credentials")

    } else {
        let obj = { email, password }
        loginFetch(obj)
    }
})

async function loginFetch(obj) {
    try {
        let responce = await fetch("http://localhost:8080/user/login", {
            method: "POST",
            headers: {
                'Content-Type': "Application/json"
            },
            body: JSON.stringify(obj)
        })
        if (responce.ok) {
            let ans = await responce.json()
            console.log(ans)
            alert(ans.msg);
            localStorage.setItem("token", ans.token)
            window.location.href = "../index.html"
            console.log("hello from login")
            console.log(ans)
        }
    } catch (error) {
        console.log(error)
    }
}
