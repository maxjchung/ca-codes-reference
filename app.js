var CodeBrowser = (function () {


	var ApiUrl = {
		allCategories: 'http://verbar.herokuapp.com/rest/json',
		singleCategory: 'http://verbar.herokuapp.com/rest/json?path='
	}

	// Private members
	function init() {
		showAllCategories();
	}

	function showAllCategories() {

		$.ajax({
			url: ApiUrl.allCategories,
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
		var url = ApiUrl.singleCategory + category;

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
		var url = ApiUrl.singleCategory + category;

		$('.results').empty();
		$('.results').append("Loading...");


		$.ajax({
			url: url,
			success: function(response) {

				console.log(response);

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