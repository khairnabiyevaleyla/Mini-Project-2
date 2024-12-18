const form = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    successMessage.style.display = "block";

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  });
});
