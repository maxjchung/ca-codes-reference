var CodeBrowser = (function () {


	// Private members
	function init() {
		showAllCategories();
	}

	function showAllCategories() {

		$.ajax({
			url: 'http://verbar.herokuapp.com/rest/json',
			success: function(response) {

				console.log(response);
				var categories = getCategories(response);

				// TODO: Update the UI with the categories

				var i = 0;
				for (i ; i < categories.length; i++) {
					$('.results').append(categories[i].title);
					$('.results').append("<br/>");
				}
			}
		});
	}


	function getCategories(jsonResponse) {
		var codes = jsonResponse.codesAvailable;
		return codes;
	}


	// Public interface
	return {
		init: init
	}

})();

CodeBrowser.init();
