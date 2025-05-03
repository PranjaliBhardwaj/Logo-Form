import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import './Form.css';

// Initialize EmailJS with the Public Key
const initializeEmailJS = () => {
  emailjs.init('3iVongl0U3LYatWuQ');
};

const Form = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    logoConcept: '',
    brandColors: '',
    additionalNotes: '',
    referenceImageLink: ''
  });

  const [errors, setErrors] = useState({
    companyName: false,
    logoConcept: false,
    brandColors: false,
    additionalNotes: false,
    referenceImageLink: false
  });

  const [currentStep, setCurrentStep] = useState(1);

  // Initialize EmailJS when the component mounts
  useEffect(() => {
    initializeEmailJS();
  }, []);

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

  const validateStep = () => {
    let newErrors = {};
    let hasErrors = false;

    const fieldsToValidate = {
      1: ['companyName', 'logoConcept', 'brandColors', 'additionalNotes'],
      2: ['referenceImageLink'],
    };

    fieldsToValidate[currentStep].forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = true;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      const recipients = [
        'riteshmaurya571@gmail.com',
        'ritesh@cleverstudio.in',
        'cleverstudiohost@gmail.com',
      ];

      const emailData = {
        companyName: formData.companyName,
        logoConcept: formData.logoConcept,
        brandColors: formData.brandColors,
        additionalNotes: formData.additionalNotes,
        referenceImageLink: formData.referenceImageLink 
      };

      const sendEmails = recipients.map((email) =>
        emailjs.send(
          'service_ctt537s', // Service ID
          'template_q1zzxyg', // Template ID
          { ...emailData, to_email: email }
        )
      );

      Promise.all(sendEmails)
        .then((results) => {
          console.log('Emails sent successfully:', results);
          alert('Form submitted and emails sent successfully!');
          setFormData({
            companyName: '',
            logoConcept: '',
            brandColors: '',
            additionalNotes: '',
            referenceImageLink: ''
          });
          setCurrentStep(1);
        })
        .catch((error) => {
          console.error('Email sending failed:', error);
          alert('Failed to send emails. Please try again.');
        });
    }
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="form-heading">Logo Design Form</h2>
      <div className="Box1">
        <h1 className="headi">
          <b>
            <span>GET A</span>
            <br />
            <span>QUOTE</span>
          </b>
        </h1>
        <h3 className="fill">Fill out the form and we will get back to you.</h3>
        <h4>Phone</h4>
        <p>+91 77109 48801</p>
        <h4>Email</h4>
        <p>ritesh@cleverstudio.in</p>
      </div>
      <div className="Box2">
        <h5 className="headtw">
          Let's <i><b>level up</b></i> your brand, together!
        </h5>

        {currentStep === 1 && (
          <>
            <div className="form-group">
              <label className="form-label">
                Company Name {errors.companyName && <span style={{ color: 'red' }}>*</span>}
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className={`form-input ${errors.companyName ? 'error' : ''}`}
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Logo Concept {errors.logoConcept && <span style={{ color: 'red' }}>*</span>}
              </label>
              <input
                type="text"
                name="logoConcept"
                value={formData.logoConcept}
                onChange={handleInputChange}
                className={`form-input ${errors.logoConcept ? 'error' : ''}`}
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Brand Colors {errors.brandColors && <span style={{ color: 'red' }}>*</span>}
              </label>
              <input
                type="text"
                name="brandColors"
                value={formData.brandColors}
                onChange={handleInputChange}
                className={`form-input ${errors.brandColors ? 'error' : ''}`}
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Additional Notes
              </label>
              <input
                type="text"
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleInputChange}
                className={`form-input ${errors.additionalNotes ? 'error' : ''}`}
              />
            </div>
            <div className="button-group">
              <button type="button" onClick={nextStep} className="form-button">
                Next
              </button>
            </div>
          </>
        )}

        {currentStep === 2 && (
          <>
            <div className="form-group">
              <label className="form-label">
                Reference Image Link {errors.referenceImageLink && <span style={{ color: 'red' }}>*</span>}
              </label>
              <input
                type="text"
                name="referenceImageLink"
                value={formData.referenceImageLink}
                onChange={handleInputChange}
                placeholder="Paste Google Drive link for your images"
                className={`form-input ${errors.referenceImageLink ? 'error' : ''}`}
              />
              <p className="help-text">Make sure the link is shareable (set to 'Anyone with the link can view')</p>
            </div>
            <div className="button-group">
              <button type="button" onClick={prevStep} className="form-button">
                Back
              </button>
              <button type="submit" className="form-buttons">
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </form>
  );
};

export default Form;
