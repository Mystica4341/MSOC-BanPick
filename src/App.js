import {React, useState, useEffect} from 'react';
import SongJSON from './data/songs';
import SongFrame from './components/SongFrame';


function App() {
  const [songList, setSongList] = useState([]);

  const getSongList = async () => {
    const response = await fetch('https://api.maimai.net/v1/songlist', {mode: 'cors'});
    const data = await response.json();
    setSongList(data);
  }

  useEffect(() => {
    setSongList(SongJSON.map(song => ({ ...song, status: 'none' })));
  }, []);

  return (
    <div className="transparent w-screen h-screen">
      <h1 className='text-4xl font-bold absolute top-3 left-1/2 -translate-x-1/2 -translate-y-1/2'>MSOC Ban Pick</h1>
      <div className='flex justify-between px-5 text-lg font-semibold h-fit absolute bottom-2 w-full'>
        {songList.map((item, index) => (
          <SongFrame song={item} index={index} currentSongList={songList}/>
        ))}
      </div>
    </div>
  );
}

export default App;
