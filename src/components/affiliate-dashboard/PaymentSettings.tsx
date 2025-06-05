import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { API } from '../../App';
import { FaPencilAlt } from 'react-icons/fa';

// Type definitions
interface User {
  email: string;
  [key: string]: any;
}

interface PaymentSettingsData {
  method: string;
  detail: string;
  address: string;
  city: string;
  zipCode: string;
  affiliator?: boolean;
}

interface PaymentSettingsResponse {
  success: boolean;
  data: PaymentSettingsData;
  message?: string;
}

interface SavePaymentRequest {
  email: string;
  method: string;
  detail: string;
  address: string;
  city: string;
  zipCode: string;
}

type PaymentMethod = 'paypal' | 'litecoin' | '';

const Pencil = FaPencilAlt as React.FC<React.SVGProps<SVGSVGElement>>;

const PaymentSettings: React.FC = () => {
  const [method, setMethod] = useState<PaymentMethod>('');
  const [detail, setDetail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  
  const user: User = JSON.parse(localStorage.getItem('user') || '{}');
  const userEmail: string = user.email;

  const navigate = useNavigate();

  useEffect(() => {
    const loadPaymentSettings = async (): Promise<void> => {
      try {
        const response: AxiosResponse<PaymentSettingsResponse> = await axios.get(
          `${API}/api/affiliate/payment-settings/${userEmail}`
        );
        
        if (response.data.success) {
          const data = response.data.data;
          setMethod((data.method || '') as PaymentMethod);
          setDetail(data.detail);
          setAddress(data.address);
          setCity(data.city);
          setZipCode(data.zipCode);
        }
      } catch (error) {
        console.error('Error loading payment settings:', error);
      }
    };

    if (userEmail) {
      loadPaymentSettings();
    }
  }, [userEmail]);

  // Validation functions
  const validatePayPalEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  
  const validateLitecoinAddress = (address: string): boolean => {
    // Litecoin address validation
    const litecoinRegex = /^(ltc1|[LM3])[a-zA-Z0-9]{25,39}$/;
    return litecoinRegex.test(address);
  };

  const handleSave = async (): Promise<void> => {
    const trimmedDetail = detail.trim();

    // Check if method is selected
    if (!method) {
      alert('Please select a payment method');
      return;
    }

    // Basic validation
    if (!trimmedDetail) {
      alert('Please enter your payment address or email');
      return;
    }

    // Method-specific validation
    if (method === 'paypal') {
      if (!validatePayPalEmail(trimmedDetail)) {
        alert('❌ Please enter a valid PayPal email address.');
        return;
      }
    } else if (method === 'litecoin') {
      if (!validateLitecoinAddress(trimmedDetail)) {
        alert('❌ Please enter a valid Litecoin wallet address.');
        return;
      }
    }

    setLoading(true);

    try {
      const requestData: SavePaymentRequest = {
        email: userEmail,
        method,
        detail: trimmedDetail,
        address: address.trim(),
        city: city.trim(),
        zipCode: zipCode.trim()
      };

      const response: AxiosResponse<PaymentSettingsResponse> = await axios.post(
        `${API}/api/affiliate/payment-settings`,
        requestData
      );

      if (response.data.success) {
        alert('✅ Payment settings saved successfully!');
        setIsEditable(false);
      } else {
        alert('❌ Failed to save payment settings');
      }
    } catch (error) {
      console.error('Error saving payment settings:', error);
      alert('❌ Error saving payment settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Dynamic placeholder text based on selected method
  const getPlaceholderText = (): string => {
    switch (method) {
      case 'paypal':
        return 'Enter your PayPal email address';
      case 'litecoin':
        return 'Enter your Litecoin wallet address';
      default:
        return 'Enter your payment details';
    }
  };

  const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setMethod(e.target.value as PaymentMethod);
  };

  const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDetail(e.target.value);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAddress(e.target.value);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCity(e.target.value);
  };

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setZipCode(e.target.value);
  };

  const toggleEditable = (): void => {
    setIsEditable(!isEditable);
  };

  const handleBackToDashboard = (): void => {
    navigate('/affiliate-dashboard');
  };

  return (
    <div className="container py-5">
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <button
          className="btn btn-link text-decoration-none fw-bold"
          onClick={handleBackToDashboard}
          type="button"
        >
          ← Back to Dashboard
        </button>
        <button 
          className="btn btn-outline-secondary btn-sm" 
          onClick={toggleEditable}
          title="Edit"
          type="button"
        >
          <Pencil /> {isEditable ? 'Cancel' : 'Edit'}
        </button>
      </div>

      <h2 className="fw-bold mb-4 text-center">Payment Settings</h2>
      <div className="mx-auto" style={{ maxWidth: 500 }}>
        <label className="form-label" htmlFor="payment-method">
          Choose Payment Method
        </label>
        <select 
          id="payment-method"
          className="form-select mb-3" 
          value={method} 
          onChange={handleMethodChange}
          disabled={!isEditable || loading}
        >
          <option value="">Choose Payment Method</option>
          <option value="paypal">PayPal</option>
          <option value="litecoin">Litecoin</option>
        </select>
        
        <label className="form-label" htmlFor="payment-detail">
          Payment Address or Email *
        </label>
        <input
          id="payment-detail"
          type="text"
          className="form-control mb-3"
          placeholder={getPlaceholderText()}
          value={detail}
          onChange={handleDetailChange}
          disabled={!isEditable || loading}
          required
        />
        
        <label className="form-label" htmlFor="street-address">
          Street Address
        </label>
        <input
          id="street-address"
          type="text"
          className="form-control mb-3"
          placeholder="123 Main St"
          value={address}
          onChange={handleAddressChange}
          disabled={!isEditable || loading}
          required
        />
        
        <label className="form-label" htmlFor="city">
          City
        </label>
        <input
          id="city"
          type="text"
          className="form-control mb-3"
          placeholder="Your city"
          value={city}
          onChange={handleCityChange}
          disabled={!isEditable || loading}
          required
        />
        
        <label className="form-label" htmlFor="zip-code">
          ZIP Code
        </label>
        <input
          id="zip-code"
          type="text"
          className="form-control mb-4"
          placeholder="12345"
          value={zipCode}
          onChange={handleZipCodeChange}
          disabled={!isEditable || loading}
          required
        />
        
        {isEditable && (
          <button 
            className="btn btn-primary rounded-pill w-100" 
            onClick={handleSave}
            disabled={loading}
            type="button"
          >
            {loading ? 'Saving...' : 'Save Payment Method'}
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentSettings;