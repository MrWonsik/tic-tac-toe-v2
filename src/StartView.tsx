import React from 'react';
import "./StartView.css";

interface StartViewProps {
    onStartButtonClick?: () => void;
}

const StartView: React.FC<StartViewProps> = ({ onStartButtonClick }) => {
    return (
        <>
            <div className="tic-tac-toe_logo">
                <div className="word_logo tic_logo">TIC</div>
                <div className="word_logo tac_logo">TAC</div>
                <div className="word_logo toe_logo">TOE</div>
            </div>

            <div className="start-button_container">
                <button className="start-button" onClick={onStartButtonClick}>Start</button>
            </div>
        </>
    );
};

export default StartView;