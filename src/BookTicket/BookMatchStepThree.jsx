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
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!typeSeat || !seat || !stadium || !stadium.ticketPrices || !stadium.ticketPrices[typeSeat]) {
        console.error("Thiếu dữ liệu cần thiết:", { typeSeat, seat, stadium });
        return <div>Lỗi: Thiếu thông tin vé. Vui lòng quay lại bước trước.</div>;
    }

    const seatPricesByType = stadium.ticketPrices[typeSeat];
    const pricePerSeat = seatPricesByType[seat];
    
    const subtotal = pricePerSeat * quantity;
    const serviceFee = subtotal * 0.05;
    const total = subtotal + serviceFee;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
        if (errors[name]) {
            setErrors(prevErrors => ({ ...prevErrors, [name]: null }));
        }
    };

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setIsSubmitting(true);

        try {
            const timeParts = match.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
            if (!timeParts) {
                throw new Error("Định dạng thời gian trận đấu không hợp lệ");
            }

            let [_, hours, minutes, period] = timeParts;
            hours = parseInt(hours, 10);
            minutes = parseInt(minutes, 10);

            if (period.toUpperCase() === "PM" && hours !== 12) {
                hours += 12;
            } else if (period.toUpperCase() === "AM" && hours === 12) {
                hours = 0;
            }

            const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

            const [month, day, year] = match.date.split("/");
            const formattedDay = day.padStart(2, "0");
            const formattedMonth = month.padStart(2, "0");
            const matchTime = new Date(`${year}-${formattedMonth}-${formattedDay}T${formattedTime}:00`);

            if (isNaN(matchTime.getTime())) {
                throw new Error("Không thể tạo thời gian trận đấu, kiểm tra định dạng ngày và giờ");
            }

            // Tạo bookingCode
            const bookingCode = `BK${new Date().getFullYear()}A${Math.floor(1000 + Math.random() * 9000)}`;

            const ticketData = {
                bookingCode,
                match: {
                    home: match.team1 || "Unknown Team",
                    away: match.team2 || "Unknown Team",
                },
                matchTime,
                stadium: stadium.name || "Unknown Stadium",
                seat: {
                    type: typeSeat || "standard",
                    area: seat || "general",
                },
                quantity: quantity || 1,
                customer: {
                    name: formData.fullName || "Guest",
                },
                totalPayment: total || 0,
            };

            console.log("Dữ liệu gửi đi:", ticketData);

            const response = await fetch("http://localhost:3000/api/tickets/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(ticketData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Lỗi khi lưu vé");
            }

            console.log("Lưu vé thành công:", result);
            // Chuyển hướng đến bước tiếp theo
            navigate('/bookFour');
        } catch (error) {
            console.error("Lỗi khi gửi request:", error);
            setErrors({ submit: error.message || "Không thể lưu vé, vui lòng thử lại." });
        } finally {
            setIsSubmitting(false);
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
                            <img src={match.team1Logo} className="w-5 h-5 object-contain" alt={match.team1} />
                            <span className="mx-1 text-gray-500">vs</span>
                            <img src={match.team2Logo} className="w-5 h-5 object-contain" alt={match.team2} />
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
                            {errors.submit && (
                                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                                    {errors.submit}
                                </div>
                            )}
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Contact Information</h3>
                                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Full Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                placeholder="Enter your full name"
                                                onChange={handleInputChange}
                                                className="w-full p-2.5 border rounded-md shadow-sm text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Email <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Enter your email address"
                                                onChange={handleInputChange}
                                                className="w-full p-2.5 border rounded-md shadow-sm text-sm"
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Phone Number <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                placeholder="Enter your phone number"
                                                onChange={handleInputChange}
                                                className="w-full p-2.5 border rounded-md shadow-sm text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <section>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Payment Method</h3>
                                    <div className="flex flex-wrap gap-3 mb-5">
                                        <div
                                            onClick={() => handlePaymentMethodChange('card')}
                                            className={`flex items-center gap-2 border p-3 rounded-lg cursor-pointer flex-1 text-center justify-center 
                                            hover:bg-blue-50 transition-colors duration-200 ease-in-out 
                                            ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-400' : 'border-gray-300 bg-white'}`}
                                        >
                                            <CreditCard size={18} className="text-blue-600" />
                                            <span className="text-sm font-medium text-gray-700">Credit Card</span>
                                        </div>
                                        <div
                                            onClick={() => handlePaymentMethodChange('paypal')}
                                            className={`flex items-center gap-2 border p-3 rounded-lg cursor-pointer 
                                            flex-1 text-center justify-center hover:bg-blue-50 transition-colors duration-200 ease-in-out 
                                            ${paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-400' : 'border-gray-300 bg-white'}`}
                                        >
                                            <Banknote size={18} className="text-blue-600" />
                                            <span className="text-sm font-medium text-gray-700">PayPal</span>
                                        </div>
                                    </div>

                                    {paymentMethod === 'card' && (
                                        <div className="space-y-4 border border-gray-200 p-4 rounded-lg bg-gray-50/50">
                                            <h4 className="text-md font-medium text-gray-800 mb-1">Card Details</h4>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                                    Card Number <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="cardNumber"
                                                    placeholder="0000 0000 0000 0000"
                                                    onChange={handleInputChange}
                                                    className="w-full p-2.5 border rounded-md shadow-sm text-sm"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                                        Expiry Date (MM/YYYY) <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="expiryDate"
                                                        placeholder="MM/YYYY"
                                                        onChange={handleInputChange}
                                                        className="w-full p-2.5 border rounded-md shadow-sm text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                                        CVV <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="cvv"
                                                        placeholder="123"
                                                        maxLength="4"
                                                        onChange={handleInputChange}
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
                                    disabled={isSubmitting}
                                    className={`w-full py-3 px-6 rounded-lg font-bold text-base flex items-center justify-center gap-2 transition-colors duration-200
                                    ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                                >
                                    <Lock size={18} />
                                    {isSubmitting ? "Processing..." : "Complete Payment & Book Tickets"}
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
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={quantity}
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
};

export default BookMatchStepThree;