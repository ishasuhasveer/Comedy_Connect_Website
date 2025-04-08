window.addEventListener("DOMContentLoaded", () => {
  // Load dark mode
  const darkMode = localStorage.getItem("darkMode");
  if (darkMode === "enabled") {
    document.body.classList.add("dark-mode");
  }

  // Load accent color
  const savedAccent = localStorage.getItem("accentColor");
  if (savedAccent) {
    document.documentElement.style.setProperty("--accent-color", savedAccent);

    // Calculate brightness to adjust button text color
    const rgb = hexToRgb(savedAccent);
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    const buttonTextColor = brightness > 180 ? "#000000" : "#ffffff";
    document.documentElement.style.setProperty("--button-text-color", buttonTextColor);
  }

  function hexToRgb(hex) {
    const bigint = parseInt(hex.replace('#', ''), 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255
    };
  }
});