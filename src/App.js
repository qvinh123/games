import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout/Layout';
import AllGames from './Pages/AllGames';
import AllGamesTwoParam from "./Pages/AllGameTwoParam"
import Home from './Pages/Home';

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/games" />
          </Route>
          <Route path="/games" exact>
            <Home />
          </Route>
          <Route path="/games/:param1" exact>
            <AllGames />
          </Route>
          <Route path="/games/:param1/:param2" exact>
            <AllGamesTwoParam />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
