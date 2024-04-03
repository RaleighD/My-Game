import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const TeamPage = () => {
    const { name } = useParams();
    const [team, setTeam] = useState(null);
    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const response = await fetch(`/api/teams/${name}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch team data');
                }
                const data = await response.json();
                setTeam(data);
            } catch (error) {
                console.error('Error fetching team data:', error);
            }
        };

        fetchTeam();
    }, [name]);

    return (
        <div>
            {team ? (
                <div>
                    <h2>{team.name}</h2>
                    <p>Coach: {team.coach.nickname}</p>
                    <p>Location: {team.location}</p>
                    <p>Sport: {team.sport}</p>
                    <h3>Members:</h3>
                    <ul>
                        {team.members.map(member => (
                            <li key={member._id}>{member.nickname}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default TeamPage;
