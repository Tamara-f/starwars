import React, { Component } from 'react';
import { allFetch, filmsFetch, fetchApiQuery } from '../../services/FetchApi';
import swal from 'sweetalert';
import { Favorite } from '@material-ui/icons';

import Spinner from '../Loader';
import LocalServ from '../LocalService/LocalService';
import getDetails from './GetDetails';
import s from './CharDetails.module.css';

export default class CharDetails extends Component {
  state = {
    character: [],
    vehicles: [],
    films: [],
    homeworld: '',
    isLoading: true,
    // active: false,
  };

  async componentDidMount() {
    try {
      this.setState({ homeworld: this.props.location.propsHome }); ////planet

      await allFetch('vehicles').then(vehicles => {
        //////vehicles
        this.setState({ vehicles });
      });
      await filmsFetch().then(films => {
        //////films
        this.setState({ films });
      });

      const currentName = this.props.location.pathname.split('/')[2]; //////character
      await fetchApiQuery(currentName).then(data => {
        const character = data[0];

        this.setState({ character });
        this.setState({ isLoading: false });
      });
      ////like
    } catch (error) {
      console.log(error);
    }
  }

  setLike() {
    if (localStorage.favorites) {
      return LocalServ.findDoubleFav(this.state.character.name)
        ? 'like'
        : 'notLike';
    } else return 'notLike';
  }

  toggleClass = async e => {
    const likeBtn = e.currentTarget;
    if (likeBtn.className === 'notLike') {
      LocalServ.setFavorite(this.state);
    } else {
      swal('Character removed from favorites!');
      const newFavorites = LocalServ.removeFavorite(this.state.character.name);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
    likeBtn.classList.toggle('like');
    likeBtn.classList.toggle('notLike');
  };

  render() {
    const {
      name,
      height,
      mass,
      hair_color,
      skin_color,
      eye_color,
      birth_year,
      gender,
      vehicles,
      films,
    } = this.state.character;
    const { isLoading, homeworld } = this.state;

    return (
      <div className={s.characterDet}>
        <h2>{isLoading ? <Spinner /> : 'Character Details'}</h2>
        <p className={`${this.setLike()}`} onClick={this.toggleClass}>
          <Favorite />
        </p>
        <p>
          <span> name: </span> {name}
        </p>
        <p>
          <span> height: </span>
          {height}
        </p>
        <p>
          <span> mass: </span> {mass}
        </p>
        <p>
          <span> hair color: </span> {hair_color}
        </p>
        <p>
          <span> skin color: </span> {skin_color}
        </p>
        <p>
          <span> eye color: </span> {eye_color}
        </p>
        <p>
          <span> birth year: </span> {birth_year}
        </p>
        <p>
          <span> gender: </span> {gender}
        </p>
        <p>
          <span> homeworld: </span> {homeworld}
        </p>
        <p>
          <span> vehicles: </span> {getDetails(`${vehicles}`, this.state)}
        </p>
        <p>
          <span> films: </span> {getDetails(`${films}`, this.state)}
        </p>
      </div>
    );
  }
}
