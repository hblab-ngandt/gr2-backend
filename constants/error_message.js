const ERROR_MESSAGE = {
  500: { message: 'Internal Server Error'},
  404: { message: 'Not Found'},
  401: { message: 'Unauthorized'},
  400: {message: 'Bad Request'},
  invalid_address: { message: 'Invalid Wallet Address'},
};

module.exports = {
  ERROR_MESSAGE,
};
