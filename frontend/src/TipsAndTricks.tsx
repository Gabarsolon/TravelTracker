import Tooltip from '@mui/material/Tooltip';
import React, { useState, useEffect } from 'react';

interface Tip {
    tipsAndTrickId: number;
    userId: number;
    destinationId: number;
    comment: string;
}

interface TipsAndTricksListProps {
    destinationId: number;
}

const TipsAndTricksList: React.FC<TipsAndTricksListProps> = ({ destinationId }) => {
    const [tips, setTips] = useState<Tip[]>([]);
    const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
    const [newTip, setNewTip] = useState<string>('');
    const [editTipId, setEditTipId] = useState<number | null>(null);
    const [editedTip, setEditedTip] = useState<string>('');

    const getUserId = (): number => {
        // Add logic to get the user ID (replace with your actual logic)
        // Example: return loggedInUser.id;
        return 1; // Replace with actual logic
    };

    useEffect(() => {
        const fetchTips = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/tips/destination/${destinationId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const tipsData = await response.json();
                setTips(tipsData);
            } catch (error) {
                console.error('Error fetching tips:', error);
            }
        };

        fetchTips();
    }, [destinationId]);

    const handleAddTip = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/tips/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: getUserId(),
                    destination: destinationId,
                    comment: newTip,
                }),
            });

            if (response.ok) {
                const newTipData = await response.json();
                setTips((prevTips) => [...prevTips, newTipData]);

                setShowAddDialog(false);
                setNewTip('');
            } else {
                console.error('Error adding tip:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding tip:', error);
        }
    };

    const handleDeleteTip = async (tipId: number) => {
        const userId = 1;

        try {
            const response = await fetch(`http://localhost:8080/api/v1/tips/delete/${tipId}?userId=${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setTips((prevTips) => prevTips.filter((tip) => tip.tipsAndTrickId !== tipId));
            } else {
                console.error('Error deleting tip:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting tip:', error);
        }
    };

    const handleEditTip = async (tipId: number) => {
        setEditTipId(tipId);
        // Find the tip to be edited
        const tipToEdit = tips.find((tip) => tip.tipsAndTrickId === tipId);
        if (tipToEdit) {
            setEditedTip(tipToEdit.comment);
        }
    };

    const handleSaveEdit = async () => {
        if (editTipId !== null) {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/tips/edit/${editTipId}?userId=1`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        tipsAndTrickId: editTipId,
                        userId: getUserId(),
                        destination: destinationId,
                        comment: editedTip,
                    }),
                });

                if (response.ok) {
                    const updatedTipData = await response.json();
                    setTips((prevTips) =>
                        prevTips.map((tip) =>
                            tip.tipsAndTrickId === updatedTipData.tipsAndTrickId ? updatedTipData : tip
                        )
                    );
                    setEditTipId(null);
                } else {
                    console.error('Error editing tip:', response.statusText);
                }
            } catch (error) {
                console.error('Error editing tip:', error);
            }
        }
    };

    return (
        <div>
            <div className="tips-list-container">
                <ul className="tips-list">
                    {tips.map((tip) => (
                        <li key={tip.tipsAndTrickId}>
                            <div className="action-buttons">
                                {editTipId === tip.tipsAndTrickId ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editedTip}
                                            onChange={(e) => setEditedTip(e.target.value)}
                                            className="edit-input"
                                            style={{ fontSize: '1.05em' }}
                                        />
                                        <button className="saveButton" onClick={handleSaveEdit}>
                                            Save
                                        </button>
                                    </>
                                ) : (
                                    <>
                                    <span className={editTipId === tip.tipsAndTrickId ? 'edit-mode-text' : ''}>
                                        {tip.comment}
                                    </span>
                                        <button className="editButton" onClick={() => handleEditTip(tip.tipsAndTrickId)}>
                                            Edit
                                        </button>
                                        <button className="deleteButton" onClick={() => handleDeleteTip(tip.tipsAndTrickId)}>
                                            Delete
                                        </button>
                                    </>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <Tooltip title="Add a tip" arrow>
<button className="addButtontip" onClick={() => setShowAddDialog(true)}>
  +
</button>
</Tooltip>

            {showAddDialog && (
                <>
                    <div className="overlay" />
                    <div className="modal">
                        <div className="add-tip-dialog">
                            <label>
                                New Tip:
                                <input
                                    type="text"
                                    value={newTip}
                                    onChange={(e) => setNewTip(e.target.value)}
                                />
                            </label>
                            <button onClick={handleAddTip}>Add Tip</button>
                            <button onClick={() => setShowAddDialog(false)}>Cancel</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

    export default TipsAndTricksList;




