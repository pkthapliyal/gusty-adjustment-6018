let url = "https://legal-guidance.onrender.com/"
let user = JSON.parse(localStorage.getItem("auth"));
const urlParams = new URLSearchParams(window.location.search);
let param = urlParams.get("lawyerid");
console.log(param);
window.onload = async () => {
  const response = await fetch(`${url}lawyer/${param}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  });
  const responseData = await response.json();
  displayLawyerData(responseData);
  console.log("Response:", responseData);
};
function displayLawyerData(lawyerData) {
  const profileContainer = document.querySelector(".profile-container");
  //   Create and append the profile image
  const profileImage = document.createElement("div");
  profileImage.className = "profile-image";
  const imgElement = document.createElement("img");
  imgElement.src = lawyerData.image;
  imgElement.alt = "Profile Image";
  profileImage.appendChild(imgElement);
  profileContainer.appendChild(profileImage);
  // Create and append the profile details
  const profileDetails = document.createElement("div");
  profileDetails.className = "profile-details";
  const nameElement = document.createElement("h2");
  nameElement.textContent = lawyerData.name;
  profileDetails.appendChild(nameElement);
  const emailElement = document.createElement("p");
  emailElement.textContent = `Email: ${lawyerData.email}`;
  profileDetails.appendChild(emailElement);
  const locationElement = document.createElement("p");
  locationElement.textContent = `Location: ${lawyerData.location}`;
  profileDetails.appendChild(locationElement);
  const specializationElement = document.createElement("p");
  specializationElement.textContent = `Specialization: ${lawyerData.specialization}`;
  profileDetails.appendChild(specializationElement);
  const practiceAreasElement = document.createElement("p");
  practiceAreasElement.textContent = `Practice Areas: ${lawyerData.practiceAreas.join(
    ", "
  )}`;
  profileDetails.appendChild(practiceAreasElement);
  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = lawyerData.description;
  profileDetails.appendChild(descriptionElement);
  const editBtn = document.createElement("button");
  editBtn.className = "editBtn";
  editBtn.innerText = "Edit";
  profileDetails.appendChild(editBtn);
  profileContainer.appendChild(profileDetails);
  editBtn.addEventListener("click", () => {
    window.location.href = "../LawyersPage/lawyer.html";
  });
}
let appointmentBtn = document.getElementById("appointment");
let logoutBtn = document.getElementById("logout");
appointmentBtn.addEventListener("click", () => {
  window.location.href =
    "../Lawyer_MyAppointment_Page/lawyerMyappointment.html";
});
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