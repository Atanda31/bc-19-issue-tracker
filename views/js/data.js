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
			        var title = []; 
				    var desc = []; 
				    var stat = [];
				    var priority = []; 
				    var dept = [];
				    var details = [];
				    data.forEach(function(childData) {
				        var newData = childData.val().title;
				        var dataDesc = childData.val().description;
				        var dataDept = childData.val().department;
				        var dataPrio = childData.val().priority;
				        var dataStat = childData.val().status;

				        title.push(newData);
				        desc.push(dataDesc);
				        dept.push(dataDept);
				        priority.push(dataPrio);
				        stat.push(dataStat);
				        details.push({
				          	title:title,
						    description:desc,
						    department:dept,
						    priority:priority,
						    status:stat
						});
		            });
				    for (let i = 0; i<details.length; i++) {
				        var deptData = details[i].department,
				        	titleData = details[i].title,
				        	descData = details[i].description,
				        	prioData = details[i].priority,
				        	statData = details[i].status;
				        document.getElementById('dataTitle').innerHTML += (titleData[i] +'</br >');
				        document.getElementById('dataDesc').innerHTML += (descData[i] +'</br >');
				        document.getElementById('dataDept').innerHTML += (deptData[i] +'</br >');
				        document.getElementById('dataPriot').innerHTML += (prioData[i] +'<br/ >');
				        document.getElementById('dataStat').innerHTML += (statData[i] +'</br >');
				        console.log(titleData[i]);
				    }
		        });
		    }
		    else{
				alert('You are currently not logged in');
				window.location.href = '/';
			}
		}

	}
}())