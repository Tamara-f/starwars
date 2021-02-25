import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import routes from '../../routes/routes';

export default class Login extends Component {
  state = {
    isLoggedIn: false,
    userId: '',
    name: '',
    email: '',
    picture: '',
    redirectLogin: false,
  };

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.setState({ name: user.name });
      this.setState({ picture: user.picture });
      this.setState({ isLoggedIn: true });
    } else return null;
  }

  responseFacebook = response => {
    try {
      this.setState({
        isLoggedIn: true,
        userID: response.userID,
        name: response.name,
        email: response.email,
        picture: response.picture.data.url,
      });

      localStorage.setItem('user', JSON.stringify(this.state));

      this.props.updateData(this.state);
      this.setState({ redirectLogin: true });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    let fbContent;
    if (this.state.isLoggedIn) {
      fbContent = (
        <>
          <div className='fb-cont-modal'>
            <img src={this.state.picture} alt={this.state.name} width='50' />
            <p className='fb-name'>Welcome {this.state.name}</p>
          </div>
          <NavLink exact to={routes.user}>
            Go to your Profile
          </NavLink>
        </>
      );
    } else {
      fbContent = (
        <FacebookLogin
          appId='889512418490999'
          fields='name,email,picture'
          cssClass='facebook-button'
          callback={this.responseFacebook}
        />
      );
    }
    return (
      <>
        <div>{fbContent}</div>

        {this.state.redirectLogin ? <Redirect push to='/user' /> : null}
      </>
    );
  }
}
