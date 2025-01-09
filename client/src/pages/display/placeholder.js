export default function DisplayPlaceholder() {
    return (
        <div>
            <input className='border-solid border-2 rounded-md border-black m-2'></input>
            <button onClick={() => {
                const roomId = document.querySelector('input').value;
                console.log(roomId);
                if (roomId) {
                    window.location.href = `/display/${roomId}`;
                }
            }}>
                Join Room
            </button>
        </div>
    );
}