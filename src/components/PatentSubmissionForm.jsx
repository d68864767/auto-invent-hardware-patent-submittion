import React, { useState } from 'react';
import axios from 'axios';
import '../styles/PatentSubmissionForm.css';

function PatentSubmissionForm() {
  const [inventionName, setInventionName] = useState('');
  const [description, setDescription] = useState('');
  const [inventorName, setInventorName] = useState('');
  const [dateOfInvention, setDateOfInvention] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/patent-submissions', {
        inventionName,
        description,
        inventorName,
        dateOfInvention,
      });

      if (response.status === 200) {
        alert('Successfully submitted patent for ' + inventionName);
      } else {
        throw new Error('Submission was not successful');
      }
    } catch (error) {
      alert('Failed to submit patent. Error: ' + error.message);
    }
  };

  return (
    <div className="patent-submission-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="inventionName">Invention Name:</label>
          <input
            type="text"
            id="inventionName"
            value={inventionName}
            onChange={(e) => setInventionName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="inventorName">Inventor Name:</label>
          <input
            type="text"
            id="inventorName"
            value={inventorName}
            onChange={(e) => setInventorName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateOfInvention">Date of Invention:</label>
          <input
            type="date"
            id="dateOfInvention"
            value={dateOfInvention}
            onChange={(e) => setDateOfInvention(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Submit Patent</button>
      </form>
    </div>
  );
}

export default PatentSubmissionForm;
</label>