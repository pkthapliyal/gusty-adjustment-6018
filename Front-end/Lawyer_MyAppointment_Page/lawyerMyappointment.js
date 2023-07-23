let url = "https://legal-guidance.onrender.com/"
let lawyerId = JSON.parse(localStorage.getItem("auth")).userData._id;

async function getAppointments() {
  try {
    const response = await fetch(`${url}appointment/${lawyerId}`);
    const data = await response.json();
    console.log(data);
    displayAppointments(data.data.appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
  }
}
function displayAppointments(appointments) {
  const appointmentContainer = document.querySelector(".appointment-container");
  appointmentContainer.innerHTML = ""; // Clear existing cards if any
  appointments.forEach((appointment) => {
    const appointmentCard = createAppointmentCard(appointment);
    appointmentContainer.appendChild(appointmentCard);
  });
}
function createAppointmentCard(appointment) {
  const card = document.createElement("div");
  card.classList.add("appointment-card");
  const nameElement = document.createElement("h2");
  nameElement.textContent = appointment.name;
  card.appendChild(nameElement);
  const emailElement = document.createElement("p");
  emailElement.textContent = `Email: ${appointment.email}`;
  card.appendChild(emailElement);
  const phoneElement = document.createElement("p");
  phoneElement.textContent = `Phone: ${appointment.phone}`;
  card.appendChild(phoneElement);
  const addressElement = document.createElement("p");
  addressElement.textContent = `Address: ${appointment.address}`;
  card.appendChild(addressElement);
  const subjectElement = document.createElement("p");
  subjectElement.textContent = `Subject: ${appointment.subject}`;
  card.appendChild(subjectElement);
  const detailsElement = document.createElement("p");
  detailsElement.textContent = `Details: ${appointment.details}`;
  card.appendChild(detailsElement);
  const timeElement = document.createElement("p");
  timeElement.textContent = `Time: ${appointment.time}`;
  card.appendChild(timeElement);
  const dateElement = document.createElement("p");
  dateElement.textContent = `Date: ${appointment.date}`;
  card.appendChild(dateElement);
  return card;
}
getAppointments();
let logoutBtn = document.getElementById("logout");
let profile = document.getElementById("profile");
let user = JSON.parse(localStorage.getItem("auth"));
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
profile.addEventListener("click", () => {
  window.location.href = "../LawyerProfile/LawyerProfile.html";
});