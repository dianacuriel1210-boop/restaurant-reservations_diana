
import { useState } from "react";
import "./App.css";

function App() {
  const [customerName, setCustomerName] = useState("");
  const [guests, setGuests] = useState("1");
  const [time, setTime] = useState("");
  const [tableType, setTableType] = useState("Indoor");
  const [reservations, setReservations] = useState([]);
  const [search, setSearch] = useState("");

  // Add a reservation
  const addReservation = (e) => {
    e.preventDefault();

    if (!customerName.trim()) {
      alert("Please enter the customer name.");
      return;
    }

    if (!time || Number(guests) < 1) {
      alert("Please complete all reservation fields.");
      return;
    }

    const newReservation = {
      id: Date.now(),
      customerName: customerName.trim(),
      guests: Number(guests),
      time,
      tableType,
    };

    setReservations([...reservations, newReservation]);
    setCustomerName("");
    setGuests("1");
    setTime("");
    setTableType("Indoor");
  };

  // Delete a reservation
  const deleteReservation = (id) => {
    setReservations(
      reservations.filter((reservation) => reservation.id !== id)
    );
  };

  // Search reservations by customer name
  const filteredReservations = reservations.filter((reservation) =>
    reservation.customerName
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  // Convert time to AM/PM format
  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const hour = Number(hours);
    const period = hour >= 12 ? "PM" : "AM";

    return `${hour % 12 || 12}:${minutes} ${period}`;
  };

  return (
    <main className="app">
      <header className="header">
        <p className="subtitle">RESTAURANT MANAGEMENT</p>
        <h1>Restaurant Reservations</h1>
        <p>Manage your restaurant bookings with ease.</p>
      </header>

      <section className="summary">
        <div>
          <span>Total reservations</span>
          <h2>{reservations.length}</h2>
        </div>
        <span className="summary-icon">✦</span>
      </section>

      <section className="panel">
        <h2>New Reservation</h2>

        <form onSubmit={addReservation}>
          <div className="form-group">
            <label htmlFor="customerName">Customer Name</label>
            <input
              id="customerName"
              type="text"
              placeholder="Enter customer name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="guests">Number of Guests</label>
              <input
                id="guests"
                type="number"
                min="1"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Reservation Time</label>
              <input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="tableType">Table Type</label>
            <select
              id="tableType"
              value={tableType}
              onChange={(e) => setTableType(e.target.value)}
            >
              <option value="Indoor">Indoor</option>
              <option value="Outdoor">Outdoor</option>
              <option value="VIP">VIP</option>
              <option value="Family Area">Family Area</option>
            </select>
          </div>

          <button type="submit" className="add-button">
            + Add Reservation
          </button>
        </form>
      </section>

      <section className="reservations-section">
        <div className="section-heading">
          <h2>Reservations</h2>
          <span>{filteredReservations.length} bookings</span>
        </div>

        <input
          className="search-input"
          type="search"
          placeholder="Search by customer name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {reservations.length === 0 ? (
          <p className="empty-message">No reservations yet.</p>
        ) : filteredReservations.length === 0 ? (
          <p className="empty-message">No reservations found.</p>
        ) : (
          <div className="reservation-list">
            {filteredReservations.map((reservation) => (
              <article
                className="reservation-card"
                key={reservation.id}
              >
                <div className="card-top">
                  <div className="avatar">
                    {reservation.customerName.charAt(0).toUpperCase()}
                  </div>

                  <div className="customer-info">
                    <h3>{reservation.customerName}</h3>
                    <span>{reservation.tableType}</span>
                  </div>
                </div>

                <div className="reservation-details">
                  <p>
                    <strong>Guests:</strong> {reservation.guests}
                  </p>
                  <p>
                    <strong>Time:</strong> {formatTime(reservation.time)}
                  </p>
                  <p>
                    <strong>Table:</strong> {reservation.tableType}
                  </p>
                </div>

                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => deleteReservation(reservation.id)}
                >
                  Cancel Reservation
                </button>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer>
        Restaurant Reservation Manager | React Practice 3
      </footer>
    </main>
  );
}

export default App;
