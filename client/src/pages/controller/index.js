import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

import { socket } from '../../socket';
import SongJSON from '../../data/songs';
import { getTrackList } from '../../services/trackServices';


export default function Controller() {
  const navigate = useNavigate();
  const { room } = useParams();
  const [songList, setSongList] = useState([]);
  const [display, setDisplay] = useState([]);

  const getSongList = async (minDiff, maxDiff) => {
    setSongList(SongJSON.map(song => ({ ...song, status: 'none' })).sort(() => Math.random() - 0.5));
    // const response = await getTrackList(minDiff, maxDiff);
    // console.log(response);
    // const data = response;
    // setSongList(data.map(song => ({ ...song, status: 'none' })));
  }

  const sendSongList = () => {
    socket.emit('controller:songs', songList);
  }

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
      socket.emit('who', 'controller');  // handshake stuff
      socket.emit('room', room);
    });

    socket.on('disconnect', () => {
      console.log('disconnected');
    });

    socket.on('display:connect', (displayId) => {
      setDisplay([...display, displayId]);
    });

    socket.on('display:disconnect', (displayId) => {
      setDisplay(display.filter((dID) => displayId !== dID));
    });

    socket.once('server:room', (room) => {
      navigate(`/controller/${room}`, { replace: true });
    });

    socket.connect();

    return () => {
      socket.removeAllListeners('connect');
      socket.removeAllListeners('disconnect');
      socket.removeAllListeners('display:connect');
      socket.removeAllListeners('display:disconnect');
    };
  }, [room, display, navigate]);


  return (
    <>
      <div className='flex-col w-fit p-1 border-solid border-2 rounded-md border-slate-800'>
        <h1>Controller</h1>
        {room ? <h1>Room: {room}</h1> : null}
      </div>
      <div className='flex-col w-fit p-1 border-solid border-2 rounded-md border-slate-800'>
        <h1>Current connecting display</h1>
        {display.map((displayId, index) => (
          <h2 key={index}>{displayId}</h2>
        ))}
      </div>
      <div className='flex flex-row gap-2'>
        <button className='border-solid border-2 rounded-md border-purple-700' onClick={() => getSongList(10, 15)}>Get Song List</button>
        <button className='border-solid border-2 rounded-md border-purple-700' onClick={() => sendSongList()}>Send Song List</button>
      </div>
      <div>
        {songList.map((song, index) => (
          <div className='flex-col w-fit p-1 border-solid border-2 rounded-md border-slate-800' key={index}>
            <h1>{song.title}</h1>
            <h2>{song.artist}</h2>
            <h3>{song.difficulty}</h3>
            <h4>{song.status}</h4>
          </div>
        ))}
      </div>
    </>
  );
}