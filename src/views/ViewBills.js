import React, { useEffect, useState } from 'react';

const ViewBills = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];

    // Map appointments to bills with a default service and amount
    const billsData = appointments.map(app => ({
      patient: app.patientName,
      service: app.reason || 'Consultation',
      amount: app.reason?.toLowerCase().includes('x-ray') ? 800 : 500
    }));

    setBills(billsData);
  }, []);

  const total = bills.reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <div className="table-container">
      <h1>📄 Bills</h1>
      <table>
        <thead>
          <tr>
            <th>Patient</th>
            <th>Service</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill, index) => (
            <tr key={index}>
              <td>{bill.patient}</td>
              <td>{bill.service}</td>
              <td>₹{bill.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="total">Total: ₹{total}</p>
    </div>
  );
};

export default ViewBills;
