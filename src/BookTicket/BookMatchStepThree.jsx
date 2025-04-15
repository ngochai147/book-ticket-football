import { CreditCard, ChevronLeft, Lock, Banknote } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useData } from "../context/DataContext";
import BookingSteps from './BookingSteps';

const BookMatchStepThree = () => {
    const {
        match, typeSeat, seat, stadium, quantity, setQuantity,
        formData = {},
        setFormData
    } = useData();
    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState("card");
    const [errors, setErrors] = useState({});
    const seatPricesByType = stadium.ticketPrices[typeSeat]
    const pricePerSeat = seatPricesByType[seat]            
    
    const subtotal = pricePerSeat * quantity;            
    const serviceFee = subtotal * 0.05;                
    const total = subtotal + serviceFee;  


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData,[name]: value}));
        if (errors[name]) {
            setErrors(prevErrors => ({ ...prevErrors, [name]: null }));
        }
    };

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName?.trim()) newErrors.fullName = "Full name is required.";
        if (!formData.email?.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email address.";
        }
        if (!formData.phone?.trim()) newErrors.phone = "Phone number is required.";
        if (paymentMethod === 'card') {
            if (!formData.cardNumber?.trim()) newErrors.cardNumber = "Card number is required.";
            if (!formData.expiryDate?.trim()) {
                newErrors.expiryDate = "Expiry date is required.";
            } else if (!/^(0[1-9]|1[0-2])\/?([0-9]{4})$/.test(formData.expiryDate)) {
                newErrors.expiryDate = "Invalid MM/YY format.";
            }
            if (!formData.cvv?.trim()) {
                newErrors.cvv = "CVV is required.";
            } else if (!/^[0-9]{3,4}$/.test(formData.cvv)) {
                newErrors.cvv = "CVV must be 3 or 4 digits.";
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    // --- Handle Submit ---
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            navigate('/bookFour');
        } else {
            console.log("Validation Failed:", errors);
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="px-16 py-10 bg-gray-100">
            <BookingSteps currentStep={3} />
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex flex-row justify-between items-center mb-6 gap-3 shadow-sm">
                <div className="flex items-center">
                    <button onClick={handleBack} className="text-blue-600 hover:bg-blue-100 p-1.5 rounded-full mr-3">
                        <ChevronLeft size={20} />
                    </button>
                    <div>
                        <div className="flex items-center gap-1.5 font-semibold text-gray-800">
                            <span>{match.team1}</span>
                            <img src={match.team1Logo} className="w-5 h-5 object-contain" />
                            <span className="mx-1 text-gray-500">vs</span>
                            <img src={match.team2Logo} className="w-5 h-5 object-contain" />
                            <span>{match.team2}</span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1 capitalize">
                            {match.date} • {match.time}
                        </div>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-3 gap-8">
                    <div className="col-span-2">
                        <div className="bg-white rounded-lg shadow-md p-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Information</h2>
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Contact Information</h3>
                                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                                            <input
                                                type="text" name="fullName" required
                                                onChange={handleInputChange}
                                                className="w-full p-2.5 border rounded-md shadow-sm text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                                            <input
                                                type="email" name="email" required
                                                onChange={handleInputChange}
                                                className="w-full p-2.5 border rounded-md shadow-sm text-sm"
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
                                            <input
                                                type="tel" name="phone" required
                                                onChange={handleInputChange}
                                                className="w-full p-2.5 border text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <section>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Payment Method</h3>
                                    <div className="flex flex-wrap gap-3 mb-5">
                                        <div onClick={() => handlePaymentMethodChange('card')}
                                            className={`flex items-center gap-2 border p-3 rounded-lg cursor-pointer flex-1 text-center justify-center 
                                        hover:bg-blue-50 transition-colors duration-200 ease-in-out 
                                        ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-400' : 'border-gray-300 bg-white'}`}>

                                            <CreditCard size={18} className="text-blue-600" />
                                            <span className="text-sm font-medium text-gray-700">Credit Card</span>
                                        </div>
                                        <div onClick={() => handlePaymentMethodChange('paypal')}
                                            className={`flex items-center gap-2 border p-3 rounded-lg cursor-pointer 
                                        flex-1 text-center justify-center hover:bg-blue-50 transition-colors duration-200 ease-in-out 
                                        ${paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-400' : 'border-gray-300 bg-white'}`}>

                                            <Banknote size={18} className="text-blue-600" />
                                            <span className="text-sm font-medium text-gray-700">PayPal</span>
                                        </div>
                                    </div>

                                    {paymentMethod === 'card' && (
                                        <div className="space-y-4 border border-gray-200 p-4 rounded-lg bg-gray-50/50">
                                            <h4 className="text-md font-medium text-gray-800 mb-1">Card Details</h4>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1">Card Number <span className="text-red-500">*</span></label>
                                                <input type="text" name="cardNumber" placeholder="0000 0000 0000 0000" onChange={handleInputChange}
                                                    className={`w-full p-2.5 border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm text-sm`}
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-600 mb-1">Expiry Date (MM/YYYY) <span className="text-red-500">*</span></label>
                                                    <input type="text" name="expiryDate" placeholder="MM/YYYY" onChange={handleInputChange}
                                                        className="w-full p-2.5 border rounded-md shadow-sm text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-600 mb-1">CVV <span className="text-red-500">*</span></label>
                                                    <input type="text" name="cvv" placeholder="123" maxLength="4" onChange={handleInputChange}
                                                        className="w-full p-2.5 border rounded-md shadow-sm text-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {paymentMethod === 'paypal' && (
                                        <div className="border border-gray-200 p-4 rounded-lg bg-gray-50/50 text-center text-sm text-gray-700">
                                            You will be redirected to PayPal to complete the secure payment.
                                        </div>
                                    )}
                                </section>
                            </div>
                            <div className="mt-10 pt-6 border-t border-gray-200">
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg 
                                    hover:bg-blue-700 transition-colors duration-200 font-bold text-base flex items-center justify-center gap-2"
                                >
                                    <Lock size={18} />
                                    Complete Payment & Book Tickets
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 top-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-3">Order Summary</h3>
                            <div className="space-y-3 mb-5 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Match:</span>
                                    <span className="font-medium text-gray-800 text-right">{match.team1} vs {match.team2}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Time:</span>
                                    <span className="text-gray-700 text-right">{match.date} • {match.time}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Stadium:</span>
                                    <span className="font-medium text-gray-800 text-right">{stadium.name}</span>
                                </div>
                                <div className="flex justify-between capitalize">
                                    <span className="text-gray-600">Seat:</span>
                                    <span className="font-medium text-gray-800 text-right">{typeSeat} • {seat}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Quantity:</span>
                                    <input
                                        type="number" min="1" max="10" value={quantity}
                                        onChange={(e) => {
                                            const val = parseInt(e.target.value);
                                            if (val >= 1) setQuantity(val);
                                        }}
                                        className="w-16 text-center border border-gray-300 rounded p-1 text-sm font-medium"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2 border-t pt-4 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Price per seat:</span>
                                    <span className="text-gray-700">£{pricePerSeat.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal ({quantity} tickets):</span>
                                    <span className="text-gray-700">£{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Service Fee (5%):</span>
                                    <span className="text-gray-700">£{serviceFee.toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="flex justify-between font-bold text-lg text-gray-900 border-t pt-4 mt-4">
                                <span>Total:</span>
                                <span className="text-blue-700">£{total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default BookMatchStepThree;