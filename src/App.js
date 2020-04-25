import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import classes from './App.module.css';
import LoginPage from './Components/LoginPage/Login';
import UserInfo from './Components/UserInfo/UserInfo';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <BrowserRouter>
        <div className={classes.mainContainer}>
          <Switch>

            <Route path="/userinfo" component={UserInfo} />
            <Route path="/" component={LoginPage} />
          </Switch>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;

