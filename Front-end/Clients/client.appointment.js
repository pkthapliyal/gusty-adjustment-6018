
function togglemenu() {
    const menutoggle = document.querySelector('.menutoggle');
    const navigation = document.querySelector('.navigation');
    menutoggle.classList.toggle('active');
    navigation.classList.toggle('active');
};

const url = "https://legal-guidance.onrender.com/"
let lawyerId = JSON.parse(localStorage.getItem('lawyerId'))
let clientId = JSON.parse(localStorage.getItem("auth")).userData._id



function togglemenu() {
    const menutoggle = document.querySelector('.menutoggle');
    const navigation = document.querySelector('.navigation');
    menutoggle.classList.toggle('active');
    navigation.classList.toggle('active');
};


fetch(`${url}appointment/${lawyerId}/${clientId}`, {
    method: "GET",
    mode: "cors",
    headers: {
        "Content-Type": "application/json"
    }
})
    .then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data)
        data = data.data;
        showUsers(data)
    }).catch((err) => {
        console.log(err)
    })

let Tbody = document.getElementById("elements")

function showUsers(data) {
    let Serial = 1
    data.forEach((e, index) => {

        let row = document.createElement("tr")

        let Sr = document.createElement("td")
        let Name = document.createElement("td")
        let lawyerName = document.createElement("td")
        let subject = document.createElement("td")
        let details = document.createElement("td")
        let date = document.createElement("td")
        let slot = document.createElement("td")
        let isResolved = document.createElement("td")
        let isRechduled = document.createElement("td")
        let DeleteColumn = document.createElement("td")

        let Delete = document.createElement("button")
        Delete.innerText = "Cancel Appointment"

        DeleteColumn.append(Delete)
        Delete.setAttribute("id", "deleteBtn")

        Sr.innerText = Serial;

        Name.innerText = e.appointments.name
        lawyerName.innerText = e.lawyerName.name
        subject.innerText = e.appointments.subject
        details.innerText = e.appointments.details
        date.innerText = e.appointments.date
        slot.innerText = e.appointments.time

        isResolved.innerText = e.appointments.isResolved ? "REsolved" : "Pending";
        row.append(Sr, Name, lawyerName, subject, details, date,
            slot, isResolved, DeleteColumn)
        Tbody.append(row)
        Serial++
        row.setAttribute("id", "row")


        Delete.addEventListener("click", () => {
            fetch(`${url}appointment/${lawyerId}/${clientId}`, {
                method: "DELETE",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then((res) => {
                    return res.json();
                }).then((data) => {
                    alert(data.message)
                    setTimeout(() => {
                        location.reload();
                    }, 5000)
                    console.log(data)
                }).catch((err) => {
                    console.log(err)
                })
        })

    })
}

let user = JSON.parse(localStorage.getItem("auth"))
let logoutBtn = document.getElementById("logoutBtn")

logoutBtn.addEventListener("click", async () => {
    const response = await fetch(`${url}user/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
        },
    });
    localStorage.removeItem("auth");
    localStorage.removeItem("lawyerId");
    console.log(response);
    window.location.href = "../loginSignup.html";
});

