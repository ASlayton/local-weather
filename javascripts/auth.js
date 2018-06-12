const {setUID,} = require('./firebaseApi');

const checkForUser = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUID(user.uid);
      // User is signed in.
      $('#login-form, #login-btn').addClass('hide');
      $('#logout-btn, #search-container').removeClass('hide');
    } else {
      // No user is signed in.

    };
  });
};

const authEvents = () => {
  $('#signin-btn').click((e) => {
    e.preventDefault();
    const email = $('#inputEmail').val();
    const pass = $('#inputPassword').val();
    firebase.auth().signInWithEmailAndPassword(email, pass)
      .catch((error) => {
        $('#signin-error-msg').text(error.message);
        $('#signin-error').removeClass('hide');
        console.error(error.message);
      });
  });

  $('#register-btn').click(() => {
    const email = $('#registerEmail').val();
    const pass = $('#registerPassword').val();
    firebase.auth().createUserWithEmailAndPassword(email, pass).catch((error) => {
      $('#register-error-msg').text(error.message);
      $('#register-error').removeClass('hide');
      console.error(error.message);
    });
  });

  $('#register-link').click(() => {
    $('#login-form').addClass('hide');
    $('#registration-form').removeClass('hide');
  });

  $('#signin-link').click(() => {
    $('#login-form').removeClass('hide');
    $('#registration-form').addClass('hide');
  });

  $('#logout-btn').click(() => {
    firebase.auth().signOut().then(() => {
    })
      .then(() => {
        $('#login-form').removeClass('hide');
        $('#logout-btn').addClass('hide');
        $('#search-container, #single-weather-stuff, #extended-weather-stuff, #city-name, #button-container').addClass('hide');
      })
      .catch((error) => {
      // An error happened.
        console.error(error);
      });
  });
};

module.exports = {
  checkForUser,
  authEvents,
};
