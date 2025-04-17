import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";
import BookingSteps from "./BookingSteps";

const BookMatchStepTwo = () => {
  const selectedSection = "";
  const [hoveredSection, setHoveredSection] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [currentSection, setCurrentSection] = useState(selectedSection);
  const { stadium, match, setSeat, typeSeat } = useData()

  const handleSectionSelect = (section) => {
    setSeat(section)
    setCurrentSection(section);
  };
  const navigate = useNavigate();
  return (
    <div className="space-y-6 bg-white p-16">
      <BookingSteps currentStep={2} />
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 flex justify-between items-center mb-4">
        <div className="flex items-center">
          <button className="text-blue-600 hover:bg-blue-100 p-1 rounded-full mr-3" onClick={() => navigate(-1)}>
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
            <div className="flex items-center gap-1 font-medium">
              <span>{match.team1}</span>
              <img
                src={match.team1Logo}
                className="w-6 h-6 object-contain"
              />
              <span className="mx-2 text-lg">vs</span>
              <img
                src={match.team2Logo}
                alt={match.team2}
                className="w-6 h-6 object-contain"
              />
              <span>{match.team2}</span>
            </div>
            <div className="text-sm text-gray-600">{match.date} • {match.time}</div>
          </div>
        </div>
        
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              Sơ đồ sân vận động
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
              <div className="absolute bg-gray-800 text-white p-3 rounded-lg text-sm w-64 z-10 shadow-lg transform transition-all duration-200 ease-in-out">
                Click on any section to view available seats
              </div>
            )}
            <div className="bg-gray-100 p-4 rounded-lg mb-4 h-64 flex items-center justify-center relative">
              <svg width="100%" height="100%" viewBox="0 0 400 300" className="w-full max-w-md mx-auto drop-shadow-xl">
                <path
                  d="M50,40 L350,40 Q360,40 360,50 L360,250 Q360,260 350,260 L50,260 Q40,260 40,250 L40,50 Q40,40 50,40"
                  fill="#1e293b"
                  className="filter drop-shadow-lg"
                />
                <path
                  d="M70,60 L330,60 Q340,60 340,70 L340,230 Q340,240 330,240 L70,240 Q60,240 60,230 L60,70 Q60,60 70,60"
                  fill="#15803d"
                  stroke="#0f172a"
                  strokeWidth="1"
                />
                <circle cx="200" cy="150" r="30" fill="none" stroke="#fff" strokeWidth="1.5" strokeDasharray="4 2" className="opacity-70" />
                <circle cx="200" cy="150" r="4" fill="#fff" className="opacity-70" />
                <line x1="200" y1="70" x2="200" y2="230" stroke="#fff" strokeWidth="1.5" strokeDasharray="4 2" className="opacity-70" />
                <rect
                  x="80"
                  y="100"
                  width="40"
                  height="100"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                  className="opacity-70"
                />
                <rect
                  x="280"
                  y="100"
                  width="40"
                  height="100"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                  className="opacity-70"
                />
                <g
                  onClick={() => handleSectionSelect("North Stand")}
                  onMouseEnter={() => setHoveredSection("North Stand")}
                  onMouseLeave={() => setHoveredSection(null)}
                  className="cursor-pointer transition-all duration-300"
                >
                  <path
                    d="M70,20 L330,20 Q340,20 340,30 L340,50 L60,50 L60,30 Q60,20 70,20"
                    fill={
                      hoveredSection === "North Stand"
                        ? "#60a5fa"
                        : currentSection === "North Stand" || currentSection === "North Premium"
                          ? "#3b82f6"
                          : "#e5e7eb"
                    }
                    className="transition-all duration-300 ease-in-out"
                  />
                  <text x="200" y="40" textAnchor="middle" fill="#1e293b" fontSize="14" fontWeight="bold">
                    North Stand
                  </text>
                </g>

                <g
                  onClick={() => handleSectionSelect("South Stand")}
                  onMouseEnter={() => setHoveredSection("South Stand")}
                  onMouseLeave={() => setHoveredSection(null)}
                  className="cursor-pointer"
                >
                  <path
                    d="M70,250 L330,250 Q340,250 340,260 L340,280 Q340,290 330,290 L70,290 Q60,290 60,280 L60,260 Q60,250 70,250"
                    fill={
                      hoveredSection === "South Stand"
                        ? "#60a5fa"
                        : currentSection === "South Stand" || currentSection === "South Premium"
                          ? "#3b82f6"
                          : "#e5e7eb"
                    }
                    className="transition-all duration-300 ease-in-out"
                  />
                  <text x="200" y="270" textAnchor="middle" fill="#1e293b" fontSize="14" fontWeight="bold">
                    South Stand
                  </text>
                </g>

                <g
                  onClick={() => handleSectionSelect("East Stand")}
                  onMouseEnter={() => setHoveredSection("East Stand")}
                  onMouseLeave={() => setHoveredSection(null)}
                  className="cursor-pointer"
                >
                  <path
                    d="M20,70 L50,70 L50,230 L20,230 Q10,230 10,220 L10,80 Q10,70 20,70"
                    fill={hoveredSection === "East Stand" ? "#60a5fa" : currentSection === "East Stand" ? "#3b82f6" : "#e5e7eb"}
                    className="transition-all duration-300 ease-in-out"
                  />
                  <text x="35" y="150" textAnchor="middle" fill="#1e293b" fontSize="14" fontWeight="bold" transform="rotate(-90, 35, 150)">
                    East Stand
                  </text>
                </g>

                <g
                  onClick={() => handleSectionSelect("West Stand")}
                  onMouseEnter={() => setHoveredSection("West Stand")}
                  onMouseLeave={() => setHoveredSection(null)}
                  className="cursor-pointer"
                >
                  <path
                    d="M350,70 L380,70 Q390,70 390,80 L390,220 Q390,230 380,230 L350,230 L350,70"
                    fill={hoveredSection === "West Stand" ? "#60a5fa" : currentSection === "West Stand" ? "#3b82f6" : "#e5e7eb"}
                    className="transition-all duration-300 ease-in-out"
                  />
                  <text x="365" y="150" textAnchor="middle" fill="#1e293b" fontSize="14" fontWeight="bold" transform="rotate(90, 365, 150)">
                    West Stand
                  </text>
                </g>
                <circle cx="200" cy="150" r="50" fill="none" stroke="#fff" strokeWidth="0.5" className="opacity-30" />
                <circle cx="200" cy="150" r="70" fill="none" stroke="#fff" strokeWidth="0.5" className="opacity-20" />
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
            {stadium?.ticketPrices?.[typeSeat] ? (
              Object.entries(stadium.ticketPrices[typeSeat])
                .slice(0, 4)
                .map(([sectionName, price]) => (
                  <Link to="/bookThree">
                    <div
                      key={sectionName}
                      className={`border rounded-lg mt-3 p-4 cursor-pointer hover:bg-blue-50 transition-colors ${currentSection === sectionName ? "border-blue-500 bg-blue-50" : "border-gray-200"}`} // Thêm border-gray-200
                      onClick={() => handleSectionSelect(sectionName)}
                    >
                      <div className="flex justify-between items-center flex-wrap gap-2">
                        <div className="flex items-center">
                          <div>
                            <div className="font-bold text-lg">{sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}</div>
                            <div className="text-sm text-gray-600">
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
                    </div></Link>
                ))
            ) : (
              <p className="text-gray-500">Không có thông tin giá vé cho loại vé này.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookMatchStepTwo;