/* ==========================================================
   CONFIGURAÇÃO — troque aqui o número e o Instagram
   WhatsApp: código do país + DDD + número, só dígitos.
   ========================================================== */
const CONFIG = {
  whatsapp: "5500000000000",
  instagram: "https://www.instagram.com/"
};

document.documentElement.classList.add("js");

// Links do WhatsApp com mensagem pronta
document.querySelectorAll("[data-wa]").forEach((el) => {
  const msg = el.getAttribute("data-wa") || "Oi, Karine!";
  el.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
  el.target = "_blank";
  el.rel = "noopener";
});

// Links do Instagram
document.querySelectorAll("[data-ig]").forEach((el) => {
  el.href = CONFIG.instagram;
  el.target = "_blank";
  el.rel = "noopener";
});

// Esconde a etiqueta "foto: ..." quando a imagem real existir
document.querySelectorAll(".photo[data-img]").forEach((el) => {
  const img = new Image();
  img.onload = () => el.classList.add("has-img");
  img.src = el.dataset.img;
});

// Animações ao rolar (fade + slide), com leve escalonamento entre irmãos
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const siblings = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
        const i = siblings.indexOf(el);
        if (siblings.length > 2) el.style.setProperty("--d", `${Math.min(i, 5) * 0.09}s`);
        el.classList.add("is-in");
        io.unobserve(el);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-in"));
}

// Sombra no topo e botão flutuante após sair do hero
const topbar = document.querySelector(".topbar");
const waFloat = document.querySelector(".wa-float");
const onScroll = () => {
  const y = window.scrollY;
  topbar.classList.toggle("is-scrolled", y > 10);
  waFloat.classList.toggle("is-visible", y > window.innerHeight * 0.6);
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

document.getElementById("ano").textContent = new Date().getFullYear();
