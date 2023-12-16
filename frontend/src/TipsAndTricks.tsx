import React, { useState, useEffect } from 'react';

interface Tip {
    tipsAndTrickId: number;
    comment: string;
    destinationId: string;
}

interface TipsAndTricksListProps {
    destinationId: number;
}

const TipsAndTricksList: React.FC<TipsAndTricksListProps> = ({ destinationId }) => {
    const [tips, setTips] = useState<Tip[]>([]);
    const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
    const [newTip, setNewTip] = useState<string>('');

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
                    destinationId,
                    comment: newTip,
                }),
            });

            if (response.ok) {
                // Update the tips list with the new tip
                const newTipData = await response.json();
                setTips((prevTips) => [...prevTips, newTipData]);
                // Close the add dialog
                setShowAddDialog(false);
                // Clear the newTip state
                setNewTip('');
            } else {
                console.error('Error adding tip:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding tip:', error);
        }
    };

    return (
        <div>
            <div className="tips-list-container">
                <ul className="tips-list">
                    {tips.map((tip) => (
                        <li key={tip.tipsAndTrickId}>{tip.comment}</li>
                    ))}
                </ul>
            </div>
            <button className="addButtontip" onClick={() => setShowAddDialog(true)}>
                +
            </button>

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
                                    onChange={(e) => setNewTip(e.target.value )}
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
