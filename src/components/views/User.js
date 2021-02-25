import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Favorite } from '@material-ui/icons';
import swal from 'sweetalert';
import LocalServ from '../LocalService/LocalService';
import s from '../../components/Characters/Characters.module.css';

export default class User extends Component {
  state = {
    user: [],
    characters: [],
  };

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    const characters = JSON.parse(localStorage.getItem('favorites'));
    this.setState({ user });
    this.setState({ characters });
  }
  toggleClass = async e => {
    const likeBtn = e.currentTarget;
    const currentName =
      e.currentTarget.parentNode.childNodes[1].childNodes[0].textContent;

    swal('Character removed from favorites!');
    const newFavorites = LocalServ.removeFavorite(currentName);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));

    likeBtn.classList.toggle('like');
    likeBtn.classList.toggle('notLike');
    this.setState({ characters: newFavorites });
  };

  render() {
    const { user, characters } = this.state;

    return (
      <>
        <h2>Your favorite characters</h2>
        {characters ? (
          <div>
            <ul className={s.charactersList}>
              {characters.map(character => (
                <li className={s.charactersListItem} key={character.name}>
                  <p className='like' onClick={this.toggleClass}>
                    <Favorite />
                  </p>
                  <Link
                    to={{
                      pathname: `/character/${character.name}`,
                      propsHome: `${character.homeworld}`,
                    }}
                  >
                    <h2>{character.name}</h2>
                    <p>
                      <span>gender: </span>
                      {character.gender}
                    </p>
                    <p>
                      <span>homeworld: </span>
                      {character.homeworld}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No favorites yet</p>
        )}
        <Link to='/'>
          <button>All Characters</button>
        </Link>
      </>
    );
  }
}
