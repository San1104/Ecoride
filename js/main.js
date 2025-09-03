// main.js - logique simple pour US1
document.addEventListener('DOMContentLoaded', function () {
  // set year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const form = document.getElementById('searchForm');
  const resultsList = document.getElementById('resultsList');
  const demoBtn = document.getElementById('demoBtn');
  const newsletterForm = document.getElementById('newsletterForm');

  // small set of demo trips (normally from backend)
  const demoTrips = [
    {
      id: 1,
      from: 'Paris',
      to: 'Lyon',
      depart: '2025-09-10 08:00',
      price: '15.00',
      seats: 3,
      eco: true,
      driver: 'Julie'
    },
    {
      id: 2,
      from: 'Paris',
      to: 'Orléans',
      depart: '2025-09-09 18:30',
      price: '8.00',
      seats: 2,
      eco: false,
      driver: 'Sébastien'
    },
    {
      id: 3,
      from: 'Lille',
      to: 'Bruxelles',
      depart: '2025-09-12 07:00',
      price: '12.00',
      seats: 4,
      eco: true,
      driver: 'Amine'
    }
  ];

  function renderTrips(trips) {
    resultsList.innerHTML = ''; // clear
    if (!trips || trips.length === 0) {
      resultsList.innerHTML = '<p class="muted">Aucun trajet trouvé.</p>';
      return;
    }
    const fragment = document.createDocumentFragment();
    trips.forEach(t => {
      const card = document.createElement('div');
      card.className = 'result-card';
      card.innerHTML = `
        <div class="meta">
          <h4>${t.from} → ${t.to} <span class="tag">${t.eco ? 'Éco' : 'Standard'}</span></h4>
          <p class="muted">Départ : ${t.depart} · Conducteur : ${t.driver}</p>
          <p>Places disponibles : <strong>${t.seats}</strong> · Prix : <strong>${t.price} €</strong></p>
        </div>
        <div>
          <button class="btn primary" data-trip="${t.id}">Voir</button>
          <button class="btn outline" data-book="${t.id}">Participer</button>
        </div>
      `;
      fragment.appendChild(card);
    });
    resultsList.appendChild(fragment);
  }

  // search handler: simple client-side filter of demoTrips
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const from = (document.getElementById('from').value || '').trim().toLowerCase();
      const to = (document.getElementById('to').value || '').trim().toLowerCase();
      const date = (document.getElementById('date').value || '').trim();
      const ecoFilter = (document.getElementById('ecoFilter').value || 'any');

      let results = demoTrips.filter(t => {
        const matchesFrom = !from || t.from.toLowerCase().includes(from);
        const matchesTo = !to || t.to.toLowerCase().includes(to);
        const matchesDate = !date || t.depart.startsWith(date);
        const matchesEco = ecoFilter === 'any' ? true : (ecoFilter === 'eco' ? t.eco === true : true);
        return matchesFrom && matchesTo && matchesDate && matchesEco;
      });

      renderTrips(results);
      // scroll to results
      document.getElementById('trips').scrollIntoView({behavior: 'smooth', block: 'start'});
    });
  }

  // demo button shows all
  if (demoBtn) {
    demoBtn.addEventListener('click', function () {
      renderTrips(demoTrips);
      document.getElementById('trips').scrollIntoView({behavior: 'smooth', block: 'start'});
    });
  }

  // newsletter basic handler
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = (document.getElementById('newsletterEmail').value || '').trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Merci d’entrer une adresse email valide.');
        return;
      }
      // in real app: POST to backend. Here simply show success
      alert('Merci ! Si cela était connecté, tu recevrais bientôt des alertes.');
      newsletterForm.reset();
    });
  }

  // event delegation for result buttons (Voir / Participer)
  resultsList.addEventListener('click', function (e) {
    const btn = e.target.closest('button');
    if (!btn) return;
    if (btn.dataset.trip) {
      const id = parseInt(btn.dataset.trip, 10);
      const trip = demoTrips.find(t => t.id === id);
      alert(`Détail trajet\n${trip.from} → ${trip.to}\nDépart: ${trip.depart}\nConducteur: ${trip.driver}\nPrix: ${trip.price} €`);
    } else if (btn.dataset.book) {
      alert('Action participer : dans une vraie application, tu serais redirigé vers la page de réservation / connexion.');
    }
  });

});
