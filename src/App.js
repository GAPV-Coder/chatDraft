import logo from './logo.svg';
import './App.css';
import LogIn from './components/LogIn';
import Chat from './components/Chat';
import SignUp from './components/SignUp';
import Moment from './components/Moment';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

function App() {
  return (
    <Router>
        <div className="App">
          <Switch>
            <Route path="/chat">
              <Chat/>
            </Route>
            <Route path="/signup">
              <SignUp/>
            </Route>
            <Route path="/">
              <LogIn/>
              {/* <Moment/> */}
            </Route>
          </Switch>
         </div>
    </Router>
  );
}

export default App;
