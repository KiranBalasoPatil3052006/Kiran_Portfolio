const BACKEND_URL = "https://visitor-stats-backend.onrender.com";

/* Elements */
const form = document.getElementById("preloader-form");
const nameInput = document.getElementById("visitor-name");
const skipBtn = document.getElementById("preloader-skip-btn");
const preloader = document.getElementById("preloader");

/* ENTER NAME */
form.addEventListener("submit", function (e) {
  e.preventDefault(); // VERY IMPORTANT

  const name = nameInput.value.trim();
  if (!name) return;

  fetch(`${BACKEND_URL}/api/visitors`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name,
      skipped: false
    })
  })
  .then(() => {
    preloader.style.display = "none";
  })
  .catch(err => console.error("Error sending visitor:", err));
});

/* SKIP BUTTON */
skipBtn.addEventListener("click", function (e) {
  e.preventDefault(); // VERY IMPORTANT

  fetch(`${BACKEND_URL}/api/visitors`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Anonymous",
      skipped: true
    })
  })
  .then(() => {
    preloader.style.display = "none";
  })
  .catch(err => console.error("Error sending skip:", err));
});
