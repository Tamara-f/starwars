export default function getDetails(value, state) {
  if (value === 'undefined' || value === undefined || !value) {
    return 'no results';
  } else {
    const arrV = value.split(',');

    if (arrV[0].split('/')[4] === 'vehicles') {
      const newV = arrV.map(el => state.vehicles.find(e => e.url === el).name);
      return newV.join(', ');
    }

    if (arrV[0].split('/')[4] === 'films') {
      const allStrF = arrV.map(el => state.films.find(e => e.url === el).title);
      return allStrF.join(', ');
    }
  }
}
