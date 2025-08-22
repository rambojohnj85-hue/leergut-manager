
import React, { useState } from 'react';

const App: React.FC = () => {
  const [lieferant, setLieferant] = useState('');
  const [artikel, setArtikel] = useState('');
  const [menge, setMenge] = useState<number>(0);
  const [buchungen, setBuchungen] = useState<any[]>([]);

  const handleAdd = () => {
    setBuchungen([...buchungen, { lieferant, artikel, menge }]);
    setLieferant('');
    setArtikel('');
    setMenge(0);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 20 }}>
      <header style={{ background: '#1e40af', color: 'white', padding: 10 }}>
        <h1>📦 Leergutmanager</h1>
      </header>

      <nav style={{ margin: '10px 0', display: 'flex', gap: 10 }}>
        <button>Übersicht</button>
        <button>Buchungen</button>
        <button>Lieferanten</button>
      </nav>

      <main>
        <h2>Neue Buchung</h2>
        <input placeholder="Lieferant" value={lieferant} onChange={(e) => setLieferant(e.target.value)} />
        <select value={artikel} onChange={(e) => setArtikel(e.target.value)}>
          <option value="">Artikel wählen</option>
          <option value="Europalette">Europalette</option>
          <option value="Gitterbox">Gitterbox</option>
          <option value="Pendelverpackung">Pendelverpackung</option>
        </select>
        <input type="number" placeholder="Menge" value={menge} onChange={(e) => setMenge(Number(e.target.value))} />
        <button onClick={handleAdd}>Hinzufügen</button>

        <h2>Buchungen</h2>
        <ul>
          {buchungen.map((b, i) => (
            <li key={i}>{b.lieferant} – {b.artikel}: {b.menge}</li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default App;
