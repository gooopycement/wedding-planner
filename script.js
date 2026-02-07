* { box-sizing: border-box; }

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, Arial, sans-serif;
  background: #f6f7fb;
  padding: 40px 24px;
  max-width: 1400px;
  margin: auto;
  color: #1f2937;
}

h1 { text-align: center; margin-bottom: 10px; }

#globalBudget {
  text-align: center;
  font-weight: 700;
  margin-bottom: 30px;
}

button {
  border: none;
  border-radius: 10px;
  padding: 10px 14px;
  cursor: pointer;
  background: #6366f1;
  color: white;
  font-weight: 600;
}

#themeToggle {
  position: fixed;
  top: 20px;
  right: 20px;
}

#printAll {
  position: fixed;
  top: 20px;
  right: 80px;
}

.section {
  background: white;
  padding: 28px;
  margin-bottom: 36px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  overflow-x: auto;
}

.section h2 {
  display: flex;
  justify-content: space-between;
}

.budget { font-weight: 600; margin-bottom: 10px; }

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

thead th {
  background: #f1f5f9;
  padding: 14px;
  text-align: center;
}

tbody th {
  background: #f9fafb;
  padding: 14px;
  text-align: left;
  position: sticky;
  left: 0;
  z-index: 2;
}

td {
  padding: 12px;
  border-bottom: 1px solid #eee;
}

input, textarea {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

textarea { min-height: 80px; }

.selected { background: rgba(99,102,241,0.1); }

.cheapest {
  background: #ecfdf5;
  border: 1px solid #10b981;
}

.winner {
  background: #facc15;
  color: #92400e;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 12px;
  margin-left: 6px;
}

.locked input, .locked textarea {
  background: #f3f4f6;
  pointer-events: none;
}

.star {
  cursor: pointer;
  font-size: 18px;
  color: #d1d5db;
}

.star.active { color: #facc15; }

.delete {
  background: none;
  border: none;
  color: #dc2626;
  cursor: pointer;
}
.delete-category {
  background: #fee2e2;
  color: #991b1b;
  border: none;
  border-radius: 8px;
  padding: 6px 10px;
  cursor: pointer;
  font-size: 14px;
  margin-left: 10px;
}

/* 🌙 Dark mode */
body.dark {
  background: #020617;
  color: #e5e7eb;
}

body.dark .section { background: #020617; }
body.dark input, body.dark textarea {
  background: #020617;
  color: #e5e7eb;
  border-color: #334155;
}

/* 🖨 Print */
@media print {
  button { display: none; }
}

/* 📱 Mobile */
@media (max-width: 768px) {
  table, thead, tbody, tr { display: block; }
  thead { display: none; }
}
