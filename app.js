var CodeBrowser = (function () {

	var $results = $('.results');

	var ApiUrl = {
		allCategories: 'http://verbar.herokuapp.com/rest/json?path=penal-0',
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
				var subcategories = getSubcategoriesFromJson(response);
				renderLinksFromCategories(subcategories);
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

		clearResultsArea();
		showLoadingMessage();

		$.ajax({
			url: url,
			success: function(response) {
				clearResultsArea();
				if(hasNoMoreSubcategories(response)) {
					renderSectionTexts(response);
				}
				else {
					var subcategories = getSubcategoriesFromJson(response);
					renderLinksFromCategories(subcategories)
				}
			}
		});
	}

	function renderLinksFromCategories(categories) {
		var i = 0;
		for (i ; i < categories.length; i++) {
			$results.append(getCategoryLink(categories[i].title, categories[i].fullFacet));
			$results.append("<br/>");
		}
	}

	function renderSectionTexts(response) {
		var sections = response.sectionTextList;

		var i = 0;
		for (i ; i<sections.length ; i++) {
			$results.append($('<p>').text(sections[i].text));
		}
	}

	function showLoadingMessage() {
		$results.append("Loading...");
	}

	function clearResultsArea() {
		$results.empty();
	}

	function hasNoMoreSubcategories(response) {
		return 'TERMINATE' == response.state;
	}

	// Public interface
	return {
		init: init
	}

})();

CodeBrowser.init();