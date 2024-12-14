import {React, useState, useEffect} from 'react'

export default function SongFrame({ song, index, currentTrackList }) {
  const [currentList, setCurrentList] = useState(currentTrackList);
  const [bgColor, setBgColor] = useState('');
  const [frameColor, setFrameColor] = useState('');
  const [cursorIndex, setCursorIndex] = useState(0);

  //On Click = banned
  const handleItemClick = () => {
    if (song.status === 'none') {
      song.status = 'banned';
    } else {
      song.status = 'none';
    }
    handleRefreshList();
  };

  const handleKeyPick = (currentIndex, keyword) => {
    if (currentIndex === index) {
      if (song.status === 'none') {
        song.status = keyword;
      } else {
        song.status = 'none';
      }
    }
    handleRefreshList();
  }

  const handleBGColor = () => {
    switch(song.status) {
      case 'teamAPicked':
        setBgColor('bg-blue-400');
        break;
      case 'teamBPicked':
        setBgColor('bg-red-400');
        break;
      case 'banned':
        setBgColor('bg-red-400');
        break;
      default:
        setBgColor('bg-gray-400');
    }
  }

  const handleFrameColor = () => {
    switch(song.difficulty) {
      case 'Expert':
        setFrameColor('bg-red-400');
        break;
      case 'Master':
        setFrameColor('bg-purple-400');
        break;
      case 'Re:Master':
        setFrameColor('bg-purple-200');
        break;
      case 'Advanced':
        setFrameColor('bg-orange-500');
        break;
      case 'Basic':
        setFrameColor('bg-green-400');
        break;
      default:
        setFrameColor('bg-gray-400');
    }
  }

  const handleRefreshList = () => {
    setCurrentList((prevList) =>
      prevList.map((item, i) =>
        i === index ? { ...item, status: 'none' } : item
      )
    );
  }

  //on key click = select
  const handleOnKeyChange = (event) => {
    if (event.key === 'ArrowRight') {
      setCursorIndex((prevIndex) => (prevIndex + 1) % currentList.length);
    } else if (event.key === 'ArrowLeft') {
      setCursorIndex((prevIndex) => (prevIndex - 1 + currentList.length) % currentList.length);
    }

    if (event.key === 'v' || event.key === 'V') {
      handleKeyPick(cursorIndex, 'teamAPicked');
    } else if (event.key === 'b' || event.key === 'B') {
      handleKeyPick(cursorIndex, 'teamBPicked');
    }
  }

  useEffect(() => {
    handleBGColor();
    handleFrameColor();
    window.addEventListener('keydown', handleOnKeyChange);
    return () => {
      window.removeEventListener('keydown', handleOnKeyChange);
    };
  }, [cursorIndex, currentList, song]);


  return (
    <div 
      key={index} 
      className={`h-fit w-40 text-center`}
      onClick={() => handleItemClick()}
    >
      {/* PICKED HEADER */}
      {song.status !== "none" ? (
      <h2 className={`my-auto ${bgColor} h-7 text-white`}>{song.status.toUpperCase()}</h2>
      ) : (<h2 className='my-auto bg-transparent h-7'> </h2>)}
      
      {/* SONG FRAME */}
      <div className={`rounded-lg ${frameColor} ${song.difficulty === 'Re:Master' ? 'text-purple-500' : 'text-gray-100'} ${cursorIndex === index ? 'opacity-80' : ''} ${song.status === 'banned' ? 'opacity-50' : ''}`}>
        <p className='px-2 text-end'>{song.difficulty}</p>
        <div className="relative">
          <img className="h-36 w-36 mx-auto" src={song.imageUrl} alt={song.title} />
          <p className={`${frameColor} absolute bottom-0 right-1 w-12 m-auto rounded-tl-xl`}>
            {song.level}
          </p>
        </div>
        <p className=''>{song.title}</p>
        <p className=''>{song.artist}</p>
      </div>
    </div>
  )
}
