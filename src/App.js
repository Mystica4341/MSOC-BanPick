import {React, useState, useEffect} from 'react';
import SongJSON from './data/songs';
import SongFrame from './components/SongFrame';
import { getTrackList } from './services/trackServices';

function App() {
  const [songList, setSongList] = useState([]);

  const getSongList = async (minDiff, maxDiff) => {
    const response = await getTrackList(minDiff, maxDiff);
    console.log(response);
    // const data = response;
    // setSongList(data.map(song => ({ ...song, status: 'none' })));
  }

  const handleOnKeyChange = (event) => {
    if (event.key === 'r' || event.key === 'R') {
      getSongList(10, 15);
    }
  }

  useEffect(() => {
    setSongList(SongJSON.map(song => ({ ...song, status: 'none' })));
    window.addEventListener('keydown', handleOnKeyChange);
    return () => {
      window.removeEventListener('keydown', handleOnKeyChange);
    };
  }, []);

  return (
    <div className="transparent w-screen h-screen">
      <h1 className='text-4xl font-bold absolute top-3 left-1/2 -translate-x-1/2 -translate-y-1/2'>MSOC Ban Pick</h1>
      <div className='flex justify-between px-5 text-lg font-semibold h-fit absolute bottom-2 w-full'>
        {songList.map((item, index) => (
          <SongFrame song={item} index={index} currentTrackList={songList}/>
        ))}
      </div>
    </div>
  );
}

export default App;
