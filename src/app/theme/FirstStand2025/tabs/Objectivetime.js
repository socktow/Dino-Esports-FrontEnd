import Barontime from "../../../../components/FirstStand2025/Objectivetime/Barontime";
import Dragontime from "../../../../components/FirstStand2025/Objectivetime/Dragontime";
import Atakhantime from "../../../../components/FirstStand2025/Objectivetime/Atakhantime";
import BaronPowerPlay from "../../../../components/FirstStand2025/Objectivetime/BaronPowerPlay";

const Timer = ({
  gameTime,
  baronTimer,
  dragonTimer,
  atakhanTimer,
  scoreboard = [],
}) => {
  const gameTimeInSeconds =
    typeof gameTime === "string"
      ? parseInt(gameTime.split(":")[0]) * 60 + parseInt(gameTime.split(":")[1])
      : gameTime;

  // Check if any team has Baron Power Play
  const hasBaronPowerPlay = scoreboard.some(
    team => team.baronPowerPlay && team.baronPowerPlay.gold && team.baronPowerPlay.timeLeft
  );

  return (
    <div className="absolute top-4 right-4 flex gap-2 ">
      <BaronPowerPlay scoreboard={scoreboard} />
      {!hasBaronPowerPlay && <Barontime timer={baronTimer} scoreboard={scoreboard} />}
      <Dragontime timer={dragonTimer} scoreboard={scoreboard} />
      {gameTimeInSeconds >= 900 && <Atakhantime timer={atakhanTimer} />}
    </div>
  );
};

export default Timer;
