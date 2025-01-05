import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import Input from '../components/Input';
import Button from '../components/Button';
import { ar } from '../translations/ar';

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Form validation errors
    const [validationErrors, setValidationErrors] = useState({});

    // Handle input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setValidationErrors({});
        setError("");
    };

    // Validate form inputs
    const validateInputs = async () => {
        const errors = {};
        if (!formData.firstName.trim()) errors.firstName = "First name is required.";
        if (!formData.lastName.trim()) errors.lastName = "Last name is required.";
        if (!formData.email.trim()) {
            errors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Enter a valid email address.";
        }
        if (!formData.password.trim()) {
            errors.password = "Password is required.";
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters.";
        }
        if (!formData.confirmPassword.trim()) {
            errors.confirmPassword = "Confirm password is required.";
        } else if (formData.confirmPassword !== formData.password) {
            errors.confirmPassword = "Passwords do not match.";
        }
        if (formData.email.trim()) {
            try {
                const response = await fetch(`http://localhost:5000/api/User?email=${formData.email.trim()}`);
                const data = await response.json(); // Parse the response to check for users
                if (data.length > 0) { // If the response is not empty, the email is already taken
                    errors.email = "This email is already used.";
                }
            } catch (err) {
                console.log('Error checking email: ', err);
            }
        }
    
        return errors;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs
        const errors = await validateInputs();
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        try {
            // Make a POST request to the signup route
            const response = await axios.post("http://localhost:5000/api/User", {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                passwordHash: formData.password, // Send password as passwordHash
            });

            navigate('/signin');
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
            });
            setError(""); // Clear error if successful
        } catch (err) {
            // Handle errors from backend
            if (err.response && err.response.data.error) {
                setError(err.response.data.error); // Display error from backend
            } else {
                setError("An error occurred. Please try again.");
            }
        }
    };

    return (
        <AuthLayout title={ar.auth.signUp.title} >
          <form className="mt-8 space-y-6 select-none" onSubmit={handleSubmit} dir="rtl">
            <div className="space-y-4">
              <Input
                label={ar.auth.signUp.fullName}
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              {validationErrors.firstName && <p>{validationErrors.firstName}</p>}
              <Input
                label={ar.auth.signUp.fullName}
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              {validationErrors.lastName && <p>{validationErrors.lastName}</p>}
              <Input
                label={ar.auth.signUp.email}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {validationErrors.email && <p>{validationErrors.email}</p>}
              <Input
                label={ar.auth.signUp.password}
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {validationErrors.password && <p>{validationErrors.password}</p>}
              <Input
                label={ar.auth.signUp.confirmPassword}
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {validationErrors.confirmPassword && <p>{validationErrors.confirmPassword}</p>}
            </div>
    
            <Button type="submit" fullWidth>
              {ar.auth.signUp.submit}
            </Button>
    
            <div className="text-center">
              <span className="text-sm text-gray-600">
                {ar.auth.signUp.haveAccount}{' '}
                <Link to="/signin" className="font-medium text-primary-600 hover:text-primary-500">
                  {ar.auth.signUp.signIn}
                </Link>
              </span>
            </div>
          </form>
        </AuthLayout>
      );
};

export default Signup;
