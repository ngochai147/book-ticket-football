import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useData } from "../context/DataContext";
import { FaCalendarAlt, FaClock, FaLocationArrow, FaArrowLeft } from "react-icons/fa";
import { Ticket } from "lucide-react";
import { fetchResults, fetchResultsLive } from "../../data/apiService";

function MatchDetailPage() {
  const { id } = useParams();
  const { heroData, leagueTableData, topScorersData } = useData();
  const location = useLocation();
  const passedMatchData = location.state?.matchData;

  const foundMatch = heroData.find((match) => match.id === parseInt(id))||passedMatchData;

  const [matchStats, setMatchStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getMatchStatus = () => {
    if (!foundMatch)
      return { status: "UNKNOWN", score: "0 - 0", statusDisplay: "UNKNOWN", statusClass: "text-gray-400" };

    const matchDate = new Date(`${foundMatch.date} ${foundMatch.time}`);
    const currentDate = new Date();

    const matchEndTime = new Date(matchDate);
    matchEndTime.setHours(matchEndTime.getHours() + 2);

    if (currentDate < matchDate) {
      return {
        status: "UPCOMING",
        score: "0 - 0",
        statusDisplay: "UPCOMING",
        statusClass: "text-blue-400",
      };
    } else if (currentDate >= matchDate && currentDate <= matchEndTime) {
      return {
        status: "LIVE",
        score: matchStats?.score || "0 - 0",
        statusDisplay: "LIVE",
        statusClass: "text-green-400 animate-pulse",
      };
    } else {
      return {
        status: "FINISHED",
        score: matchStats?.score || "0 - 0",
        statusDisplay: "FINISHED",
        statusClass: "text-gray-400",
      };
    }
  };

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        setLoading(true);

        const status = getMatchStatus().status;
        let matchData = null;

        if (status === "LIVE") {
          const liveMatches = await fetchResultsLive();
          matchData = liveMatches.find((m) => m.id === parseInt(id));
        } else if (status === "FINISHED") {
          const finishedMatches = await fetchResults();
          matchData = finishedMatches.find((m) => m.id === parseInt(id));
        }

        if (matchData) {
          setMatchStats({
            score: `${matchData.score?.fullTime?.home || 0} - ${matchData.score?.fullTime?.away || 0}`,
            homeStats: {
              possession: matchData.homeTeam?.statistics?.possession || "45%",
              shotsOnGoal: matchData.homeTeam?.statistics?.shotsOnTarget || 5,
              corners: matchData.homeTeam?.statistics?.corners || 4,
              yellowCards: matchData.homeTeam?.statistics?.yellowCards || 1,
            },
            awayStats: {
              possession: matchData.awayTeam?.statistics?.possession || "55%",
              shotsOnGoal: matchData.awayTeam?.statistics?.shotsOnTarget || 3,
              corners: matchData.awayTeam?.statistics?.corners || 3,
              yellowCards: matchData.awayTeam?.statistics?.yellowCards || 2,
            },
            goals: matchData.goals || [],
          });
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load match data");
        setLoading(false);
      }
    };

    if (foundMatch) {
      fetchMatchData();
    } else {
      setLoading(false);
      setError("Match not found");
    }
  }, [id, foundMatch]);

  if (!foundMatch) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-600">Match not found</div>
      </div>
    );
  }

  const matchStatus = getMatchStatus();
  const stadiumFileName = foundMatch.stadium
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "") + ".png";

  const findTeamStanding = (teamName) => {
    if (!leagueTableData) return null;
    return leagueTableData.find((item) => item.team === teamName);
  };

  const findTopScorers = (teamName, limit = 2) => {
    if (!topScorersData) return [];
    return topScorersData
      .filter((scorer) => scorer.team.split(" FC")[0] === teamName)
      .sort((a, b) => b.goals - a.goals)
      .slice(0, limit);
  };

  const team1Standing = findTeamStanding(foundMatch.team1);
  const team2Standing = findTeamStanding(foundMatch.team2);
  const team1TopScorers = findTopScorers(foundMatch.team1);
  const team2TopScorers = findTopScorers(foundMatch.team2);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-8">
        <div className="mb-8">
          <Link to="/matches" className="inline-flex items-center text-sm text-gray-600 hover:text-red-700 group font-medium">
            <FaArrowLeft className="mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
            Back to Fixtures
          </Link>
        </div>
        <div className="bg-gray-700 text-white rounded-xl shadow-xl p-8 mb-10 text-center">
          <p className="text-sm uppercase tracking-wider text-red-300 mb-2">premier league</p>
          <div className="flex items-center justify-center gap-8 mb-4">
            <div className="flex flex-col items-center w-auto">
              <img src={foundMatch.team1Logo} className="w-24 h-24 object-contain mb-2" alt={foundMatch.team1} />
              <h2 className="text-xl font-semibold text-center">{foundMatch.team1}</h2>
              {team1Standing && (
                <span className="text-xs mt-1 bg-gray-600 px-2 py-0.5 rounded">#{team1Standing.position}</span>
              )}
            </div>
            <div className="text-center">
              <span className="text-6xl font-bold">{matchStatus.score}</span>
              <p className={`mt-1 text-sm font-bold px-2 py-0.5 rounded ${matchStatus.statusClass}`}>
                {matchStatus.statusDisplay}
              </p>
            </div>
            <div className="flex flex-col items-center w-auto">
              <img src={foundMatch.team2Logo} className="w-24 h-24 object-contain mb-2" alt={foundMatch.team2} />
              <h2 className="text-xl font-semibold text-center">{foundMatch.team2}</h2>
              {team2Standing && (
                <span className="text-xs mt-1 bg-gray-600 px-2 py-0.5 rounded">#{team2Standing.position}</span>
              )}
            </div>
          </div>
          <div className="flex justify-center items-center gap-4 text-sm text-gray-300">
            <span className="flex items-center gap-1.5">
              <FaCalendarAlt /> {foundMatch.date}
            </span>
            <span className="flex items-center gap-1.5">
              <FaClock /> {foundMatch.time}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Match Details</h3>
            <div className="mb-5">
              <h4 className="text-sm font-medium text-gray-500 mb-1 uppercase tracking-wider">Venue</h4>
              <div className="flex items-center gap-2 text-lg text-gray-700">
                <FaLocationArrow className="text-red-500" />
                <span>{foundMatch.stadium}</span>
              </div>
            </div>

            {matchStatus.status === "UPCOMING" && (
              <div className="mb-5">
                <h4 className="text-sm font-medium text-gray-500 mb-1 uppercase tracking-wider">Preview</h4>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  {foundMatch.team1} welcomes {foundMatch.team2} to {foundMatch.stadium} in what promises to be an exciting Premier League clash.
                  {team1Standing && team2Standing
                    ? ` Currently sitting at #${team1Standing.position} and #${team2Standing.position} in the table respectively, both teams will be eager to secure all three points.`
                    : " Both teams will be looking to claim victory in this important fixture."}
                </p>
                <div className="space-y-2">
                  {(team1Standing || team2Standing) && (
                    <>
                      <h5 className="text-sm font-semibold text-gray-700">Team Form</h5>
                      <div className="flex justify-between text-sm">
                        <div className="w-1/2 pr-2">
                          <h6 className="font-medium">{foundMatch.team1}</h6>
                          {team1Standing ? (
                            <p className="text-gray-600">
                              Won: {team1Standing.won} | Draw: {team1Standing.draw} | Lost: {team1Standing.lost}
                            </p>
                          ) : (
                            <p className="text-gray-600">Stats not available</p>
                          )}
                        </div>
                        <div className="w-1/2 pl-2">
                          <h6 className="font-medium">{foundMatch.team2}</h6>
                          {team2Standing ? (
                            <p className="text-gray-600">
                              Won: {team2Standing.won} | Draw: {team2Standing.draw} | Lost: {team2Standing.lost}
                            </p>
                          ) : (
                            <p className="text-gray-600">Stats not available</p>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                  <h5 className="text-sm font-semibold text-gray-700 mt-3">Players to Watch</h5>
                  <div className="flex justify-between text-sm">
                    <div className="w-1/2 pr-2">
                      {team1TopScorers.length > 0 ? (
                        team1TopScorers.map((scorer, index) => (
                          <p key={index} className="text-gray-600">
                            {scorer.name} - {scorer.goals} goals
                          </p>
                        ))
                      ) : (
                        <p className="text-gray-600">Keep an eye on {foundMatch.team1}'s key players</p>
                      )}
                    </div>
                    <div className="w-1/2 pl-2">
                      {team2TopScorers.length > 0 ? (
                        team2TopScorers.map((scorer, index) => (
                          <p key={index} className="text-gray-600">
                            {scorer.name} - {scorer.goals} goals
                          </p>
                        ))
                      ) : (
                        <p className="text-gray-600">Keep an eye on {foundMatch.team2}'s key players</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {matchStatus.status !== "UPCOMING" && (
              <>
                <div className="mb-5">
                  <h4 className="text-sm font-medium text-gray-500 mb-1 uppercase tracking-wider">
                    {matchStatus.status === "LIVE" ? "Live Match Update" : "Match Summary"}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {matchStatus.status === "LIVE"
                      ? `The match between ${foundMatch.team1} and ${foundMatch.team2} is currently in progress at ${foundMatch.stadium}.`
                      : `${foundMatch.team1} faced ${foundMatch.team2} at ${foundMatch.stadium} with a final score of ${matchStatus.score}.`}
                  </p>
                </div>
                {matchStats && (
                  <div className="space-y-4 mt-6">
                    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Match Statistics</h4>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-right font-medium text-gray-700">{matchStats.homeStats.possession}</div>
                      <div className="text-center text-gray-500">Possession</div>
                      <div className="text-left font-medium text-gray-700">{matchStats.awayStats.possession}</div>
                      <div className="text-right font-medium text-gray-700">{matchStats.homeStats.shotsOnGoal}</div>
                      <div className="text-center text-gray-500">Shots on Target</div>
                      <div className="text-left font-medium text-gray-700">{matchStats.awayStats.shotsOnGoal}</div>
                      <div className="text-right font-medium text-gray-700">{matchStats.homeStats.corners}</div>
                      <div className="text-center text-gray-500">Corners</div>
                      <div className="text-left font-medium text-gray-700">{matchStats.awayStats.corners}</div>
                      <div className="text-right font-medium text-gray-700">{matchStats.homeStats.yellowCards}</div>
                      <div className="text-center text-gray-500">Yellow Cards</div>
                      <div className="text-left font-medium text-gray-700">{matchStats.awayStats.yellowCards}</div>
                    </div>
                    {matchStatus.status === "FINISHED" && matchStats.goals && matchStats.goals.length > 0 && (
                      <div className="mt-4">
                        <h5 className="text-sm font-semibold text-gray-700 mb-2">Goal Scorers</h5>
                        <div className="flex justify-between text-sm">
                          <div className="w-1/2 pr-2">
                            {matchStats.goals
                              .filter((goal) => goal.team.name.includes(foundMatch.team1))
                              .map((goal, index) => (
                                <p key={index} className="text-gray-600">
                                  {goal.scorer.name} ({goal.minute}')
                                </p>
                              ))}
                          </div>
                          <div className="w-1/2 pl-2 text-right">
                            {matchStats.goals
                              .filter((goal) => goal.team.name.includes(foundMatch.team2))
                              .map((goal, index) => (
                                <p key={index} className="text-gray-600">
                                  {goal.scorer.name} ({goal.minute}')
                                </p>
                              ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
              <img src={`/image-stadium/${stadiumFileName}`} className="w-full h-40 object-cover" alt={foundMatch.stadium} />
              <div className="p-4">
                <h4 className="font-semibold text-gray-800">{foundMatch.stadium}</h4>
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200 text-center">
              <h4 className="font-semibold text-gray-800 mb-3">Get Your Tickets!</h4>
              <p className="text-xs text-gray-600 mb-4">Don't miss out on this exciting match.</p>
              <Link className="flex-1" to={`/matches/bookticket/${foundMatch.id}`}>
                <button
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl py-3 px-6 flex items-center justify-center gap-2 font-medium transition-all duration-300 hover:shadow-md cursor-pointer"
                >
                  <Ticket size={18} />
                  <span>Book Tickets</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MatchDetailPage;