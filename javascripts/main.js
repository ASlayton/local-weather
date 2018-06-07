const events = require('./events');
const apiKeys = require('./apiKeys');

const initializer = () => {
  events.initEvents();
  apiKeys.retrieveKeys();
};

initializer();
