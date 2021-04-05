import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  header: {
    height: "10vH",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <header className={classes.header} />
      <Router>
        <main>
          <Container maxWidth="xs">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/orders">
                <Orders />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </Container>
        </main>
      </Router>
    </div>
  );
}

export default App;
