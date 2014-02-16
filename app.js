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

				var i = 0;
				for (i ; i < categories.length; i++) {
					$('.results').append(getCategoryLink(categories[i].title, categories[i].fullFacet));
					$('.results').append("<br/>");
				}
			}
		});
	}


	function getCategoryLink(text, category) {
		var url = 'http://verbar.herokuapp.com/rest/json' + '?path=' + category;

		return $('<a>',{
		    text: text,
		    href: url
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
