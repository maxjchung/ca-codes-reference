var CodeBrowser = (function () {

	// Private members
	function getAllCategories() {
		console.log("called getAllCategories()")
		return $.ajax('http://verbar.herokuapp.com/rest/json?select=all');
	}

	// Public interface
	return {
		getAllCategories: getAllCategories
	}

})();

CodeBrowser.getAllCategories();
