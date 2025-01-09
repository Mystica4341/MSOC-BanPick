import { React } from 'react';
import { Link, } from 'react-router';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>MSOC Ban Pick</h1>
      </header>
      <div>
        What role are you?
        <Link className='p-2' to="/controller">Controller</Link>
        <Link className='p-2' to="/display">Display</Link>
      </div>
    </div>
  );
}

export default App;
