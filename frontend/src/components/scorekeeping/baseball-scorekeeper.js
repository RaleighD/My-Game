import React, { useState } from 'react';
import axios from 'axios';
import Modal from '../Post/Modal'; // Make sure this path is correct
import './baseball-scorekeeper.css';

function Baseball() {
    const [users, setUsers] = useState([]);
    const [showUsers, setShowUsers] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState({ firstBase: '', secondBase: '', thirdBase: '' });
    const [visibility, setVisibility] = useState({ firstBase: false, secondBase: false, thirdBase: false });

    const fetchUsers = async (base) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/all`);
            setUsers(response.data.users);
            setShowUsers(base); // Pass the base identifier to showUsers
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleCloseModal = () => setShowUsers(false);

    const handleSelectUser = (nickname) => {
        setSelectedPlayer({ ...selectedPlayer, [showUsers]: nickname });
        setVisibility({ ...visibility, [showUsers]: true });
        setShowUsers(false);
    };

    return (
        <div className="baseball-field">
            <img src="/images/baseball_field.jpg" alt="Baseball Diamond" />
            <button className="button-template third-base" onClick={() => fetchUsers('thirdBase')}>3rd Base</button>
            {visibility.thirdBase && <button className="button-template third-base-player">{selectedPlayer.thirdBase}</button>}

            <button className="button-template second-base" onClick={() => fetchUsers('secondBase')}>2nd Base</button>
            {visibility.secondBase && <button className="button-template second-base-player">{selectedPlayer.secondBase}</button>}
            
            <button className="button-template first-base" onClick={() => fetchUsers('firstBase')}>1st Base</button>
            {visibility.firstBase && <button className="button-template first-base-player">{selectedPlayer.firstBase}</button>}

            <Modal isOpen={Boolean(showUsers)} onClose={handleCloseModal}>
                <ul>
                    {users.map(user => (
                        <li key={user._id} onClick={() => handleSelectUser(user.nickname || 'User')}>
                            {user.nickname || 'User'}
                        </li>
                    ))}
                </ul>
            </Modal>
        </div>
    );
}

export default Baseball;