import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Scoreboard = () => {
  const navigate = useNavigate();

  const [teamA, setTeamA] = useState([]);
  const [teamB, setTeamB] = useState([]);
  const [teamAName, setTeamAName] = useState("Team A");
  const [teamBName, setTeamBName] = useState("Team B");
  const [teamAScore, setTeamAScore] = useState(0);
  const [teamBScore, setTeamBScore] = useState(0);
  const [battingTeam, setBattingTeam] = useState("A");
  const [battingOrder, setBattingOrder] = useState([]);
  const [batsmen, setBatsmen] = useState([]);
  const [batsmenScores, setBatsmenScores] = useState([0, 0]);
  const [outPlayersA, setOutPlayersA] = useState([]);
  const [outPlayersB, setOutPlayersB] = useState([]);
  const [currentBatsman, setCurrentBatsman] = useState(0);
  const [nextPlayerIndex, setNextPlayerIndex] = useState(2);
  const [target, setTarget] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [currentBowler, setCurrentBowler] = useState("");
  const [bowlers, setBowlers] = useState([]);
  const [currentOver, setCurrentOver] = useState([]);

  useEffect(() => {
    const selected = localStorage.getItem("selected_match");
    if (!selected) {
      navigate("/select");
      return;
    }

    const { A, B } = JSON.parse(selected);
    if (!A || !B) {
      navigate("/select");
      return;
    }

    setTeamAName(A.name);
    setTeamBName(B.name);
    setTeamA(A.players || []);
    setTeamB(B.players || []);
    setBattingOrder(A.players || []);
    setBatsmen([A.players[0], A.players[1]]);
    setBowlers(B.bowlers || []);
    setCurrentBowler(B.bowlers?.[0] || "");
  }, [navigate]);

  const addRuns = (runs, isExtra = false) => {
    if (gameOver) return;

    const result = isExtra ? (runs === 1 ? "NB" : "W") : runs.toString();

    setCurrentOver((prev) => {
      if (prev.length < 6) return [...prev, result];
      return [result];
    });

    if (battingTeam === "A") {
      setTeamAScore((prev) => prev + runs);
    } else {
      const newScore = teamBScore + runs;
      setTeamBScore(newScore);
      if (!isExtra && target && newScore >= target) {
        setGameOver(true);
        alert(`${teamBName} wins! 🎉`);
        return;
      }
    }

    if (!isExtra) {
      const updatedScores = [...batsmenScores];
      updatedScores[currentBatsman] += runs;
      setBatsmenScores(updatedScores);

      if (runs % 2 !== 0) {
        setCurrentBatsman((prev) => 1 - prev);
      }
    }
  };

  const handleOut = () => {
    if (gameOver) return;

    setCurrentOver((prev) => {
      if (prev.length < 6) return [...prev, "W"];
      return ["W"];
    });

    const updatedOutList =
      battingTeam === "A" ? [...outPlayersA] : [...outPlayersB];
    updatedOutList.push(batsmen[currentBatsman]);

    if (battingTeam === "A") {
      setOutPlayersA(updatedOutList);
    } else {
      setOutPlayersB(updatedOutList);
    }

    if (nextPlayerIndex < battingOrder.length) {
      const newBatsmen = [...batsmen];
      newBatsmen[currentBatsman] = battingOrder[nextPlayerIndex];
      setBatsmen(newBatsmen);
      setBatsmenScores((prevScores) => {
        const newScores = [...prevScores];
        newScores[currentBatsman] = 0;
        return newScores;
      });
      setNextPlayerIndex((prev) => prev + 1);
    } else {
      if (battingTeam === "A") {
        setBattingTeam("B");
        setBattingOrder(teamB);
        setBatsmen([teamB[0], teamB[1]]);
        setBatsmenScores([0, 0]);
        setCurrentBatsman(0);
        setNextPlayerIndex(2);
        setTarget(teamAScore + 1);
        setBowlers(teamA.bowlers || []);
        setCurrentBowler((teamA.bowlers || [])[0] || "");
        setCurrentOver([]);
      } else {
        setGameOver(true);
        alert(`${teamAName} wins! 🎉`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-sky-950 to-sky-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-white">
          🏏 Scoreboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-sky-800 rounded-2xl p-4 shadow-lg">
          <div className="p-4 rounded-xl bg-sky-700 shadow-md">
            <h2 className="text-2xl font-bold mb-2">{teamAName}</h2>
            <p className="text-lg">Score: {teamAScore}</p>
            <p className="text-lg">Out: {outPlayersA.length}</p>
          </div>
          <div className="p-4 rounded-xl bg-sky-700 shadow-md">
            <h2 className="text-2xl font-bold mb-2">{teamBName}</h2>
            <p className="text-lg">Score: {teamBScore}</p>
            <p className="text-lg">Out: {outPlayersB.length}</p>
          </div>
        </div>

        {/* Current Batsmen and Bowler Over Info */}
        <div className="mt-8 bg-sky-800 p-4 rounded-2xl shadow-lg flex flex-col md:flex-row justify-between gap-6">
          <div className="flex-1">
            <h3 className="text-2xl font-semibold mb-4 text-white">Current Batsmen</h3>
            <ul className="space-y-2">
              {batsmen.map((batsman, i) => (
                <li key={i} className="text-lg">
                  {batsman}: {batsmenScores[i]} runs{" "}
                  {currentBatsman === i && (
                    <span className="font-bold text-yellow-300">(on strike)</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-semibold mb-4 text-white">Bowling</h3>
            <p className="text-lg mb-2"> {currentBowler}</p>
            <div className="flex gap-2 flex-wrap">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                    currentOver[i]
                      ? "bg-yellow-300 text-black"
                      : "bg-sky-700 border border-white text-white"
                  }`}
                >
                  {currentOver[i] || ""}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          {[0, 1, 2, 3, 4, 6].map((run) => (
            <button
              key={run}
              onClick={() => addRuns(run)}
              className="bg-emerald-600 hover:bg-emerald-700 px-5 py-2 rounded-xl text-lg font-medium shadow"
            >
              +{run}
            </button>
          ))}
          <button
            onClick={handleOut}
            className="bg-rose-600 hover:bg-rose-700 px-5 py-2 rounded-xl text-lg font-medium shadow"
          >
            OUT
          </button>
          <button
            onClick={() => addRuns(1, true)}
            className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-xl text-lg font-medium shadow"
          >
            No Ball +1
          </button>
          <button
            onClick={() => addRuns(1, true)}
            className="bg-cyan-600 hover:bg-cyan-700 px-5 py-2 rounded-xl text-lg font-medium shadow"
          >
            Wide Ball +1
          </button>
        </div>

        {/* Bowler Selection */}
        <div className="mt-8 bg-sky-800 p-4 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-white">Select Bowler</h3>
          <select
            value={currentBowler}
            onChange={(e) => setCurrentBowler(e.target.value)}
            className="text-black px-4 py-2 rounded-xl shadow text-lg"
          >
            {bowlers.map((bowler, idx) => (
              <option key={idx} value={bowler}>
                {bowler}
              </option>
            ))}
          </select>
        </div>

        {/* Remaining Batting Lineup */}
        <div className="mt-8 bg-sky-800 p-4 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-white">
            Remaining Batting Lineup
          </h3>
          <ul className="flex flex-wrap gap-3">
            {battingOrder
              .filter(
                (player) =>
                  !batsmen.includes(player) &&
                  !((battingTeam === "A" ? outPlayersA : outPlayersB).includes(
                    player
                  ))
              )
              .map((player, idx) => (
                <li
                  key={idx}
                  className="bg-sky-700 px-4 py-2 rounded-xl shadow text-white text-sm"
                >
                  {player}
                </li>
              ))}
          </ul>
        </div>

        {/* Target Info */}
        {target && battingTeam === "B" && !gameOver && (
          <p className="mt-6 text-center text-yellow-300 text-lg">
            Target: {target} | Runs Remaining: {target - teamBScore}
          </p>
        )}

        {/* Game Over */}
        {gameOver && (
          <div className="mt-8 text-center text-3xl text-lime-400 font-bold">
            Game Over 🎉
          </div>
        )}
      </div>
    </div>
  );
};

export default Scoreboard;
