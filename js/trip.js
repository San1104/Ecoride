javascript
// js/trip.js

document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Mock utilisateur
  let currentUser = { pseudo: "TestUser", credits: 20, isLoggedIn: true };

  // Mock trajet courant (même que trip.html)
  let currentTrip = {
    id: 1,
    from: "Paris",
    to: "Lyon",
    date: "2025-09-20",
    depart: "08h15",
    arrivee: "12h05",
    prix: 24,
    places: 2
  };

  const joinBtn = document.getElementById("joinBtn");

  if (joinBtn) {
    joinBtn.addEventListener("click", () => {
      // Vérifier si utilisateur connecté
      if (!currentUser.isLoggedIn) {
        window.location.href = "login.html";
        return;
      }

      // Vérifier les places restantes
      if (currentTrip.places <= 0) {
        alert("Désolé, plus aucune place disponible pour ce trajet.");
        return;
      }

      // Vérifier les crédits
      if (currentUser.credits < currentTrip.prix) {
        alert("Vous n'avez pas assez de crédits pour participer à ce trajet.");
        return;
      }

      // Demande de confirmation
      const confirmParticipation = confirm("Confirmer la participation ?");
      if (!confirmParticipation) return;

      // Mise à jour des données
      currentTrip.places -= 1;
      currentUser.credits -= currentTrip.prix;

      // Mise à jour du DOM
      const placesEl = document.querySelector("#tripDetails ul li strong:nth-child(1)");
      const listItems = document.querySelectorAll("#tripDetails ul li");
      listItems.forEach((li) => {
        if (li.textContent.includes("Places restantes")) {
          li.innerHTML = `<strong>Places restantes :</strong> ${currentTrip.places}`;
        }
      });

      // Message de succès
      alert("Participation confirmée !");
    });
  }
});
