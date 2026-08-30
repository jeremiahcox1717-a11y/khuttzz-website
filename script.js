const toggle = document.querySelector(".nav-toggle");
const menu = document.querySelector(".mobile-menu");
const year = document.getElementById("year");

if (year) {
  year.textContent = String(new Date().getFullYear());
}

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const open = menu.hasAttribute("hidden");
    if (open) {
      menu.removeAttribute("hidden");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Close menu");
    } else {
      menu.setAttribute("hidden", "");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    }
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.setAttribute("hidden", "");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}
