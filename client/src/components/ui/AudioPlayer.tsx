/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useState, useEffect } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export default function AudioPlayer({ file }: { file: File }): JSX.Element {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
  
    const handlePlayPause = (): void => {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play().catch(error => {
            console.error('Error attempting to play audio:', error);
          });
        }
        setIsPlaying(!isPlaying);
      }
    };
  
    useEffect(() => {
      if (audioRef.current) {
        audioRef.current.src = URL.createObjectURL(file);
        audioRef.current.load();
      }
    }, [file]);
  
    return (
      <Box display="flex" alignItems="center">
        <audio ref={audioRef} />
        <IconButton onClick={handlePlayPause}>
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
        <Typography variant="body2" sx={{ ml: 2 }}>
          Трек: {`${file.name.slice(0, 20)}...`}
        </Typography>
      </Box>
    );
  }