import React, { useEffect, useState } from "react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const TicketHistoryPage = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [printingTicketId, setPrintingTicketId] = useState(null);

    let originalShadow = '';

    useEffect(() => {
        const fetchTickets = async () => {
          setLoading(true);
          setError("");
          try {
            const user = JSON.parse(localStorage.getItem("user"));
            const userId = user?.id;
            if (!userId) {
              // English Error
              throw new Error("User ID not found in localStorage");
            }

            const token = localStorage.getItem("token");
            if (!token) {
              // English Error
              throw new Error("Token not found in localStorage");
            }

            const response = await fetch(
              `http://localhost:3000/api/tickets/my-tickets/${userId}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (!response.ok) {
              let errorData;
              try {
                errorData = await response.json();
              } catch (jsonError) {
                // English Error
                throw new Error(`HTTP Error! Status: ${response.status}. Cannot read error details.`);
              }
              // English Error
              throw new Error(
                errorData?.message || `HTTP Error! Status: ${response.status}`
              );
            }

            const ticketData = await response.json();
            const ticketsArray = Array.isArray(ticketData) ? ticketData : [];
            setTickets(ticketsArray);
            setError("");

          } catch (error) {
            // English Error
            console.error("Error fetching tickets:", error);
            // English Error
            setError(error.message || "Could not load ticket history");
            setTickets([]);
          } finally {
            setLoading(false);
          }
        };

        fetchTickets();
    }, []);

    // Formatting function for date (English - UK format)
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
          const options = {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit', hour12: false // 24-hour format
          };
          // Use en-GB locale for DD/MM/YYYY HH:MM format
          return new Date(dateString).toLocaleString('en-GB', options);
        } catch (e) {
          console.error("Error formatting date:", dateString, e);
          return 'Invalid Date';
        }
      };

      // Format currency (English - GBP)
      const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-GB', { // Use en-GB locale
          style: 'currency', currency: 'GBP', // Use GBP currency
        }).format(amount || 0);
      };

    // --- PDF Generation Function ---
    const handlePrintTicket = async (ticketId, bookingCode) => {
        setPrintingTicketId(ticketId);
        const ticketElement = document.getElementById(`ticket-${ticketId}`);
        const printButton = ticketElement?.querySelector('.print-hide-button');

        if (!ticketElement) {
            console.error("Ticket element not found:", ticketId);
            // English Alert
            alert("Error: Ticket element not found for printing.");
            setPrintingTicketId(null);
            return;
        }

        originalShadow = ticketElement.style.boxShadow;
        ticketElement.style.boxShadow = 'none';

        let originalButtonStyleDisplay = '';
        if (printButton) {
            originalButtonStyleDisplay = printButton.style.display;
            printButton.style.display = 'none';
            // English Log
            console.log("Print button hidden.");
        }

        try {
            console.log("Starting html2canvas capture...");
            const canvas = await html2canvas(ticketElement, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
            });
            console.log("html2canvas capture successful.");

            console.log("Converting canvas to data URL...");
            const imgData = canvas.toDataURL('image/png');

            console.log("Creating jsPDF instance...");
            const pdfOptions = {
              orientation: 'portrait',
              unit: 'mm',
              format: 'a4'
            };
            const pdf = new jsPDF(pdfOptions);

            console.log("Calculating image properties and dimensions...");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgProps = pdf.getImageProperties(imgData);
            const imgWidth = imgProps.width;
            const imgHeight = imgProps.height;
            const margin = 10;
            const usableWidth = pdfWidth - 2 * margin;
            const usableHeight = pdfHeight - 2 * margin;
            const ratio = Math.min(usableWidth / imgWidth, usableHeight / imgHeight);
            const effectiveImgWidth = imgWidth * ratio;
            const effectiveImgHeight = imgHeight * ratio;
            const imgX = (pdfWidth - effectiveImgWidth) / 2;
            const imgY = margin;
            console.log("Calculated PDF Dims - W:", effectiveImgWidth, "H:", effectiveImgHeight, "X:", imgX, "Y:", imgY);

            console.log("Adding image to PDF...");
            pdf.addImage(imgData, 'PNG', imgX, imgY, effectiveImgWidth, effectiveImgHeight);
            console.log("Image added to PDF.");

            console.log("Saving PDF...");
            pdf.save(`ticket-${bookingCode || ticketId}.pdf`);
            console.log("PDF save initiated.");

        } catch (err) {
            console.error("Detailed error creating PDF:", err); // Keep detailed log in English
            // English Alert
            alert(`An error occurred while creating the PDF: ${err.message}. Please check the console or try again.`);
        } finally {
            if (printButton) {
                printButton.style.display = originalButtonStyleDisplay;
                 // English Log
                console.log("Print button restored.");
            }

            if (ticketElement) {
                ticketElement.style.boxShadow = originalShadow;
                console.log("Restored original shadow.");
            }
            setPrintingTicketId(null);
        }
    };
    // --- End PDF Generation Function ---

    return (
        <div className="bg-[#f3f4f6] min-h-screen p-4 md:p-6">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                {/* English Title */}
                <h1 className="text-3xl font-bold mb-6 text-[#1e40af] border-b border-[#d1d5db] pb-4">
                    Ticket Purchase History
                </h1>

                {loading ? (
                     <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#3b82f6]"></div>
                         {/* English Text */}
                        <p className="ml-4 text-[#4b5563]">Loading ticket history...</p>
                    </div>
                 ) : error ? (
                    <div className="bg-[#fee2e2] border border-[#f87171] text-[#b91c1c] px-4 py-3 rounded relative" role="alert">
                         {/* English Text */}
                        <strong className="font-bold">Error! </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                ) : tickets.length === 0 ? (
                    <div className="bg-[#fefce8] border border-[#facc15] text-[#a16207] px-4 py-3 rounded text-center" role="alert">
                         {/* English Text */}
                        <p className="font-medium">No tickets found in your history.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {tickets.map((ticket) => (
                            <div
                                key={ticket._id}
                                id={`ticket-${ticket._id}`}
                                className="bg-white rounded-lg shadow-md overflow-hidden border border-[#e5e7eb] hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="bg-[#eff6ff] p-4 border-b border-[#dbeafe]">
                                  <div className="flex flex-wrap justify-between items-center gap-2">
                                    <h3 className="text-lg md:text-xl font-bold text-[#1e3a8a]">
                                      {ticket.match?.home || 'N/A'} vs {ticket.match?.away || 'N/A'}
                                    </h3>
                                    <span className="bg-[#dbeafe] text-[#1e40af] text-xs sm:text-sm font-medium px-3 py-1 rounded-full">
                                       {/* English Text */}
                                      Code: {ticket.bookingCode || 'N/A'}
                                    </span>
                                  </div>
                                </div>
                                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <div className="mb-3">
                                       {/* English Text */}
                                      <p className="text-[#6b7280] font-semibold">Match Time:</p>
                                      <p className="font-medium text-[#1f2937]">{formatDate(ticket.matchTime)}</p>
                                    </div>
                                    <div className="mb-3">
                                       {/* English Text */}
                                      <p className="text-[#6b7280] font-semibold">Stadium:</p>
                                      <p className="font-medium text-[#1f2937]">{ticket.stadium || 'N/A'}</p>
                                    </div>
                                    <div className="mb-3 sm:mb-0">
                                       {/* English Text */}
                                      <p className="text-[#6b7280] font-semibold">Seat Location:</p>
                                      <p className="font-medium text-[#1f2937]">
                                        {ticket.seat?.area || 'N/A'} - {ticket.seat?.type || 'N/A'}
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="mb-3">
                                       {/* English Text */}
                                      <p className="text-[#6b7280] font-semibold">Customer:</p>
                                      <p className="font-medium text-[#1f2937]">{ticket.customer?.name || 'N/A'}</p>
                                    </div>
                                    <div className="mb-3">
                                       {/* English Text */}
                                      <p className="text-[#6b7280] font-semibold">Quantity:</p>
                                       {/* English Text */}
                                      <p className="font-medium text-[#1f2937]">{ticket.quantity || 0} tickets</p>
                                    </div>
                                    <div className="mb-3 sm:mb-0">
                                        {/* English Text */}
                                       <p className="text-[#6b7280] font-semibold">Booking Time:</p>
                                       <p className="font-medium text-[#4b5563] text-xs">{formatDate(ticket.purchasedAt)}</p>
                                    </div>
                                  </div>
                                </div>

                                <div className="bg-[#f9fafb] p-4 border-t border-[#e5e7eb] flex flex-wrap justify-between items-center gap-3">
                                    <div>
                                        {/* English Text */}
                                        <p className="text-sm text-[#6b7280]">Total Payment:</p>
                                        {/* Currency format updated */}
                                        <p className="text-lg font-bold text-[#16a34a]">{formatCurrency(ticket.totalPayment)}</p>
                                    </div>
                                    <button
                                        onClick={() => handlePrintTicket(ticket._id, ticket.bookingCode)}
                                        disabled={printingTicketId === ticket._id}
                                        className={`print-hide-button bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 py-2 rounded-md text-sm font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${printingTicketId === ticket._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {printingTicketId === ticket._id ? (
                                            <span className="flex items-center">
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                 {/* English Text */}
                                                Processing...
                                            </span>
                                        ) : (
                                             /* English Text */
                                            'Print Ticket (PDF)'
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TicketHistoryPage;