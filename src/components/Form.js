import React, { useState } from 'react';
import '../index.css'; 

const Form = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    stockimages: '',
    description: '',
    brandColors: '',
    additionalNotes: ''
  });

  const [errors, setErrors] = useState({
    companyName: false,
    stockimages: false,
    description: false,
    brandColors: false,
    additionalNotes: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: false,
    });
  };

  const handleFileChange = (files, fieldName) => {
    if (files && files.length > 0) {
      setFormData({
        ...formData,
        [fieldName]: files[0].name,
      });
      setErrors({
        ...errors,
        [fieldName]: false,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    let hasErrors = false;

    Object.keys(formData).forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = true;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
    } else {
      console.log('Form submitted:', formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label className="form-label">Company Name {errors.companyName && <span style={{ color: 'red' }}>*</span>}</label>
        <input 
          type="text" 
          name="companyName" 
          value={formData.companyName} 
          onChange={handleInputChange} 
          className={`form-input ${errors.companyName ? 'error' : ''}`} 
        />
      </div>

      <div className="form-group">
        <label className="form-label">Reference Image Upload {errors.stockimages && <span style={{ color: 'red' }}>*</span>}</label>
        <input 
          type="file" 
          name="stockimages" 
          onChange={(e) => handleFileChange(e.target.files, 'stockimages')} 
          className={`form-input ${errors.stockimages ? 'error' : ''}`} 
        />
      </div>

      <div className="form-group">
        <label className="form-label">Describe the logo concept {errors.description && <span style={{ color: 'red' }}>*</span>}</label>
        <input 
          type="text" 
          name="description" 
          value={formData.description} 
          onChange={handleInputChange} 
          className={`form-input ${errors.description ? 'error' : ''}`} 
        />
      </div>

      <div className="form-group">
        <label className="form-label">Brand Colors {errors.brandColors && <span style={{ color: 'red' }}>*</span>}</label>
        <input 
          type="text" 
          name="brandColors" 
          value={formData.brandColors} 
          onChange={handleInputChange} 
          className={`form-input ${errors.brandColors ? 'error' : ''}`} 
        />
      </div>

      <div className="form-group">
        <label className="form-label">Additional Notes {errors.additionalNotes && <span style={{ color: 'red' }}>*</span>}</label>
        <input 
          type="text" 
          name="additionalNotes" 
          value={formData.additionalNotes} 
          onChange={handleInputChange} 
          className={`form-input ${errors.additionalNotes ? 'error' : ''}`} 
        />
      </div>

      <div className="button-group">
        <button type="submit" className="form-button">Submit</button>
      </div>
    </form>
  );
};

export default Form;