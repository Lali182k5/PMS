import React, { useState } from 'react';
import '../../styles.css';

function AddDoctor() {
  const [doctor, setDoctor] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    designation: '',
    department: '',
    email: '',
    dob: '',
    education: '',
    file: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setDoctor({ ...doctor, file: files[0] });
    } else {
      setDoctor({ ...doctor, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (doctor.password !== doctor.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const storedDoctors = JSON.parse(localStorage.getItem('doctors')) || [];

    const newDoctor = {
      id: Date.now(),
      ...doctor,
      fileName: doctor.file?.name || ''
    };

    localStorage.setItem('doctors', JSON.stringify([...storedDoctors, newDoctor]));
    alert('Doctor added successfully!');

    setDoctor({
      firstName: '',
      lastName: '',
      gender: '',
      mobile: '',
      password: '',
      confirmPassword: '',
      designation: '',
      department: '',
      email: '',
      dob: '',
      education: '',
      file: null
    });
  };

  return (
    <div className="form-container">
      <h2>Add Doctor</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid-2-cols">
          <input type="text" name="firstName" placeholder="First Name*" value={doctor.firstName} onChange={handleChange} required />
          <input type="text" name="lastName" placeholder="Last Name" value={doctor.lastName} onChange={handleChange} />
        </div>

        <div className="grid-2-cols">
          <select name="gender" value={doctor.gender} onChange={handleChange} required>
            <option value="">Gender*</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input type="text" name="mobile" placeholder="Mobile*" value={doctor.mobile} onChange={handleChange} required />
        </div>

        <div className="grid-2-cols">
          <input type="password" name="password" placeholder="Password*" value={doctor.password} onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Re-Enter Password*" value={doctor.confirmPassword} onChange={handleChange} required />
        </div>

        <div className="grid-2-cols">
          <input type="text" name="designation" placeholder="Designation" value={doctor.designation} onChange={handleChange} />
          <input type="text" name="department" placeholder="Select Department*" value={doctor.department} onChange={handleChange} required />
        </div>

        <div className="grid-2-cols">
          <input type="email" name="email" placeholder="Email*" value={doctor.email} onChange={handleChange} required />
          <input type="date" name="dob" placeholder="Date of Birth*" value={doctor.dob} onChange={handleChange} required />
        </div>

        <textarea name="education" placeholder="Education" value={doctor.education} onChange={handleChange}></textarea>

        <div className="upload-section">
          <label>Upload</label>
          <input type="file" name="file" onChange={handleChange} />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">Submit</button>
          <button type="button" className="cancel-btn" onClick={() => setDoctor({})}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default AddDoctor;
