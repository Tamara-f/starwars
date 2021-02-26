import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { ArrowUpwardSharp } from '@material-ui/icons';
import { Favorite } from '@material-ui/icons';

import Spinner from '../Loader';
import Button from '../ButtonLoadMore';
import Searchbar from '../Searchbar/Searchbar';
import LocalServ from '../LocalService/LocalService';
import { charFetchApi, allFetch, fetchApiQuery } from '../../services/FetchApi';

import s from './Characters.module.css';

export default class Characters extends Component {
  state = {
    characters: [],
    planets: [],
    isLoading: false,
    searchQuery: '',
    page: 2,
    error: null,
    showBtn: true,
    showAll: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    await allFetch('planets').then(planets => {
      this.setState({ planets });
      this.fetchApi();
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;

    if (prevQuery !== nextQuery) {
      this.fetchCharacterByQuery();
      this.setState({ loading: true });
    }
  }

  fetchApi() {
    charFetchApi()
      .then(data => data.results)
      .then(characters => this.setState({ characters }))
      .catch(error => this.setState({ error }))
      .finally(() => {
        if (this.state.isLoading) {
          this.setState({ isLoading: false });
        }
      });
  }

  fetchCharacterByQuery = () => {
    const { searchQuery } = this.state;
    fetchApiQuery(searchQuery)
      .then(characters => {
        if (!characters) {
          this.fetchApi();
          return;
        }
        if (characters.length <= 10) {
          this.setState({ showBtn: false, showAll: true });
        }
        this.setState(prevState => ({
          characters: [...prevState.characters, ...characters],
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  handleSearchQuery = query => {
    if (!query || query === ' ') {
      swal('Please provide more info');
      return;
    }
    this.setState({ searchQuery: query, characters: [] });
  };

  fetchNextCharacters = async () => {
    this.setState({ isLoading: true });
    await charFetchApi(this.state.page)
      .then(data => data.results)
      .then(characters => {
        if (characters.length < 10) {
          this.setState({ showBtn: false });
        }
        this.setState(prevState => ({
          characters: [...prevState.characters, ...characters],
          page: prevState.page + 1,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.setState({ isLoading: false });
        this.scroll();
      });
  };

  scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  toggleClass = async e => {
    const currentName =
      e.currentTarget.parentNode.childNodes[1].childNodes[0].textContent;
    const likeBtn = e.currentTarget;
    if (likeBtn.className === 'notLike') {
      const currentCharacter = this.state.characters.find(
        character => character.name === currentName
      );
      currentCharacter.homeworld =
        e.currentTarget.parentNode.childNodes[1].childNodes[2].childNodes[1].textContent;

      LocalServ.setFavorite(currentCharacter);
    } else {
      swal('Character removed from favorites!');
      const newFavorites = LocalServ.removeFavorite(currentName);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
    likeBtn.classList.toggle('like');
    likeBtn.classList.toggle('notLike');
  };

  getHome = homeworld => {
    try {
      const num = homeworld.substr(-3).split('/').join('') - 1;
      const planet = this.state.planets[num];
      if (planet == undefined) {
        return homeworld;
      }
      return planet.name;
    } catch (e) {
      console.log(e);
      return homeworld;
    }
  };

  onBtnUp() {
    window.scrollTo(0, 0);
  }
  onBtnAll = async () => {
    await this.fetchApi();
    this.setState({ showBtn: true, showAll: false });
  };

  setLike(name) {
    if (localStorage.favorites) {
      return LocalServ.findDoubleFav(name) ? 'like' : 'notLike';
    } else return 'notLike';
  }

  render() {
    const { characters, isLoading, error, showBtn, showAll } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleSearchQuery} />
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && <Spinner />}
        {characters.length > 0 && (
          <>
            <h1>Star Wars Characters</h1>
            <ul className={s.charactersList}>
              {characters.map(character => (
                <li className={s.charactersListItem} key={character.name}>
                  <p
                    className={`${this.setLike(character.name)}`}
                    onClick={this.toggleClass}
                  >
                    <Favorite />
                  </p>
                  <Link
                    to={{
                      pathname: `/character/${character.name}`,
                      propsHome: `${this.getHome(`${character.homeworld}`)}`,
                    }}
                  >
                    <h2>{character.name}</h2>
                    <p>
                      <span>gender: </span>
                      {character.gender}
                    </p>
                    <p>
                      <span>homeworld: </span>
                      {this.getHome(`${character.homeworld}`) ||
                        `${character.homeworld}`}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
            {showAll && <button onClick={this.onBtnAll}>All Characters</button>}
            {showBtn && <Button onClick={this.fetchNextCharacters} />}
            <p className={s.up} onClick={this.onBtnUp}>
              <ArrowUpwardSharp />
            </p>
          </>
        )}
      </>
    );
  }
}
