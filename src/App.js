import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Logout from './components/Logout';
import { Route } from 'react-router-dom'
function App() {
  return (
    <>
      <Navbar />
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/logout">
        <Logout />
      </Route>
    </>
  );
}

export default App;
