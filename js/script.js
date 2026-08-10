/* =========================================================
   ONS Consórcio & Seguros — interactions & animations
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

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

  /* ---------- Mini-form do Hero (quote-card) ---------- */
  const quoteSubmit = document.getElementById("quoteSubmit");
  if (quoteSubmit) {
    quoteSubmit.addEventListener("click", () => {
      const type = document.getElementById("quoteType").value;
      const name = document.getElementById("quoteName").value.trim();
      const phone = document.getElementById("quotePhone").value.trim();

      let msg = `Olá! Gostaria de solicitar um cálculo de ${type}.`;
      if (name) msg += ` Meu nome é ${name}.`;
      if (phone) msg += ` Meu WhatsApp: ${phone}.`;

      const url = `https://api.whatsapp.com/send?phone=5511940209090&text=${encodeURIComponent(msg)}`;
      window.open(url, "_blank", "noopener");
    });
  }

  /* ---------- Mobile nav ---------- */
  const burger = document.getElementById("burger");
  const navMobile = document.getElementById("navMobile");

  const openMobileNav = () => {
    burger.classList.add("is-active");
    navMobile.classList.add("is-open");
    document.body.classList.add("nav-open");
    burger.setAttribute("aria-label", "Fechar menu");
  };
  const closeMobileNav = () => {
    burger.classList.remove("is-active");
    navMobile.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    burger.setAttribute("aria-label", "Abrir menu");
  };

  burger.addEventListener("click", () => {
    navMobile.classList.contains("is-open") ? closeMobileNav() : openMobileNav();
  });
  navMobile.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMobileNav);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobileNav();
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
  if (marqueeTrack) {
    const buildMarqueeItems = () => insurers.map(i =>
      `<div class="marquee__item"><img src="${i.src}" alt="${i.name}" loading="eager" decoding="async"></div>`
    ).join("");
    // primeiro grupo = conteúdo real; segundo grupo = cópia só para o loop contínuo
    // no desktop (fica escondido no mobile, onde vira grade estática sem animação)
    marqueeTrack.innerHTML =
      `<div class="marquee__set">${buildMarqueeItems()}</div>` +
      `<div class="marquee__set" aria-hidden="true">${buildMarqueeItems()}</div>`;
  }

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
  if (assistGrid) {
    assistGrid.innerHTML = assist.map(a => `
      <div class="assist-card" data-reveal>
        <h4>${a.name}</h4>
        ${a.numbers.map(n => `<span class="num">${n[0]}</span><span class="region">${n[1]}</span>`).join("")}
      </div>
    `).join("");
  }

  /* ---------- Depoimentos (carrossel) ---------- */
  const testimonials = [
    {
      text: "O atendimento foi muito rápido e sempre tive retorno quando precisei. Todas as minhas dúvidas foram esclarecidas de forma muito clara, o que tornou todo o processo do seguro fiança muito mais tranquilo.",
      name: "Thiago Ruivo",
      role: "Seguro Fiança"
    },
    {
      text: "A contratação do plano de saúde foi muito mais simples do que eu imaginava. Tive todas as minhas dúvidas esclarecidas e o processo foi muito prático. Também conseguiram retirar todas as carências possíveis.",
      name: "Daniela Santa",
      role: "Plano de Saúde"
    },
    {
      text: "Na renovação do meu seguro, além de cuidarem de todo o processo, me orientaram sobre algumas opções para melhorar minhas coberturas. Gostei muito do atendimento e da preocupação em encontrar uma solução que realmente fizesse sentido para mim.",
      name: "Luiz Carlos",
      role: "Renovação de Seguro"
    },
    {
      text: "Desde a contratação até a contemplação da minha carta, tive todo o suporte e acompanhamento. Fui orientado para dar o lance e consegui ser contemplado já no primeiro lance. Atendimento excepcional!",
      name: "Leandro Ribeiro",
      role: "Consórcio"
    },
    {
      text: "Quando precisei acionar o seguro, tive todo o suporte que precisava. A equipe me acompanhou até a indenização da seguradora e sempre esteve disponível para esclarecer minhas dúvidas. Fez toda a diferença ter esse acompanhamento.",
      name: "Gabriel Passos",
      role: "Sinistro Atendido"
    }
  ];

  const testimonialText = document.getElementById("testimonialText");
  const testimonialName = document.getElementById("testimonialName");
  const testimonialRole = document.getElementById("testimonialRole");
  const testimonialDots = document.getElementById("testimonialDots");
  const testimonialPrev = document.getElementById("testimonialPrev");
  const testimonialNext = document.getElementById("testimonialNext");
  let testimonialIndex = 0;
  let testimonialTimer = null;

  if (testimonialText && testimonials.length) {
    testimonialDots.innerHTML = testimonials
      .map((_, i) => `<button type="button" aria-label="Ver depoimento ${i + 1}"></button>`)
      .join("");
    const dots = Array.from(testimonialDots.children);

    const renderTestimonial = (index) => {
      const t = testimonials[index];
      const apply = () => {
        testimonialText.textContent = t.text;
        testimonialName.textContent = t.name;
        testimonialRole.textContent = t.role;
        dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
      };
      if (window.gsap) {
        gsap.to([testimonialText, testimonialName, testimonialRole], {
          opacity: 0, y: 6, duration: 0.2, ease: "power1.in",
          onComplete: () => {
            apply();
            gsap.fromTo([testimonialText, testimonialName, testimonialRole],
              { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out", stagger: 0.04 });
          }
        });
      } else {
        apply();
      }
    };

    const goTo = (index) => {
      testimonialIndex = (index + testimonials.length) % testimonials.length;
      renderTestimonial(testimonialIndex);
    };

    const resetAutoplay = () => {
      if (testimonialTimer) clearInterval(testimonialTimer);
      testimonialTimer = setInterval(() => goTo(testimonialIndex + 1), 7000);
    };

    testimonialPrev.addEventListener("click", () => { goTo(testimonialIndex - 1); resetAutoplay(); });
    testimonialNext.addEventListener("click", () => { goTo(testimonialIndex + 1); resetAutoplay(); });
    dots.forEach((dot, i) => dot.addEventListener("click", () => { goTo(i); resetAutoplay(); }));

    renderTestimonial(0);
    resetAutoplay();
  }

  /* ---------- Atendimento (mock de chat) ---------- */
  const chatBody = document.getElementById("chatBody");
  if (chatBody) {
    const chatMessages = [
      { sender: "received", text: "Oi! Vocês fazem seguro de carro pra fora de SP também?", time: "10:14" },
      { sender: "sent", text: "Fazemos sim! Atendemos o Brasil inteiro 🙂", time: "10:14" },
      { sender: "received", text: "Perfeito. Em quanto tempo sai um cálculo?", time: "10:15" }
    ];

    chatBody.innerHTML = chatMessages.map(m => `
      <div class="chat-row chat-row--${m.sender}">
        <div class="chat-bubble chat-bubble--${m.sender}">${m.text}</div>
        <span class="chat-bubble__time">${m.time}</span>
      </div>
    `).join("") + `
      <div class="chat-row chat-row--sent">
        <div class="chat-typing" id="chatTyping"><span></span><span></span><span></span></div>
      </div>
    `;

    const chatEls = chatBody.querySelectorAll(".chat-bubble, .chat-typing");
    const chatTyping = document.getElementById("chatTyping");

    const playChat = () => {
      if (window.gsap) {
        gsap.to(chatEls, {
          opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(1.6)",
          stagger: 0.45,
          onComplete: () => {
            gsap.to(chatTyping.querySelectorAll("span"), {
              y: -5, opacity: 1, duration: 0.5, ease: "sine.inOut",
              repeat: -1, yoyo: true, stagger: { each: 0.15, repeat: -1 }
            });
          }
        });
      } else {
        chatEls.forEach(el => { el.style.opacity = 1; el.style.transform = "none"; });
      }
    };

    if (window.gsap && window.ScrollTrigger) {
      ScrollTrigger.create({ trigger: chatBody, start: "top 85%", once: true, onEnter: playChat });
    } else {
      playChat();
    }
  }

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

  /* ---------- Corrige a chegada via link com #hash de outra página ----------
     Ex.: um botão em seguro-automovel.html leva a "index.html#contato".
     O navegador tenta pular pro #contato assim que a página carrega, mas o
     marquee, os grids e as imagens ainda são montados via JS depois disso —
     a altura da página muda e o salto do navegador fica desatualizado,
     fazendo o usuário "sobrar" numa seção anterior (ex.: Assistência 24h).
     Por isso refazemos o scroll depois que tudo (imagens incluídas) carregou. */
  if (window.location.hash) {
    const fixHashScroll = () => {
      const target = document.querySelector(window.location.hash);
      if (!target) return;
      const offset = 84;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "auto" });
    };
    const runFix = () => {
      fixHashScroll();
      // segunda passada: garante mesmo se alguma imagem ainda assentar o layout
      setTimeout(fixHashScroll, 350);
    };
    if (document.readyState === "complete") {
      runFix();
    } else {
      window.addEventListener("load", runFix);
    }
  }

});
