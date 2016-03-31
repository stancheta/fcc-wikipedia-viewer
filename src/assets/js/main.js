/* global $*/
var wikiViewer = (function() {
  var urlBase = 'https://en.wikipedia.org/';
  var urlQuery = 'w/api.php?action=query&format=json' +
    '&callback=?&prop=extracts&meta=&generator=search&exsentences=1' +
    '&exlimit=max&exintro=1&explaintext=1&gsrprop=snippet&gsrsearch=';

  /**
   * sets event handlers for search input and associated button
   */
  function setSearch() {
    var $searchForm = $('#search-form');
    $('#submit-search').on('click', function() {
      this.blur();
      var searchValue = $searchForm.val();
      var url = urlBase + urlQuery + searchValue;
      getData(url, setData);
      $searchForm.val('');
    });
    $searchForm.keypress(function(event) {
      if (event.which == 13) {
        event.preventDefault();
        $(this).blur();
        var searchValue = $(this).val();
        var url = urlBase + urlQuery + searchValue;
        getData(url, setData);
        $(this).val('');
      }
    });
  }

  /**
   * sets html elts for returned data
   * @param {string} data stringified JSON containing Wikipedia data on query
   */
  function setData(data) {
    // var data = JSON.stringify(result.query.pages);

  }

  /**
   * gets JSONP for a given url
   * @param {string} url formatted url for wikipedia
   * @param {function} callback intended to be setData to deal with JSONP
   */
  function getData(url, callback) {
    $.getJSON(url, function(result) {
      var data = JSON.stringify(result);
      console.log(data);
      callback(data);
    });
  }
  /**
   * sets up dynamic features for the webpage
   */
  function init() {
    setSearch();
  }

  return {
    init: init
  };
})();

wikiViewer.init();
