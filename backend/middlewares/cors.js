// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'https://olgaliubar.students.nomoredomains.monster',
  'http://api.olgaliubar.students.nomoredomains.monster',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = function cors(req, res, next) {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  // const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  // const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  }

  next();
};
