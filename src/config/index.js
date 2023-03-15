const URL_BACKEND_TOP = window.location.hostname.includes('localhost')
  ? 'http://localhost:8080'
  : 'https://23bd-134-122-114-20.ngrok.io';

//const URL_TEST = 'https://www.wswork.com.br/cars.json';
//const URL_TEST = 'https://viacep.com.br/ws/RS/montenegro/ramiro/json';
const URL_TEST = 'https://23bd-134-122-114-20.ngrok.io/categorias';

export default {
  URL_BACKEND_TOP, URL_TEST,
};
