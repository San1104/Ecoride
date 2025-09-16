// js/user.js

document.addEventListener("DOMContentLoaded", () => {
  // Mise à jour de l'année dans le footer
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Charger l'utilisateur courant depuis localStorage
  let currentUser = null;
  try {
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
  } catch (e) {
    currentUser = null;
  }

  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }

  // Remplir le profil utilisateur
  const pseudoEl = document.getElementById("userPseudo");
  const creditsEl = document.getElementById("userCredits");
  if (pseudoEl) pseudoEl.textContent = currentUser.pseudo || "-";
  if (creditsEl) creditsEl.textContent = currentUser.credits ?? 0;

  const roleForm = document.getElementById("roleForm");
  const driverForm = document.getElementById("driverForm");

  // Gestion affichage du sous-formulaire chauffeur
  function toggleDriverForm(role) {
    if (!driverForm) return;
    if (role === "chauffeur" || role === "les deux") {
      driverForm.style.display = "block";
    } else {
      driverForm.style.display = "none";
    }
  }

  if (roleForm) {
    // Pré-cocher le rôle existant
    if (currentUser.role) {
      const roleInput = roleForm.querySelector(`input[value="${currentUser.role}"]`);
      if (roleInput) {
        roleInput.checked = true;
        toggleDriverForm(currentUser.role);
      }
    }

    // Changement de rôle
    roleForm.querySelectorAll("input[name='role']").forEach((input) => {
      input.addEventListener("change", (e) => {
        toggleDriverForm(e.target.value);
      });
    });

    // Soumission du formulaire
    roleForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const roleSelected = roleForm.querySelector("input[name='role']:checked");
      const role = roleSelected ? roleSelected.value : null;
      currentUser.role = role;

      if (role === "chauffeur" || role === "les deux") {
        currentUser.vehicle = {
          plate: document.getElementById("plate")?.value || "",
          brand: document.getElementById("brand")?.value || "",
          model: document.getElementById("model")?.value || "",
          color: document.getElementById("color")?.value || "",
          energy: document.getElementById("energy")?.value || "",
          seats: parseInt(document.getElementById("seats")?.value || "0", 10),
          preferences: {
            smoking: document.getElementById("smoking")?.checked || false,
            pets: document.getElementById("pets")?.checked || false
          }
        };
      } else {
        delete currentUser.vehicle;
      }

      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      alert("Profil mis à jour avec succès");
    });
  }
});
