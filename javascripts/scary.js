const saveScary = (e) => {
  console.log('oooo, scary');
  $(e.target).closest('div').addClass('scary');
};

module.exports = {
  saveScary,
};
