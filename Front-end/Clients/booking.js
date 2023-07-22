//  Fetch the data of individual lawyer for slots
let id;
const slotsDiv = document.getElementById("slots")
let slotTime;
var slotDate;
const params = new URLSearchParams(window.location.search);
id = params.get('id');

const daysTag = document.querySelector(".days"),
    currentDate = document.querySelector(".current-date"),
    prevNextIcon = document.querySelectorAll(".icons span");

// getting new date, current year and month
let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
            && currYear === new Date().getFullYear() ? "active" : "";

        liTag += `<li class="${isToday} "onclick=getDate(${i},${currMonth + 1},${currYear}) " id="dateLiTags"}">${i}</li> `;
    }

    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if (currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
});

//  Fetching all the data from Appointments to check available slots
let showTodatDateInSlot = document.getElementById("selectedDate")
function getDate(date, month, year) {

    if (month < 10) {
        month = "0" + month
    }
    if (date < 10) {
        date = "0" + date;
    }
    slotDate = `${year}-${month}-${date}`;
    showTodatDateInSlot.innerText = slotDate

    fetch(`http://localhost:3300/appointment/${id}`, {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    })
        .then((res) => {
            return res.json();
        }).then((data) => {
            data = data.data.appointments;

            //  Maping the whole date with the TIme slot 
            let obj = {}
            for (i = 0; i < data.length; i++) {
                if (obj[data[i].date] === undefined) {
                    obj[data[i].date] = []
                    obj[data[i].date].push(data[i].time)
                }
                else {
                    obj[data[i].date].push(data[i].time)
                }
            }

            checkSlots(obj[slotDate])
        }).catch((err) => {
            console.log(err)
        })

}


//  Making the date red onclick
let dateLiTags = document.querySelectorAll("#dateLiTags")
for (let i = 0; i < dateLiTags.length; i++) {
    dateLiTags[i].addEventListener("click", (e) => {

        if (slotDate == showTodatDateInSlot.innerText) {
            dateLiTags[i].style.color = "red"

        }
        else {
            dateLiTags[i].style.color = "green"
        }
    })
}



//  Making slot button Disable acc to available slots
const disableBtn = document.querySelectorAll('.disableBtn');

// let startSlot = ["10:00", "12:00", "02:00", "04:00"]
function checkSlots(dateWithSlot) {
    let startSlot = ["10:00", "12:00", "02:00", "04:00"] // hardcoded
    // Loop through each button and log its innerText
    disableBtn.forEach(button => {
        let booked = button.innerText.split(" ")[0]
        if (dateWithSlot.includes(booked)) {
            button.style.backgroundColor = "red"
            button.disabled = true;
        }
        else {
            button.disabled = false;
            button.style.backgroundColor = "orange"

        }
    });
}


//  GEtting the value of each Slot button 
function handleButtonClick(button) {
    button.style.backgroundColor = "red"
    // Access the button's text using the innerText property
    slotTime = button.innerText.split(" ")[0]
    console.log(slotTime, "Slottime from handle click ")
}


//  Form values  make an appointment
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        phone: Number(document.getElementById('phone').value),
        subject: document.getElementById('subject').value,
        details: document.getElementById('details').value,
    };
    formData.date = slotDate;
    formData.time = slotTime // make this dynamic
    formData.lawyerId = id;
    formData.clientId = "64bc197815c8c689c0d8b0aa"; //ankita

    console.log('Form Data:', formData);
    fetch(`http://localhost:3300/appointment/`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(formData)
    })
        .then((res) => {
            return res.json();
        }).then((data) => {
            console.log(data)
            showLawyers(data)
        }).catch((err) => {
            console.log(JSON.stringify(err))
        })

    // You can use the 'formData' object to further process the form data (e.g., sending it to a server).
});










