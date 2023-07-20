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
      image: image.name, // Use the file name as a placeholder
      slots: [{ startTime: 1 }],
    };
    console.log(formData);

    // const { location, specialization, slots, practiceAreas, image } = req.body;

    // Convert the object to JSON and send it in the request body
    const response = await fetch("http://localhost:3300/lawyer/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGI3YWViNGI5MjRkZjE2MWJjZmZlODEiLCJpYXQiOjE2ODk4NjYxNDYsImV4cCI6MTY4OTg2OTc0Nn0.oQ2HkQv2k03DQY0EUG8PYWv4QRyLUqOwBQQUwVBWsIc`,
      },
      body: JSON.stringify(formData),
    });
    const responseData = await response.json();
    console.log("Response:", responseData);
  });
});
