const sectionsEl = document.getElementById('sections');
const globalBudgetEl = document.getElementById('globalBudget');

let sections = JSON.parse(localStorage.getItem('sections')) || [
  { key: 'photo', title: 'Photographer / Videographer', vendors: [] },
  { key: 'dj', title: 'DJ', vendors: [] },
  { key: 'food', title: 'Food / Catering', vendors: [] },
  { key: 'bachelor', title: 'Bachelor Party', vendors: [] }
];

function save() {
  localStorage.setItem('sections', JSON.stringify(sections));
}

function score(v) {
  const price = parseFloat((v.price || '').replace(/[^0-9.]/g,'')) || 0;
  const notes = (v.desc || '').length;
  const rating = v.rating || 0;
  return price - notes * 0.1 - rating * 20;
}
function deleteCategory(index) {
  if (!confirm('Delete this entire category and all its vendors?')) return;
  sections.splice(index, 1);
  save();
  render();
}

function render() {
  sectionsEl.innerHTML = '';
  let globalTotal = 0;

  sections.forEach((section, sIndex) => {
    const div = document.createElement('div');
    div.className = 'section';

    const prices = section.vendors
      .map(v => parseFloat((v.price || '').replace(/[^0-9.]/g,'')))
      .filter(n => !isNaN(n));

    const cheapest = Math.min(...prices);
    const total = prices.reduce((a,b)=>a+b,0);
    globalTotal += total;

    div.innerHTML = `
  <h2>
    ${section.title}
    <span>
      <button onclick="lock(${sIndex})">🔒 Lock</button>
      <button class="delete-category" onclick="deleteCategory(${sIndex})">🗑 Delete</button>
    </span>
  </h2>
      <div class="budget">Total Budget: $${total || 0}</div>
      <table>
        <thead><tr><th>Field</th></tr></thead>
        <tbody>
          <tr data-f="vendor"><th>Vendor</th></tr>
          <tr data-f="price"><th>Price</th></tr>
          <tr data-f="rating"><th>Rating</th></tr>
          <tr data-f="desc"><th>Description</th></tr>
          <tr data-f="score"><th>Score</th></tr>
        </tbody>
      </table>
      <button onclick="addVendor(${sIndex})">+ Add Vendor</button>
    `;

    const header = div.querySelector('thead tr');
    const rows = div.querySelectorAll('tbody tr');

    section.vendors.forEach((v, vIndex) => {
      const th = document.createElement('th');
      th.textContent = v.vendor || `Vendor ${vIndex+1}`;
      th.onclick = () => select(sIndex, vIndex);

      const del = document.createElement('button');
      del.textContent = '✕';
      del.className = 'delete';
      del.onclick = e => {
        e.stopPropagation();
        if (confirm('Delete vendor?')) {
          section.vendors.splice(vIndex,1);
          save(); render();
        }
      };
      th.appendChild(del);

      if (v.selected) th.innerHTML += `<span class="winner">Winner</span>`;
      header.appendChild(th);

      rows.forEach(r => {
        const f = r.dataset.f;
        const td = document.createElement('td');

        if (f === 'score') {
          td.textContent = score(v).toFixed(1);
        } else if (f === 'rating') {
          for (let i=1;i<=5;i++) {
            const star = document.createElement('span');
            star.textContent = '★';
            star.className = 'star' + (v.rating >= i ? ' active':'');
            star.onclick = () => { v.rating = i; save(); render(); };
            td.appendChild(star);
          }
        } else {
          const el = f === 'desc' ? document.createElement('textarea') : document.createElement('input');
          el.value = v[f] || '';
          el.oninput = e => { v[f] = e.target.value; save(); };
          td.appendChild(el);
        }

        if (f === 'price' && parseFloat(v.price) === cheapest) td.classList.add('cheapest');
        if (v.selected) td.classList.add('selected');

        r.appendChild(td);
      });
    });

    sectionsEl.appendChild(div);
  });

  globalBudgetEl.textContent = `💍 Total Wedding Budget: $${globalTotal}`;
}

function addVendor(s) {
  sections[s].vendors.push({});
  save(); render();
}

function select(s,v) {
  sections[s].vendors.forEach(x => x.selected = false);
  sections[s].vendors[v].selected = true;
  save(); render();
}

function lock(s) {
  sections[s].vendors.forEach(v => v.locked = true);
  save(); render();
}

document.getElementById('addCategory').onclick = () => {
  const name = prompt('Category name?');
  if (!name) return;
  sections.push({ key: Date.now(), title: name, vendors: [] });
  save(); render();
};

document.getElementById('printAll').onclick = () => window.print();

/* 🌙 Dark mode */
const toggle = document.getElementById('themeToggle');
if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark');
toggle.onclick = () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark')?'dark':'light');
};

render();
