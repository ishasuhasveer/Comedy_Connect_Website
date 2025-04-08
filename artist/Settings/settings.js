// DOM Elements
const darkModeToggle = document.getElementById("darkModeToggle");
const accentColorSelector = document.getElementById("accentColorSelector");

// Load saved preferences on page load
window.addEventListener("DOMContentLoaded", () => {
  // Load Dark Mode
  const darkMode = localStorage.getItem("darkMode");
  if (darkMode === "enabled") {
    document.body.classList.add("dark-mode");
    darkModeToggle.checked = true;
  }

  // Load Accent Color
  const savedAccent = localStorage.getItem("accentColor");
  if (savedAccent) {
    document.documentElement.style.setProperty("--accent-color", savedAccent);
    accentColorSelector.value = savedAccent;

    // Also set button text color based on brightness
    setButtonTextColor(savedAccent);
  }
});

// Handle Dark Mode Toggle
darkModeToggle.addEventListener("change", () => {
  if (darkModeToggle.checked) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("darkMode", "enabled");
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", "disabled");
  }
});

// Handle Accent Color Change
accentColorSelector.addEventListener("change", (e) => {
  const newAccent = e.target.value;
  document.documentElement.style.setProperty("--accent-color", newAccent);
  localStorage.setItem("accentColor", newAccent);

  // Also update button text color
  setButtonTextColor(newAccent);
});

// Function to update --button-text-color based on brightness
function setButtonTextColor(hex) {
  const rgb = hexToRgb(hex);
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;

  if (brightness > 180) {
    document.documentElement.style.setProperty('--button-text-color', '#000000');
  } else {
    document.documentElement.style.setProperty('--button-text-color', '#ffffff');
  }
}

// Convert hex to RGB
function hexToRgb(hex) {
  const bigint = parseInt(hex.replace('#', ''), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
}
