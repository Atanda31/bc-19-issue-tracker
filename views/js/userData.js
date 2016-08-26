(function() {

				  
		var submit = document.getElementById('submit');

		var app = firebase.database().ref();
	  	var auth = firebase.auth();
	  	var deptSelect = document.getElementById('department'),
	  	    prioritySelect = document.getElementById('priority'),
	  	    dept = deptSelect.options[deptSelect.selectedIndex].value,
	  	    priority = prioritySelect.options[prioritySelect.selectedIndex].value;

        submit.addEventListener('click', e => {
        	e.preventDefault();
        	if (localStorage.token!== undefined) {
        		var userData = app.child('issues/' +localStorage.token);
        		
        		userData.push({

        			title:document.getElementById('title').value,
        			description:document.getElementById('desc').value,
        			department:deptSelect.options[deptSelect.selectedIndex].value,
        			priority:prioritySelect.options[prioritySelect.selectedIndex].value,
        			status:'open'
        		});
        	}
        	else{

        		alert('You are currently not logged in!!');
        	}
        });

}())