import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFound from "./pages/notFound";

function App() {
  return (
    <div className="App">
      <Router>
        <main>
          <Switch>
            <Route exact path="/"></Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
