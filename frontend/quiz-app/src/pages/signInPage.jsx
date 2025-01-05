import React, { useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import Input from '../components/Input';
import Button from '../components/Button';
import { ar } from '../translations/ar';
import { Link } from 'react-router-dom';

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateInputs = () => {
        const newErrors = {};
        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required.";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateInputs();

        // If there are validation errors, don't submit the form
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsLoading(true);
        setErrorMessage('');
        try {
            const response = await fetch('http://localhost:5000/api/User/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                // Handle successful login
                alert('Login successful!');
                // Redirect user or store authentication token in localStorage or cookies here
            } else {
                setErrorMessage(data.error || 'Invalid email or password');
            }
        } catch (err) {
            setErrorMessage('An error occurred. Please try again later.');
        }
        setIsLoading(false);
    };

    return (
        <AuthLayout title={ar.auth.signIn.title}>
          <form className="mt-8 space-y-6 select-none" onSubmit={handleSubmit} dir="rtl">
            <div className="space-y-4">
              <Input
                label={ar.auth.signIn.email}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error">{errors.email}</p>}
              <Input
                label={ar.auth.signIn.password}
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
    
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-primary-600 hover:text-primary-500">
                  {ar.auth.signIn.forgotPassword}
                </Link>
              </div>
            </div>
    
            <Button type="submit" fullWidth>
              {ar.auth.signIn.submit}
            </Button>
    
            <div className="text-center">
              <span className="text-sm text-gray-600">
                {ar.auth.signIn.noAccount}{' '}
                <Link to="/signup" className="font-medium text-primary-600 hover:text-primary-500">
                  {ar.auth.signIn.signUp}
                </Link>
              </span>
            </div>
          </form>
        </AuthLayout>
      );
};

export default SignIn;
