let url = "https://legal-guidance.onrender.com/"
let user = JSON.parse(localStorage.getItem("auth"));
const lawyerId = localStorage.getItem("lawyerId");
document.addEventListener("DOMContentLoaded", function () {
  // Slide in the form container when the lawyer lands on the page
  const formContainer = document.querySelector(".form-container");
  formContainer.classList.remove("slide-down");
  // Slide in the sliding box with lawyer information
  const slidingBox = document.getElementById("lawyerInfo");
  slidingBox.classList.add("active");
  // Handle form submission
  const form = document.getElementById("lawyerForm");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    // Perform form field validation
    const location = document.getElementById("location").value.trim();
    const specialization = document
      .getElementById("specialization")
      .value.trim();
    const practiceAreas = document.getElementById("practiceAreas").value.trim();
    const image = document.getElementById("image").files[0];
    const description = document.getElementById("description").value.trim();
    if (!location || !specialization || !practiceAreas || !image) {
      const errorContainer = document.createElement("p");
      errorContainer.classList.add("form-error");
      errorContainer.textContent = "Please fill out all required fields.";
      form.appendChild(errorContainer);
      return;
    }
    // Create form data as an object
    const formData = {
      location: location,
      specialization: specialization,
      practiceAreas: practiceAreas,
      description: description,
      image: await toBase64(image),
    };
    console.log("---------", formData);
    const response = await fetch(`${url}lawyer/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(formData),
    });
    const responseData = await response.json();
    localStorage.setItem("lawyerId", responseData._id);
    // console.log("Response:", responseData);
    window.location.href = `../LawyerProfile/LawyerProfile.html?lawyerid=${responseData._id}`;
  });
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
});
let username = document.querySelector(".name");
let email = document.querySelector(".email");
username.innerHTML = `${user.userData.name}`;
email.innerHTML = `${user.userData.email}`;
const profileBtn = document.getElementById("profile");
if (!lawyerId) {
  profileBtn.setAttribute("class", "hidden");
}
profileBtn.addEventListener("click", () => {
  console.log("clicked");
  window.location.href = `../LawyerProfile/LawyerProfile.html?lawyerid=${lawyerId}`;
});