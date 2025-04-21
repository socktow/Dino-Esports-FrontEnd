'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { connectWebSocket, disconnectWebSocket } from "@/lib/websocket";
import { parseGameData } from "@/lib/dataParser";
import Scoreboard from "./tabs/Scoreboard";
import Scoreboardbottom from "./tabs/Scoreboardbottom";
import Objectivetime from "./tabs/Objectivetime";

export default function FirstStand2025Theme() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // data
  const [scoreboard, setScoreboard] = useState([]);
  const [gameTime, setGameTime] = useState(0);
  const [teamData, setTeamData] = useState(null);
  const [baronTimer, setBaronTimer] = useState(null);
  const [dragonTimer, setDragonTimer] = useState(null);
  const [atakhanTimer, setAtakhanTimer] = useState(null);
  const [playersdata, setPlayersdata] = useState([]);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    connectWebSocket((rawData) => {
      const parsedData = parseGameData(rawData);
      if (parsedData) {
        setScoreboard(parsedData.scoreboard);
        setGameTime(parsedData.gameTime);
        setBaronTimer(parsedData.baronTimer);
        setDragonTimer(parsedData.dragonTimer);
        setAtakhanTimer(parsedData.atakhanTimer);
        setPlayersdata(parsedData.playersdata);
        setPlayers(parsedData.players);
      }
    });

    return () => disconnectWebSocket();
  }, []);

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (!tokenParam) {
      router.push('/auth/login');
      return;
    }
    
    setToken(tokenParam);
    setLoading(false);
  }, [searchParams, router]);

  if (loading) {
    return <div className="min-h-screen p-8">Loading...</div>;
  }

  if (!token) {
    return null;
  }

  return (
    <div className="min-h-screen relative">
      <div className="absolute flex top-0 left-0 p-4">
        <Scoreboard
          scoreboard={scoreboard}
          gameTime={gameTime}
          teamData={teamData}
        />
      </div>
      <div className="top-0 right-0 flex flex-col gap-4 p-12">
        <Objectivetime
          gameTime={gameTime}
          baronTimer={baronTimer}
          dragonTimer={dragonTimer}
          atakhanTimer={atakhanTimer}
          scoreboard={scoreboard}
        />
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full">
        <Scoreboardbottom playersdata={playersdata} players={players} />
      </div>
    </div>
  );
} 