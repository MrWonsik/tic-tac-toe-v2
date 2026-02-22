import {useEffect, useRef, useState} from "react";

export type MusicState = "play" | "pause" | "invalid"

export const useBackgroundMusic = (src: string, volume = 0.3) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [musicState, setMusicState] = useState<MusicState>("pause");

    useEffect(() => {
        const audio = new Audio(src);
        audio.loop = true;
        audio.volume = volume;

        audioRef.current = audio;

        return () => {
            audio.pause();
            audioRef.current = null;
        };
    }, [src, volume]);

    const play = () => {
        audioRef.current?.play();
        setMusicState("play");
    };

    const pause = () => {
        audioRef.current?.pause();
        setMusicState("pause");
    }

    const restart = () => {
        if (!audioRef.current) {
            setMusicState("invalid");
            return;
        }
        audioRef.current.currentTime = 0;
        play();
    };

    const toggle = () => {
        if (!audioRef.current) {
            setMusicState("invalid");
            return;
        }
        if (audioRef.current.paused) {
            play();
        } else {
            pause();
        }
    };

    return {
        playMusic: play,
        pauseMusic: pause,
        restartMusic: restart,
        toggleMusic: toggle,
        musicStatus: musicState
    };
};