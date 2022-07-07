const URL_BACKEND_TOP = window.location.hostname.includes('localhost')
  ? 'http://localhost:8080'
  : 'https://skyflix-seven.herokuapp.com';

//const URL_TEST = 'https://www.wswork.com.br/cars.json';
//const URL_TEST = 'https://viacep.com.br/ws/RS/montenegro/ramiro/json';
const URL_TEST = 'https://lf-telegrambot-users.herokuapp.com/cars';

export default {
  URL_BACKEND_TOP, URL_TEST,
};
