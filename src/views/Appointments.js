import React from 'react';

const Appointments = () => {
  return (
    <div className="form-container">
      <h1>📅 Book Appointment</h1>
      <form>
        <input type="text" placeholder="Doctor Name" required />
        <input type="date" required />
        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default Appointments;
