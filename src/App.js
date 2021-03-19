import LogIn from './components/LogIn';
import Chat from './components/Chat';
import SignUp from './components/SignUp';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
        <div className="App">
          <Switch>
            <ProtectedRoute path="/chat">
              <Chat/>
            </ProtectedRoute>
            <Route path="/signup">
              <SignUp/>
            </Route>
            <Route path="/">
              <LogIn/>
            </Route>
          </Switch>
         </div>
    </Router>
  );
}

export default App;
