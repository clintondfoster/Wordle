import logo from './logo.svg';
import './App.css';
import { useDispatch } from "react-redux";
import ToggleHelp from ".redux/actions/ToggleHelp";


//Set up local storage for game state

function App() {

  const dispatch = useDispatch();

  return (
    <div className="App">
      <div className='help' onClick={() => dispatch(ToggleHelp())}> 
        <h3>?</h3>
      </div>
      {/* <Help/>
      <Outlet/> */}
    </div>
  );
}

export default App;
