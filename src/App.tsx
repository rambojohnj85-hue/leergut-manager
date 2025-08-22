import React, { useMemo, useState } from 'react'
import { NavLink, Routes, Route } from 'react-router-dom'
import { addMovement, addSupplier, getBalanceBySupplier, getMovements, getSuppliers, ItemType, MovementType } from './store'

const Topbar: React.FC = () => (
  <div className="topbar">
    <div className="brand"><div className="logo"></div> Leergut Manager</div>
    <nav className="nav">
      <NavLink to="/" end>Dashboard</NavLink>
      <NavLink to="/bewegungen">Bewegungen</NavLink>
      <NavLink to="/lieferanten">Lieferanten</NavLink>
      <NavLink to="/einstellungen">Einstellungen</NavLink>
    </nav>
  </div>
)

const Dashboard: React.FC = () => {
  const suppliers = getSuppliers()
  const summary = suppliers.map(s=>({ s, bal: getBalanceBySupplier(s.id) }))
  const total = summary.reduce((acc, cur)=>{
    acc.Europalette += cur.bal.Europalette
    acc.Gitterbox += cur.bal.Gitterbox
    acc.Pendelverpackung += cur.bal.Pendelverpackung
    return acc
  }, { Europalette:0, Gitterbox:0, Pendelverpackung:0 })

  return (
    <div className="grid cols-3">
      <div className="card">
        <div className="kpi"><span className="num">{total.Europalette}</span><span className="sub">Europaletten</span></div>
      </div>
      <div className="card">
        <div className="kpi"><span className="num">{total.Gitterbox}</span><span className="sub">Gitterboxen</span></div>
      </div>
      <div className="card">
        <div className="kpi"><span className="num">{total.Pendelverpackung}</span><span className="sub">Pendelverpackungen</span></div>
      </div>
      <div className="card" style={{gridColumn:'1 / -1'}}>
        <h3>Saldo je Lieferant</h3>
        <table className="table">
          <thead><tr><th>Lieferant</th><th>Europalette</th><th>Gitterbox</th><th>Pendelverpackung</th></tr></thead>
          <tbody>
            {summary.map(({s, bal})=>(
              <tr key={s.id}><td>{s.name}</td><td>{bal.Europalette}</td><td>{bal.Gitterbox}</td><td>{bal.Pendelverpackung}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const Bewegungen: React.FC = () => {
  const [supplierId, setSupplierId] = useState(getSuppliers()[0]?.id ?? '')
  const [item, setItem] = useState<ItemType>('Gitterbox')
  const [qty, setQty] = useState(1)
  const [type, setType] = useState<MovementType>('Eingang')
  const [note, setNote] = useState('')
  const suppliers = getSuppliers()
  const movements = useMemo(()=>getMovements().slice().reverse(), [])

  function submit(e: React.FormEvent){
    e.preventDefault()
    if (!supplierId || qty<=0) return
    addMovement({ supplierId, item, qty, type, note })
    location.reload()
  }

  return (
    <div className="grid cols-2">
      <div className="card">
        <h3>Neue Bewegung</h3>
        <form onSubmit={submit} className="grid" style={{gap:12}}>
          <label>Lieferant
            <select value={supplierId} onChange={e=>setSupplierId(e.target.value)}>
              {suppliers.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </label>
          <label>Typ
            <select value={type} onChange={e=>setType(e.target.value as MovementType)}>
              <option>Eingang</option>
              <option>Ausgang</option>
            </select>
          </label>
          <label>Artikel
            <select value={item} onChange={e=>setItem(e.target.value as ItemType)}>
              <option>Europalette</option>
              <option>Gitterbox</option>
              <option>Pendelverpackung</option>
            </select>
          </label>
          <label>Menge
            <input type="number" value={qty} onChange={e=>setQty(parseInt(e.target.value||'0'))} min={1} />
          </label>
          <label>Notiz
            <input value={note} onChange={e=>setNote(e.target.value)} />
          </label>
          <button type="submit">Speichern</button>
        </form>
      </div>
      <div className="card">
        <h3>Letzte Bewegungen</h3>
        <table className="table">
          <thead><tr><th>Datum</th><th>Lieferant</th><th>Typ</th><th>Artikel</th><th>Menge</th><th>Notiz</th></tr></thead>
          <tbody>
            {movements.map(m=>{
              const s = suppliers.find(x=>x.id===m.supplierId)?.name ?? m.supplierId
              const d = new Date(m.date).toLocaleString()
              return <tr key={m.id}><td>{d}</td><td>{s}</td><td>{m.type}</td><td>{m.item}</td><td>{m.qty}</td><td>{m.note}</td></tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const Lieferanten: React.FC = () => {
  const [name, setName] = useState('Neuer Lieferant')
  const suppliers = getSuppliers()
  function submit(e: React.FormEvent){ e.preventDefault(); if(!name.trim()) return; addSupplier(name.trim()); location.reload() }
  return (
    <div className="grid cols-2">
      <div className="card">
        <h3>Lieferant anlegen</h3>
        <form onSubmit={submit} className="grid" style={{gap:12}}>
          <input value={name} onChange={e=>setName(e.target.value)} />
          <button type="submit">Anlegen</button>
        </form>
      </div>
      <div className="card">
        <h3>Bestehende Lieferanten</h3>
        <ul>
          {suppliers.map(s=><li key={s.id}>{s.name}</li>)}
        </ul>
      </div>
    </div>
  )
}

const Settings: React.FC = () => (
  <div className="card">
    <h3>Einstellungen</h3>
    <p>Datenspeicherung: <b>lokal (Browser/Client)</b></p>
    <p>Hinweis: Für Server/Mehrbenutzerbetrieb könnte später SQLite/Server angebunden werden.</p>
  </div>
)

const Layout: React.FC = () => (
  <div className="app">
    <Topbar />
    <div className="content">
      <aside className="sidebar">
        <div className="card">
          <h3>Schnellaktionen</h3>
          <ul>
            <li><a href="/bewegungen">Bewegung erfassen</a></li>
            <li><a href="/">Saldo ansehen</a></li>
          </ul>
        </div>
      </aside>
      <main className="main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/bewegungen" element={<Bewegungen />} />
          <Route path="/lieferanten" element={<Lieferanten />} />
          <Route path="/einstellungen" element={<Settings />} />
        </Routes>
      </main>
    </div>
    <footer>© {new Date().getFullYear()} Leergut Manager</footer>
  </div>
)

const App: React.FC = () => <Layout />
export default App
