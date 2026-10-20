// CLIENT CONFIG: customize the gym name, colors, text, and contact information here.
// Name: gymName and shortName. Colors: primaryColor and secondaryColor.
// Text: tagline, heroTitle, heroDescription, and footerTagline.
// Contact: phone, email, address, and instagram. Leave unused fields empty.
const GYM_CONFIG = {
  gymName: "IRON HOUSE GYM",
  shortName: "IH",
  tagline: "YOUR WORK. YOUR WEIGHT. YOUR WAY.",
  heroTitle: "BUILT BY\nEFFORT.",
  heroDescription: "A training space for showing up, getting stronger, and doing it again. No shortcuts. Just good work.",
  phone: "",
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
      if (item.label === "WhatsApp") {
        link.addEventListener("click", (event) => {
          event.preventDefault();
          const copy = PAGE_COPY[currentLanguage];
          const message = copy.generalWhatsAppMessage.replace("{gym}", GYM_CONFIG.gymName);
          openWhatsAppMessage(message, formStatus, copy);
        });
      }
      contactInfo.append(link);
    });
  }
}

applyGymConfig();

const PAGE_COPY = {
  en: {
    skip: "Skip to content", navigation: "Main navigation", language: "Language",
    training: "Training", membership: "Membership", coaches: "Coaches", contact: "Contact",
    joinHouse: "Join the house", tagline: "YOUR WORK. YOUR WEIGHT. YOUR WAY.",
    heroTitle: ["BUILT BY", "EFFORT."],
    heroDescription: "A training space for showing up, getting stronger, and doing it again. No shortcuts. Just good work.",
    joinNow: "JOIN NOW", explore: "Explore the gym", caption: "STRENGTH IS EARNED HERE",
    scrollTraining: "Scroll to training", approachLabel: "Our approach", approach: ["LESS TALK.", "MORE REPS."],
    approachDetail: "Space to focus. People who know their stuff. A training floor built for every version of your strong.",
    trainingEyebrow: "FIND YOUR TRAINING", trainingTitle: ["ROOM TO", "GET AFTER IT."],
    trainingNote: "Whether you’re building a routine or chasing a new personal best, there’s a place for you on the floor.",
    programs: [
      ["01 / OPEN FLOOR", "STRENGTH", "TRAINING", "Racks, free weights, and room to find your rhythm."],
      ["02 / SMALL GROUP", "GROUP", "TRAINING", "Good coaching. Better energy. Your pace."],
      ["03 / ONE TO ONE", "PERSONAL", "COACHING", "A plan shaped around your goals and your life."]
    ],
    membershipEyebrow: "PICK YOUR PACE", membershipTitle: ["YOUR TRAINING.", "YOUR TERMS."],
    membershipNote: "Straightforward options. No mystery math. Choose a starting point and we’ll help with the rest.",
    planIndex: ["01 — THE START", "02 — THE ROUTINE", "03 — THE FOCUS"],
    planName: ["OPEN GYM", "ALL ACCESS", "COACHING"],
    planDescription: [
      "Your space, your schedule. Get to know the floor and build a routine that sticks.",
      "A little structure, a lot of options. Make the most of every visit.",
      "Personal attention and a considered plan, built around what you want to do."
    ],
    features: [
      ["Full gym access", "Strength and cardio floor", "Intro session with a coach"],
      ["Everything in Open Gym", "Group training sessions", "Monthly progress check-in"],
      ["One-to-one coaching", "Personalized training plan", "Flexible coaching schedule"]
    ],
    askPlan: "ASK ABOUT THIS PLAN", featured: "MOST FLEXIBLE",
    planFootnote: "Membership details and pricing are available by inquiry. No prices or contact details are invented here.",
    coachesEyebrow: "GOOD PEOPLE. GOOD COACHING.", coachesTitle: ["KNOWLEDGE", "IN YOUR CORNER."],
    coachesNote: "Our coaching team meets you where you are and helps you take the next step with confidence.",
    coachName: ["STRENGTH COACH", "GROUP COACH", "PERSONAL COACH"],
    coachNumberPrefix: "COACH /",
    coachCaption: ["Barbell work · Foundations", "Movement · Conditioning", "One-to-one · Goal setting"],
    coachNote: "Coach names and biographies can be added when the team details are ready.",
    contactEyebrow: "YOUR NEXT SET STARTS HERE", contactTitle: ["LET’S", "GET TO WORK."],
    contactIntro: "Tell us what you’re looking for. We’ll help you find the right place to start.",
    contactDetails: "No address or phone number has been supplied. Add your gym’s real details before publishing.",
    nameLabel: "YOUR NAME", namePlaceholder: "Name", emailLabel: "EMAIL ADDRESS",
    interestLabel: "I’M INTERESTED IN", notSure: "Not sure yet", messageLabel: "YOUR MESSAGE",
    messagePlaceholder: "How can we help?", submit: "CONTINUE IN WHATSAPP",
    formNote: "WhatsApp opens with a pre-filled draft. Review and send it there; this form does not send or store your inquiry.",
    footerTagline: "BUILT BY EFFORT. OPEN TO EVERYONE.", backTop: "BACK TO TOP",
    menuOpen: "Open navigation", menuClose: "Close navigation",
    errorWhatsApp: "WhatsApp is unavailable because its number is missing or invalid. No message was sent.",
    readyWhatsApp: "WhatsApp opened with your draft. Review and send it there; it has not been sent yet.",
    blockedWhatsApp: "Your browser blocked the WhatsApp window. ", openInquiry: "Open your WhatsApp draft",
    introMessage: "Hi {gym},", nameIntro: "My name is {name}.",
    planInterestMessage: "I'm interested in the {plan} membership.",
    planUnknownMessage: "I'm interested in learning more about your memberships.",
    planButtonMessage: "Hi {gym}, I'm interested in the {plan} membership. I'd like to know more.",
    generalWhatsAppMessage: "Hi {gym}, I'm interested in your memberships. I'd like to know more.",
    planLabel: "Membership plan",
    messageLabelWhatsApp: "Message"
  },
  ar: {
    skip: "انتقل إلى المحتوى", navigation: "القائمة الرئيسية", language: "اللغة",
    training: "التدريب", membership: "العضوية", coaches: "المدربون", contact: "تواصل معنا",
    joinHouse: "انضم إلى النادي", tagline: "جهدك. أوزانك. طريقتك.",
    heroTitle: ["صُنِعَ", "بالجهد."],
    heroDescription: "مساحة تدريب تمنحك فرصة الحضور والتطور والعودة من جديد. بلا طرق مختصرة، فقط عمل جاد.",
    joinNow: "انضم الآن", explore: "اكتشف النادي", caption: "القوة تُكتسب هنا",
    scrollTraining: "انتقل إلى قسم التدريب", approachLabel: "نهجنا", approach: ["كلام أقل.", "تمارين أكثر."],
    approachDetail: "مساحة للتركيز، وخبرات موثوقة، وأرضية تدريب تناسب كل مستوى من قوتك.",
    trainingEyebrow: "اختر تدريبك", trainingTitle: ["مساحة", "لإنجاز المزيد."],
    trainingNote: "سواء كنت تبني روتينًا أو تسعى إلى أفضل أداء لك، ستجد مكانك على أرضية التدريب.",
    programs: [
      ["01 / تدريب مفتوح", "تمارين", "القوة", "أقفاص تدريب وأوزان حرة ومساحة لتجد إيقاعك."],
      ["02 / مجموعات صغيرة", "تدريب", "جماعي", "توجيه جيد، وطاقة أفضل، وبالوتيرة التي تناسبك."],
      ["03 / تدريب فردي", "تدريب", "شخصي", "خطة مصممة حول أهدافك وحياتك."]
    ],
    membershipEyebrow: "اختر ما يناسب وتيرتك", membershipTitle: ["تدريبك.", "شروطك."],
    membershipNote: "خيارات واضحة بلا حسابات مبهمة. اختر نقطة البداية وسنساعدك في الباقي.",
    planIndex: ["01 — البداية", "02 — الروتين", "03 — التركيز"],
    planName: ["الصالة المفتوحة", "دخول شامل", "التدريب الشخصي"],
    planDescription: [
      "مساحتك ووقتك. تعرّف على أرضية التدريب وابنِ روتينًا يستمر.",
      "قليل من التنظيم وخيارات كثيرة. استفد من كل زيارة.",
      "اهتمام شخصي وخطة مدروسة تناسب ما تريد تحقيقه."
    ],
    features: [
      ["دخول كامل إلى الصالة", "منطقة القوة وتمارين القلب", "جلسة تعريفية مع مدرب"],
      ["كل ما يتضمنه اشتراك الصالة المفتوحة", "جلسات تدريب جماعي", "متابعة شهرية للتقدم"],
      ["تدريب فردي مع مدرب", "خطة تدريب مخصصة", "مواعيد تدريب مرنة"]
    ],
    askPlan: "استفسر عن هذه العضوية", featured: "الأكثر مرونة",
    planFootnote: "تتوفر تفاصيل العضوية والأسعار عند الاستفسار. لم تتم إضافة أسعار أو بيانات تواصل غير مؤكدة.",
    coachesEyebrow: "فريق مميز. تدريب بإتقان.", coachesTitle: ["خبرة", "تساندك."],
    coachesNote: "يبدأ فريق التدريب من مستواك الحالي ويساعدك على اتخاذ خطوتك التالية بثقة.",
    coachName: ["مدرب القوة", "مدرب التدريب الجماعي", "المدرب الشخصي"],
    coachNumberPrefix: "مدرب /",
    coachCaption: ["تمارين الأثقال · الأساسيات", "الحركة · اللياقة", "تدريب فردي · تحديد الأهداف"],
    coachNote: "يمكن إضافة أسماء المدربين ونبذهم عند توفر تفاصيل الفريق.",
    contactEyebrow: "تبدأ مجموعتك القادمة هنا", contactTitle: ["هيا", "نبدأ العمل."],
    contactIntro: "أخبرنا بما تبحث عنه، وسنساعدك في العثور على نقطة البداية المناسبة.",
    contactDetails: "لم يتم تزويدنا بعنوان أو رقم هاتف. أضف بيانات النادي الحقيقية قبل النشر.",
    nameLabel: "اسمك", namePlaceholder: "الاسم", emailLabel: "البريد الإلكتروني",
    interestLabel: "ما الذي يهمك؟", notSure: "لم أقرر بعد", messageLabel: "رسالتك",
    messagePlaceholder: "كيف يمكننا مساعدتك؟", submit: "المتابعة إلى واتساب",
    formNote: "سيُفتح واتساب بمسودة جاهزة. راجعها وأرسلها من هناك؛ هذا النموذج لا يرسل استفسارك ولا يخزنه.",
    footerTagline: "القوة بالجهد. والجميع مرحب بهم.", backTop: "العودة للأعلى",
    menuOpen: "فتح القائمة", menuClose: "إغلاق القائمة",
    errorWhatsApp: "واتساب غير متاح لأن رقمه غير موجود أو غير صالح. لم تُرسل أي رسالة.",
    readyWhatsApp: "فُتح واتساب بالمسودة. راجعها وأرسلها من هناك؛ لم تُرسل بعد.",
    blockedWhatsApp: "منع المتصفح فتح واتساب. ", openInquiry: "افتح مسودة واتساب",
    introMessage: "مرحبًا {gym}،", nameIntro: "اسمي {name}.",
    planInterestMessage: "أنا مهتم باشتراك {plan}.",
    planUnknownMessage: "أرغب في معرفة المزيد عن العضويات.",
    planButtonMessage: "مرحبًا {gym}، أنا مهتم باشتراك {plan}. أود معرفة المزيد.",
    generalWhatsAppMessage: "مرحبًا {gym}، أنا مهتم بعضويات النادي. أود معرفة المزيد.",
    planLabel: "العضوية",
    messageLabelWhatsApp: "الرسالة"
  }
};

let currentLanguage = "en";
const languageButtons = document.querySelectorAll("[data-language]");
const menuButton = document.querySelector(".menu-toggle");
const contactInfoElement = document.querySelector("[data-gym-contact-info]");
const englishContactInfo = contactInfoElement.textContent;

function assignLineHeading(element, lines) {
  if (!element || !lines) return;
  const coloredLine = element.querySelector("span");
  if (element.firstChild && element.firstChild.nodeType === Node.TEXT_NODE) {
    element.firstChild.textContent = lines[0] || "";
  }
  if (coloredLine) {
    coloredLine.textContent = lines[1] || "";
  } else {
    const lineBreak = [...element.childNodes].find((node) => node.nodeName === "BR");
    const secondLine = lineBreak && lineBreak.nextSibling;
    if (secondLine && secondLine.nodeType === Node.TEXT_NODE) secondLine.textContent = lines[1] || "";
  }
}

function assignLeadingText(element, value) {
  if (element && element.firstChild && element.firstChild.nodeType === Node.TEXT_NODE) {
    element.firstChild.textContent = `${value} `;
  }
}

function applyLanguage(language) {
  currentLanguage = language === "ar" ? "ar" : "en";
  const copy = PAGE_COPY[currentLanguage];
  const isArabic = currentLanguage === "ar";
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = isArabic ? "rtl" : "ltr";
  document.querySelector(".skip-link").textContent = copy.skip;
  document.querySelector(".site-nav").setAttribute("aria-label", copy.navigation);
  document.querySelector(".language-switch").setAttribute("aria-label", copy.language);

  const navLinks = document.querySelectorAll(".site-nav a");
  [copy.training, copy.membership, copy.coaches, copy.contact].forEach((text, index) => {
    navLinks[index].textContent = text;
  });
  assignLeadingText(document.querySelector(".nav-join"), copy.joinHouse);

  const tagline = document.querySelector("[data-gym-tagline]");
  if (tagline && tagline.lastChild) tagline.lastChild.textContent = ` ${copy.tagline}`;
  assignLineHeading(document.querySelector("[data-gym-hero-title]"), copy.heroTitle);
  document.querySelector("[data-gym-hero-description]").textContent = copy.heroDescription;
  assignLeadingText(document.querySelector(".hero-actions .button"), copy.joinNow);
  assignLeadingText(document.querySelector(".hero-actions .text-link"), copy.explore);
  document.querySelector(".hero-caption span:last-child").textContent = copy.caption;
  document.querySelector(".hero-scroll").setAttribute("aria-label", copy.scrollTraining);

  const intro = document.querySelector(".intro-band");
  intro.setAttribute("aria-label", copy.approachLabel);
  assignLineHeading(intro.querySelector("p:first-child"), copy.approach);
  intro.querySelector(".intro-detail").textContent = copy.approachDetail;

  const sections = [
    [".training-section", copy.trainingEyebrow, copy.trainingTitle, copy.trainingNote],
    [".membership-section", copy.membershipEyebrow, copy.membershipTitle, copy.membershipNote],
    [".coaches-section", copy.coachesEyebrow, copy.coachesTitle, copy.coachesNote],
    [".contact-section", copy.contactEyebrow, copy.contactTitle, copy.contactIntro]
  ];
  sections.forEach(([selector, eyebrowText, titleLines, noteText]) => {
    const section = document.querySelector(selector);
    const eyebrow = section.querySelector(".section-heading .eyebrow, .contact-copy .eyebrow");
    if (eyebrow && eyebrow.lastChild) eyebrow.lastChild.textContent = ` ${eyebrowText}`;
    assignLineHeading(section.querySelector("h2"), titleLines);
    const note = section.querySelector(".section-note");
    if (note) note.textContent = noteText;
  });

  document.querySelectorAll("[data-training-program]").forEach((card, index) => {
    const program = copy.programs[index];
    card.querySelector("[data-program-category]").textContent = program[0];
    assignLineHeading(card.querySelector("[data-program-name]"), [program[1], program[2]]);
    card.querySelector("[data-program-description]").textContent = program[3];
  });

  document.querySelectorAll("[data-membership-plan]").forEach((card, index) => {
    const indexLabel = card.querySelector("[data-plan-index]");
    indexLabel.firstChild.textContent = copy.planIndex[index];
    card.querySelector("[data-plan-name]").textContent = copy.planName[index];
    card.querySelector("[data-plan-description]").textContent = copy.planDescription[index];
    card.querySelector("[data-plan-features]").querySelectorAll("li").forEach((item, featureIndex) => {
      item.textContent = copy.features[index][featureIndex];
    });
    const badge = card.querySelector("[data-plan-featured-label]");
    if (badge) badge.textContent = copy.featured;
    const button = card.querySelector("[data-plan-button]");
    assignLeadingText(button, copy.askPlan);
    button.dataset.plan = GYM_CONFIG.membershipPlans[index].contactValue;
    const option = document.querySelectorAll("[data-plan-option]")[index];
    if (option) option.textContent = copy.planName[index];
  });
  document.querySelector("#interest option[value='Not sure yet']").textContent = copy.notSure;
  document.querySelector("[data-plan-footnote]").textContent = copy.planFootnote;

  document.querySelectorAll(".coach-card").forEach((card, index) => {
    card.querySelector("[data-coach-name]").textContent = copy.coachName[index];
    card.querySelector("[data-coach-caption]").textContent = copy.coachCaption[index];
    card.querySelector(".coach-number").textContent = `${copy.coachNumberPrefix} ${String(index + 1).padStart(2, "0")}`;
  });
  document.querySelector(".coach-note").textContent = copy.coachNote;
  if (!contactInfoElement.querySelector("a")) {
    contactInfoElement.textContent = isArabic ? copy.contactDetails : englishContactInfo;
  }
  document.querySelectorAll(".wordmark").forEach((wordmark) => {
    wordmark.setAttribute("aria-label", isArabic
      ? (wordmark.classList.contains("footer-wordmark") ? "IRON HOUSE GYM — العودة إلى الأعلى" : "IRON HOUSE GYM — الصفحة الرئيسية")
      : (wordmark.classList.contains("footer-wordmark") ? `${GYM_CONFIG.gymName} back to top` : `${GYM_CONFIG.gymName} home`));
  });

  const form = document.querySelector(".contact-form");
  const formLabels = [copy.nameLabel, copy.emailLabel, copy.interestLabel, copy.messageLabel];
  ["name", "email", "interest", "inquiry-message"].forEach((id, index) => {
    form.querySelector(`label[for='${id}']`).textContent = formLabels[index];
  });
  document.querySelector("#name").placeholder = copy.namePlaceholder;
  document.querySelector("#inquiry-message").placeholder = copy.messagePlaceholder;
  assignLeadingText(document.querySelector(".form-submit"), copy.submit);
  document.querySelector(".form-note").textContent = copy.formNote;
  document.querySelector("[data-gym-footer-tagline]").textContent = copy.footerTagline;
  assignLeadingText(document.querySelector(".back-to-top"), copy.backTop);

  document.querySelectorAll("[data-program-image]").forEach((image, index) => {
    image.alt = isArabic
      ? ["معدات تمارين القوة على أرضية النادي", "متدرب يؤدي تمرين حركة", "مدرب يوجه متدربًا أثناء رفع الأثقال"][index]
      : GYM_CONFIG.trainingPrograms[index].altText;
  });
  const coachAlts = isArabic
    ? ["مدرب قوة في النادي", "مدرب لياقة يقود جلسة تدريب", "مدرب شخصي يستعد لجلسة تدريب"]
    : GYM_CONFIG.coaches.map((coach) => coach.altText);
  document.querySelectorAll("[data-coach-image]").forEach((image, index) => { image.alt = coachAlts[index]; });

  menuButton.setAttribute("aria-label", menuButton.getAttribute("aria-expanded") === "true" ? copy.menuClose : copy.menuOpen);
  languageButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.language === currentLanguage)));
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.language));
});
applyLanguage("en");

const siteNav = document.querySelector(".site-nav");
const contactForm = document.querySelector("#contact-form");
const interestSelect = document.querySelector("#interest");
const formStatus = document.querySelector("#form-status");

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", PAGE_COPY[currentLanguage].menuOpen);
  siteNav.classList.remove("is-open");
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? PAGE_COPY[currentLanguage].menuOpen : PAGE_COPY[currentLanguage].menuClose);
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
    const selectedPlan = interestSelect.options[interestSelect.selectedIndex];
    const copy = PAGE_COPY[currentLanguage];
    const message = copy.planButtonMessage
      .replace("{gym}", GYM_CONFIG.gymName)
      .replace("{plan}", selectedPlan ? selectedPlan.textContent.trim() : button.dataset.plan);
    openWhatsAppMessage(message, formStatus, copy);
    window.location.hash = "contact-form";
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const selectedPlan = interestSelect.options[interestSelect.selectedIndex];
  const copy = PAGE_COPY[currentLanguage];
  const planValue = interestSelect.value;
  const planMessage = planValue !== "Not sure yet"
    ? copy.planInterestMessage.replace("{plan}", selectedPlan ? selectedPlan.textContent.trim() : planValue)
    : copy.planUnknownMessage;
  const message = [
    copy.introMessage.replace("{gym}", GYM_CONFIG.gymName),
    "",
    copy.nameIntro.replace("{name}", document.querySelector("#name").value.trim()),
    `${copy.emailLabel}: ${document.querySelector("#email").value.trim()}`,
    planMessage,
    `${copy.messageLabelWhatsApp}: ${document.querySelector("#inquiry-message").value.trim()}`
  ].join("\n");
  openWhatsAppMessage(message, formStatus, copy);
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
