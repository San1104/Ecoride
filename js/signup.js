// js/signup.js

document.addEventListener("DOMContentLoaded", () => {
  // Mise à jour de l'année dans le footer
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const signupForm = document.getElementById("signupForm");

  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const pseudo = document.getElementById("pseudo")?.value.trim();
      const email = document.getElementById("email")?.value.trim();
      const password = document.getElementById("password")?.value;

      if (!pseudo || !email || !password) {
        alert("Veuillez remplir tous les champs.");
        return;
      }

      // Création d’un nouvel utilisateur mock
      let newUser = {
        pseudo: pseudo,
        email: email,
        credits: 20,
        isLoggedIn: true
      };

      // Stocker dans localStorage
      localStorage.setItem("currentUser", JSON.stringify(newUser));

      alert("Compte créé avec succès ! Vous avez 20 crédits.");
      window.location.href = "user.html";
    });
  }
});
