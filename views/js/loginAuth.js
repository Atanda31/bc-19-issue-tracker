(function() {
  var config = {
    apiKey: "AIzaSyAOgI44K8i_fEIAMfMI0NXBFxRSWL5KYYE",
    authDomain: "issue-tracker-371c3.firebaseapp.com",
    databaseURL: "https://issue-tracker-371c3.firebaseio.com",
    storageBucket: "issue-tracker-371c3.appspot.com"
  };
  firebase.initializeApp(config);
  var login = document.getElementById('login');
  var auth = firebase.auth();

  register.addEventListener('click', e => {

    var email = document.getElementById('email').value,
        password = document.getElementById('password').value;

        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then(user)=>{

          auth.onAuthStateChanged(function(user) {
            if (user) {

              alert("Your profile has been succesfully created & You are now Signed In");
              window.location.href = "/home";

            } else {

              alert("Invalid Username or password");
              window.location.href = "#";
            }
          });
        }
        .catch(function(error) {

          if(error){

            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            
          }
        });
  });
  
}());