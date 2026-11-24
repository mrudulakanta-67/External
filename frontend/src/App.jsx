import { useMemo, useState } from 'react'
import './App.css'

const flights = [
  {
    passenger: 'Olivia Martin',
    initials: 'OM',
    flight: 'AI 202',
    airline: 'Air India',
    ticket: '074-1234567890',
    fromCode: 'DEL',
    fromCity: 'New Delhi',
    toCode: 'DXB',
    toCity: 'Dubai',
    date: '24 Nov 2026',
    departure: '10:30',
    arrival: '12:50',
    duration: '3h 20m',
    gate: 'A12',
    seat: '14A',
    terminal: 'T3',
    status: 'On Time',
  },
  {
    passenger: 'Liam Anderson',
    initials: 'LA',
    flight: '6E 506',
    airline: 'IndiGo',
    ticket: '123-9876543210',
    fromCode: 'BLR',
    fromCity: 'Bengaluru',
    toCode: 'BOM',
    toCity: 'Mumbai',
    date: '24 Nov 2026',
    departure: '14:15',
    arrival: '15:45',
    duration: '1h 30m',
    gate: 'C08',
    seat: '21C',
    terminal: 'T1',
    status: 'Boarding',
  },
  {
    passenger: 'Emma Wilson',
    initials: 'EW',
    flight: 'UK 801',
    airline: 'Vistara',
    ticket: '228-4567891230',
    fromCode: 'BOM',
    fromCity: 'Mumbai',
    toCode: 'LHR',
    toCity: 'London',
    date: '25 Nov 2026',
    departure: '02:05',
    arrival: '07:40',
    duration: '9h 05m',
    gate: 'B21',
    seat: '08F',
    terminal: 'T2',
    status: 'On Time',
  },
  {
    passenger: 'Noah Thompson',
    initials: 'NT',
    flight: 'EK 505',
    airline: 'Emirates',
    ticket: '176-3456127890',
    fromCode: 'DXB',
    fromCity: 'Dubai',
    toCode: 'SIN',
    toCity: 'Singapore',
    date: '25 Nov 2026',
    departure: '09:25',
    arrival: '20:55',
    duration: '7h 30m',
    gate: 'D14',
    seat: '32K',
    terminal: 'T3',
    status: 'Delayed',
  },
]

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  )
}

function PlaneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5Z" />
    </svg>
  )
}

function App() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All Flights')

  const filteredFlights = useMemo(() => {
    const search = query.trim().toLowerCase()
    return flights.filter((item) => {
      const matchesSearch =
        !search ||
        [
          item.passenger,
          item.flight,
          item.airline,
          item.ticket,
          item.fromCode,
          item.fromCity,
          item.toCode,
          item.toCity,
        ].some((value) => value.toLowerCase().includes(search))
      const matchesFilter = filter === 'All Flights' || item.status === filter
      return matchesSearch && matchesFilter
    })
  }, [query, filter])

  return (
    <main className="page-shell">
      <aside className="sidebar">
        <a className="brand" href="#" aria-label="Skyline home">
          <span className="brand-mark"><PlaneIcon /></span>
          <span>Skyline</span>
        </a>

        <nav className="nav-list" aria-label="Main navigation">
          <button className="nav-item active" type="button">
            <span className="nav-icon">⌂</span>
            Dashboard
          </button>
          <button className="nav-item" type="button">
            <span className="nav-icon">▦</span>
            My Trips
          </button>
          <button className="nav-item" type="button">
            <span className="nav-icon">♧</span>
            Passengers
          </button>
          <button className="nav-item" type="button">
            <span className="nav-icon">◎</span>
            Support
          </button>
        </nav>

        <div className="profile">
          <span className="avatar">AM</span>
          <div>
            <strong>Alex Morgan</strong>
            <small>Traveler</small>
          </div>
          <button type="button" aria-label="Open profile menu">⋯</button>
        </div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div>
            <p className="eyebrow">Tuesday, 24 November</p>
            <h1>Flight details</h1>
          </div>
          <button className="notification" type="button" aria-label="Notifications">
            ♢
            <span />
          </button>
        </header>

        <div className="toolbar">
          <label className="search-box">
            <SearchIcon />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search passenger, flight or ticket..."
              aria-label="Search flights"
            />
            {query && (
              <button type="button" onClick={() => setQuery('')} aria-label="Clear search">×</button>
            )}
          </label>

          <div className="filters" aria-label="Flight status filters">
            {['All Flights', 'On Time', 'Boarding', 'Delayed'].map((item) => (
              <button
                key={item}
                type="button"
                className={filter === item ? 'active' : ''}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="results-meta">
          <p><strong>{filteredFlights.length}</strong> flight{filteredFlights.length === 1 ? '' : 's'} found</p>
        </div>

        <div className="flight-list">
          {filteredFlights.map((item) => (
            <article className="flight-card" key={item.ticket}>
              <div className="flight-heading">
                <div className="passenger">
                  <span className="passenger-avatar">{item.initials}</span>
                  <div>
                    <strong>{item.passenger}</strong>
                    <small>Passenger</small>
                  </div>
                </div>
                <div className={`status ${item.status.toLowerCase().replace(' ', '-')}`}>
                  <span /> {item.status}
                </div>
              </div>

              <div className="route-row">
                <div className="airport">
                  <strong>{item.fromCode}</strong>
                  <span>{item.fromCity}</span>
                </div>

                <div className="journey">
                  <div className="time-row">
                    <span>{item.departure}</span>
                    <div className="plane-line"><i /><span><PlaneIcon /></span><i /></div>
                    <span>{item.arrival}</span>
                  </div>
                  <p>{item.duration} · Nonstop</p>
                </div>

                <div className="airport destination">
                  <strong>{item.toCode}</strong>
                  <span>{item.toCity}</span>
                </div>
              </div>

              <div className="trip-info">
                <div>
                  <small>Flight</small>
                  <strong>{item.flight}</strong>
                </div>
                <div>
                  <small>Date</small>
                  <strong>{item.date}</strong>
                </div>
                <div>
                  <small>Terminal</small>
                  <strong>{item.terminal}</strong>
                </div>
                <div>
                  <small>Gate</small>
                  <strong>{item.gate}</strong>
                </div>
                <div>
                  <small>Seat</small>
                  <strong>{item.seat}</strong>
                </div>
                <div className="ticket">
                  <small>Ticket number</small>
                  <strong>{item.ticket}</strong>
                </div>
              </div>
            </article>
          ))}

          {filteredFlights.length === 0 && (
            <div className="empty-state">
              <span><SearchIcon /></span>
              <h2>No flights found</h2>
              <p>Try a different passenger name, flight number or ticket.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default App
