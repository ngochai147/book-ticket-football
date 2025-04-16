import React, { useEffect, useState } from "react";

const TicketHistoryPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        // Lấy userId từ localStorage
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.id;
        if (!userId) {
          throw new Error("Không tìm thấy userId trong localStorage");
        }

        // Lấy token từ localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Không tìm thấy token trong localStorage");
        }

        console.log("Đang lấy vé cho userId:", userId);
        console.log("Token gửi đi:", token);

        // Gọi API bằng fetch
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

        console.log("Response status:", response.status);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || `Lỗi HTTP! Status: ${response.status}`
          );
        }

        const ticketData = await response.json();
        console.log("Dữ liệu vé nhận được:", ticketData);

        const ticketsArray = Array.isArray(ticketData) ? ticketData : [];
        setTickets(ticketsArray);
        if (ticketsArray.length === 0) {
          setError("Không tìm thấy vé nào cho tài khoản này.");
        } else {
          setError("");
        }
      } catch (error) {
        console.error("Lỗi khi lấy vé:", error);
        setError(error.message || "Không thể tải lịch sử vé");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // Formatting function for date
  const formatDate = (dateString) => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="bg-white min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-800 border-b pb-4">Lịch sử vé đã mua</h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        ) : tickets.length === 0 ? (
          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 text-center">
            <p className="text-lg text-yellow-700">Bạn chưa mua vé nào.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {tickets.map((ticket) => (
              <div 
                key={ticket._id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="bg-blue-50 p-4 border-b border-blue-100">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-blue-800">{ticket.match.home} vs {ticket.match.away}</h3>
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                      Mã: {ticket.bookingCode}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="mb-3">
                      <p className="text-sm text-gray-500">Thời gian trận đấu</p>
                      <p className="font-medium">{formatDate(ticket.matchTime)}</p>
                    </div>
                    <div className="mb-3">
                      <p className="text-sm text-gray-500">Sân vận động</p>
                      <p className="font-medium">{ticket.stadium}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Vị trí ghế</p>
                      <p className="font-medium">{ticket.seat.area} - {ticket.seat.type}</p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="mb-3">
                      <p className="text-sm text-gray-500">Khách hàng</p>
                      <p className="font-medium">{ticket.customer.name}</p>
                    </div>
                    <div className="mb-3">
                      <p className="text-sm text-gray-500">Số lượng vé</p>
                      <p className="font-medium">{ticket.quantity} vé</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Thời gian đặt</p>
                      <p className="font-medium text-gray-600 text-sm">{formatDate(ticket.purchasedAt)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Tổng thanh toán</p>
                    <p className="text-lg font-bold text-green-600">{formatCurrency(ticket.totalPayment)}</p>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-300">
                    Chi tiết
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