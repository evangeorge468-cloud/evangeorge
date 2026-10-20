(() => {
  const supabaseClient = window.ironHouseSupabase;
  const page = document.body.dataset.page;
  const authCopy = {
    en: {
      eyebrow: "MEMBER MANAGEMENT", welcome: "WELCOME", back: "BACK.",
      loginIntro: "Sign in with your gym account to continue.", emailLabel: "EMAIL ADDRESS",
      passwordLabel: "PASSWORD", signIn: "SIGN IN", createAccount: "Create account",
      backToSite: "← Back to the public website", signupEyebrow: "NEW GYM ACCOUNT",
      create: "CREATE", account: "ACCOUNT.", signupIntro: "Create your gym account to get started.",
      confirmPasswordLabel: "CONFIRM PASSWORD", gymNameLabel: "GYM NAME",
      returnToLogin: "Already have an account? Sign in", language: "Language",
      sessionExpired: "Your session expired or is no longer valid. Please sign in again.",
      signInRequired: "Please sign in to continue.",
      signInSessionMissing: "Your credentials were accepted, but no login session was established. Check browser storage settings and try again.",
      sessionCheck: "We couldn’t check your session. Check your connection and try again.",
      emailNotConfirmed: "Please confirm your email address before signing in.",
      invalidCredentials: "Email or password is incorrect. Check your details and try again.",
      signInError: "We couldn’t sign you in right now. Check your connection and try again.",
      passwordMismatch: "Your passwords do not match.", gymRequired: "Enter your gym name to continue.",
      signupSuccess: "Your account and gym were created. You can now sign in.",
      signupConfirm: "Your account was created. Confirm your email, then sign in. Gym setup will complete after confirmation.",
      signupProvisionError: "Your account was created, but gym setup could not be completed. Please try signing in again or contact support.",
      loginProvisionError: "We couldn’t finish gym setup for this account. Please try signing in again or contact support.",
      signupFinalizeError: "Your gym was created, but account setup could not be finalized. Please contact support before retrying.",
      signupDuplicate: "An account may already exist for this email. Try signing in or use another email.",
      signupError: "We couldn’t create your account. Check your details and connection, then try again.",
      signingIn: "SIGNING IN…", creating: "CREATING ACCOUNT…"
    },
    ar: {
      eyebrow: "إدارة الأعضاء", welcome: "مرحبًا", back: "بعودتك.",
      loginIntro: "سجّل الدخول باستخدام حساب النادي للمتابعة.", emailLabel: "البريد الإلكتروني",
      passwordLabel: "كلمة المرور", signIn: "تسجيل الدخول", createAccount: "إنشاء حساب",
      backToSite: "العودة إلى الموقع العام ←", signupEyebrow: "حساب نادٍ جديد",
      create: "إنشاء", account: "حساب.", signupIntro: "أنشئ حساب النادي للبدء.",
      confirmPasswordLabel: "تأكيد كلمة المرور", gymNameLabel: "اسم النادي",
      returnToLogin: "لديك حساب بالفعل؟ سجّل الدخول", language: "اللغة",
      sessionExpired: "انتهت جلستك أو لم تعد صالحة. سجّل الدخول مرة أخرى.",
      signInRequired: "يرجى تسجيل الدخول للمتابعة.",
      signInSessionMissing: "تم قبول بيانات الدخول، لكن لم يتم إنشاء جلسة. تحقق من إعدادات تخزين المتصفح وحاول مرة أخرى.",
      sessionCheck: "تعذر التحقق من جلستك. تحقق من الاتصال وحاول مرة أخرى.",
      emailNotConfirmed: "يرجى تأكيد بريدك الإلكتروني قبل تسجيل الدخول.",
      invalidCredentials: "البريد الإلكتروني أو كلمة المرور غير صحيحة. تحقق من البيانات وحاول مرة أخرى.",
      signInError: "تعذر تسجيل الدخول الآن. تحقق من الاتصال وحاول مرة أخرى.",
      passwordMismatch: "كلمتا المرور غير متطابقتين.", gymRequired: "أدخل اسم النادي للمتابعة.",
      signupSuccess: "تم إنشاء الحساب والنادي. يمكنك تسجيل الدخول الآن.",
      signupConfirm: "تم إنشاء الحساب. أكّد بريدك الإلكتروني ثم سجّل الدخول لإكمال إعداد النادي.",
      signupProvisionError: "تم إنشاء الحساب، لكن تعذر إكمال إعداد النادي. حاول تسجيل الدخول مرة أخرى أو تواصل مع الدعم.",
      loginProvisionError: "تعذر إكمال إعداد النادي لهذا الحساب. حاول تسجيل الدخول مرة أخرى أو تواصل مع الدعم.",
      signupFinalizeError: "تم إنشاء النادي، لكن تعذر إنهاء إعداد الحساب. تواصل مع الدعم قبل إعادة المحاولة.",
      signupDuplicate: "قد يكون هناك حساب بهذا البريد بالفعل. جرّب تسجيل الدخول أو استخدم بريدًا آخر.",
      signupError: "تعذر إنشاء الحساب. تحقق من بياناتك واتصالك ثم حاول مرة أخرى.",
      signingIn: "جارٍ تسجيل الدخول…", creating: "جارٍ إنشاء الحساب…"
    }
  };
  let currentAuthLanguage = "en";
  let authStorageDiagnostic = null;

  // TEMPORARY: logs session/storage state only; never logs credentials or tokens.
  function getAuthStorageDiagnostic() {
    if (authStorageDiagnostic) return authStorageDiagnostic;
    try {
      const storage = window.localStorage;
      const probeKey = "__iron_house_auth_storage_probe__";
      storage.setItem(probeKey, "1");
      storage.removeItem(probeKey);
      const authKeyCount = Object.keys(storage).filter((key) =>
        key.startsWith("sb-") && key.endsWith("-auth-token")
      ).length;
      authStorageDiagnostic = { localStorageWritable: true, supabaseAuthKeyCount: authKeyCount };
    } catch {
      authStorageDiagnostic = { localStorageWritable: false, supabaseAuthKeyCount: null };
    }
    return authStorageDiagnostic;
  }

  function logAuthDiagnostic(event, details = {}) {
    console.info("[IRON HOUSE auth diagnostic]", {
      diagnosticBuild: "session-persistence-v1",
      event,
      page,
      origin: window.location.origin,
      path: window.location.pathname,
      ...getAuthStorageDiagnostic(),
      ...details
    });
  }

  function authText(key) {
    return authCopy[currentAuthLanguage][key];
  }

  function applyAuthLanguage(language) {
    currentAuthLanguage = language === "ar" ? "ar" : "en";
    const isArabic = currentAuthLanguage === "ar";
    document.documentElement.lang = currentAuthLanguage;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const translation = authText(element.dataset.i18n);
      if (translation) element.textContent = translation;
    });
    document.querySelectorAll("[data-auth-language]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.authLanguage === currentAuthLanguage));
    });
    document.querySelector(".auth-language-switch")?.setAttribute("aria-label", authText("language"));
  }

  if (!supabaseClient) {
    const status = document.querySelector(".form-status");
    if (status) status.textContent = "The sign-in service could not load. Refresh the page and try again.";
    return;
  }

  const loginPage = page === "login";
  const dashboardPage = page === "dashboard";

  if (loginPage) initializeLogin();
  if (dashboardPage) initializeDashboard();

  function setLoginStatus(message) {
    document.querySelector("#login-status").textContent = message;
  }

  function setSignupStatus(message, kind = "error") {
    const status = document.querySelector("#signup-status");
    status.textContent = message;
    status.dataset.kind = message ? kind : "";
  }

  async function provisionPendingGym(user) {
    const metadata = user?.user_metadata || {};
    if (!metadata.gym_setup_pending) return { completed: true, pending: false };

    const gymName = typeof metadata.gym_name === "string" ? metadata.gym_name.trim() : "";
    if (!gymName) return { completed: false, error: "missing-name" };

    const { error } = await supabaseClient.rpc("create_gym_for_new_user", {
      p_gym_name: gymName
    });
    if (error) return { completed: false, error: "rpc" };

    const { error: metadataError } = await supabaseClient.auth.updateUser({
      data: { ...metadata, gym_setup_pending: false }
    });
    if (metadataError) return { completed: false, created: true, error: "finalize" };

    return { completed: true, pending: true };
  }

  async function initializeLogin() {
    logAuthDiagnostic("login.initialized");
    document.querySelector("#current-year").textContent = new Date().getFullYear();
    const form = document.querySelector("#login-form");
    const button = document.querySelector("#login-button");
    const params = new URLSearchParams(window.location.search);
    const loginPanel = document.querySelector("#login-panel");
    const signupPanel = document.querySelector("#signup-panel");
    const signupForm = document.querySelector("#signup-form");
    const signupButton = document.querySelector("#signup-button");

    document.querySelectorAll("[data-auth-language]").forEach((languageButton) => {
      languageButton.addEventListener("click", () => applyAuthLanguage(languageButton.dataset.authLanguage));
    });

    document.querySelector("#show-signup").addEventListener("click", () => {
      loginPanel.hidden = true;
      signupPanel.hidden = false;
      setLoginStatus("");
      setSignupStatus("");
      document.querySelector("#signup-email").focus();
    });

    document.querySelector("#show-login").addEventListener("click", () => {
      signupPanel.hidden = true;
      loginPanel.hidden = false;
      setSignupStatus("");
      setLoginStatus("");
      document.querySelector("#email").focus();
    });

    applyAuthLanguage("en");

    if (params.get("reason") === "session-expired") {
      setLoginStatus(authText("sessionExpired"));
    } else if (params.get("reason") === "sign-in-required") {
      setLoginStatus(authText("signInRequired"));
    }

    try {
      const { data, error } = await supabaseClient.auth.getSession();
      logAuthDiagnostic("login.initial-session", {
        hasError: Boolean(error),
        hasSession: Boolean(data?.session),
        pendingGymSetup: Boolean(data?.session?.user?.user_metadata?.gym_setup_pending)
      });
      if (error) throw error;
      if (data.session) {
        const provisioning = await provisionPendingGym(data.session.user);
        if (!provisioning.completed) {
          setLoginStatus(provisioning.created
            ? authText("signupFinalizeError")
            : authText("loginProvisionError"));
          if (!provisioning.created) {
            await supabaseClient.auth.signOut({ scope: "local" });
          }
          return;
        }
        window.location.replace("dashboard.html");
        return;
      }
    } catch {
      logAuthDiagnostic("login.initial-session-check-failed");
      setLoginStatus(authText("sessionCheck"));
    }

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      setLoginStatus("");
      button.disabled = true;
      button.querySelector("[data-i18n]").textContent = authText("signingIn");

      const email = form.elements.email.value.trim();
      const password = form.elements.password.value;

      try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
        logAuthDiagnostic("login.sign-in-result", {
          hasError: Boolean(error),
          hasSession: Boolean(data?.session),
          hasUser: Boolean(data?.user)
        });
        if (error) {
          const message = error.message.toLowerCase();
          if (message.includes("email not confirmed")) {
            setLoginStatus(authText("emailNotConfirmed"));
          } else if (message.includes("invalid login credentials")) {
            setLoginStatus(authText("invalidCredentials"));
          } else {
            setLoginStatus(authText("signInError"));
          }
          return;
        }

        // Confirm that Auth returned and persisted a session before navigating.
        // The dashboard guard relies on this persisted session on the next page.
        const signedInUserId = data.user?.id;
        const returnedSession = data.session;
        const { data: storedSessionData, error: storedSessionError } = await supabaseClient.auth.getSession();
        let storedSession = storedSessionData?.session;
        logAuthDiagnostic("login.session-read-after-sign-in", {
          hasError: Boolean(storedSessionError),
          hasReturnedSession: Boolean(returnedSession),
          hasStoredSession: Boolean(storedSession),
          sameUser: Boolean(storedSession && signedInUserId && storedSession.user.id === signedInUserId)
        });
        if (returnedSession && signedInUserId &&
            (storedSessionError || !storedSession || storedSession.user.id !== signedInUserId)) {
          const { data: restoredSessionData, error: restoreError } = await supabaseClient.auth.setSession({
            access_token: returnedSession.access_token,
            refresh_token: returnedSession.refresh_token
          });
          if (!restoreError) storedSession = restoredSessionData?.session;
          logAuthDiagnostic("login.session-restoration", {
            hasError: Boolean(restoreError),
            hasStoredSession: Boolean(storedSession),
            sameUser: Boolean(storedSession && signedInUserId && storedSession.user.id === signedInUserId)
          });
        }

        if (!returnedSession || !storedSession || !signedInUserId ||
            storedSession.user.id !== signedInUserId) {
          logAuthDiagnostic("login.blocked-navigation-no-session", {
            hasReturnedSession: Boolean(returnedSession),
            hasStoredSession: Boolean(storedSession),
            sameUser: Boolean(storedSession && signedInUserId && storedSession.user.id === signedInUserId)
          });
          setLoginStatus(authText("signInSessionMissing"));
          return;
        }

        const provisioning = await provisionPendingGym(storedSession.user);
        if (!provisioning.completed) {
          setLoginStatus(provisioning.created
            ? authText("signupFinalizeError")
            : authText("loginProvisionError"));
          if (!provisioning.created) {
            await supabaseClient.auth.signOut({ scope: "local" });
          }
          return;
        }
        logAuthDiagnostic("login.redirect-dashboard", { hasSession: true });
        window.location.replace("dashboard.html");
      } catch {
        setLoginStatus(authText("signInError"));
      } finally {
        button.disabled = false;
        button.querySelector("[data-i18n]").textContent = authText("signIn");
      }
    });

    signupForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      setSignupStatus("");

      const email = signupForm.elements.email.value.trim();
      const password = signupForm.elements.password.value;
      const confirmPassword = signupForm.elements.confirmPassword.value;
      const gymName = signupForm.elements.gymName.value.trim();

      if (password !== confirmPassword) {
        setSignupStatus(authText("passwordMismatch"));
        signupForm.elements.confirmPassword.focus();
        return;
      }
      if (!gymName) {
        setSignupStatus(authText("gymRequired"));
        signupForm.elements.gymName.focus();
        return;
      }

      signupButton.disabled = true;
      signupButton.querySelector("[data-i18n]").textContent = authText("creating");

      try {
        const { data, error } = await supabaseClient.auth.signUp({
          email,
          password,
          options: { data: { gym_name: gymName, gym_setup_pending: true } }
        });
        if (error) {
          const message = error.message.toLowerCase();
          setSignupStatus(message.includes("already registered") || message.includes("already exists")
            ? authText("signupDuplicate")
            : authText("signupError"));
          return;
        }

        if (data.user) {
          signupForm.reset();
          if (data.session) {
            const provisioning = await provisionPendingGym(data.user);
            if (!provisioning.completed) {
              setSignupStatus(provisioning.created
                ? authText("signupFinalizeError")
                : authText("signupProvisionError"));
              if (!provisioning.created) {
                await supabaseClient.auth.signOut({ scope: "local" });
              }
              return;
            }
            setSignupStatus(authText("signupSuccess"), "success");
          } else {
            setSignupStatus(authText("signupConfirm"), "success");
          }
        } else {
          setSignupStatus(authText("signupError"));
        }
      } catch {
        setSignupStatus(authText("signupError"));
      } finally {
        signupButton.disabled = false;
        signupButton.querySelector("[data-i18n]").textContent = authText("createAccount");
      }
    });
  }

  async function initializeDashboard() {
    logAuthDiagnostic("dashboard.initialized");
    const status = document.querySelector("#dashboard-status");
    const content = document.querySelector("#dashboard-content");
    let intentionalSignOut = false;

    const redirectToLogin = (reason) => {
      window.location.replace(`login.html?reason=${reason}`);
    };

    try {
      const { data: sessionData, error: sessionError } = await supabaseClient.auth.getSession();
      logAuthDiagnostic("dashboard.session-check", {
        hasError: Boolean(sessionError),
        hasSession: Boolean(sessionData?.session)
      });
      if (sessionError) {
        logAuthDiagnostic("dashboard.redirect-login", { reason: "session-expired" });
        redirectToLogin("session-expired");
        return;
      }
      if (!sessionData.session) {
        logAuthDiagnostic("dashboard.redirect-login", { reason: "sign-in-required" });
        redirectToLogin("sign-in-required");
        return;
      }

      const { data: userData, error: userError } = await supabaseClient.auth.getUser();
      logAuthDiagnostic("dashboard.user-check", {
        hasError: Boolean(userError),
        hasUser: Boolean(userData?.user)
      });
      if (userError || !userData.user) {
        logAuthDiagnostic("dashboard.redirect-login", { reason: "session-expired" });
        redirectToLogin("session-expired");
        return;
      }

      status.hidden = true;
      content.hidden = false;
    } catch {
      logAuthDiagnostic("dashboard.session-check-threw");
      redirectToLogin("session-expired");
      return;
    }

    document.querySelector("#logout-button").addEventListener("click", async (event) => {
      const button = event.currentTarget;
      const logoutStatus = document.querySelector("#logout-status");
      button.disabled = true;
      button.textContent = "SIGNING OUT…";
      logoutStatus.textContent = "";

      try {
        intentionalSignOut = true;
        const { error } = await supabaseClient.auth.signOut({ scope: "local" });
        if (error) throw error;
        window.location.replace("login.html");
      } catch {
        intentionalSignOut = false;
        logoutStatus.textContent = "We couldn’t sign you out. Check your connection and try again.";
        button.disabled = false;
        button.innerHTML = 'SIGN OUT <span aria-hidden="true">↗</span>';
      }
    });

    supabaseClient.auth.onAuthStateChange((event, session) => {
      logAuthDiagnostic("dashboard.auth-state-change", {
        authEvent: event,
        hasSession: Boolean(session)
      });
      if (event === "SIGNED_OUT" && !intentionalSignOut) redirectToLogin("session-expired");
    });
  }
})();
