// import logo from './logo.svg';
import './App.css';
import { useDispatch } from "react-redux";
import { toggleHelp } from "./redux/reducers/gameSlice";
import Help from "./components/Help";
import { Outlet } from "react-router-dom";


function App() {

  const dispatch = useDispatch();

  return (
    <div className="App">
      <div className='help' onClick={() => dispatch(toggleHelp())}> 
        <h3>?</h3>
      </div>
      <Help/>
      <Outlet/>
    </div>
  );
}

export default App;
