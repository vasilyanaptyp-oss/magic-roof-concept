const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const header = document.querySelector("[data-header]");
const progress = document.querySelector(".scroll-progress span");
const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");
const menuLinks = [...mobileMenu.querySelectorAll("a")];
let lastFocusedElement = null;
let menuCloseTimer = null;

let scrollTicking = false;

const updateScrollUI = () => {
  const scrollTop = window.scrollY;
  const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
  header.classList.toggle("is-scrolled", scrollTop > 18);
  progress.style.transform = `scaleX(${scrollRange > 0 ? Math.min(scrollTop / scrollRange, 1) : 0})`;
  scrollTicking = false;
};

window.addEventListener("scroll", () => {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(updateScrollUI);
}, { passive: true });

const setMenu = (open) => {
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
  mobileMenu.toggleAttribute("inert", !open);
  document.body.classList.toggle("menu-open", open);

  if (open) {
    window.clearTimeout(menuCloseTimer);
    lastFocusedElement = document.activeElement;
    mobileMenu.hidden = false;
    requestAnimationFrame(() => mobileMenu.classList.add("is-open"));
    requestAnimationFrame(() => menuLinks[0]?.focus());
  } else {
    mobileMenu.classList.remove("is-open");
    menuCloseTimer = window.setTimeout(() => {
      mobileMenu.hidden = true;
      lastFocusedElement?.focus();
      menuCloseTimer = null;
    }, prefersReducedMotion.matches ? 0 : 240);
  }
};

menuButton.addEventListener("click", () => setMenu(menuButton.getAttribute("aria-expanded") !== "true"));
menuLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") setMenu(false);
  if (event.key !== "Tab" || menuButton.getAttribute("aria-expanded") !== "true") return;
  const focusable = [menuButton, ...menuLinks, ...mobileMenu.querySelectorAll(".mobile-menu-contact a")];
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

document.querySelectorAll("[data-dialog-open]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById(button.dataset.dialogOpen)?.showModal();
  });
});

document.querySelectorAll(".legal-dialog").forEach((dialog) => {
  dialog.querySelector("[data-dialog-close]").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    const bounds = dialog.getBoundingClientRect();
    const inside = event.clientX >= bounds.left && event.clientX <= bounds.right && event.clientY >= bounds.top && event.clientY <= bounds.bottom;
    if (!inside) dialog.close();
  });
});

const form = document.querySelector("[data-contact-form]");
const status = form.querySelector(".form-status");
const fields = ["name", "email", "service", "message"];
const errorMessages = {
  name: "Bitte geben Sie Ihren Namen ein.",
  email: "Bitte geben Sie Ihre E-Mail-Adresse ein.",
  service: "Bitte wählen Sie eine Leistung aus.",
  message: "Bitte beschreiben Sie Ihr Vorhaben kurz."
};

const clearErrors = () => {
  form.querySelectorAll("[aria-invalid='true']").forEach((field) => {
    field.removeAttribute("aria-invalid");
    field.removeAttribute("aria-describedby");
  });
  form.querySelectorAll(".field-error").forEach((error) => { error.textContent = ""; });
  status.textContent = "";
};

const setError = (fieldName, message) => {
  const field = form.elements[fieldName];
  const error = document.getElementById(`${fieldName}-error`);
  if (field && error) {
    field.setAttribute("aria-invalid", "true");
    field.setAttribute("aria-describedby", error.id);
    error.textContent = message;
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearErrors();
  let firstInvalid = null;

  fields.forEach((name) => {
    const field = form.elements[name];
    if (!field.value.trim()) {
      setError(name, errorMessages[name] || "Bitte ausfüllen.");
      firstInvalid ||= field;
    }
  });

  const email = form.elements.email;
  if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    setError("email", "Bitte geben Sie eine gültige E-Mail-Adresse ein.");
    firstInvalid ||= email;
  }

  const privacy = form.elements.privacy;
  if (!privacy.checked) {
    privacy.setAttribute("aria-invalid", "true");
    privacy.setAttribute("aria-describedby", "privacy-error");
    document.getElementById("privacy-error").textContent = "Bitte bestätigen Sie die Datenschutzerklärung.";
    firstInvalid ||= privacy;
  }

  if (firstInvalid) {
    status.textContent = "Bitte prüfen Sie die markierten Felder.";
    firstInvalid.focus();
    return;
  }

  const subject = `Anfrage: ${form.elements.service.value}`;
  const body = [
    `Name: ${form.elements.name.value.trim()}`,
    `E-Mail: ${form.elements.email.value.trim()}`,
    `Telefon: ${form.elements.phone.value.trim() || "Nicht angegeben"}`,
    `Leistung: ${form.elements.service.value}`,
    "",
    "Vorhaben:",
    form.elements.message.value.trim()
  ].join("\n");

  status.textContent = "Ihr E-Mail-Programm wird geöffnet. Die Anfrage wurde noch nicht versendet.";
  window.location.href = `mailto:office@magic-roof.at?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

form.querySelectorAll("input, textarea, select").forEach((field) => {
  field.addEventListener("input", () => {
    field.removeAttribute("aria-invalid");
    const error = document.getElementById(`${field.name}-error`);
    if (error) error.textContent = "";
  });
});

document.querySelector("[data-year]").textContent = new Date().getFullYear();
