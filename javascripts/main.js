const events = require('./events');
const promises = require('./promise');

const initializer = () => {
  events.initEvents();
  promises.retrieveKeys();
};

initializer();
