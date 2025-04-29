'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { displayAPI } from '@/api';
import { toast } from 'react-hot-toast';

export default function Display() {
    const { user, token } = useAuth();
    const [displayData, setDisplayData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('team'); // 'team' or 'player'

    useEffect(() => {
        const fetchDisplayData = async () => {
            if (!user?.username || !token) return;
            
            try {
                const data = await displayAPI.getDisplaySettings(token, user.username);
                setDisplayData(data);
            } catch (err) {
                setError(err.message || 'Failed to fetch display settings');
            } finally {
                setLoading(false);
            }
        };

        fetchDisplayData();
    }, [user?.username, token]);

    const handleResetTeamConfig = async () => {
        if (!user?.username || !token) {
            toast.error('Please login first');
            return;
        }

        try {
            await displayAPI.updateTeamConfig(token, user.username, {
                redTeamName: "",
                blueTeamName: "",
                redTeamScore: "0",
                blueTeamScore: "0",
                logoRedTeam: "",
                logoBlueTeam: "",
                formatMatch: "bo1"
            });
            toast.success('Team configuration reset successfully');
            // Refresh data
            const data = await displayAPI.getDisplaySettings(token, user.username);
            setDisplayData(data);
        } catch (error) {
            toast.error(error.message || 'Failed to reset team configuration');
        }
    };

    const handleResetPlayerConfig = async () => {
        if (!user?.username || !token) {
            toast.error('Please login first');
            return;
        }

        try {
            const emptyPlayerConfig = {};
            for (let i = 0; i < 10; i++) {
                emptyPlayerConfig[`customNamePlayer${i}`] = "";
            }
            await displayAPI.updatePlayerConfig(token, user.username, emptyPlayerConfig);
            toast.success('Player configuration reset successfully');
            // Refresh data
            const data = await displayAPI.getDisplaySettings(token, user.username);
            setDisplayData(data);
        } catch (error) {
            toast.error(error.message || 'Failed to reset player configuration');
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
    if (!displayData) return <div className="p-4">No display data found</div>;

    // Filter out unnecessary fields
    const { _id, createdAt, updatedAt, __v, ...filteredData } = displayData;

    // Split players into two teams
    const redTeamPlayers = Object.entries(filteredData.playerConfig)
        .slice(0, 5)
        .map(([key, value], index) => ({ key, value, index: index + 1 }));
    
    const blueTeamPlayers = Object.entries(filteredData.playerConfig)
        .slice(5, 10)
        .map(([key, value], index) => ({ key, value, index: index + 6 }));

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center text-white">Display Settings</h1>
            
            {/* Tab Navigation */}
            <div className="flex justify-center mb-6">
                <div className="bg-gray-800 rounded-lg p-1 flex">
                    <button
                        onClick={() => setActiveTab('team')}
                        className={`px-4 py-2 rounded-md transition-colors ${
                            activeTab === 'team' 
                                ? 'bg-blue-600 text-white' 
                                : 'text-gray-300 hover:text-white'
                        }`}
                    >
                        Team Configuration
                    </button>
                    <button
                        onClick={() => setActiveTab('player')}
                        className={`px-4 py-2 rounded-md transition-colors ${
                            activeTab === 'player' 
                                ? 'bg-blue-600 text-white' 
                                : 'text-gray-300 hover:text-white'
                        }`}
                    >
                        Player Configuration
                    </button>
                </div>
            </div>

            {/* Team Configuration */}
            {activeTab === 'team' && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Team Configuration</h2>
                        <button
                            onClick={handleResetTeamConfig}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300"
                        >
                            Reset Team Config
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Red Team */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-red-600">Red Team</h3>
                            <div className="space-y-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Team Name</label>
                                    <div className="mt-1 p-2 bg-gray-50 rounded border">{filteredData.teamConfig.redTeamName || 'Not set'}</div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Score</label>
                                    <div className="mt-1 p-2 bg-gray-50 rounded border">{filteredData.teamConfig.redTeamScore || 'Not set'}</div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Logo</label>
                                    <div className="mt-1">
                                        {filteredData.teamConfig.logoRedTeam ? (
                                            <img 
                                                src={filteredData.teamConfig.logoRedTeam} 
                                                alt="Red Team Logo"
                                                className="w-24 h-24 object-contain rounded-lg border"
                                            />
                                        ) : (
                                            <div className="p-2 bg-gray-50 rounded border">Not set</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Blue Team */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-blue-600">Blue Team</h3>
                            <div className="space-y-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Team Name</label>
                                    <div className="mt-1 p-2 bg-gray-50 rounded border">{filteredData.teamConfig.blueTeamName || 'Not set'}</div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Score</label>
                                    <div className="mt-1 p-2 bg-gray-50 rounded border">{filteredData.teamConfig.blueTeamScore || 'Not set'}</div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Logo</label>
                                    <div className="mt-1">
                                        {filteredData.teamConfig.logoBlueTeam ? (
                                            <img 
                                                src={filteredData.teamConfig.logoBlueTeam} 
                                                alt="Blue Team Logo"
                                                className="w-24 h-24 object-contain rounded-lg border"
                                            />
                                        ) : (
                                            <div className="p-2 bg-gray-50 rounded border">Not set</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Match Format */}
                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700">Match Format</label>
                        <div className="mt-1 p-2 bg-gray-50 rounded border">{filteredData.teamConfig.formatMatch.toUpperCase()}</div>
                    </div>
                </div>
            )}

            {/* Player Configuration */}
            {activeTab === 'player' && (
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Player Configuration</h2>
                        <button
                            onClick={handleResetPlayerConfig}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300"
                        >
                            Reset Player Config
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Red Team Players */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-red-600">Red Team Players</h3>
                            <div className="space-y-2">
                                {redTeamPlayers.map(({ key, value, index }) => (
                                    <div key={key} className="space-y-1">
                                        <label className="block text-sm font-medium text-gray-700">Player {index}</label>
                                        <div className="p-2 bg-gray-50 rounded border">{value || 'Not set'}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Blue Team Players */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-blue-600">Blue Team Players</h3>
                            <div className="space-y-2">
                                {blueTeamPlayers.map(({ key, value, index }) => (
                                    <div key={key} className="space-y-1">
                                        <label className="block text-sm font-medium text-gray-700">Player {index}</label>
                                        <div className="p-2 bg-gray-50 rounded border">{value || 'Not set'}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
