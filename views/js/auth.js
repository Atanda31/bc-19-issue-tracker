(function() {

  var config = {
    apiKey: "AIzaSyAOgI44K8i_fEIAMfMI0NXBFxRSWL5KYYE",
    authDomain: "issue-tracker-371c3.firebaseapp.com",
    databaseURL: "https://issue-tracker-371c3.firebaseio.com",
    storageBucket: "issue-tracker-371c3.appspot.com"
  };

  firebase.initializeApp(config);

  var login = document.getElementById('login');
  var social = document.getElementById('google');
  var facebook = document.getElementById('facebook');
  var logout = document.getElementById('logout');
  var provider = new firebase.auth.GoogleAuthProvider();
  var auth = firebase.auth();

  /**
  *Event Listener for logging in
  *It calls the Authenticate class method logIn()
  */
  login.addEventListener('click', e => {
    e.preventDefault();
    var email = document.getElementById('email').value,
        password = document.getElementById('password').value;
    var signIn = new Authenticate();
       signIn.logIn(email,password);
       
    });

  social.addEventListener('click', e =>{
    e.preventDefault();
    let googleLogIn = new Authenticate();
    googleLogIn.googleAuth();
  });

  facebook.addEventListener('click', e =>{
    e.preventDefault();
    let fbLogIn = new Authenticate();
    fbLogIn.facebookAuth();
  });

  /**
  *Event Listener that logs user out
  *It calls the Authenticate class method logOut()
  */
  logout.addEventListener('click', e => {
    e.preventDefault();
    var signOut = new Authenticate();
    signOut.logOut();
  });
  
/**
*Authenticate class that verifies credentials provided by user and throws an error if wrong credentials
*Handles signout too
*/
  class Authenticate {

    /**
    *Method that verifies user credentials and logs them in or throws error
    *@param email, password
    */
    logIn(email,password) {
      auth.signInWithEmailAndPassword(email, password).then((user)=>{
        let token = user.uid;
        auth.onAuthStateChanged(function(user) {
          if (user) {
            localStorage.token = token;
            console.log(user);
            alert("You are now Signed In");
            window.location.href = "/dashboard";
          }
          else {
              window.location.href = "#";
            }
        });
      }).catch((e)=>{
          alert(e.message);
          console.log(e);
        });
    }

    googleAuth() {
      auth.signInWithPopup(provider).then(function(result) {

        provider.addScope('https://www.googleapis.com/auth/plus.login');
        // The signed-in user info.
        let user = result.user;
        auth.onAuthStateChanged(function(user) {
          let token = user.uid;
          if (user) {
            localStorage.token = token;
            console.log(user);
            alert("You are now Signed In");
            window.location.href = "/dashboard";
          }
          else {
              window.location.href = "#";
            }
        });
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    }

    facebookAuth() {
      var provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
        let user = result.user;
        auth.onAuthStateChanged(function(user) {
          let token = user.uid;
          if (user) {
            localStorage.token = token;
            console.log(user);
            alert("You are now Signed In");
            window.location.href = "/dashboard";
          }
          else {
              window.location.href = "#";
            }
        });
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    }

    /**
    *Method that signs user out and return them to home page
    */

    logOut(){

      localStorage.removeItem('token');
      firebase.auth().signOut().then(function() {
        window.location.href = "/";
        }, function(error) {
        console.log(error.message);
      });
    }
  }

}());