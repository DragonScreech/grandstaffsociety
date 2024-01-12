import React, { useState, useRef, useEffect } from 'react';

const AudioPlayer = ({ source }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;

        const updateProgress = () => {
            setProgress((audio.currentTime / audio.duration) * 100);
        };

        audio.addEventListener('timeupdate', updateProgress);

        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
        };
    }, []);

    const togglePlayPause = () => {
        const audio = audioRef.current;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }

        setIsPlaying(!isPlaying);
    };

    const handleSeekChange = (event) => {
        const audio = audioRef.current;
        const value = event.target.value;

        audio.currentTime = (value / 100) * audio.duration;
        setProgress(value);
    };

    return (
        <div>
            <audio ref={audioRef} src={source} />
            <button onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
            <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeekChange}
            />
        </div>
    );
};

export default AudioPlayer;
