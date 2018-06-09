const deleteCard = (e) => {
  const cardToRemove = $(e.target).closest('.weatherCard').data('firebaseId');
  console.log(cardToRemove);
};

module.exports = {
  deleteCard,
};
