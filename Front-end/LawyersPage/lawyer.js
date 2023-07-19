// Handle form submission
const form = document.getElementById("lawyerForm");
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Perform form field validation
  const location = document.getElementById("location").value.trim();
  const specialization = document.getElementById("specialization").value.trim();
  const practiceAreas = document.getElementById("practiceAreas").value.trim();

  if (!location || !specialization || !practiceAreas) {
    const errorContainer = document.createElement("p");
    errorContainer.classList.add("form-error");
    errorContainer.textContent = "Please fill out all required fields.";
    form.appendChild(errorContainer);
    return;
  }

  // Create form data
  const formData = new FormData(form);
  formData.set("slots", JSON.stringify(slots));

  // Handle form submission and AJAX call here
  // For example, you can use fetch() to post the form data to the server

  // Replace 'your-server-endpoint' with the actual server endpoint
  const response = await fetch("your-server-endpoint", {
    method: "POST",
    body: formData,
  });
  const responseData = await response.json();
  console.log("Response:", responseData);
});

// Add slot
function addSlot() {
  const slotsDiv = document.getElementById("slots");
  const slotDiv = document.createElement("div");
  slotDiv.innerHTML = `
    <label for="day">Day:</label>
    <input type="date" name="day" required>
    <label for="startTime">Start Time:</label>
    <input type="time" name="startTime" required>
    <label for="endTime">End Time:</label>
    <input type="time" name="endTime" required>
  `;
  slotsDiv.appendChild(slotDiv);
}
