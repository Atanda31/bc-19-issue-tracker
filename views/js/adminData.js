(function (){
/**
*Variable initialization
*/
	var token = localStorage.token;
/**
*Event Listener that executes the getIssues() method of AdminData class
*/
	window.addEventListener('load', e =>{
		e.preventDefault();
		var data = new AdminData(token);
		data.getIssues();
	});
/**
*AdminData class that fetches data based on the admin's department
*/
	class AdminData {
/**
*Construct that accepts token as parameter
*@param token
*/
		constructor(token){
			this.token = token;
		}

		getIssues(){

			if(this.token !== undefined) {
				console.log(this.token);

				firebase.database().ref('issues/').on('child_added', function(snapshot){
					snapshot.forEach(function(childSnapshot) {
						var user = firebase.auth().currentUser;
						if (childSnapshot.val().department === user.photoURL){
							var dataShot = childSnapshot.val();
							console.log(dataShot);
							document.getElementById('title').innerHTML += (childSnapshot.val().title + '</br >');
							document.getElementById('desc').innerHTML += (childSnapshot.val().description + '</br >');
							document.getElementById('dept').innerHTML += (childSnapshot.val().department + '</br >');
							document.getElementById('prio').innerHTML += (childSnapshot.val().priority + '</br >');
							document.getElementById('stat').innerHTML += (childSnapshot.val().status + '</br >');
						}
					});
				});
			}
		}
	}
}())
