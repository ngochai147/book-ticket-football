import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import axios from 'axios';
import {
  FaTicketAlt,
  FaFutbol,
  FaCalendarAlt,
  FaLocationArrow,
  FaClock,
  FaTrophy,
  FaEnvelope,
  FaShoppingCart
} from 'react-icons/fa';

function Home() {
  const [heroData, setHeroData] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [leagueTableData, setLeagueTableData] = useState([]);
  const [topScorersData, setTopScorersData] = useState([]);
  const [featuredTeamsData, setFeaturedTeamsData] = useState([]);
  const [shopItems, setShopItems] = useState([]);
  const [latestNewsData] = useState([
    { id: 1, title: 'Transfer Deadline Day', date: '10 Sep 2024', summary: 'A frantic end...', category: 'Transfers', imageUrl: 'https://via.placeholder.com/400x250' },
    { id: 2, title: 'Tactical Shifts', date: '12 Sep 2024', summary: 'Analysing...', category: 'Analysis', imageUrl: 'https://via.placeholder.com/400x250' }
  ]);
  useEffect(() => {
    const fetchTeams = async () => {
      const teamsResponse = await axios.get(`/api/v4/competitions/PL/teams`, {
        headers: { 'X-Auth-Token': API_KEY }
      });

      const teams = teamsResponse.data.teams.map(team => ({
        name: team.name,
        stadium: team.venue,
        logo: team.crest,
        description: `Home stadium: ${team.venue}`
      }));

      setFeaturedTeamsData(teams.slice(0, 5)); // Lấy 5 đội đầu tiên
    };

    fetchTeams();
  }, []);
  useEffect(() => {
    const fetchShopItems = async () => {
      try {
        const shopResponse = await axios.get(`https://sneaker-api-htx.herokuapp.com/sneakers`);
  
        const products = shopResponse.data.slice(10, 14).map(product => ({
          id: product.id,
          name: product.name,
          price: `£${product.retailPrice || 'N/A'}`,
          imageUrl: product.image.original,
          category: product.brand
        }));
  
        setShopItems(products);
      } catch (error) {
        console.error("Error fetching sneaker data:", error);
      }
    };
  
    fetchShopItems();
  }, []);
  
  const [loading, setLoading] = useState(true);

  const API_KEY = '47ba1a2d82874ebdb51137ca85c05bf4'; // Thay bằng API Key thực của bạn từ Football-Data.org

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Hero Section (Trận đấu nổi bật)
        // Bước 1: Lấy danh sách đội bóng và sân vận động
        const teamsResponse = await axios.get(`/api/v4/competitions/PL/teams`, {
          headers: { 'X-Auth-Token': API_KEY }
        });
        const teamVenues = {};
        teamsResponse.data.teams.forEach(team => {
          teamVenues[team.name] = team.venue; // Lưu sân vận động theo tên đội
        });

        // Bước 2: Lấy danh sách trận đấu sắp diễn ra
        const matchesResponse = await axios.get(`/api/v4/competitions/PL/matches`, {
          headers: { 'X-Auth-Token': API_KEY },
          params: { status: 'SCHEDULED', limit: 2 }
        });

        const heroMatches = matchesResponse.data.matches.map(match => ({
          team1: match.homeTeam.name,
          team2: match.awayTeam.name,
          date: new Date(match.utcDate).toLocaleDateString(),
          stadium: teamVenues[match.homeTeam.name] || 'TBC', // Lấy sân nhà của đội chủ nhà
          time: new Date(match.utcDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          team1Logo: match.homeTeam.crest,
          team2Logo: match.awayTeam.crest
        }));

        setHeroData(heroMatches);

        // Upcoming Matches
        const upcomingResponse = await axios.get(`/api/v4/competitions/PL/matches`, {
          headers: { 'X-Auth-Token': API_KEY },
          params: { status: 'SCHEDULED', limit: 5 }
        });
        const upcoming = upcomingResponse.data.matches.map(match => ({
          team1: match.homeTeam.name,
          team2: match.awayTeam.name,
          date: new Date(match.utcDate).toLocaleDateString(),
          time: new Date(match.utcDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          stadium: teamVenues[match.homeTeam.name] || 'TBC', // Lấy sân nhà của đội chủ nhà
          logo1: match.homeTeam.crest,
          logo2: match.awayTeam.crest
        }));

        setUpcomingMatches(upcoming);


        // League Table
        const standingsResponse = await axios.get(`/api/v4/competitions/PL/standings`, {
          headers: { 'X-Auth-Token': API_KEY }
        });
        const standings = standingsResponse.data.standings[0].table.map(team => ({
          position: team.position,
          team: team.team.name,
          played: team.playedGames,
          points: team.points,
          logo: team.team.crest
        }));
        setLeagueTableData(standings.slice(0, 5));

        // Top Scorers
        const scorersResponse = await axios.get(`/api/v4/competitions/PL/scorers `, {
          headers: { 'X-Auth-Token': API_KEY }
        });
        const scorers = scorersResponse.data.scorers.map((player, index) => ({
          rank: index + 1,
          name: player.player.name,
          team: player.team.name,
          goals: player.goals,
          logo: player.team.crest
        }));
        setTopScorersData(scorers.slice(0, 3));

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [API_KEY]);

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[700px] overflow-hidden">
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          navigation={true}
          className="h-full"
        >
          {heroData.map((match, index) => (
            <SwiperSlide key={index}>
              <div
                className={`relative h-full flex items-center bg-gradient-to-r ${match.backgroundGradient}`}
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${match.backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center text-center md:text-left">
                  <div className="w-full md:w-1/2 mb-10 md:mb-0">
                    <div className="flex items-center justify-center md:justify-start mb-4">
                      <FaFutbol className="text-white mr-3 text-3xl animate-pulse" />
                      <span className="text-white text-xl font-semibold">Premier League</span>
                    </div>
                    <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                      {match.team1} vs {match.team2}
                    </h1>
                    <div className="space-y-3 mb-8 text-white">
                      <div className="flex items-center justify-center md:justify-start">
                        <FaCalendarAlt className="mr-3 text-red-400" />
                        <span>{match.date} at {match.time}</span>
                      </div>
                      <div className="flex items-center justify-center md:justify-start">
                        <FaLocationArrow className="mr-3 text-red-400" />
                        <span>{match.stadium}</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                      <button className="bg-red-600 text-white px-8 py-3 rounded-full flex items-center justify-center hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg">
                        <FaTicketAlt className="mr-2" /> Book Tickets
                      </button>
                      <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white/10 transition-all transform hover:scale-105">
                        Match Details
                      </button>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 flex justify-center items-center space-x-4 sm:space-x-10">
                    <div className="flex flex-col items-center text-center">
                      <img src={match.team1Logo} alt={`${match.team1} logo`} className="w-32 h-32 sm:w-40 sm:h-40 lg:w-56 lg:h-56 object-contain mb-2 sm:mb-4 transform hover:scale-110 transition-transform" />
                      <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">{match.team1}</h2>
                    </div>
                    <div className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold animate-pulse">VS</div>
                    <div className="flex flex-col items-center text-center">
                      <img src={match.team2Logo} alt={`${match.team2} logo`} className="w-32 h-32 sm:w-40 sm:h-40 lg:w-56 lg:h-56 object-contain mb-2 sm:mb-4 transform hover:scale-110 transition-transform" />
                      <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">{match.team2}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Upcoming Matches Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center">Upcoming Matches</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingMatches.slice(0, 6).map((match, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200">
                <div className="flex items-center justify-around mb-4 text-center">
                  <div className="flex flex-col items-center w-1/3">
                    {match.logo1 && <img src={match.logo1} alt={match.team1} className="h-12 w-12 object-contain mb-1" />}
                    <h3 className="text-lg font-semibold text-gray-800">{match.team1}</h3>
                  </div>
                  <span className="text-gray-600 font-bold text-xl mx-2">vs</span>
                  <div className="flex flex-col items-center w-1/3">
                    {match.logo2 && <img src={match.logo2} alt={match.team2} className="h-12 w-12 object-contain mb-1" />}
                    <h3 className="text-lg font-semibold text-gray-800">{match.team2}</h3>
                  </div>
                </div>
                <div className="space-y-2 text-gray-600 border-t pt-4 mt-4">
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-3 text-red-500 flex-shrink-0" />
                    <span>{match.date}</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="mr-3 text-red-500 flex-shrink-0" />
                    <span>{match.time}</span>
                  </div>
                  <div className="flex items-center">
                    <FaLocationArrow className="mr-3 text-red-500 flex-shrink-0" />
                    <span>{match.stadium}</span>
                  </div>
                </div>
                <button className="mt-5 w-full bg-red-500 text-white py-2.5 rounded-full hover:bg-red-600 transition-colors duration-300 font-medium">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* League Table & Top Scorers Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-3 bg-gray-50 p-5 md:p-6 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-800 mb-5 flex items-center">
                <FaTrophy className="mr-3 text-yellow-500 text-xl" /> League Standings
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[400px] text-sm">
                  <thead>
                    <tr className="text-left text-gray-500 uppercase tracking-wider text-xs border-b border-gray-300">
                      <th className="py-2 px-3 font-medium">Pos</th>
                      <th className="py-2 px-3 font-medium" colSpan={2}>Team</th>
                      <th className="py-2 px-3 font-medium text-center">P</th>
                      <th className="py-2 px-3 font-medium text-center">Pts</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {leagueTableData.map((row, index) => (
                      <tr key={row.position} className={`hover:bg-gray-100 ${index < 4 ? 'font-medium' : ''}`}>
                        <td className={`py-2.5 px-3 text-center ${index < 4 ? 'border-l-4 border-blue-500' : 'border-l-4 border-transparent'}`}>{row.position}</td>
                        <td className="py-2.5 px-1 text-right">
                          <img src={row.logo} alt={row.team} className="h-5 w-5 inline-block object-contain" />
                        </td>
                        <td className="py-2.5 px-2 text-gray-800">{row.team}</td>
                        <td className="py-2.5 px-3 text-center text-gray-600">{row.played}</td>
                        <td className={`py-2.5 px-3 text-center font-semibold ${index < 4 ? 'text-gray-900' : 'text-gray-700'}`}>{row.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <a href="#" className="mt-4 inline-block text-sm text-red-600 hover:text-red-800 font-medium group">
                View Full Table <span className="transition-transform duration-200 inline-block group-hover:translate-x-1">→</span>
              </a>
            </div>

            <div className="lg:col-span-2 bg-gray-800 text-white p-5 md:p-6 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold mb-5 flex items-center">
                <FaFutbol className="mr-3 text-red-400 text-xl" /> Top Goalscorers
              </h3>
              <ul className="space-y-3">
                {topScorersData.map((player) => (
                  <li key={player.rank} className="flex items-center justify-between bg-gray-700 bg-opacity-50 p-3 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-300 text-lg w-6 text-center">{player.rank}.</span>
                      <div>
                        <p className="font-semibold text-sm text-white leading-tight">{player.name}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <img src={player.logo} alt={player.team} className="h-4 w-4 object-contain" />
                          <span>{player.team}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-lg text-red-400">{player.goals}</span>
                      <p className="text-xs text-gray-400">Goals</p>
                    </div>
                  </li>
                ))}
              </ul>
              <a href="#" className="mt-4 inline-block text-sm text-red-400 hover:text-red-300 font-medium group">
                View All Stats <span className="transition-transform duration-200 inline-block group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Teams Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center">Explore Teams</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTeamsData.slice(0,3).map((team, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center border border-gray-200">
                <img src={team.logo} alt={`${team.name} logo`} className="w-24 h-24 object-contain mb-4" />
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{team.name}</h3>
                <p className="text-gray-500 mb-1 text-sm">{team.stadium}</p>
                <p className="text-gray-600 mb-4 flex-grow">{team.description}</p>
                <button className="mt-auto w-full bg-gray-700 text-white py-2 px-4 rounded-full hover:bg-gray-900 transition-colors duration-300 text-sm font-medium">
                  Team Profile
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center tracking-tight">Latest News & Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {latestNewsData.map((news, index) => (
              <div
                key={news.id}
                className={`bg-gray-50 rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl border border-gray-200 flex flex-col group
                           ${index === 0 ? 'md:col-span-2 lg:flex-row' : 'lg:col-span-1'}`}
              >
                <div className={` ${index === 0 ? 'lg:w-1/2' : ''} flex-shrink-0`}>
                  <img src={news.imageUrl} alt={news.title} className={`w-full h-48 ${index === 0 ? 'lg:h-full' : ''} object-cover group-hover:opacity-90 transition-opacity`} />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-red-600">{news.category}</span>
                    <span className="text-xs text-gray-500 ml-2">{news.date}</span>
                  </div>
                  <h3 className={`font-semibold text-gray-800 mb-2 leading-tight ${index === 0 ? 'text-lg md:text-xl' : 'text-base'}`}>{news.title}</h3>
                  <p className={`text-sm text-gray-600 mb-4 flex-grow ${index === 0 ? '' : 'hidden md:block'}`}>{news.summary}</p>
                  <a href="#" className="mt-auto text-sm text-red-600 hover:text-red-800 font-medium self-start group/link">
                    Read More <span className="transition-transform duration-200 inline-block group-hover/link:translate-x-1">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button className="bg-gray-800 text-white px-6 py-2.5 rounded-md text-sm font-semibold hover:bg-black transition-colors shadow-md">
              Browse All News
            </button>
          </div>
        </div>
      </section>

      {/* Fan Shop Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center">Fan Shop</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {shopItems.map((item) => (
              <div key={item.id} className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col border border-gray-200">
                <img src={item.imageUrl} alt={item.name} className="w-full h-56 object-cover" />
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 flex-grow">{item.name}</h3>
                  <p className="text-xl font-bold text-red-600 mb-4">{item.price}</p>
                  <button className="mt-auto w-full bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition-colors duration-300 flex items-center justify-center font-medium">
                    <FaShoppingCart className="mr-2" /> View Product
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="bg-gray-800 text-white px-8 py-3 rounded-full hover:bg-black transition-all transform hover:scale-105 shadow-lg font-semibold">
              Visit Full Shop
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="py-16 bg-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FaEnvelope className="text-5xl text-red-400 mb-4 mx-auto" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated!</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to get the latest Premier League news, match updates, and exclusive offers delivered straight to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-grow px-4 py-3 border rounded-full text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-0"
              required
            />
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-colors duration-300 font-semibold"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Home;