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

  login.addEventListener('click', e => {
    e.preventDefault();
    var email = document.getElementById('email').value,
        password = document.getElementById('password').value;
    var signIn = new Authenticate();
       signIn.logIn(email,password);
       
    });

  logout.addEventListener('click', e => {
    e.preventDefault();
    var signOut = new Authenticate();
    signOut.logOut();
  });
  

  class Authenticate {

    logIn(email,password) {
      auth.signInWithEmailAndPassword(email, password).then((user)=>{
        const token = user.uid;
        auth.onAuthStateChanged(function(user) {
          if (user) {
            localStorage.token = token;
            console.log(user);
            alert("You are now Signed In");
            window.location.href = "/dashboard";
          } else {
              window.location.href = "#";
            }
        });
      }).catch((e)=>{
          alert(e.message);
          console.log(e);
        });
    }

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