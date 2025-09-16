javascript
// js/main.js

document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Elements
  const form = document.getElementById("searchForm");
  const resultsList = document.getElementById("resultsList");
  const demoBtn = document.getElementById("demoBtn");

  const fromInput = document.getElementById("from");
  const toInput = document.getElementById("to");
  const dateInput = document.getElementById("date");
  const ecoSelect = document.getElementById("ecoFilter");

  // New filter inputs (may or may not exist in HTML yet)
  const maxPriceInput = document.getElementById("maxPrice");
  const maxDurationInput = document.getElementById("maxDuration");
  const minRatingInput = document.getElementById("minRating");

  // Mock data (3 trips)
  const trips = [
    {
      id: 1,
      from: "Paris",
      to: "Lyon",
      date: "2025-09-20",
      depart: "2025-09-20T08:15",
      arrivee: "2025-09-20T12:05",
      driver: { pseudo: "GreenFox", note: 4.7, photo: "", vehicle: "Renault Zoe", eco: true },
      places: 2,
      prix: 24
    },
    {
      id: 2,
      from: "Paris",
      to: "Lille",
      date: "2025-09-21",
      depart: "2025-09-21T09:00",
      arrivee: "2025-09-21T10:55",
      driver: { pseudo: "RoadBuddy", note: 4.3, photo: "", vehicle: "Peugeot 308 (Essence)", eco: false },
      places: 3,
      prix: 15
    },
    {
      id: 3,
      from: "Marseille",
      to: "Lyon",
      date: "2025-09-22",
      depart: "2025-09-22T14:10",
      arrivee: "2025-09-22T16:40",
      driver: { pseudo: "EcoRider", note: 4.9, photo: "", vehicle: "Tesla Model 3", eco: true },
      places: 1,
      prix: 28
    }
  ];

  // Utilities
  const fmtCurrency = (n) =>
    new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

  const fmtTime = (iso) => {
    const d = new Date(iso);
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    return `${hh}h${mm}`;
  };

  const sanitize = (s) => String(s ?? "").trim();

  function focusResults() {
    if (!resultsList) return;
    resultsList.setAttribute("tabindex", "-1");
    resultsList.focus({ preventScroll: false });
    setTimeout(() => resultsList.removeAttribute("tabindex"), 0);
  }

  function cardTemplate(t) {
    const ecoTag = t.driver.eco ? `<span class="tag" aria-label="Trajet écologique">Écologique</span>` : "";
    const note = `${t.driver.note.toFixed(1)}★`;
    return `
      <article class="result-card" role="region" aria-label="Covoiturage ${t.from} vers ${t.to}">
        <div class="meta">
          <h4>${t.from} → ${t.to} ${ecoTag}</h4>
          <p class="small muted">
            <strong>${t.driver.pseudo}</strong> • ${note} • ${t.places} place(s) • ${fmtCurrency(t.prix)}
          </p>
          <p class="small">
            Départ ${fmtTime(t.depart)} — Arrivée ${fmtTime(t.arrivee)} • ${t.driver.vehicle}
          </p>
        </div>
        <div>
          <button type="button" class="btn outline" aria-label="Voir le détail du trajet ${t.id}">Détail</button>
        </div>
      </article>
    `;
  }

  function renderTrips(list) {
    if (!resultsList) return;
    if (!list.length) {
      resultsList.innerHTML = `
        <div class="result-card" role="status" aria-live="polite">
          <div class="meta">
            <p>Aucun résultat trouvé pour votre recherche.</p>
            <button type="button" id="nearestBtn" class="btn primary mt-12">Voir le trajet le plus proche</button>
          </div>
        </div>
      `;
      const nearestBtn = document.getElementById("nearestBtn");
      if (nearestBtn) nearestBtn.addEventListener("click", showDemoTrip);
      focusResults();
      return;
    }
    resultsList.innerHTML = list.map(cardTemplate).join("");
    focusResults();
  }

  function filterTrips(query) {
    const fromQ = sanitize(query.from).toLowerCase();
    const toQ = sanitize(query.to).toLowerCase();
    const dateQ = sanitize(query.date); // YYYY-MM-DD or ""
    const ecoQ = query.ecoFilter;

    const maxPrice = query.maxPrice ? Number(query.maxPrice) : null;
    const maxDuration = query.maxDuration ? Number(query.maxDuration) : null; // in minutes
    const minRating = query.minRating ? Number(query.minRating) : null;

    return trips.filter((t) => {
      const matchFrom = fromQ ? t.from.toLowerCase().includes(fromQ) : true;
      const matchTo = toQ ? t.to.toLowerCase().includes(toQ) : true;
      const matchDate = dateQ ? t.date === dateQ : true;
      const matchEco = ecoQ === "eco" ? t.driver.eco === true : true;

      const matchPrice = maxPrice !== null ? t.prix <= maxPrice : true;

      let matchDuration = true;
      if (maxDuration !== null) {
        const start = new Date(t.depart);
        const end = new Date(t.arrivee);
        const durationMinutes = (end - start) / (1000 * 60);
        matchDuration = durationMinutes <= maxDuration;
      }

      const matchRating = minRating !== null ? t.driver.note >= minRating : true;

      return (
        matchFrom &&
        matchTo &&
        matchDate &&
        matchEco &&
        matchPrice &&
        matchDuration &&
        matchRating &&
        t.places > 0
      );
    });
  }

  function showDemoTrip() {
    const demo = trips.find((t) => t.from === "Paris" && t.to === "Lyon") || trips[0];
    renderTrips([demo]);
  }

  // Demo button
  if (demoBtn && fromInput && toInput && dateInput) {
    demoBtn.addEventListener("click", () => {
      fromInput.value = "Paris";
      toInput.value = "Lyon";
      dateInput.value = "2025-09-20";
      renderTrips(
        filterTrips({
          from: fromInput.value,
          to: toInput.value,
          date: dateInput.value,
          ecoFilter: ecoSelect ? ecoSelect.value : "any",
          maxPrice: maxPriceInput ? maxPriceInput.value : "",
          maxDuration: maxDurationInput ? maxDurationInput.value : "",
          minRating: minRatingInput ? minRatingInput.value : ""
        })
      );
    });
  }

  // Form submit
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = {
        from: fromInput ? fromInput.value : "",
        to: toInput ? toInput.value : "",
        date: dateInput ? dateInput.value : "",
        ecoFilter: ecoSelect ? ecoSelect.value : "any",
        maxPrice: maxPriceInput ? maxPriceInput.value : "",
        maxDuration: maxDurationInput ? maxDurationInput.value : "",
        minRating: minRatingInput ? minRatingInput.value : ""
      };
      const list = filterTrips(query);
      renderTrips(list);
    });
  }

  // Initial state message
  if (resultsList && !resultsList.innerHTML.trim()) {
    resultsList.innerHTML = `<p class="muted">Aucune recherche effectuée. Utilisez le formulaire ci-dessus.</p>`;
  }
});
