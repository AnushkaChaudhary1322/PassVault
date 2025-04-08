import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Scoreboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const teams = location.state?.teams;

  useEffect(() => {
    if (!teams) {
      navigate("/score"); 
    }
  }, [teams, navigate]);

  const teamA = teams?.A.players || [];
  const teamB = teams?.B.players || [];
  const teamAName = teams?.A.name || "Team A";
  const teamBName = teams?.B.name || "Team B";

  const [teamAScore, setTeamAScore] = useState(0);
  const [teamBScore, setTeamBScore] = useState(0);
  const [battingTeam, setBattingTeam] = useState("A");
  const [battingOrder, setBattingOrder] = useState([...teamA]);
  const [batsmen, setBatsmen] = useState([battingOrder[0], battingOrder[1]]);
  const [batsmenScores, setBatsmenScores] = useState([0, 0]);
  const [outPlayersA, setOutPlayersA] = useState([]);
  const [outPlayersB, setOutPlayersB] = useState([]);
  const [currentBatsman, setCurrentBatsman] = useState(0);
  const [nextPlayerIndex, setNextPlayerIndex] = useState(2);
  const [target, setTarget] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const addRuns = (runs) => {
    if (gameOver) return;

    if (battingTeam === "A") {
      setTeamAScore((prev) => prev + runs);
    } else {
      const newScore = teamBScore + runs;
      setTeamBScore(newScore);
      if (newScore >= target) {
        setGameOver(true);
        alert(`${teamBName} wins! 🎉`);
        return;
      }
    }

    const updatedScores = [...batsmenScores];
    updatedScores[currentBatsman] += runs;
    setBatsmenScores(updatedScores);

    if (runs % 2 !== 0) {
      setCurrentBatsman((prev) => (prev === 0 ? 1 : 0));
    }
  };

  const handleOut = () => {
    if (gameOver) return;

    if (nextPlayerIndex >= battingOrder.length) {
      if (battingTeam === "A") {
        alert(`All out! ${teamBName} needs ${teamAScore + 1} to win.`);
        setTarget(teamAScore + 1);
        switchInnings();
      } else {
        alert(`All out! ${teamAName} wins! 🎉`);
        setGameOver(true);
      }
      return;
    }

    const outBatsman = batsmen[currentBatsman];
    if (battingTeam === "A") {
      setOutPlayersA([...outPlayersA, outBatsman]);
    } else {
      setOutPlayersB([...outPlayersB, outBatsman]);
    }

    const newBatsman = battingOrder[nextPlayerIndex];
    setNextPlayerIndex((prev) => prev + 1);

    setBatsmen((prev) =>
      currentBatsman === 0 ? [newBatsman, prev[1]] : [prev[0], newBatsman]
    );
    setBatsmenScores((prev) =>
      currentBatsman === 0 ? [0, prev[1]] : [prev[0], 0]
    );
    setCurrentBatsman(1);
  };

  const switchInnings = () => {
    setBattingTeam("B");
    setBattingOrder([...teamB]);
    setBatsmen([teamB[0], teamB[1]]);
    setBatsmenScores([0, 0]);
    setNextPlayerIndex(2);
  };

  const handleWideBall = () => {
    addRuns(1);
    setCurrentBatsman((prev) => (prev === 0 ? 1 : 0));
  };

  const handleNoBall = () => {
    addRuns(1);
    setCurrentBatsman((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <div className="w-full flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">🏏 Cricket Scoreboard</h1>

      {gameOver ? (
        <h2 className="text-3xl font-bold text-yellow-400 mb-6">Game Over!</h2>
      ) : (
        <h2 className="text-3xl font-bold mb-6">
          {battingTeam === "A" ? `${teamAName} Batting` : `${teamBName} Batting`}
        </h2>
      )}

      <div className="flex w-full max-w-screen-xl justify-between">
        {/* Team A */}
        <div className="bg-gray-700 p-6 rounded-xl shadow-lg w-1/3">
          <h2 className="text-2xl font-semibold text-center mb-3">{teamAName}</h2>
          {teamA.map((player, index) => (
            <p key={index} className={`py-1 text-lg ${
              outPlayersA.includes(player) ? "text-red-500 line-through" : 
              batsmen.includes(player) && battingTeam === "A" ? "text-green-400 font-bold" : "text-white"
            }`}>
              {player} {batsmen.includes(player) && battingTeam === "A" && "🟢"}
            </p>
          ))}
          <p className="mt-3 text-lg text-center font-bold">Score: {teamAScore}</p>
        </div>

        {/* Center Score Section */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg flex flex-col items-center w-1/3">
          <h2 className="text-3xl font-bold mb-3">
            {battingTeam === "A" ? `${teamAName} Score: ${teamAScore}` : `${teamBName} Score: ${teamBScore}`}
          </h2>

          {target && battingTeam === "B" && (
            <p className="text-xl font-bold text-yellow-400 mb-3">Target: {target}</p>
          )}

          <div className="text-lg mb-3">
            <p className="text-green-400 font-bold">
              {batsmen[0]} - {batsmenScores[0]} runs {currentBatsman === 0 && "🟢"}
            </p>
            <p className="text-green-400 font-bold">
              {batsmen[1]} - {batsmenScores[1]} runs {currentBatsman === 1 && "🟢"}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            {[1, 2, 3, 4, 6].map((run) => (
              <button key={run} onClick={() => addRuns(run)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                {run} Run{run > 1 ? "s" : ""}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <button onClick={handleWideBall} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg">
              Wide Ball (1)
            </button>
            <button onClick={handleNoBall} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg">
              No Ball (1)
            </button>
          </div>

          <button onClick={handleOut} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
            Out
          </button>
        </div>

        {/* Team B */}
        <div className="bg-gray-700 p-6 rounded-xl shadow-lg w-1/3">
          <h2 className="text-2xl font-semibold text-center mb-3">{teamBName}</h2>
          {teamB.map((player, index) => (
            <p key={index} className={`py-1 text-lg ${
              outPlayersB.includes(player) ? "text-red-500 line-through" : 
              batsmen.includes(player) && battingTeam === "B" ? "text-green-400 font-bold" : "text-white"
            }`}>
              {player} {batsmen.includes(player) && battingTeam === "B" && "🟢"}
            </p>
          ))}
          <p className="mt-3 text-lg text-center font-bold">Score: {teamBScore}</p>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
