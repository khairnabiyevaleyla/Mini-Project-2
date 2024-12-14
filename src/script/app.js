//////scoll
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".our_process_img");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active");
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  images.forEach((img) => observer.observe(img));
});

//////scoll
