var CodeBrowser = (function () {


	// Private members
	function init() {
		showAllCategories();
	}

	function showAllCategories() {

		$.ajax({
			url: 'http://verbar.herokuapp.com/rest/json',
			success: function(response) {

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
		    href: '#',
		    click: updateResultsList
		}).data('categoryPath', category);
	}

	function getCategories(jsonResponse) {
		var codes = jsonResponse.codesAvailable;
		return codes;
	}

	function getSubcategoriesFromJson(jsonResponse) {
		var codes = jsonResponse.subcodeList;
		return codes;
	}

	function updateResultsList() {

		var category = $(this).data('categoryPath');
		var url = 'http://verbar.herokuapp.com/rest/json' + '?path=' + category;

		$('.results').empty();
		$('.results').append("Loading...");


		$.ajax({
			url: url,
			success: function(response) {

				$('.results').empty();

				var subcategories = getSubcategoriesFromJson(response);

				var i = 0;
				for (i ; i < subcategories.length; i++) {
					$('.results').append(getCategoryLink(subcategories[i].title, subcategories[i].fullFacet));
					$('.results').append("<br/>");
				}
			}
		});
	}

	// Public interface
	return {
		init: init
	}

})();

CodeBrowser.init();