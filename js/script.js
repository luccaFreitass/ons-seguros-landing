/* =========================================================
   ONS Consórcio & Seguros — interactions & animations
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Sticky header + scroll progress ---------- */
  const header = document.getElementById("header");
  const progressBar = document.getElementById("progressBar");

  const onScroll = () => {
    const scrollTop = window.scrollY;
    header.classList.toggle("is-scrolled", scrollTop > 40);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + "%";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  const burger = document.getElementById("burger");
  const navMobile = document.getElementById("navMobile");

  burger.addEventListener("click", () => {
    burger.classList.toggle("is-active");
    navMobile.classList.toggle("is-open");
  });
  navMobile.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      burger.classList.remove("is-active");
      navMobile.classList.remove("is-open");
    });
  });

  /* ---------- Seguradoras (marquee) ---------- */
  const insurers = [
    { name: "Porto Seguro", src: "https://www.onscorretoradeseguros.com.br/images/seguradoras/porto.jpg" },
    { name: "Itaú Seguros", src: "https://www.onscorretoradeseguros.com.br/images/seguradoras/itau.jpg" },
    { name: "Azul Seguros", src: "https://www.onscorretoradeseguros.com.br/images/seguradoras/azul.jpg" },
    { name: "Tokio Marine", src: "https://www.onscorretoradeseguros.com.br/images/seguradoras/tokio.jpg" },
    { name: "HDI Seguros", src: "https://www.onscorretoradeseguros.com.br/images/seguradoras/hdi.jpg" },
    { name: "Yasuda Marítima", src: "https://www.onscorretoradeseguros.com.br/images/seguradoras/yasudamaritima.jpg" },
    { name: "Zurich Seguros", src: "https://www.onscorretoradeseguros.com.br/images/seguradoras/zurich.jpg" },
    { name: "Mapfre Seguros", src: "https://www.onscorretoradeseguros.com.br/images/seguradoras/mapfre.jpg" },
    { name: "Yelum Seguros", src: "https://www.onscorretoradeseguros.com.br/images/seguradoras/yelum.jpg" },
    { name: "Allianz Seguros", src: "https://www.onscorretoradeseguros.com.br/images/seguradoras/allianz.jpg" },
    { name: "Generali", src: "https://www.onscorretoradeseguros.com.br/images/seguradoras/generali.jpg" },
    { name: "Rodobens", src: "https://www.onscorretoradeseguros.com.br/images/seguradoras/rodobens.jpg" },
    { name: "Mitsui Seguros", src: "https://www.onscorretoradeseguros.com.br/images/seguradoras/mitsui.jpg" },
    { name: "Bradesco Saúde", src: "https://www.onscorretoradeseguros.com.br/images/seguradoras/bradescosaude.jpg" },
    { name: "Amil", src: "https://www.onscorretoradeseguros.com.br/images/seguradoras/amil.jpg" },
    { name: "Caixa Saúde", src: "https://www.onscorretoradeseguros.com.br/images/seguradoras/caixasaude.jpg" },
    { name: "Notredame", src: "https://www.onscorretoradeseguros.com.br/images/seguradoras/notredame.jpg" }
  ];

  const marqueeTrack = document.getElementById("marqueeTrack");
  const buildMarqueeItems = () => insurers.map(i =>
    `<div class="marquee__item"><img src="${i.src}" alt="${i.name}" loading="eager" decoding="async"></div>`
  ).join("");
  // primeiro grupo = conteúdo real; segundo grupo = cópia só para o loop contínuo
  // no desktop (fica escondido no mobile, onde vira grade estática sem animação)
  marqueeTrack.innerHTML =
    `<div class="marquee__set">${buildMarqueeItems()}</div>` +
    `<div class="marquee__set" aria-hidden="true">${buildMarqueeItems()}</div>`;

  /* ---------- Assistência 24h ---------- */
  const assist = [
    { name: "Allianz Seguros", numbers: [["0800-130-700", "Território Nacional"]] },
    { name: "Azul Seguros", numbers: [["4004-3700", "São Paulo"], ["0300-123-2985", "Demais Regiões"]] },
    { name: "HDI Seguros", numbers: [["3003-5390", "São Paulo"], ["0800-434-4340", "Demais Regiões"]] },
    { name: "Itaú Seguros", numbers: [["3003-1010", "São Paulo"], ["0800-720-1010", "Demais Regiões"]] },
    { name: "Yelum Seguros", numbers: [["0800-701-4120", "São Paulo"]] },
    { name: "Mapfre Seguros", numbers: [["0800-775-4545", "Território Nacional"]] },
    { name: "Mitsui Seguros", numbers: [["3004-6206", "Grandes Capitais"], ["0800-727-3101", "Demais Localidades"]] },
    { name: "Porto Seguro", numbers: [["3337-6786", "São Paulo"], ["0800-727-0800", "Demais Regiões"]] },
    { name: "Tokio Marine", numbers: [["0800-33-86546", "Território Nacional"]] },
    { name: "Zurich Seguros", numbers: [["4020-4848", "Capitais e Regiões Metrop."], ["0800-285-4141", "Demais Localidades"]] }
  ];

  const assistGrid = document.getElementById("assistGrid");
  assistGrid.innerHTML = assist.map(a => `
    <div class="assist-card" data-reveal>
      <h4>${a.name}</h4>
      ${a.numbers.map(n => `<span class="num">${n[0]}</span><span class="region">${n[1]}</span>`).join("")}
    </div>
  `).join("");

  /* ---------- GSAP animations ---------- */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // Hero entrance (elements already in view on load)
    gsap.timeline({ defaults: { ease: "power3.out", duration: 0.9 } })
      .to(".hero__copy [data-reveal]", { opacity: 1, y: 0, stagger: 0.12 })
      .to(".hero__panel", { opacity: 1, y: 0 }, "-=0.6");

    // Generic scroll-reveal for everything else
    const revealEls = gsap.utils.toArray('[data-reveal]').filter(
      el => !el.closest(".hero")
    );
    revealEls.forEach((el, i) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: (i % 4) * 0.08,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // Animated counters
    gsap.utils.toArray(".stat__num").forEach(el => {
      const target = parseInt(el.getAttribute("data-count"), 10);
      const counter = { val: 0 };
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(counter, {
            val: target,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => { el.textContent = Math.round(counter.val); }
          });
        }
      });
    });

    // Subtle parallax on hero blobs following mouse
    const blob1 = document.querySelector(".hero__blob--1");
    const blob2 = document.querySelector(".hero__blob--2");
    if (blob1 && blob2 && window.matchMedia("(min-width: 900px)").matches) {
      const moveBlob1 = gsap.quickTo(blob1, "x", { duration: 1.2, ease: "power3.out" });
      const moveBlob1Y = gsap.quickTo(blob1, "y", { duration: 1.2, ease: "power3.out" });
      const moveBlob2 = gsap.quickTo(blob2, "x", { duration: 1.5, ease: "power3.out" });
      const moveBlob2Y = gsap.quickTo(blob2, "y", { duration: 1.5, ease: "power3.out" });

      window.addEventListener("mousemove", (e) => {
        const nx = (e.clientX / window.innerWidth) - 0.5;
        const ny = (e.clientY / window.innerHeight) - 0.5;
        moveBlob1(nx * 40); moveBlob1Y(ny * 40);
        moveBlob2(nx * -30); moveBlob2Y(ny * -30);
      });
    }
  } else {
    // Fallback: no GSAP available, just show everything
    document.querySelectorAll('[data-reveal]').forEach(el => {
      el.style.opacity = 1; el.style.transform = "none";
    });
  }

  /* ---------- Smooth anchor scroll offset for fixed header ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = 84;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

});
