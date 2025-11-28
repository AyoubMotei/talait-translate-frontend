const BACKEND_BASE_URL =  "http://localhost:8000"; 

function authInit({ formId, mode }) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = form.querySelector("#username").value.trim();
    const password = form.querySelector("#password").value;

    const messageEl = form.querySelector(".message");
    messageEl.textContent = "";
    messageEl.classList.remove("error");

    if (!username || !password) {
      messageEl.textContent = "Remplis tous les champs.";
      messageEl.classList.add("error");
      return;
    }

    try {
      if (mode === "signup") {
        const res = await fetch(`${BACKEND_BASE_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password })
        });
        if (res.status === 200) {
          messageEl.textContent = "Inscription réussie — redirection vers la connexion...";
          setTimeout(() => location.href = "login.html", 900);
        } else {
          const err = await res.json().catch(()=>({detail:"Erreur serveur"}));
          messageEl.textContent = err.detail || "Impossible de s'inscrire";
          messageEl.classList.add("error");
        }
      } else { // login
        const res = await fetch(`${BACKEND_BASE_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password })
        });
        if (res.ok) {
          const data = await res.json();
          localStorage.setItem("talait_token", data.access_token);
          messageEl.textContent = "Connexion réussie. Redirection...";
          setTimeout(() => location.href = "translate.html", 600);
        } else {
          const err = await res.json().catch(()=>({detail:"Credentials invalides"}));
          messageEl.textContent = err.detail || "Erreur de connexion";
          messageEl.classList.add("error");
        }
      }
    } catch (err) {
      messageEl.textContent = "Erreur réseau — vérifie le backend.";
      messageEl.classList.add("error");
      console.error(err);
    }
  });
}
