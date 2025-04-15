import React from "react";
import { Check, Home, Printer, Ticket, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData } from "../context/DataContext";

const BookMatchStepFour = () => {
    const { match, typeSeat, seat, stadium, quantity, formData, resetBookingData } = useData();
    const navigate = useNavigate(); 
    const [bookingCode] = React.useState(Math.random().toString(36).substring(2, 10).toUpperCase());

    const seatPricesByType = stadium.ticketPrices[typeSeat];
    const pricePerSeat = seatPricesByType[seat];
    
    const subtotal = pricePerSeat * quantity;
    const serviceFee = subtotal * 0.05;
    const total = subtotal + serviceFee;

    const handleGoHome = () => {
        if (resetBookingData && typeof resetBookingData === 'function') {
            resetBookingData();
        }
        navigate('/');
    };

    const handlePrintTicket = () => {
        window.print();
    };

    return (
        <div className="px-16 py-10 bg-gray-50">
            <div className="bg-green-50 p-6 rounded-lg border border-green-200 text-center shadow-sm mb-8">
                <div className="mb-4">
                    <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto ring-4 ring-white shadow">
                        <Check className="text-green-600" size={36} />
                    </div>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-2">Booking Successful!</h2>
                <p className="text-base text-green-700 mb-1">Thank you for booking. Your e-ticket has been confirmed.</p>
                <p className="text-sm text-green-600 flex items-center justify-center gap-1">
                    <Mail size={14} /> A confirmation email has been sent to <span className="font-medium">{formData.email || 'your email'}</span>.
                </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-5 border-b pb-3 flex items-center gap-2">
                    <Ticket size={22} className="text-blue-600" /> Order Details
                </h3>
                <dl className="space-y-3 text-base">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                        <dt className="text-gray-600 font-medium w-1/3">Booking Code:</dt>
                        <dd className="font-semibold text-gray-800 tracking-wide text-right">{bookingCode}</dd>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <dt className="text-gray-600 font-medium w-1/3">Match:</dt>
                        <dd className="flex items-center gap-1.5 font-medium text-gray-800 text-right">
                            <span>{match.team1}</span>
                            {match.team1Logo && <img src={match.team1Logo} className="w-5 h-5 object-contain" />}
                            <span className="mx-1 text-gray-500 text-xs">vs</span>
                            {match.team2Logo && <img src={match.team2Logo} className="w-5 h-5 object-contain" />}
                            <span>{match.team2}</span>
                        </dd>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                        <dt className="text-gray-600 font-medium w-1/3">Date & Time:</dt>
                        <dd className="text-gray-800 text-right">{match.date} • {match.time}</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                        <dt className="text-gray-600 font-medium w-1/3">Stadium:</dt>
                        <dd className="text-gray-800 font-medium text-right">{stadium.name}</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100 capitalize">
                        <dt className="text-gray-600 font-medium w-1/3">Selected Seat:</dt>
                        <dd className="text-gray-800 font-medium text-right">{typeSeat} • {seat}</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                        <dt className="text-gray-600 font-medium w-1/3">Quantity:</dt>
                        <dd className="text-gray-800 text-right">{quantity} tickets</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                        <dt className="text-gray-600 font-medium w-1/3 sm:w-1/4">Customer:</dt>
                        <dd className="text-gray-800 text-right">{formData.fullName}</dd>
                    </div>
                    <div className="flex justify-between items-center pt-3 mt-2">
                        <dt className="text-gray-700 font-semibold text-base">Total Payment:</dt>
                        <dd className="font-bold text-xl text-blue-700">£{total.toFixed(2)}</dd>
                    </div>
                </dl>
            </div>

            <div className="flex flex-row gap-4 mt-8">
                <button
                    onClick={handleGoHome}
                    className="flex-1 gap-2 bg-blue-600 text-white py-3 px-5 
                    rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold flex items-center 
                    justify-center shadow-sm text-sm"
                >
                    <Home size={18} />
                    Return to Homepage
                </button>
                <button
                    onClick={handlePrintTicket}
                    className="flex-1 bg-white border border-blue-600 text-blue-600 py-3 px-5 
                    rounded-lg hover:bg-blue-50 transition-colors duration-200 font-semibold
                    flex items-center justify-center shadow-sm text-sm"
                >
                    <Printer size={18} />
                    Print E-Ticket
                </button>
            </div>
        </div>
    );
}

export default BookMatchStepFour;