var express = require('express');
var router = express.Router();

// GET home page
router.get('/', function(request, response, next) {
  response.render('index');
});

// GET result page
router.get('/:input', function(request, response) {

	function getNaturalDate(unix) {
		var date = new Date(unix * 1000);
		var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

		var day = date.getDate();
		var month = months[date.getMonth()];
		var year = date.getFullYear();

		var naturalDate = day + ' ' + month + ' ' + year;
		return naturalDate;
	}

	if(!isNaN(request.params.input)) {
		var naturalDate = getNaturalDate(request.params.input);
		var data = { unix: request.params.input, natural: naturalDate };
		response.json(data);
	} else {
		var natInput = new Date(request.params.input);
		if(!isNaN(natInput)) {
			var unix = natInput / 1000;
			var data = { unix: unix, natural: request.params.input }
			response.json(data);
		} else {
			response.json({ unix: null, natural: null });
		} 
	}
})
 
module.exports = router;
