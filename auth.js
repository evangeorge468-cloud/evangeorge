(() => {
  const supabaseClient = window.ironHouseSupabase;
  const page = document.body.dataset.page;

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

  async function initializeLogin() {
    document.querySelector("#current-year").textContent = new Date().getFullYear();
    const form = document.querySelector("#login-form");
    const button = document.querySelector("#login-button");
    const params = new URLSearchParams(window.location.search);

    if (params.get("reason") === "session-expired") {
      setLoginStatus("Your session expired or is no longer valid. Please sign in again.");
    } else if (params.get("reason") === "sign-in-required") {
      setLoginStatus("Please sign in to continue.");
    }

    try {
      const { data, error } = await supabaseClient.auth.getSession();
      if (error) throw error;
      if (data.session) {
        window.location.replace("dashboard.html");
        return;
      }
    } catch {
      setLoginStatus("We couldn’t check your session. Check your connection and try again.");
    }

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      setLoginStatus("");
      button.disabled = true;
      button.textContent = "SIGNING IN…";

      const email = form.elements.email.value.trim();
      const password = form.elements.password.value;

      try {
        const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
        if (error) {
          const message = error.message.toLowerCase();
          if (message.includes("email not confirmed")) {
            setLoginStatus("Please confirm your email address before signing in.");
          } else if (message.includes("invalid login credentials")) {
            setLoginStatus("Email or password is incorrect. Check your details and try again.");
          } else {
            setLoginStatus("We couldn’t sign you in right now. Check your connection and try again.");
          }
          return;
        }
        window.location.replace("dashboard.html");
      } catch {
        setLoginStatus("We couldn’t sign you in right now. Check your connection and try again.");
      } finally {
        button.disabled = false;
        button.innerHTML = 'SIGN IN <span aria-hidden="true">↗</span>';
      }
    });
  }

  async function initializeDashboard() {
    const status = document.querySelector("#dashboard-status");
    const content = document.querySelector("#dashboard-content");
    let intentionalSignOut = false;

    const redirectToLogin = (reason) => {
      window.location.replace(`login.html?reason=${reason}`);
    };

    try {
      const { data: sessionData, error: sessionError } = await supabaseClient.auth.getSession();
      if (sessionError) {
        redirectToLogin("session-expired");
        return;
      }
      if (!sessionData.session) {
        redirectToLogin("sign-in-required");
        return;
      }

      const { data: userData, error: userError } = await supabaseClient.auth.getUser();
      if (userError || !userData.user) {
        redirectToLogin("session-expired");
        return;
      }

      status.hidden = true;
      content.hidden = false;
    } catch {
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

    supabaseClient.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT" && !intentionalSignOut) redirectToLogin("session-expired");
    });
  }
})();
