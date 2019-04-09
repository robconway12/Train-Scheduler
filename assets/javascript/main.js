$(document).ready(function() {

	const currentTime = moment().format('HH:mm:ss a');

	$('#clock').text(currentTime);

	function update() {
		$('#clock').text(moment().format('HH:mm a'));
	}

	setInterval(update, 1000);

	var database = firebase.database();

// 2. Button for adding trains
$("#addTrain").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
	const name = $('#train-name').val().trim();
	const destination = $('#destination').val().trim();
	const time = moment($('#train-time').val().trim()).format("HH:mm");
	const frequency = $('#frequency').val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: name,
    destination: destination,
    time: time,
    frequency: frequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.frequency);
  console.log(newTrain.time);

  alert("Train successfully added!");

  // Clears all of the text-boxes
  $("#train-name").val("");
  $("#destination").val("");
  $("#train-time").val("");
  $("#frequency").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var name2 = childSnapshot.val().name;
  var destination2 = childSnapshot.val().destination;
  var frequency2 = childSnapshot.val().frequency;
  var time2 = childSnapshot.val().time;

  //Time difference calculated
  var timeDifference = moment().diff(moment(time2), "minutes");
  console.log("Difference: " + timeDifference);

  // Time remaining
  var remainder = timeDifference % frequency2;
  console.log(remainder);

    // Minute Until Train
  var minsAway = frequency2 - remainder;
  console.log("Minutes away: " + minsAway);

  // Next Train
  var nextTrain = moment().add(minsAway, "minutes");
  console.log("Arrives: " + moment(nextTrain).format("HH:mm"));
  
  var nextArrival = moment(nextTrain).format("HH:mm");

  // train Info
  console.log(name2);
  console.log(destination2);
  console.log(frequency2);
  console.log(time2);
  console.log(nextArrival);
  console.log(minsAway);

   // Display On Page
   $("#train-schedule-body").append(
    ' <tr><td>' + name2 +
    ' </td><td>' + destination2 +
    ' </td><td>' + frequency2 +
    ' </td><td>' + time2 +
    ' </td><td>' + nextArrival +
    ' </td><td>' + minsAway + '</td></tr>');

});

});