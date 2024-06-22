// components/EventRegistrationForm.js
'use client';
import React, { useState } from 'react';
import styles from './EventRegistrationForm.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faCalendarAlt, faUserFriends } from '@fortawesome/free-solid-svg-icons';

const EventRegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        attendingWithGuest: 'No',
        guestName: ''
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const errors = {};
        if (!formData.name) errors.name = 'Name is required';
        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }
        if (!formData.age || formData.age <= 0) errors.age = 'Age must be greater than 0';
        if (formData.attendingWithGuest === 'Yes' && !formData.guestName) {
            errors.guestName = 'Guest Name is required';
        }
        return errors;
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length === 0) {
            alert(JSON.stringify(formData, null, 2));
        } else {
            setErrors(errors);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    };

    return (
        <div className={styles.pageWrapper}>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>
                        <FontAwesomeIcon icon={faUser} className={styles.icon} /> Name:
                    </label>
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                    />
                    {errors.name && <span className={styles.error}>{errors.name}</span>}
                </div>
                <div className={styles.formGroup}>
                    <label>
                        <FontAwesomeIcon icon={faEnvelope} className={styles.icon} /> Email:
                    </label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                    />
                    {errors.email && <span className={styles.error}>{errors.email}</span>}
                </div>
                <div className={styles.formGroup}>
                    <label>
                        <FontAwesomeIcon icon={faCalendarAlt} className={styles.icon} /> Age:
                    </label>
                    <input 
                        type="number" 
                        name="age" 
                        value={formData.age} 
                        onChange={handleChange} 
                    />
                    {errors.age && <span className={styles.error}>{errors.age}</span>}
                </div>
                <div className={styles.formGroup}>
                    <label>
                        <FontAwesomeIcon icon={faUserFriends} className={styles.icon} /> Are you attending with a guest?
                    </label>
                    <select 
                        name="attendingWithGuest" 
                        value={formData.attendingWithGuest} 
                        onChange={handleChange}
                    >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                    </select>
                </div>
                {formData.attendingWithGuest === 'Yes' && (
                    <div className={styles.formGroup}>
                        <label>
                            Guest Name:
                        </label>
                        <input 
                            type="text" 
                            name="guestName" 
                            value={formData.guestName} 
                            onChange={handleChange} 
                        />
                        {errors.guestName && <span className={styles.error}>{errors.guestName}</span>}
                    </div>
                )}
                <button className={styles.submitButton} type="submit">Submit</button>
            </form>
        </div>
    );
};

export default EventRegistrationForm;
