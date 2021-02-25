class LocalServ {
  getFavorites() {
    return JSON.parse(localStorage.getItem('favorites'));
  }

  setFavorite(value) {
    const favorites = this.getFavorites();
    let arr = [];
    if (!favorites) {
      arr.push(value);
      localStorage.setItem('favorites', JSON.stringify(arr));
      return;
    } else {
      favorites.push(value);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }

  findDoubleFav(name) {
    const favorites = this.getFavorites();
    return favorites.find(f => f.name === name);
  }

  removeFavorite(name) {
    const favorites = this.getFavorites();
    return favorites.filter(f => f.name !== name);
  }
}

const localServ = new LocalServ();
export default localServ;
