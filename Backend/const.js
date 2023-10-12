const codesError = {
  INCORRECT_DATA: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND_DATA: 404,
  CONFLICT: 409,
  DEFAULT: 500,
};

const errorMessages = {
  INCORRECT_DATA: 'Некорректные данные',
  UNAUTHORIZED: 'Необходима авторизация',
  FORBIDDEN: 'Доступ запрещен',
  NOT_FOUND_DATA: 'Данные не найдены',
  WRONG_PATH: 'Такого пути у сервера нет',
  CONFLICT: 'Данные уже существуют',
  DEFAULT: 'На сервере произошла ошибка',
  UNAUTHORIZED_AUTH: 'Неправильные почта или пароль',
  INVALID_EMAIL: 'Некорректный адрес почты',
  INVALID_URL: 'Некорректная ссылка',
};

const LINK_REG_EXP = /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/;

module.exports = { codesError, errorMessages, LINK_REG_EXP };
