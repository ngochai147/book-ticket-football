// BookMatchStepTwo.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import BookingSteps from "./BookingSteps";
import { useNavigate } from "react-router-dom";

const BookMatchStepTwo = () => {
  const navigate = useNavigate();
  // const selectedSection = ""; // Không cần thiết nếu dùng currentSection
  const [hoveredSection, setHoveredSection] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  // Lấy giá trị khởi tạo từ context nếu có, nếu không thì null hoặc ''
  const { stadium, match, setSeat, typeSeat, selectedSeat } = useData();
  const [currentSection, setCurrentSection] = useState(selectedSeat || null); // Khởi tạo state với giá trị từ context

  const handleSectionSelect = (section) => {
    setSeat(section); // Cập nhật context
    setCurrentSection(section); // Cập nhật state cục bộ để highlight
  };

  // Hàm xử lý quay lại đã có sẵn
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="space-y-6 bg-white p-4 md:p-8 lg:p-16"> {/* Điều chỉnh padding */}
      <BookingSteps currentStep={2} />
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 flex justify-between items-center mb-4 flex-wrap"> {/* Thêm flex-wrap */}
        <div className="flex items-center mb-2 sm:mb-0">
          {/* Gắn onClick vào đây */}
          <button
            className="text-blue-600 hover:bg-blue-100 p-1 rounded-full mr-3"
            onClick={handleBack} // <--- THÊM DÒNG NÀY
            aria-label="Go back" // Thêm aria-label cho accessibility
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <div className="flex items-center gap-1 font-medium flex-wrap"> {/* Thêm flex-wrap */}
              <span>{match?.team1 || "Team 1"}</span>
              <img
                src={match?.team1Logo}
                alt={`${match?.team1 || "Team 1"} logo`} // Thêm alt text
                className="w-6 h-6 object-contain"
              />
              <span className="mx-2 text-lg">vs</span>
              <img
                src={match?.team2Logo}
                alt={match?.team2 || "Team 2"} // Thêm alt text
                className="w-6 h-6 object-contain"
              />
              <span>{match?.team2 || "Team 2"}</span>
            </div>
            <div className="text-sm text-gray-600">{match?.date} • {match?.time}</div>
          </div>
        </div>
        <div className="bg-white px-3 py-1 rounded-full border border-gray-200 text-sm font-medium flex items-center shrink-0"> {/* Thêm shrink-0 */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-red-500 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Step 2
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          {/* --- Sơ đồ sân vận động --- */}
          <div className="bg-white p-4 rounded-lg shadow-md sticky top-4"> {/* Thêm sticky top-4 */}
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              Sơ đồ sân vận động
              {/* ... tooltip icon ... */}
               <svg
                className="text-gray-400 cursor-pointer"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v.01M12 13a2 2 0 0 0 .914-.504A2 2 0 0 0 13 12v-1a2 2 0 0 0-.086-.496A2 2 0 0 0 12 10a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2z" />
              </svg>
            </h3>
             {showTooltip && (
              <div className="absolute bg-gray-800 text-white p-3 rounded-lg text-sm w-64 z-10 shadow-lg transform transition-all duration-200 ease-in-out -mt-12 ml-4"> {/* Điều chỉnh vị trí tooltip */}
                Click on any section to view available seats
              </div>
            )}
             {/* Đảm bảo stadium và các thành phần SVG được render đúng */}
             <div className="bg-gray-100 p-4 rounded-lg mb-4 flex items-center justify-center relative aspect-video md:aspect-auto md:h-64"> {/* Điều chỉnh aspect ratio */}
               <svg width="100%" height="100%" viewBox="0 0 400 300" className="max-w-full max-h-full mx-auto drop-shadow-xl">
                {/* ... SVG code cho sân vận động ... */}
                 {/* Outer Stadium Shape */}
                 <path
                  d="M50,40 L350,40 Q360,40 360,50 L360,250 Q360,260 350,260 L50,260 Q40,260 40,250 L40,50 Q40,40 50,40"
                  fill="#1e293b" // Màu nền ngoài sân
                  className="filter drop-shadow-lg"
                 />

                {/* Inner Field */}
                 <path
                  d="M70,60 L330,60 Q340,60 340,70 L340,230 Q340,240 330,240 L70,240 Q60,240 60,230 L60,70 Q60,60 70,60"
                  fill="#15803d" // Màu sân cỏ
                  stroke="#0f172a"
                  strokeWidth="1"
                 />

                {/* Field Markings */}
                 <circle cx="200" cy="150" r="30" fill="none" stroke="#fff" strokeWidth="1.5" strokeDasharray="4 2" className="opacity-70" />
                 <circle cx="200" cy="150" r="4" fill="#fff" className="opacity-70" />
                 <line x1="200" y1="70" x2="200" y2="230" stroke="#fff" strokeWidth="1.5" strokeDasharray="4 2" className="opacity-70" />

                {/* Penalty Areas */}
                 <rect x="80" y="100" width="40" height="100" fill="none" stroke="#fff" strokeWidth="1.5" strokeDasharray="4 2" className="opacity-70" />
                 <rect x="280" y="100" width="40" height="100" fill="none" stroke="#fff" strokeWidth="1.5" strokeDasharray="4 2" className="opacity-70" />

                 {/* Các khu vực khán đài (G) */}
                 {stadium?.sections?.map((section) => (
                  <g
                    key={section.id}
                    onClick={() => handleSectionSelect(section.name)}
                    onMouseEnter={() => setHoveredSection(section.name)}
                    onMouseLeave={() => setHoveredSection(null)}
                    className="cursor-pointer transition-all duration-300"
                  >
                    <path
                      d={section.pathData} // Lấy path data từ context/props
                      fill={
                        hoveredSection === section.name
                          ? "#60a5fa" // Màu khi hover
                          : currentSection === section.name
                          ? "#3b82f6" // Màu khi được chọn
                          : section.color || "#e5e7eb" // Màu mặc định hoặc từ data
                      }
                      className="transition-all duration-300 ease-in-out"
                    />
                    <text
                      x={section.textX} // Lấy tọa độ X từ context/props
                      y={section.textY} // Lấy tọa độ Y từ context/props
                      textAnchor="middle"
                      fill="#1e293b"
                      fontSize="14"
                      fontWeight="bold"
                      transform={section.transform || ""} // Lấy transform nếu cần (ví dụ: xoay chữ)
                    >
                      {section.displayName || section.name}
                    </text>
                  </g>
                 ))}

                 {/* Ví dụ path cho North Stand (cần thay bằng data động) */}
                 {/* <g onClick={() => handleSectionSelect("North Stand")} ... >
                    <path d="M70,20 L330,20 Q340,20 340,30 L340,50 L60,50 L60,30 Q60,20 70,20" ... />
                    <text x="200" y="40" ...>North Stand</text>
                  </g> */}
                 {/* ... các khán đài khác tương tự ... */}

               </svg>
             </div>
            <div className="text-sm text-gray-600">
              <p className="mb-2">Chọn khu vực cho ghế</p>
              <p className="text-xs text-gray-500">
                Bản đồ chỉ mang tính chất minh họa. Chỗ ngồi chính xác sẽ được chỉ định sau khi xác nhận đặt vé.
              </p>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-xl font-bold mb-4">Chọn khu vực</h2>
          <div className="space-y-4">
             {/* Kiểm tra stadium.ticketPrices và typeSeat tồn tại trước khi map */}
             {stadium?.ticketPrices?.[typeSeat] ? (
              Object.entries(stadium.ticketPrices[typeSeat])
                .slice(0, 4) // Giữ lại slice nếu bạn chỉ muốn hiện 4 khu vực đầu
                .map(([sectionName, price]) => (
                  // Sử dụng div thay vì Link nếu chỉ muốn chọn khu vực tại bước này
                  <div
                    key={sectionName}
                    className={`border rounded-lg p-4 cursor-pointer hover:bg-blue-50 transition-colors ${currentSection === sectionName ? "border-blue-500 bg-blue-50" : "border-gray-200"}`} // Thêm border-gray-200
                    onClick={() => handleSectionSelect(sectionName)}
                  >
                    <div className="flex justify-between items-center flex-wrap gap-2"> {/* Thêm flex-wrap và gap */}
                      <div className="flex items-center">
                        <div>
                          <div className="font-bold text-lg">{sectionName}</div> {/* Bỏ format chữ hoa */}
                          <div className="text-sm text-gray-600">
                             {/* Mô tả khu vực - có thể lấy từ data nếu có */}
                             {sectionName.toLowerCase().includes("premium")
                              ? "Enhanced viewing experience"
                              : sectionName.toLowerCase().includes("vip")
                              ? "Exclusive luxury experience"
                              : "Standard match experience"}
                          </div>
                        </div>
                      </div>
                      <div className="text-lg font-bold text-blue-600">
                        £{price}
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-gray-500">Không có thông tin giá vé cho loại vé này.</p> // Thông báo nếu không có giá
            )}

             {/* Nút chuyển sang Bước 3 */}
             {currentSection && ( // Chỉ hiện nút Next khi đã chọn khu vực
               <div className="mt-6 flex justify-end">
                 <Link
                   to="/bookThree" // Đường dẫn đến Bước 3
                   className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
                 >
                   Tiếp tục
                 </Link>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookMatchStepTwo;