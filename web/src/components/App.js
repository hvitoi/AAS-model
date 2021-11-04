// Packages
import React from "react";

// Components
import { Router, Route, Switch } from "react-router-dom";
import Selection from "./Selection";
import AasSearch from "./AasSearch";
import AasShow from "./AasShow";
import AasNew from "./AasNew";

// Browse history
import history from "../history";

// -------------------------

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Selection} />
        <Route path="/aas" exact component={AasSearch} />
        <Route path="/aas/new" exact component={AasNew} />
        <Route path="/aas/:id" exact component={AasShow} />
      </Switch>
    </Router>
  );
};

export default App;
