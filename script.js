// CLIENT CONFIG: customize the gym name, colors, text, and contact information here.
// Name: gymName and shortName. Colors: primaryColor and secondaryColor.
// Text: tagline, heroTitle, heroDescription, and footerTagline.
// Contact: phone, whatsApp, email, address, and instagram. Leave unused fields empty.
const GYM_CONFIG = {
  gymName: "IRON HOUSE GYM",
  shortName: "IH",
  tagline: "YOUR WORK. YOUR WEIGHT. YOUR WAY.",
  heroTitle: "BUILT BY\nEFFORT.",
  heroDescription: "A training space for showing up, getting stronger, and doing it again. No shortcuts. Just good work.",
  phone: "",
  whatsApp: "",
  email: "",
  address: "",
  instagram: "",
  primaryColor: "#FF2020",
  secondaryColor: "#121212",
  footerTagline: "BUILT BY EFFORT. OPEN TO EVERYONE.",
  heroImage: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=2200&q=90",
  contactImage: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=2000&q=85",
  // Keep three programs, plans, and coaches to match the existing page cards.
  trainingPrograms: [
    {
      category: "OPEN FLOOR",
      name: "STRENGTH\nTRAINING",
      shortDescription: "Racks, free weights, and room to find your rhythm.",
      features: [],
      imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85",
      altText: "Strength training equipment on a gym floor"
    },
    {
      category: "SMALL GROUP",
      name: "GROUP\nTRAINING",
      shortDescription: "Good coaching. Better energy. Your pace.",
      features: [],
      imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=85",
      altText: "Athlete working through a mobility exercise"
    },
    {
      category: "ONE TO ONE",
      name: "PERSONAL\nCOACHING",
      shortDescription: "A plan shaped around your goals and your life.",
      features: [],
      imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=85",
      altText: "Coach guiding an athlete through a barbell lift"
    }
  ],
  membershipPlans: [
    {
      indexLabel: "01 — THE START",
      name: "OPEN GYM",
      description: "Your space, your schedule. Get to know the floor and build a routine that sticks.",
      features: ["Full gym access", "Strength and cardio floor", "Intro session with a coach"],
      price: "",
      featured: false,
      featuredLabel: "MOST FLEXIBLE",
      buttonText: "ASK ABOUT THIS PLAN",
      contactValue: "Open Gym"
    },
    {
      indexLabel: "02 — THE ROUTINE",
      name: "ALL ACCESS",
      description: "A little structure, a lot of options. Make the most of every visit.",
      features: ["Everything in Open Gym", "Group training sessions", "Monthly progress check-in"],
      price: "",
      featured: true,
      featuredLabel: "MOST FLEXIBLE",
      buttonText: "ASK ABOUT THIS PLAN",
      contactValue: "All Access"
    },
    {
      indexLabel: "03 — THE FOCUS",
      name: "COACHING",
      description: "Personal attention and a considered plan, built around what you want to do.",
      features: ["One-to-one coaching", "Personalized training plan", "Flexible coaching schedule"],
      price: "",
      featured: false,
      featuredLabel: "MOST FLEXIBLE",
      buttonText: "ASK ABOUT THIS PLAN",
      contactValue: "Personal Coaching"
    }
  ],
  coaches: [
    {
      name: "STRENGTH COACH",
      role: "Barbell work",
      bio: "Foundations",
      imageUrl: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=900&q=85",
      altText: "Strength coach in the gym"
    },
    {
      name: "GROUP COACH",
      role: "Movement",
      bio: "Conditioning",
      imageUrl: "https://images.unsplash.com/photo-1549476464-37392f717541?auto=format&fit=crop&w=900&q=85",
      altText: "Fitness coach leading a training session"
    },
    {
      name: "PERSONAL COACH",
      role: "One-to-one",
      bio: "Goal setting",
      imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=85",
      altText: "Personal trainer preparing for a session"
    }
  ]
};

function applyGymConfig() {
  const nameParts = GYM_CONFIG.gymName.trim().split(/\s+/);
  const suffix = nameParts.length > 1 ? nameParts.pop() : "";
  const prefix = nameParts.join(" ");

  document.querySelectorAll("[data-gym-name]").forEach((element) => {
    const suffixElement = element.querySelector("span");
    element.firstChild.textContent = prefix ? `${prefix} ` : GYM_CONFIG.gymName;
    if (suffixElement) suffixElement.textContent = suffix;
  });

  document.querySelectorAll("[data-gym-short-name]").forEach((element) => {
    element.textContent = GYM_CONFIG.shortName;
  });

  document.querySelectorAll(".wordmark").forEach((element) => {
    const isFooter = element.classList.contains("footer-wordmark");
    element.setAttribute(
      "aria-label",
      isFooter ? `${GYM_CONFIG.gymName} back to top` : `${GYM_CONFIG.gymName} home`
    );
  });

  const heroTagline = document.querySelector("[data-gym-tagline]");
  if (heroTagline && heroTagline.lastChild) {
    heroTagline.lastChild.textContent = ` ${GYM_CONFIG.tagline}`;
  }

  const heroTitle = document.querySelector("[data-gym-hero-title]");
  if (heroTitle) {
    const titleLines = GYM_CONFIG.heroTitle.split(/\r?\n/);
    if (heroTitle.firstChild) heroTitle.firstChild.textContent = titleLines[0] || "";
    const secondLine = heroTitle.querySelector("span");
    if (secondLine) secondLine.textContent = titleLines[1] || "";
  }

  const heroDescription = document.querySelector("[data-gym-hero-description]");
  if (heroDescription) heroDescription.textContent = GYM_CONFIG.heroDescription;

  const footerTagline = document.querySelector("[data-gym-footer-tagline]");
  if (footerTagline) footerTagline.textContent = GYM_CONFIG.footerTagline;

  const titleSuffix = GYM_CONFIG.heroTitle
    .replace(/\r?\n/g, " ")
    .replace(/[.!?]+$/, "")
    .toLowerCase()
    .replace(/^./, (letter) => letter.toUpperCase());
  document.title = `${GYM_CONFIG.gymName} | ${titleSuffix}`;

  const descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta) {
    descriptionMeta.content = descriptionMeta.content.replace(
      /IRON HOUSE GYM/g,
      GYM_CONFIG.gymName
    );
  }

  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (themeColorMeta) themeColorMeta.content = GYM_CONFIG.secondaryColor;
  document.documentElement.style.setProperty("--acid", GYM_CONFIG.primaryColor);
  document.documentElement.style.setProperty("--ink-soft", GYM_CONFIG.secondaryColor);
  document.documentElement.style.setProperty(
    "--gym-hero-image",
    `url(${JSON.stringify(GYM_CONFIG.heroImage)})`
  );
  document.documentElement.style.setProperty(
    "--gym-contact-image",
    `url(${JSON.stringify(GYM_CONFIG.contactImage)})`
  );

  const setHeadingLines = (element, value) => {
    const lines = value.split(/\r?\n/);
    element.replaceChildren(document.createTextNode(lines[0] || ""));
    if (lines.length > 1) {
      const lineBreak = document.createElement("br");
      element.append(lineBreak, document.createTextNode(lines.slice(1).join(" ")));
    }
  };

  document.querySelectorAll("[data-training-program]").forEach((card, index) => {
    const program = GYM_CONFIG.trainingPrograms[index];
    if (!program) return;

    const category = card.querySelector("[data-program-category]");
    const name = card.querySelector("[data-program-name]");
    const description = card.querySelector("[data-program-description]");
    const image = card.querySelector("[data-program-image]");
    if (category) category.textContent = `${String(index + 1).padStart(2, "0")} / ${program.category}`;
    if (name) setHeadingLines(name, program.name);
    if (description) {
      const details = [program.shortDescription, ...(program.features || [])].filter(Boolean);
      description.textContent = details.join(" · ");
    }
    if (image) {
      image.src = program.imageUrl;
      image.alt = program.altText;
    }
  });

  const planOptions = document.querySelectorAll("[data-plan-option]");
  document.querySelectorAll("[data-membership-plan]").forEach((card, index) => {
    const plan = GYM_CONFIG.membershipPlans[index];
    if (!plan) return;

    const indexLabel = card.querySelector("[data-plan-index]");
    const priceLabel = card.querySelector("[data-plan-price]");
    const name = card.querySelector("[data-plan-name]");
    const description = card.querySelector("[data-plan-description]");
    const features = card.querySelector("[data-plan-features]");
    const featuredLabel = card.querySelector("[data-plan-featured-label]");
    const button = card.querySelector("[data-plan-button]");
    const price = (plan.price || "").trim();

    if (indexLabel && indexLabel.firstChild) {
      indexLabel.firstChild.textContent = plan.indexLabel;
    }
    if (priceLabel) {
      priceLabel.textContent = price ? ` · ${price}` : "";
      priceLabel.hidden = !price;
    }
    if (name) name.textContent = plan.name;
    if (description) description.textContent = plan.description;
    if (features) {
      features.replaceChildren(
        ...(plan.features || []).map((feature) => {
          const item = document.createElement("li");
          item.textContent = feature;
          return item;
        })
      );
    }

    card.classList.toggle("plan-featured", Boolean(plan.featured));
    if (featuredLabel) {
      featuredLabel.hidden = !plan.featured;
      if (plan.featured) featuredLabel.textContent = plan.featuredLabel || "MOST POPULAR";
    }
    if (button) {
      button.dataset.plan = plan.contactValue;
      button.classList.toggle("button-primary", Boolean(plan.featured));
      button.classList.toggle("button-outline", !plan.featured);
      if (button.firstChild) button.firstChild.textContent = `${plan.buttonText} `;
    }

    const option = planOptions[index];
    if (option) {
      option.value = plan.contactValue;
      option.textContent = plan.name;
    }
  });

  const planFootnote = document.querySelector("[data-plan-footnote]");
  if (planFootnote) {
    planFootnote.hidden = GYM_CONFIG.membershipPlans.some((plan) => (plan.price || "").trim());
  }

  document.querySelectorAll(".coach-card").forEach((card, index) => {
    const coach = GYM_CONFIG.coaches[index];
    if (!coach) return;

    const image = card.querySelector("[data-coach-image]");
    const name = card.querySelector("[data-coach-name]");
    const caption = card.querySelector("[data-coach-caption]");
    if (image) {
      image.src = coach.imageUrl;
      image.alt = coach.altText;
    }
    if (name) name.textContent = coach.name;
    if (caption) {
      caption.textContent = [coach.role, coach.bio].filter(Boolean).join(" · ");
    }
  });

  const contactInfo = document.querySelector("[data-gym-contact-info]");
  if (!contactInfo) return;

  const contactItems = [];
  const addContactItem = (label, value, href, external = false) => {
    if (value) contactItems.push({ label, value, href, external });
  };

  const phoneDigits = GYM_CONFIG.phone.replace(/\D/g, "");
  if (phoneDigits) {
    addContactItem("Phone", GYM_CONFIG.phone, `tel:${GYM_CONFIG.phone.replace(/[^\d+]/g, "")}`);
  }

  const whatsAppUrl = createWhatsAppUrl(
    `Hello ${GYM_CONFIG.gymName}, I would like to ask about your memberships.`
  );
  if (whatsAppUrl) {
    addContactItem(
      "WhatsApp",
      "Message us on WhatsApp",
      whatsAppUrl,
      true
    );
  }

  if (GYM_CONFIG.email.trim()) {
    addContactItem("Email", GYM_CONFIG.email.trim(), `mailto:${GYM_CONFIG.email.trim()}`);
  }

  addContactItem("Address", GYM_CONFIG.address.trim());

  const instagramHandle = GYM_CONFIG.instagram
    .trim()
    .replace(/^@/, "")
    .replace(/^https?:\/\/(www\.)?instagram\.com\//i, "")
    .replace(/\/.*$/, "");
  if (/^[A-Za-z0-9._]{1,30}$/.test(instagramHandle)) {
    addContactItem(
      "Instagram",
      `@${instagramHandle}`,
      `https://www.instagram.com/${instagramHandle}/`,
      true
    );
  }

  if (contactItems.length) {
    contactInfo.replaceChildren();
    contactItems.forEach((item, index) => {
      if (index) contactInfo.append(document.createTextNode(" · "));
      if (!item.href) {
        contactInfo.append(document.createTextNode(`${item.label}: ${item.value}`));
        return;
      }

      const link = document.createElement("a");
      link.href = item.href;
      link.textContent = item.label === "WhatsApp"
        ? item.value
        : `${item.label}: ${item.value}`;
      if (item.external) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
      contactInfo.append(link);
    });
  }
}

applyGymConfig();

function getWhatsAppNumber() {
  const configuredValue = GYM_CONFIG.whatsApp.trim();
  if (!configuredValue) return "";

  if (/^https?:\/\//i.test(configuredValue)) {
    try {
      const configuredUrl = new URL(configuredValue);
      if (configuredUrl.hostname === "wa.me") {
        return (configuredUrl.pathname.split("/").filter(Boolean)[0] || "").replace(/\D/g, "");
      }
      if (configuredUrl.hostname === "api.whatsapp.com") {
        return (configuredUrl.searchParams.get("phone") || "").replace(/\D/g, "");
      }
      return "";
    } catch {
      return "";
    }
  }

  return configuredValue.replace(/\D/g, "");
}

function createWhatsAppUrl(message) {
  const phoneNumber = getWhatsAppNumber();
  if (!/^\d{8,15}$/.test(phoneNumber)) return "";
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

const menuButton = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const contactForm = document.querySelector("#contact-form");
const interestSelect = document.querySelector("#interest");
const formStatus = document.querySelector("#form-status");

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
  siteNav.classList.remove("is-open");
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  siteNav.classList.toggle("is-open", !isOpen);
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuButton.focus();
  }
});

document.addEventListener("click", (event) => {
  const menuIsOpen = menuButton.getAttribute("aria-expanded") === "true";
  if (menuIsOpen && !siteNav.contains(event.target) && !menuButton.contains(event.target)) {
    closeMenu();
  }
});

document.querySelectorAll(".choose-plan").forEach((button) => {
  button.addEventListener("click", () => {
    interestSelect.value = button.dataset.plan;
    window.location.hash = "contact-form";
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const selectedPlan = interestSelect.options[interestSelect.selectedIndex];
  const message = [
    `Hello ${GYM_CONFIG.gymName}, I would like to make an inquiry.`,
    "",
    `Name: ${document.querySelector("#name").value.trim()}`,
    `Email: ${document.querySelector("#email").value.trim()}`,
    `Membership plan: ${selectedPlan ? selectedPlan.textContent : interestSelect.value}`,
    "",
    `Message: ${document.querySelector("#inquiry-message").value.trim()}`
  ].join("\n");
  const whatsAppUrl = createWhatsAppUrl(message);

  if (!whatsAppUrl) {
    formStatus.textContent = "WhatsApp is not configured for this gym yet. Your inquiry was not sent.";
    return;
  }

  const whatsAppWindow = window.open(whatsAppUrl, "_blank");
  if (whatsAppWindow) {
    whatsAppWindow.opener = null;
    formStatus.textContent = "Your inquiry is ready in WhatsApp. Review and send it there.";
    return;
  }

  formStatus.replaceChildren(document.createTextNode("Your browser blocked the WhatsApp window. "));
  const fallbackLink = document.createElement("a");
  fallbackLink.href = whatsAppUrl;
  fallbackLink.target = "_blank";
  fallbackLink.rel = "noopener noreferrer";
  fallbackLink.textContent = "Open your WhatsApp inquiry";
  formStatus.append(fallbackLink);
});

document.querySelector("#current-year").textContent = new Date().getFullYear();

function initScrollUI() {
  const header = document.querySelector(".site-header");
  const hero = document.querySelector(".hero");
  const heroImage = document.querySelector(".hero-image");
  const heroContent = document.querySelector(".hero-content");
  const contactSection = document.querySelector(".contact-section");
  const contactImage = document.querySelector(".contact-image");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const progressTrack = document.createElement("div");
  const progressFill = document.createElement("span");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let animationFrame = 0;

  progressTrack.className = "scroll-progress";
  progressTrack.setAttribute("aria-hidden", "true");
  progressTrack.append(progressFill);
  document.body.prepend(progressTrack);

  const updateScrollUI = () => {
    animationFrame = 0;
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0
      ? Math.min(1, Math.max(0, window.scrollY / scrollableHeight))
      : 0;

    progressFill.style.transform = `scaleX(${progress})`;
    header.classList.toggle("is-scrolled", window.scrollY > 24);

    if (!prefersReducedMotion && finePointer && hero && heroImage) {
      const heroProgress = Math.min(1, Math.max(0, window.scrollY / hero.offsetHeight));
      heroImage.style.setProperty("--hero-parallax-offset", `${heroProgress * 90}px`);
      if (heroContent) {
        heroContent.style.setProperty("--hero-content-shift", `${-heroProgress * 40}px`);
        heroContent.style.setProperty("--hero-content-fade", String(1 - heroProgress * 0.85));
      }
      if (contactSection && contactImage) {
        const box = contactSection.getBoundingClientRect();
        if (box.bottom > 0 && box.top < window.innerHeight) {
          const offset = (box.top + box.height / 2 - window.innerHeight / 2) / window.innerHeight;
          contactImage.style.setProperty("--contact-parallax", `${offset * -40}px`);
        }
      }
    }
  };

  const scheduleScrollUIUpdate = () => {
    if (!animationFrame) animationFrame = window.requestAnimationFrame(updateScrollUI);
  };

  window.addEventListener("scroll", scheduleScrollUIUpdate, { passive: true });
  window.addEventListener("resize", scheduleScrollUIUpdate);
  updateScrollUI();
}

initScrollUI();

function initScrollReveals() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  document.documentElement.classList.add("motion-enabled");
  if (!("IntersectionObserver" in window)) return;

  const revealTargets = document.querySelectorAll(
    ".intro-band, .section-heading .eyebrow, .section-heading h2, .section-note, .service-card, .plan-card, .coach-card, .contact-copy, .contact-form"
  );
  const cardSelector = ".service-card, .plan-card, .coach-card";

  revealTargets.forEach((element) => {
    if (element.matches(cardSelector)) {
      const siblings = [...element.parentElement.children].filter((sibling) =>
        sibling.matches(cardSelector)
      );
      element.style.setProperty("--reveal-delay", `${siblings.indexOf(element) * 85}ms`);
    }
    if (element.matches(".section-heading h2")) element.style.setProperty("--reveal-delay", "90ms");
    if (element.matches(".section-note")) element.style.setProperty("--reveal-delay", "180ms");
    element.classList.add("scroll-reveal");
  });

  document.documentElement.classList.add("has-scroll-reveals");

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        setTimeout(() => entry.target.classList.add("is-settled"), 1500);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -32px 0px" });

  revealTargets.forEach((element) => revealObserver.observe(element));
}

initScrollReveals();

function initPremiumUI() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  // Active section underline in the nav
  const links = [...document.querySelectorAll('.site-nav a[href^="#"]:not(.nav-join)')];
  if ("IntersectionObserver" in window && links.length) {
    const map = new Map(links.map((link) => [link.getAttribute("href").slice(1), link]));
    const margin = { rootMargin: "-45% 0px -50% 0px" };
    const spy = new IntersectionObserver((entries) => entries.forEach((entry) => {
      const link = map.get(entry.target.id);
      if (link && entry.isIntersecting) links.forEach((item) => item.classList.toggle("is-active", item === link));
    }), margin);
    map.forEach((_, id) => { const section = document.getElementById(id); if (section) spy.observe(section); });
    const hero = document.querySelector(".hero");
    if (hero) new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) links.forEach((item) => item.classList.remove("is-active"));
    }, margin).observe(hero);
  }

  // Cursor glow and card spotlight (mouse only)
  if (reduced || !finePointer) return;
  const glow = document.createElement("div");
  glow.className = "cursor-glow";
  glow.setAttribute("aria-hidden", "true");
  document.body.append(glow);
  let targetX = 0, targetY = 0, x = 0, y = 0, frame = 0;
  const follow = () => {
    x += (targetX - x) * 0.12;
    y += (targetY - y) * 0.12;
    glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    frame = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.5 ? requestAnimationFrame(follow) : 0;
  };
  window.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse") return;
    targetX = event.clientX;
    targetY = event.clientY;
    if (!glow.classList.contains("is-active")) { x = targetX; y = targetY; glow.classList.add("is-active"); }
    if (!frame) frame = requestAnimationFrame(follow);
    const card = event.target.closest && event.target.closest(".service-card, .plan-card");
    if (card) {
      const box = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - box.left}px`);
      card.style.setProperty("--my", `${event.clientY - box.top}px`);
    }
  }, { passive: true });
  document.documentElement.addEventListener("pointerleave", () => glow.classList.remove("is-active"));
}

initPremiumUI();
