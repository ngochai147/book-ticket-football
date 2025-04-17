import { useState, useEffect, createContext, useContext } from "react";
import { fetchTeams, fetchMatches, fetchShopItems, fetchLeagues, fetchScores, fetchResultsLive, fetchResults } from "../data/apiService";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [heroData, setHeroData] = useState([]);
  const [leagueTableData, setLeagueTableData] = useState([]);
  const [topScorersData, setTopScorersData] = useState([]);
  const [featuredTeamsData, setFeaturedTeamsData] = useState([]);
  const [shopItems, setShopItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stadium, setStadium] = useState(null);
  const [match, setMatch] = useState(null);
  const [typeSeat, setTypeSeat] = useState(null);
  const [seat, setSeat] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState(null);
  const [filter, setFilter] = useState("upcoming");
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [allMatches,setAllMatches]=useState([])

  
  const [latestNewsData] = useState([
    { id: 1, title: "Transfer Deadline Day", date: "10 Sep 2024", summary: "A frantic end...", category: "Transfers", imageUrl: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=870&auto=format&fit=crop" },
    { id: 2, title: "Tactical Shifts", date: "12 Sep 2024", summary: "Analysing...", category: "Analysis", imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=870&auto=format&fit=crop" },
  ]);

  useEffect(() => {
    const loadFeaturedTeams = async () => {
      const teams = await fetchTeams();
      const mappedTeams = teams.map((team) => ({
        name: team.name,
        stadium: team.venue,
        logo: team.crest,
      }));
      setFeaturedTeamsData(mappedTeams);
    };
    loadFeaturedTeams();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const teams = await fetchTeams();
        const matches = await fetchMatches();

        const teamVenues = {};
        teams.forEach((team) => {
          teamVenues[team.name] = team.venue;
        });

        const heroMatches = matches.map((match) => ({
          id: match.id,
          team1: match.homeTeam.name.split(" FC")[0],
          team2: match.awayTeam.name.split(" FC")[0],
          date: new Date(match.utcDate).toLocaleDateString(),
          stadium: teamVenues[match.homeTeam.name] || "TBC",
          time: new Date(match.utcDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          team1Logo: match.homeTeam.crest,
          team2Logo: match.awayTeam.crest,
          utcDate: match.utcDate,
        }));

        setHeroData(heroMatches);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const loadMatchesFromAPI = async () => {
      try {
        const live = await fetchResultsLive();
        const results = await fetchResults();
        const teams = await fetchTeams();
  
        const teamVenues = {};
        teams.forEach((team) => {
          teamVenues[team.name] = team.venue;
        });
  
        const mappedMatches = [...live, ...results].map((match) => ({
          id: match.id,
          team1: match.homeTeam.name.split(" FC")[0],
          team2: match.awayTeam.name.split(" FC")[0],
          date: new Date(match.utcDate).toLocaleDateString(),
          time: new Date(match.utcDate).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          stadium: teamVenues[match.homeTeam.name] || "TBC",
          team1Logo: match.homeTeam.crest,
          team2Logo: match.awayTeam.crest,
          score: `${match.score.fullTime.home} - ${match.score.fullTime.away}`,
          minute: match.minute || null,
          utcDate: match.utcDate,
          status: match.status,
        }));
  
        setAllMatches(mappedMatches);
      } catch (error) {
        console.error("Error loading match data:", error);
      }
    };
  
    loadMatchesFromAPI();
  }, []);
  useEffect(() => {
    const filterMatches = () => {
      let filtered = [];
  
      if (filter === "results") {
        filtered = allMatches;
      } else if (filter === "upcoming") {
        filtered = heroData;
      }
  
      filtered = filtered.filter((match) => {
        return (
          searchTerm === "" ||
          match.team1.toLowerCase().includes(searchTerm.toLowerCase()) ||
          match.team2.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
  
      filtered.sort((a, b) => new Date(b.utcDate) - new Date(a.utcDate));
      setFilteredMatches(filtered);
    };
  
    filterMatches();
  }, [filter, searchTerm, allMatches, heroData]);
    

  useEffect(() => {
    const loadLeagues = async () => {
      const standings = await fetchLeagues();
      const mappedStandings = standings[0].table.map((league) => ({
        position: league.position,
        team: league.team.name.split(" FC")[0],
        played: league.playedGames,
        points: league.points,
        logo: league.team.crest,
        won: league.won,
        draw: league.draw,
        lost: league.lost,
      }));
      setLeagueTableData(mappedStandings);
    };
    loadLeagues();
  }, []);

  useEffect(() => {
    const loadTopScores = async () => {
      const scorers = await fetchScores();
      const mappedScorers = scorers.map((player, index) => ({
        rank: index + 1,
        name: player.player.name,
        team: player.team.name,
        goals: player.goals,
        logo: player.team.crest,
      }));
      setTopScorersData(mappedScorers);
    };
    loadTopScores();
  }, []);

  useEffect(() => {
    const loadShopItems = async () => {
      const products = await fetchShopItems();
      const mappedProducts = products.slice(0, 4).map((product) => ({
        id: product.id,
        name: product.title,
        price: `£${product.price}`,
        imageUrl: product.image,
        category: product.category,
      }));
      setShopItems(mappedProducts);
    };
    loadShopItems();
  }, []);


  

  const matchesPerPage = 3;
  const indexOfLastMatch = currentPage * matchesPerPage;
  const indexOfFirstMatch = indexOfLastMatch - matchesPerPage;
  const currentMatches = filteredMatches.slice(indexOfFirstMatch, indexOfLastMatch);
  const totalPages = Math.ceil(filteredMatches.length / matchesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderPaginationButtons = () => {
    const pageNumbers = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      if (currentPage <= 3) {
        pageNumbers.push(2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push("...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push("...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return pageNumbers.map((pageNumber, index) =>
      pageNumber === "..." ? (
        <span key={`ellipsis-${index}`} className="w-8 h-8 flex items-center justify-center text-gray-400">
          ...
        </span>
      ) : (
        <button
          key={pageNumber}
          onClick={() => setCurrentPage(pageNumber)}
          className={`w-8 h-8 flex items-center justify-center rounded-full ${
            currentPage === pageNumber ? "bg-red-600 text-white font-medium" : "text-gray-700 hover:bg-red-100"
          }`}
        >
          {pageNumber}
        </button>
      )
    );
  };

  return (
    <DataContext.Provider
      value={{
        heroData,
        leagueTableData,
        topScorersData,
        featuredTeamsData,
        shopItems,
        latestNewsData,
        loading,
        stadium,
        setStadium,
        match,
        setMatch,
        typeSeat,
        setTypeSeat,
        seat,
        setSeat,
        quantity,
        setQuantity,
        formData,
        setFormData,
        filter,
        setFilter,
        filteredMatches,
        currentPage,
        setCurrentPage,
        searchTerm,
        setSearchTerm,
        currentMatches,
        totalPages,
        handleNextPage,
        handlePrevPage,
        renderPaginationButtons,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);