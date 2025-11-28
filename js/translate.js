const BACKEND_BASE_URL = window.BACKEND_BASE_URL || "http://localhost:8000";

function getToken() {
    return localStorage.getItem("talait_token");
}

function requireAuthOrRedirect() {
    const token = getToken();
    if (!token) {
        window.location.href = "login.html";
        return false;
    }
    return true;
}

function translateInit() {
    if (!requireAuthOrRedirect()) return;

    const btn = document.getElementById("translateBtn");
    const src = document.getElementById("sourceText");
    const sLang = document.getElementById("sourceLang");
    const tLang = document.getElementById("targetLang");
    const status = document.getElementById("status");
    const result = document.getElementById("result");

    btn.addEventListener("click", async () => {
        const text = src.value.trim();
        if (!text) {
            status.textContent = "Renseigne le texte à traduire.";
            return;
        }
        if (sLang.value === tLang.value) {
            status.textContent = "Choisis deux langues différentes.";
            return;
        }
        status.textContent = "Traduction en cours...";
        result.textContent = "";
        btn.disabled = true;



        const payload = {
            text,
            source_language: sLang.value,
            target_language: tLang.value,
        };

        console.log(payload)

        try {
            const token = localStorage.getItem('talait_token');
            console.log(token)
            const res = await fetch(`${BACKEND_BASE_URL}/translate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // "Authorization": `Bearer ${token}`
                    "token": token 
                },
                body: JSON.stringify(payload)
            });
            // console.log("=//////////", res)
            const data = await res.json();
            // console.log("================",data)
            // console.log("================",res.ok)
             if (res.ok) {
                 console.log(data)
                 // expected response: { translated_text: "..." }
                 result.textContent = data.translated_text || JSON.stringify(data);
                 status.textContent = "Traduction réussie.";
             } else if (res.status === 401 || res.status === 403) {
                 status.textContent = "Token invalide ou expiré. Reconnecte-toi.";
                 // Optionally clear token and redirect
                 localStorage.removeItem("talait_token");
                 setTimeout(() => location.href = "login.html", 1200);
             } else {
                 const err = await res.json().catch(() => ({ detail: res.statusText }));
                 status.textContent = `Erreur: ${err.detail || res.statusText}`;
             }
        } catch (err) {
            console.error(err);
            status.textContent = "Erreur réseau ou le backend n'est pas joignable.";
        } finally {
            btn.disabled = false;
        }
    });
}
