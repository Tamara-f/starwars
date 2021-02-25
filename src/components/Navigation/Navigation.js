import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import swal from 'sweetalert';
import logo from '../../logo.svg';

import routes from '../../routes/routes';
import s from './Navigation.module.css';
import Login from '../views/Login';

export default class Navigation extends Component {
  state = {
    user: [],
    children: this.props.children,
    redirectLogout: false,
  };

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.setState({ user });
  }
  updateData = value => {
    this.setState({ user: value });
  };

  onLogout = () => {
    swal('You have been successfully logged out!');
    this.setState({ user: '' });
    localStorage.removeItem('user');
    this.setState({ redirectLogout: true });
  };

  render() {
    return (
      <>
        {this.state.redirectLogout && <Redirect push to='/' />}
        <div className={s.menu}>
          <div className={s.wrap}>
            <NavLink exact to={routes.home}>
              <img src={logo} width='150' className='App-logo' alt='logo' />
            </NavLink>

            <div className={s.navBtn}>
              {this.state.user ? (
                <>
                  <NavLink exact to={routes.user}>
                    <div className='fb-cont'>
                      <span className='fb-name'>{this.state.user.name}</span>
                      <img
                        src={this.state.user.picture}
                        alt={this.state.user.name}
                        width='40'
                      />
                    </div>
                  </NavLink>
                  <button onClick={this.onLogout}>Logout</button>
                </>
              ) : (
                <Login updateData={this.updateData} />
              )}
            </div>
          </div>
        </div>
        <section>{this.state.children}</section>
      </>
    );
  }
}
