import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import GameBoard from './components/GameBoard';
import UsernameModal from './components/UsernameModal';
import './styles/App.css';

function App() {
  const [username, setUsername] = useState(null);

  const handleUsernameSet = (name) => {
    setUsername(name);
  };

  return (
    <Provider store={store}>
      <div className="App">
        {!username ? (
          <UsernameModal onUsernameSet={handleUsernameSet} />
        ) : (
          <GameBoard username={username} />
        )}
      </div>
    </Provider>
  );
}

export default App;