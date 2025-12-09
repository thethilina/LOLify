"use client";

interface FormattedBattle {
  username: string;
  avatar: string;
  endTime: string;
  status: string;
}

interface BattleHistoryProps {
  battles: FormattedBattle[];
  loading: boolean;
}

export default function BattleHistory({ battles, loading }: BattleHistoryProps) {
  if (loading) return <p className="text-white animate-pulse">Loading Battle History...</p>;

  if (!loading && battles.length === 0) return <p className="text-gray-400">No battles found</p>;

  return (
    <div className="flex flex-col gap-4">
      {battles.map((battle) => (
        <div
          key={battle.username+ battle.endTime}
          className="flex items-center gap-4 p-3 bg-gray-800 rounded-md"
        >
          <img
            src={battle.avatar}
            alt={battle.username}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <p className="text-white font-medium">{battle.username}</p>
            <p className="text-gray-400 text-sm">{new Date(battle.endTime).toLocaleString()}</p>
          </div>
          <span
            className={`px-2 py-1 rounded text-sm ${
              battle.status === "Win"
                ? "bg-green-600 text-white"
                : battle.status === "Lose"
                ? "bg-red-600 text-white"
                : "bg-gray-500 text-white"
            }`}
          >
            {battle.status}
          </span>
        </div>
      ))}
    </div>
  );
}
