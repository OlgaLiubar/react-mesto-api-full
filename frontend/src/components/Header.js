import headerLogo from '../images/headerLogo.svg';
import React from "react";
import { Route, Switch, Link } from 'react-router-dom';


function Header(props) {

  return (
    <header className="header">
      <img src={headerLogo} alt="Mesto" className="header__logo" />
      <Switch>
        <div className="header__auth-container">
          <Route exact path="/">

            <p className="header__auth">{props.email}</p>
            <Link
              to="/sign-in"
              onClick={props.handleLogout}
              className="link link_header"
            >Выйти</Link>

          </Route>

          <Route path="/sign-in">
            <Link to="/sign-up" className="link link_header">Зарегистрироваться</Link>
          </Route>

          <Route path="/sign-up">
            <Link to="/sign-in" className="link link_header">Войти</Link>
          </Route>
        </div>
      </Switch>

    </header>
  );
}

export default Header;