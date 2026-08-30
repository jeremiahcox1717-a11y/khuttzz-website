const SQUIRE = "https://getsquire.com/booking/book/khuttzz-x-outkasts-barbershop-thronhill";

const hours = {
  0: [11, 17],
  1: [11, 19],
  2: [10, 20],
  3: [10, 20],
  4: [10, 20],
  5: [10, 20],
  6: [11, 19],
};

const toggle = document.querySelector(".nav-toggle");
const menu = document.querySelector(".mobile-menu");
const year = document.getElementById("year");

if (year) year.textContent = String(new Date().getFullYear());

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const open = menu.hasAttribute("hidden");
    menu.toggleAttribute("hidden", !open);
    toggle.setAttribute("aria-expanded", String(open));
  });
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => menu.setAttribute("hidden", ""));
  });
}

const book = document.querySelector("[data-book]");
if (book) {
  const state = {
    service: book.querySelector('[data-group="service"].is-on')?.getAttribute("data-value") || "Haircut",
    barber: book.querySelector('[data-group="barber"].is-on')?.getAttribute("data-value") || "Khai",
    day: "",
    time: "",
  };

  function mark(group, btn) {
    book.querySelectorAll(`[data-group="${group}"]`).forEach((el) => el.classList.remove("is-on"));
    btn.classList.add("is-on");
  }

  function renderSummary() {
    const box = book.querySelector("[data-summary]");
    if (!box) return;
    box.innerHTML = `
      <p>You’re locking in</p>
      <strong>${state.service || "a cut"}</strong>
      <p>with <strong>${state.barber || "the chair"}</strong></p>
      <p>${state.day || "pick a day"} · ${state.time || "pick a time"}</p>
    `;
  }

  function slotsFor(date) {
    const [open, close] = hours[date.getDay()];
    const out = [];
    for (let h = open; h < close; h += 1) {
      out.push(`${String(h).padStart(2, "0")}:00`);
      if (h + 0.5 < close) out.push(`${String(h).padStart(2, "0")}:30`);
    }
    return out;
  }

  function renderDays() {
    const wrap = book.querySelector("[data-days]");
    wrap.innerHTML = "";
    const start = new Date();
    for (let i = 0; i < 10; i += 1) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const label = d.toLocaleDateString("en-CA", { weekday: "short" });
      const num = d.getDate();
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "chip" + (i === 0 ? " is-on" : "");
      btn.innerHTML = `<span>${label}</span><b>${num}</b>`;
      const key = d.toLocaleDateString("en-CA", { weekday: "long", month: "short", day: "numeric" });
      if (i === 0) state.day = key;
      btn.addEventListener("click", () => {
        wrap.querySelectorAll(".chip").forEach((c) => c.classList.remove("is-on"));
        btn.classList.add("is-on");
        state.day = key;
        renderTimes(d);
        renderSummary();
      });
      wrap.appendChild(btn);
    }
    renderTimes(start);
  }

  function renderTimes(date) {
    const wrap = book.querySelector("[data-times]");
    wrap.innerHTML = "";
    state.time = "";
    slotsFor(date).forEach((t, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "chip" + (idx === 2 ? " is-on" : "");
      btn.textContent = t;
      if (idx === 2) state.time = t;
      btn.addEventListener("click", () => {
        wrap.querySelectorAll(".chip").forEach((c) => c.classList.remove("is-on"));
        btn.classList.add("is-on");
        state.time = t;
        renderSummary();
      });
      wrap.appendChild(btn);
    });
  }

  book.querySelectorAll("[data-group]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const group = btn.getAttribute("data-group");
      mark(group, btn);
      state[group] = btn.getAttribute("data-value");
      renderSummary();
    });
  });

  const go = book.querySelector("[data-go]");
  if (go) {
    go.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = SQUIRE;
    });
  }

  renderDays();
  renderSummary();
}
