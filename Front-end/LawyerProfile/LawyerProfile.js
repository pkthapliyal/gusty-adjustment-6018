const urlParams = new URLSearchParams(window.location.search);
let param = urlParams.get("lawyerid");
console.log(param);

window.onload = async () => {
  const response = await fetch(`http://localhost:3300/lawyer/${param}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGI3YWViNGI5MjRkZjE2MWJjZmZlODEiLCJpYXQiOjE2OTAwNDAxNzYsImV4cCI6MTY5MDA0Mzc3Nn0.6Yvhkybli2wKFHC6k8xzDtf93CXNvmM775gdoN-GUrA`,
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
    window.location.href =
      "../Lawyer_MyAppointment_Page/lawyerMyappointment.html";
  });
}
