(function () {
	var config = {

    apiKey: "AIzaSyAOgI44K8i_fEIAMfMI0NXBFxRSWL5KYYE",
    authDomain: "issue-tracker-371c3.firebaseapp.com",
    databaseURL: "https://issue-tracker-371c3.firebaseio.com",
    storageBucket: "issue-tracker-371c3.appspot.com",
    };

    firebase.initializeApp(config);

	var logout = document.getElementById('logout')

	logout.addEventListener('click', e => {
		e.preventDefault();
		localStorage.removeItem('token');
		firebase.auth().signOut().then(function() {
			  window.location.href = "/";
			}, function(error) {
			  console.log(error.message);
			});
	});

}());