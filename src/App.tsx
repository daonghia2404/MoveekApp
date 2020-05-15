import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "rsuite/dist/styles/rsuite-default.css";

import { Router, Route, Switch } from "react-router-dom";
import { customHistory } from "common/history";

import { Home } from "routes/guest/home/home";
import SectionDetail from "routes/guest/section-detail/section-detail";
import { MovieDetail } from "routes/guest/movie-detail/movie-detail";

import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { RootReducer } from "redux/reducer";

const store = createStore(RootReducer, composeWithDevTools());

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Router history={customHistory}>
          <Route path="/" exact component={Home}></Route>
          <Switch>
            <Route
              path="/movie-detail/:id"
              exact
              component={MovieDetail}
            ></Route>
          </Switch>
          <Route
            path="/section-detail/:type"
            exact
            component={SectionDetail}
          ></Route>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
