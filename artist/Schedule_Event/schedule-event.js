document.addEventListener("DOMContentLoaded", () => {
    const venueContainer = document.getElementById("venueOptions");
    const submitBtn = document.getElementById("submitEvent");
    const cancelBtn = document.getElementById("cancelEvent");
    const bookedShowsContainer = document.getElementById("bookedShows");
  
    let selectedVenue = null;
  
    // Highlight venue on click
    venueContainer.addEventListener("click", (e) => {
      const card = e.target.closest(".venue-card");
      if (!card) return;
  
      // Deselect others
      document.querySelectorAll(".venue-card").forEach(c => c.classList.remove("selected"));
      // Select clicked one
      card.classList.add("selected");
      selectedVenue = card.querySelector("h3").innerText;
    });
  
    // Submit event
    submitBtn.addEventListener("click", () => {
      const name = document.getElementById("eventName").value.trim();
      const date = document.getElementById("eventDate").value;
      const time = document.getElementById("eventTime").value;
      const type = document.getElementById("eventCategory").value;
  
      if (!name || !date || !time || !selectedVenue) {
        alert("Please fill all fields and select a venue.");
        return;
      }
  
      const card = document.createElement("div");
      card.classList.add("booked-show-card");
      card.innerHTML = `
        <h4>${name}</h4>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Type:</strong> ${type}</p>
        <p><strong>Venue:</strong> ${selectedVenue}</p>
      `;
  
      bookedShowsContainer.appendChild(card);
      alert("Event Scheduled!");
      clearForm();
    });
  
    // Cancel form
    cancelBtn.addEventListener("click", clearForm);
  
    function clearForm() {
      document.getElementById("eventName").value = "";
      document.getElementById("eventDate").value = "";
      document.getElementById("eventTime").value = "";
      document.getElementById("eventCategory").value = "stand-up";
      document.querySelectorAll(".venue-card").forEach(c => c.classList.remove("selected"));
      selectedVenue = null;
    }
  });
  