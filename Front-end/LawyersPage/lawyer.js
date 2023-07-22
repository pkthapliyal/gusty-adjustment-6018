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
    const image = document.getElementById("image").files[0]; // Get the uploaded image file

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

      image: convertToBase64(), // Use the file name as a placeholder
    };

    // const { location, specialization, slots, practiceAreas, image } = req.body;

    // Convert the object to JSON and send it in the request body

    // const response = await fetch("http://localhost:3300/lawyer/add", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGI3YWViNGI5MjRkZjE2MWJjZmZlODEiLCJpYXQiOjE2ODk5MTkxOTgsImV4cCI6MTY4OTkyMjc5OH0.iH3zEFX3I6Bo3sSf9VlSMq2kYSaNQsdwJTSO2gRZjTM`,
    //   },
    //   body: JSON.stringify(formData),
    // });
    // const responseData = await response.json();
    // console.log("Response:", responseData);
  });

  function convertToBase64() {
    const fileInput = document.getElementById("image");

    // Check if a file was selected
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = function (event) {
        const base64String = event.target.result;
        const outputDiv = document.getElementById("output");
        outputDiv.innerHTML = `<img src="${base64String}" alt="Converted Image">`;
        console.log(base64String);
        return base64String;
      };

      // Read the file as a Data URL (Base64-encoded string)
      reader.readAsDataURL(file);
    }
  }
});
