import React, { useState } from "react";
import { Check, Home, Printer, Ticket, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData } from "../context/DataContext";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const BookMatchStepFour = () => {
    const { match, typeSeat, seat, stadium, quantity, formData, resetBookingData } = useData();
    const navigate = useNavigate();
    const [bookingCode] = useState(() => Math.random().toString(36).substring(2, 10).toUpperCase());
    const [isPrinting, setIsPrinting] = useState(false);

    // Safe data access (kept from previous version)
    const safeStadium = stadium || { ticketPrices: {}, name: 'N/A' };
    const safeTypeSeat = typeSeat || 'standard';
    const safeSeat = seat || 'general';
    const safeMatch = match || { team1: 'N/A', team2: 'N/A', date: 'N/A', time: 'N/A' };
    const safeFormData = formData || { email: 'N/A', fullName: 'N/A' };
    const safeQuantity = quantity || 0;

    const seatPricesByType = safeStadium.ticketPrices?.[safeTypeSeat] || {};
    const pricePerSeat = seatPricesByType[safeSeat] || 0;

    const subtotal = pricePerSeat * safeQuantity;
    const serviceFee = subtotal * 0.05;
    const total = subtotal + serviceFee;

    const handleGoHome = () => {
        if (resetBookingData && typeof resetBookingData === 'function') {
            resetBookingData();
        }
        navigate('/home');
    };

    // --- PDF Print Function (logic unchanged) ---
    const handlePrintTicket = async () => {
        setIsPrinting(true);
        const ticketDetailsElement = document.getElementById('booking-details-pdf');
        const actionButtonsElement = document.getElementById('action-buttons');

        if (!ticketDetailsElement) {
            console.error("Booking details element not found for PDF generation.");
            alert("Error: Could not find booking details to print.");
            setIsPrinting(false);
            return;
        }

        let originalButtonsStyleDisplay = '';
        if (actionButtonsElement) {
            originalButtonsStyleDisplay = actionButtonsElement.style.display;
            actionButtonsElement.style.display = 'none';
            console.log("Action buttons hidden for printing.");
        }

        try {
            const canvas = await html2canvas(ticketDetailsElement, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff', // Use hex for background color
                logging: false,
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgProps = pdf.getImageProperties(imgData);
            const imgWidth = imgProps.width;
            const imgHeight = imgProps.height;
            const margin = 15;
            const usableWidth = pdfWidth - 2 * margin;
            const usableHeight = pdfHeight - 2 * margin;
            const ratio = Math.min(usableWidth / imgWidth, usableHeight / imgHeight);
            const effectiveImgWidth = imgWidth * ratio;
            const effectiveImgHeight = imgHeight * ratio;
            const imgX = (pdfWidth - effectiveImgWidth) / 2;
            const imgY = margin;

            pdf.addImage(imgData, 'PNG', imgX, imgY, effectiveImgWidth, effectiveImgHeight);
            pdf.save(`e-ticket-${bookingCode}.pdf`);

        } catch (err) {
            console.error("Error generating PDF:", err);
            // Show the original error message which is more specific
            alert(`Failed to generate PDF: ${err.message}. Please try again.`);
        } finally {
            if (actionButtonsElement) {
                actionButtonsElement.style.display = originalButtonsStyleDisplay;
                console.log("Action buttons restored.");
            }
            setIsPrinting(false);
        }
    };

    return (
        // Outer container - colors here DON'T affect the PDF capture usually
        <div className="px-4 sm:px-8 md:px-16 py-10 bg-gray-50 min-h-screen">
            {/* Success Banner - colors here DON'T affect the PDF capture */}
            <div id="success-banner" className="bg-green-50 p-6 rounded-lg border border-green-200 text-center shadow-sm mb-8">
                 <div className="mb-4">
                    <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto ring-4 ring-white shadow">
                        {/* Icon color potentially ok, but replace if needed */}
                        <Check className="text-[#16a34a]" size={36} /> {/* text-green-600 */}
                    </div>
                </div>
                {/* Text colors potentially ok, but replace if needed */}
                <h2 className="text-2xl sm:text-3xl font-bold text-[#057a55] mb-2">Booking Successful!</h2> {/* text-green-800 */}
                <p className="text-base text-[#047857] mb-1">Thank you for booking. Your e-ticket has been confirmed.</p> {/* text-green-700 */}
                <p className="text-sm text-[#16a34a] flex items-center justify-center gap-1 flex-wrap"> {/* text-green-600 */}
                    <Mail size={14} /> A confirmation email has been sent to <span className="font-medium break-all">{safeFormData.email}</span>.
                </p>
            </div>

            {/* --- THIS IS THE CAPTURED SECTION - Replace colors inside --- */}
            <div id="booking-details-pdf" className="bg-[#ffffff] rounded-lg shadow-md p-6 sm:p-8"> {/* bg-white */}
                <h3 className="text-xl font-semibold text-[#1f2937] mb-5 border-b border-[#e5e7eb] pb-3 flex items-center gap-2"> {/* text-gray-800, border-gray-200 (default for border-b) */}
                    <Ticket size={22} className="text-[#2563eb]" /> {/* text-blue-600 */}
                    Order Details
                </h3>
                <dl className="space-y-3 text-sm sm:text-base">
                    {/* Loop through each dl/dd and replace text/border colors */}
                    <div className="flex justify-between py-2 border-b border-[#f3f4f6]"> {/* border-gray-100 */}
                        <dt className="text-[#4b5563] font-medium w-1/3 shrink-0">Booking Code:</dt> {/* text-gray-600 */}
                        <dd className="font-semibold text-[#1f2937] tracking-wide text-right break-all">{bookingCode}</dd> {/* text-gray-800 */}
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-[#f3f4f6] gap-2"> {/* border-gray-100 */}
                        <dt className="text-[#4b5563] font-medium w-1/3 shrink-0">Match:</dt> {/* text-gray-600 */}
                        <dd className="flex items-center justify-end gap-1.5 font-medium text-[#1f2937] text-right flex-wrap"> {/* text-gray-800 */}
                            <span>{safeMatch.team1}</span>
                            {safeMatch.team1Logo && <img alt={`${safeMatch.team1} logo`} src={safeMatch.team1Logo} className="w-5 h-5 object-contain" />}
                            <span className="mx-1 text-[#6b7280] text-xs">vs</span> {/* text-gray-500 */}
                            {safeMatch.team2Logo && <img alt={`${safeMatch.team2} logo`} src={safeMatch.team2Logo} className="w-5 h-5 object-contain" />}
                            <span>{safeMatch.team2}</span>
                        </dd>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#f3f4f6]"> {/* border-gray-100 */}
                        <dt className="text-[#4b5563] font-medium w-1/3 shrink-0">Date & Time:</dt> {/* text-gray-600 */}
                        <dd className="text-[#1f2937] text-right">{safeMatch.date} • {safeMatch.time}</dd> {/* text-gray-800 */}
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#f3f4f6]"> {/* border-gray-100 */}
                        <dt className="text-[#4b5563] font-medium w-1/3 shrink-0">Stadium:</dt> {/* text-gray-600 */}
                        <dd className="text-[#1f2937] font-medium text-right">{safeStadium.name}</dd> {/* text-gray-800 */}
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#f3f4f6] capitalize"> {/* border-gray-100 */}
                        <dt className="text-[#4b5563] font-medium w-1/3 shrink-0">Selected Seat:</dt> {/* text-gray-600 */}
                        <dd className="text-[#1f2937] font-medium text-right">{safeTypeSeat} • {safeSeat}</dd> {/* text-gray-800 */}
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#f3f4f6]"> {/* border-gray-100 */}
                        <dt className="text-[#4b5563] font-medium w-1/3 shrink-0">Quantity:</dt> {/* text-gray-600 */}
                        <dd className="text-[#1f2937] text-right">{safeQuantity} tickets</dd> {/* text-gray-800 */}
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#f3f4f6]"> {/* border-gray-100 */}
                        <dt className="text-[#4b5563] font-medium w-1/3 shrink-0">Customer:</dt> {/* text-gray-600 */}
                        <dd className="text-[#1f2937] text-right break-words">{safeFormData.fullName}</dd> {/* text-gray-800 */}
                    </div>
                    <div className="flex justify-between items-center pt-3 mt-2">
                        <dt className="text-[#374151] font-semibold text-base">Total Payment:</dt> {/* text-gray-700 */}
                        <dd className="font-bold text-xl text-[#1d4ed8]">£{total.toFixed(2)}</dd> {/* text-blue-700 */}
                    </div>
                </dl>
            </div>
            {/* --- END OF CAPTURED SECTION --- */}


            {/* Action Buttons - colors here DON'T affect capture but replaced for consistency */}
            <div id="action-buttons" className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                    onClick={handleGoHome}
                    disabled={isPrinting}
                    className={`flex-1 gap-2 bg-[#2563eb] text-white py-3 px-5 rounded-lg hover:bg-[#1d4ed8] transition-colors duration-200 font-semibold flex items-center justify-center shadow-sm text-sm ${isPrinting ? 'opacity-50 cursor-not-allowed' : ''}`} // bg-blue-600, hover:bg-blue-700
                >
                    <Home size={18} />
                    Return to Homepage
                </button>
                <button
                    onClick={handlePrintTicket}
                    disabled={isPrinting}
                    className={`flex-1 gap-2 bg-white border border-[#2563eb] text-[#2563eb] py-3 px-5 rounded-lg hover:bg-[#eff6ff] transition-colors duration-200 font-semibold flex items-center justify-center shadow-sm text-sm ${isPrinting ? 'opacity-50 cursor-not-allowed' : ''}`} // border-blue-600, text-blue-600, hover:bg-blue-50
                >
                    {isPrinting ? (
                        <>
                           <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                           </svg>
                           Processing...
                        </>
                    ) : (
                        <>
                            <Printer size={18} />
                            Print E-Ticket (PDF)
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

export default BookMatchStepFour;