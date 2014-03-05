var CodeBrowser = (function () {

	var currentCategoryPath;

	var $results = $('.results');
	
	var $searchTextbox = $('.search-text');
	var $searchButton = $('.search-button');


	var ApiUrl = {
		allCategories: 'http://verbar.herokuapp.com/rest/json?path=penal-0',
		singleCategory: 'http://verbar.herokuapp.com/rest/json?path=',
		base: 'http://verbar.herokuapp.com/rest/json?'
	}

	// Private members
	function init() {
		showAllCategories();
		initSearchControls();
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
		    click: function() {
		    	var $clickedLink = $(this);
		    	updateResultsList($clickedLink);
		    	setCurrentCategoryPath(category);
		    }
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

	function updateResultsList($clickedLink) {

		var category = $clickedLink.data('categoryPath');
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

	function initSearchControls() {
		$searchButton.click(doSearch);
	}

	function doSearch() {

		var searchTerm = $searchTextbox.val();
		var path = getCurrentCategoryPath();
		var searchUrl = getSearchUrl(path, searchTerm);

		// TODO: implement me
		// TODO: implement me		
		// TODO: implement me		
	}

	function getSearchUrl(fullFacet, searchTerm) {
		return ApiUrl.base + "path=" + fullFacet + "&term=" + searchTerm;
	}

	function getSearchResults(searchUrl) {


		$.ajax({
			url: searchUrl,
			success: function(response) {
				clearResultsArea();

				// Development only
				$results.append(
					$('<a>').href(searchUrl).text('searchUrl')
				);

			}
		});
	}

	function getCurrentCategoryPath() {
		return currentCategoryPath;
	}

	function setCurrentCategoryPath(path) {
		currentCategoryPath = path;
	}

	// Public interface
	return {
		init: init
	}

})();

CodeBrowser.init();