(function() {

  var config = {
    apiKey: "AIzaSyAOgI44K8i_fEIAMfMI0NXBFxRSWL5KYYE",
    authDomain: "issue-tracker-371c3.firebaseapp.com",
    databaseURL: "https://issue-tracker-371c3.firebaseio.com",
    storageBucket: "issue-tracker-371c3.appspot.com"
  };

  firebase.initializeApp(config);

  var login = document.getElementById('login');
  var logout = document.getElementById('logout');
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
        const token = user.uid;
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