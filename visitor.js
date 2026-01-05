const BACKEND_URL = "https://YOUR_BACKEND_URL";

/* Call when name is entered */
function sendVisitorName(name) {
  fetch(`${BACKEND_URL}/api/visitors`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name,
      skipped: false
    })
  });
}

/* Call when skip is clicked */
function sendVisitorSkip() {
  fetch(`${BACKEND_URL}/api/visitors`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Anonymous",
      skipped: true
    })
  });
}
