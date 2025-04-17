import React, { useEffect } from "react";
import { MapPin, Info, Home, Check } from 'lucide-react';
import { useParams, useNavigate } from "react-router-dom";
import BookingSteps from './BookingSteps';
import { useData } from "../context/DataContext";

const seatTypes = [
  {
    id: 'standard',
    name: 'Standard',
    description: 'Regular seating with good view',
    features: ['Basic view of the pitch', 'Standard seating', 'Access to general facilities'],
    icon: '🪑'
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Enhanced view with extra leg room and premium services',
    features: ['Excellent view of the pitch', 'Extra leg room', 'Access to premium lounge', 'Free match program'],
    icon: '💺'
  },
  {
    id: 'vip',
    name: 'VIP',
    description: 'Luxury experience with the best views and exclusive services',
    features: ['Best seats in the stadium', 'Exclusive VIP lounge access', 'Complimentary food & drinks', 'Private entrance', 'Meet players opportunity'],
    icon: '👑'
  }
];

const BookMatchStepOne = () => {
  const { id } = useParams();
  const { heroData, setStadium, stadium, setMatch, setTypeSeat } = useData();
  const foundMatch = heroData.find(match => match.id === parseInt(id));
  const navigate = useNavigate();

  if (!foundMatch) {
    return <div className="px-40 py-16 bg-gray-100 text-center">Match not found.</div>;
  }

  const stadiumFileName = foundMatch.stadium.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '') + '.png';

  const handleSeatSelect = (seat) => {
    setTypeSeat(seat);
    navigate('/bookTwo');
  };

  const fetchCapacity = async () => {
    const response = await fetch('/data/dataStadium.json');
    return await response.json();
  };

  const getStadiumData = async () => {
    try {
      const data = await fetchCapacity();
      const foundStadium = data.find(
        item => item.name.toLowerCase() === foundMatch.stadium.toLowerCase()
      );
      if (foundStadium) {
        setStadium(foundStadium);
        setMatch(foundMatch);
      }
    } catch (error) {
      console.error('Error fetching stadium data:', error);
    }
  };

  useEffect(() => {
    getStadiumData();
  }, []);

  const getTicketAvailability = (ticketType) => {
    if (!stadium?.ticketPrices?.[ticketType]) return 'N/A';
    const { availableTickets = 0, totalTickets = 0 } = stadium.ticketPrices[ticketType];
    return totalTickets > 0 ? `${availableTickets}/${totalTickets}` : 'Sold Out';
  };

  const isLowAvailability = (ticketType) => {
    if (!stadium?.ticketPrices?.[ticketType]) return false;
    const { availableTickets = 0, totalTickets = 0 } = stadium.ticketPrices[ticketType];
    return totalTickets > 0 && availableTickets / totalTickets < 0.1;
  };

  return (
    <div className="px-40 py-16 bg-gray-100">
      <BookingSteps currentStep={1} />
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
              <span>{foundMatch.team1}</span>
              <img src={foundMatch.team1Logo} className="w-6 h-6 object-contain" />
              <span className="mx-2 text-lg">vs</span>
              <img src={foundMatch.team2Logo} alt={foundMatch.team2} className="w-6 h-6 object-contain" />
              <span>{foundMatch.team2}</span>
            </div>
            <div className="text-sm text-gray-600">{foundMatch.date} • {foundMatch.time}</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <div className="bg-white p-4 rounded-lg shadow-md h-full">
            <div className="flex justify-center mb-4">
              <img src={`/image-stadium/${stadiumFileName}`} className="rounded-lg" />
            </div>
            <h3 className="font-bold text-lg mb-2">{foundMatch.stadium}</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <div className="flex items-center gap-1">
                <MapPin size={18} />
                {stadium ? <span>Address: {stadium.address}</span> : <span>Loading address...</span>}
              </div>
              <div className="flex items-center gap-1">
                <Home size={18} />
                {stadium ? <span>Capacity: {stadium.capacity}</span> : <span>Loading capacity...</span>}
              </div>
              <div className="flex items-center gap-1">
                <Info size={18} />
                <span>Info: Gates open 2 hours before the match</span>
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold mb-4">Select Seat Type</h2>
          <div className="space-y-4">
            {seatTypes.map((seat) => (
              <div
                key={seat.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-sm hover:scale-105 ${
                  stadium?.ticketPrices?.[seat.id] ? 'hover:bg-blue-50 border-blue-500' : 'opacity-50 cursor-not-allowed'
                }`}
                onClick={() => stadium?.ticketPrices?.[seat.id] && handleSeatSelect(seat.id)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{seat.icon}</span>
                    <div>
                      <div className="font-bold text-lg">{seat.name}</div>
                      <div className="text-sm text-gray-600">{seat.description}</div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 pl-10">
                  <div className="text-sm font-medium mb-1">Features:</div>
                  <ul className="text-sm text-gray-600">
                    {seat.features.map((feature, index) => (
                      <li key={index} className="flex items-center mb-1 gap-1">
                        <Check size={18} className="text-green-400 mt-1" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookMatchStepOne;