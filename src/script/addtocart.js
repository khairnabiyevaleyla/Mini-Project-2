document.addEventListener("DOMContentLoaded", () => {
  const itemsCountElement = document.querySelector(".items_count");

  let cartCount = parseInt(localStorage.getItem("cartCount")) || 0;
  itemsCountElement.textContent = cartCount;
  const addToCartButtons = document.querySelectorAll(
    ".product_price__btn button"
  );
  if (addToCartButtons) {
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        cartCount++;
        itemsCountElement.textContent = cartCount;
        localStorage.setItem("cartCount", cartCount);
      });
    });
  }
});
