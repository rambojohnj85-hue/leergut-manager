export type ItemType = 'Europalette' | 'Gitterbox' | 'Pendelverpackung'
export type MovementType = 'Eingang' | 'Ausgang'

export interface Supplier { id: string; name: string }
export interface Movement {
  id: string
  date: string
  supplierId: string
  item: ItemType
  qty: number
  type: MovementType
  note?: string
}

const KEY = 'leergut-data-v1'

export interface DB {
  suppliers: Supplier[]
  movements: Movement[]
}

const defaultDB: DB = {
  suppliers: [
    { id: 's1', name: 'Muster Lieferant GmbH' },
    { id: 's2', name: 'Beispiel Logistics AG' }
  ],
  movements: []
}

function load(): DB {
  const raw = localStorage.getItem(KEY)
  if (!raw) return defaultDB
  try { return JSON.parse(raw) as DB } catch { return defaultDB }
}

function save(db: DB) {
  localStorage.setItem(KEY, JSON.stringify(db))
}

export function getDB(): DB { return load() }

export function addSupplier(name: string) {
  const db = load()
  const id = 's' + Math.random().toString(36).slice(2,8)
  db.suppliers.push({ id, name })
  save(db)
}

export function addMovement(m: Omit<Movement,'id'|'date'> & {date?: string}) {
  const db = load()
  const id = 'm' + Math.random().toString(36).slice(2,8)
  db.movements.push({ id, date: m.date ?? new Date().toISOString(), supplierId: m.supplierId, item: m.item, qty: m.qty, type: m.type, note: m.note })
  save(db)
}

export function getBalanceBySupplier(supplierId: string) {
  const db = load()
  const items: ItemType[] = ['Europalette','Gitterbox','Pendelverpackung']
  const result: Record<ItemType, number> = { Europalette:0, Gitterbox:0, Pendelverpackung:0 }
  db.movements.filter(x=>x.supplierId===supplierId).forEach(m=>{
    const sign = m.type === 'Eingang' ? 1 : -1
    result[m.item] += sign * m.qty
  })
  return result
}

export function getSuppliers(){ return load().suppliers }
export function getMovements(){ return load().movements }
