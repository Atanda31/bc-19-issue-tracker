(function() {

	var config = {

		apiKey: "AIzaSyAOgI44K8i_fEIAMfMI0NXBFxRSWL5KYYE",
		authDomain: "issue-tracker-371c3.firebaseapp.com",
		databaseURL: "https://issue-tracker-371c3.firebaseio.com",
		storageBucket: "issue-tracker-371c3.appspot.com",
		};


		firebase.initializeApp(config);
				  
		var register = document.getElementById('register');

		var app = firebase.database().ref(),
	  	clients = app.child('users');
	  	var auth = firebase.auth();
        register.addEventListener('click', e => {
        	var email = document.getElementById('email').value,
        	    password = document.getElementById('password').value
        	e.preventDefault();
        	auth.createUserWithEmailAndPassword(email, password).then((user)=>{
            console.log(user);
            console.log(user.uid);
            alert("Your profile has been succesfully created");
            window.location.href = "/";
        }).catch((e)=>{
            console.log(err);
        });

	        clients.push({
				name: document.getElementById('name').value,
				username: document.getElementById('username').value
			});
	    });
	  	 
}())