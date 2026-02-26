import React from 'react';
import {MdArrowBack, MdMusicNote, MdMusicOff, MdOutlineRefresh} from "react-icons/md";
import type {MusicState} from "../useBackgroundMusic.ts";

const generateMusicIcon = (musicStatus: MusicState) => {
    switch(musicStatus) {
        case "play": return <MdMusicNote className="footer-button_icon" />
        case "pause": return <MdMusicOff className="footer-button_icon" />
        case "invalid":
        default:
            return;
    }
}

interface ActionButtonProps {
    onReturnClick(): void,
    onResetClick(): void,
    toggleMusic(): void,
    musicStatus: MusicState,
}

const ActionButtons: React.FC<ActionButtonProps> = ({ onReturnClick, onResetClick, toggleMusic, musicStatus }) => {
    return (
        <div className="footer-buttons">
            <button className="footer-button" onClick={onReturnClick}>
                <MdArrowBack className="footer-button_icon"/>
            </button>
            <button className="footer-button" onClick={onResetClick}>
                <MdOutlineRefresh className="footer-button_icon"/>
            </button>
            <button className="footer-button" onClick={toggleMusic}>
                {generateMusicIcon(musicStatus)}
            </button>
        </div>
    );
};

export default ActionButtons;