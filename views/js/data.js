(function() {
	/**
	*Variables Instantiation
	*/
	var app = firebase.database().ref();
	var token = localStorage.token;
	var deptSelect = document.getElementById('department'),
	  	prioritySelect = document.getElementById('priority'),
	  	dept = deptSelect.options[deptSelect.selectedIndex].value,
	  	priority = prioritySelect.options[prioritySelect.selectedIndex].value;
	var submit = document.getElementById('submit');
	
	/**
	*Event Listener that executes as soon as the page loads
	*It calls the Database class method getData() to fetch issues
	*/
	window.addEventListener('load', e =>{
		e.preventDefault();
		var dataCapt = new Database(token);
		dataCapt.getData();
	});
    
	/**
	*Event Listener that gets fired when user reports issue
	*It calls the Database class method postData()
	*/
	submit.addEventListener('click', e => {
		e.preventDefault();
		var dataPost = new Database(token);
		dataPost.postData();
	});


/**
* Class that handles retrieving and postind of user daata
*/
	class Database {

		/**
		*Constructor that takes in token as argument so that user is always logged in before been able to access the class methods
		*@param token
		*/

		constructor(token){
			this.token= token;
		}

		/**
		*Method that handle data post by user
		*It takes no argument but strongly relies on token for it's operation
		*/

		postData() {

			if (this.token!== undefined) {
				var userData = app.child('issues/' +localStorage.token);
        		
        		userData.push({
        			title:document.getElementById('title').value,
        			description:document.getElementById('desc').value,
        			department:deptSelect.options[deptSelect.selectedIndex].value,
        			priority:prioritySelect.options[prioritySelect.selectedIndex].value,
        			status:'open'
        		});
        		location.reload();
        	}
        	else{
        		alert('You are currently not logged in!!');
        	}
		}

		/**
		*Method for fetchind data from database
		*Relies on token for its operation too
		*/

		getData() {

			if (this.token !== undefined){
				var userData = app.child('issues/' +localStorage.token);

			    userData.on('value', function(data){
			    	
				    data.forEach(function(childData) {
				        document.getElementById('dataTitle').innerHTML += (childData.val().title +'</br >');
				        document.getElementById('dataDesc').innerHTML += (childData.val().description +'</br >');
				        document.getElementById('dataDept').innerHTML += (childData.val().department +'</br >');
				        document.getElementById('dataPriot').innerHTML += (childData.val().priority +'<br/ >');
				        document.getElementById('dataStat').innerHTML += (childData.val().status +'</br >');
				        console.log(childData.val().title);
				    });
				    
		        });
		    }
		    else{
				alert('You are currently not logged in');
				window.location.href = '/';
			}
		}

	}
}())