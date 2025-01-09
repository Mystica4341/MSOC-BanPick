import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router';

import { socket } from '../../socket';
import SongFrame from '../../components/SongFrame';


function Display() {
  const { room } = useParams();
  const [songList, setSongList] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
      socket.emit('who', 'display');  // handshake stuff
      socket.emit('room', room);
    });

    socket.on('disconnect', () => {
      console.log('disconnected');
    });

    socket.on('controller:songs', (songList) => {
      setSongList(songList);
    });

    socket.connect();

    return () => {
      socket.removeAllListeners('connect');
      socket.removeAllListeners('disconnect');
      socket.removeAllListeners('controller:songs');
    };
  }, [room]);

  return (
    <div className="transparent w-screen h-screen">
      <h1 className='text-4xl font-bold absolute top-3 left-1/2 -translate-x-1/2 -translate-y-1/2'>MSOC Ban Pick</h1>
      <div className='flex justify-between px-5 text-lg font-semibold h-fit absolute bottom-2 w-full'>
        {songList.map((item, index) => (
          <SongFrame key={index} song={item} index={index} currentTrackList={songList} />
        ))}
      </div>
    </div>
  );
}

export default Display;
