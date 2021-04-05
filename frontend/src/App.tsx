import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import Header from "./Components/Header";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";

function App() {
  return (
    <div className="App">
      <Router>
        <main>
          <Header />
          <Container maxWidth="xs">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/orders">
                <Orders />
              </Route>
              <Route path="/order/:orderNo">
                <OrderDetails />
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
