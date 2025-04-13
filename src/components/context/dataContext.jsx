import { useState,useContext,createContext } from "react";

const dataContext=createContext()
export const DataProvider=({children})=>{
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
        const response = await axios.get('https://fakestoreapi.com/products');

        const products = response.data.slice(0, 4).map(product => ({
          id: product.id,
          name: product.title, // field mới
          price: `£${product.price}`,
          imageUrl: product.image,
          category: product.category
        }));

        setShopItems(products);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchShopItems();
  }, []);

  const [loading, setLoading] = useState(true);

  const API_KEY = '47ba1a2d82874ebdb51137ca85c05bf4';

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
        //test
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
          team1: match.homeTeam.name.split(" FC")[0],
          team2: match.awayTeam.name.split(" FC")[0],
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
    return <div className="text-center text-white py-20">Loading...</div>;
  }
  return(
    <dataContext.Provider value={{heroData,upcomingMatches,leagueTableData,topScorersData,featuredTeamsData,shopItems,latestNewsData}}>
      {children}
    </dataContext.Provider>
  )
}

export const useData=()=>useContext(dataContext)