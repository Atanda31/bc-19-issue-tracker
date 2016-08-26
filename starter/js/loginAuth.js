(function() {

  var config = {

    apiKey: "AIzaSyAOgI44K8i_fEIAMfMI0NXBFxRSWL5KYYE",
    authDomain: "issue-tracker-371c3.firebaseapp.com",
    databaseURL: "https://issue-tracker-371c3.firebaseio.com",
    storageBucket: "issue-tracker-371c3.appspot.com",
    };


    firebase.initializeApp(config);
          
    var login = document.getElementById('login');

      var auth = firebase.auth();
        login.addEventListener('click', e => {
          var email = document.getElementById('email').value,
              password = document.getElementById('password').value
          e.preventDefault();
          auth.signInWithEmailAndPassword(email, password).then((user)=>{
            const token = user.uid;
            firebase.auth().onAuthStateChanged(function(user) {
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
        });
       
}())