//firebase config & initialization
var config = {
	apiKey: "AIzaSyC0k6m4RWPBQRntP4vw8a5UPejxcTFb0go",
    authDomain: "reservation-site-91564.firebaseapp.com",
    databaseURL: "https://reservation-site-91564.firebaseio.com",
    storageBucket: "reservation-site-91564.appspot.com",
    messagingSenderId: "723301457769"
};

firebase.initializeApp(config);

var database = firebase.database();

var reservationData = [];


$('.reservation-form').on('submit', function (e) {
  e.preventDefault();

  var nameInput = $('.reservation-name').val();
  var dayInput = $('.reservation-day').val();

  //Field Validation
  if (nameInput === ""){
  	$('.alert').addClass('error').html("You must enter a name.");
  } else if ( dayInput === "" ) {
  	 $('.alert').addClass('error').html("You must enter a day.");
  }  else {
	  reservationData.name = nameInput;
	  reservationData.day = dayInput;

	  $('.reservation-name').val('');
	  $('.reservation-day').val('');


	  var reservationInfo = database.ref('reservations');
	  reservationInfo.push(reservationData);
  }
});

function getReservations(){
    database.ref('reservations').on('value', function (results) {
      var allReservations = results.val();
      $('.reservations').empty();
      for(var reservation in allReservations){
          var context = {
            name: allReservations[reservation].name,
        	  day: allReservations[reservation].day,
        	  reservationId: reservation
        	};
          
        var source = $("#reservation-template").html();

	      var template = Handlebars.compile(source);

	      var reservationListItem = template(context);

	    $('.reservations').append(reservationListItem);
    	}
    });
}

getReservations();

//Cancel Reservation
$('.reservations').on('click','.remove', function (e) {
    e.preventDefault();
   var id = $(e.target).parent().parent().data('id');
  // var commentReference = database.ref('reservations/' + id)
  //commentReference.remove();

		// We are still referencing the same database ref. We need to use the child method
		// to target the data we want to delete
	  var reservationInfo = database.ref('reservations');
		reservationInfo.child(id).remove();
});




//google map
function initMap(){
	var map = new google.maps.Map(document.getElementById('map'), {
	    center: {lat: 40.8054491, lng: -73.9654415},
	    zoom: 18,
  	});
	var marker = new google.maps.Marker({
		position: {lat: 40.8054491, lng: -73.9654415},
		map: map
	});
}
