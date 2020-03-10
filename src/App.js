import React from 'react';
import './App.css';
import ExcelReader from './components/ExcelReader'
// import SheetJSApp from './components/SheetJS'
import store from './redux/store'
import { Provider } from 'react-redux';

function App() {
  return (
    <div className="App">
      <Provider store = {store}>
        <ExcelReader/>
      </Provider>
     {/* <SheetJSApp/> */}
    </div>
  );
}

export default App;
