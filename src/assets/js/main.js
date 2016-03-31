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
    var $main = $('#main');

    /**
     * helper function to handle operations that would occur
     * during both events.
     */
    function searchEventHandler() {
      var searchValue = $searchForm.val();
      var url = urlBase + urlQuery + searchValue;
      getData(url, setData);
      $searchForm.val('');
      if ($main.hasClass('padding')) {
        $main.removeClass('padding');
        $main.addClass('small-padding');
      }
    }
    // for the search button
    $('#submit-search').on('click', function() {
      this.blur();
      searchEventHandler();
    });
    // for handling the enter key
    $searchForm.keypress(function(event) {
      if (event.which == 13) {
        event.preventDefault();
        $(this).blur();
        searchEventHandler();
      }
    });
  }

  /**
   * sets html elts for returned data
   * @param {string} data JSON containing Wikipedia data of query
   */
  function setData(data) {
    var $wikiList = $('#wiki-list');
    if (data.hasOwnProperty('query')) {
      var fullHtml = '';
      Object.keys(data.query.pages).forEach(function(key) {
        var link = urlBase + '?curid=' + data.query.pages[key].pageid;
        var title = data.query.pages[key].title;
        var extract = data.query.pages[key].extract;

        var wikiDiv = '<a class="no-style" href="' + link +
          '"><div class="wiki-list-elt col-xs-12"><h3>' + title + '</h3><p>' +
          extract + '</p></div></a>';
        console.log(data.query.pages[key]);
        fullHtml += wikiDiv;
      });
      $wikiList.html(fullHtml);
    } else {
      var errorMessage = '<div class="wiki-list-elt col-xs-12"><h3>' +
        "Wikipedia API didn't return anything for" +
        " this query</h3></div>";
      $wikiList.html(errorMessage);
    }
  }

  /**
   * gets JSONP for a given url
   * @param {string} url formatted url for wikipedia
   * @param {function} callback intended to be setData to deal with JSONP
   */
  function getData(url, callback) {
    $.getJSON(url, function(result) {
      callback(result);
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
