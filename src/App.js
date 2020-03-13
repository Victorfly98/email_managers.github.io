import React from 'react';
import './App.css';
import RouterApp from './components/Menu'
// import SheetJSApp from './components/SheetJS'
import store from './redux/store'
import { Provider } from 'react-redux';

function App() {
  return (
    <div className="App">
      <Provider store = {store}>
        <RouterApp/>
      </Provider>
     {/* <SheetJSApp/> */}
    </div>
  );
}

export default App;
