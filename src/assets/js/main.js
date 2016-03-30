/* global  document XMLHttpRequest $*/
var wikiViewer = (function() {
  var urlBase = 'https://en.wikipedia.org/';
  var urlQuery = 'w/api.php?action=query&format=json' +
    '&callback=?&prop=extracts&meta=&generator=search&exsentences=1' +
    '&exlimit=max&exintro=1&explaintext=1&gsrprop=snippet&gsrsearch=';

  function setData(data) {
    // var data = JSON.stringify(result.query.pages);
    console.log("bao");
    console.log(data);
  }

  /**
   * fills the contents of the grid element
   * @param {string} url sdfa
   * @param {function} callback asdf
   */
  function getData(url, callback) {
    $.getJSON(url, function(result) {
      console.log("bao");
      var data = JSON.stringify(result);
      console.log(data);
      callback(data);
    });
  }

  function init() {
    // var url = urlBase + urlQuery + 'Einstein';
    // getData(url, setData);
  }

  return {
    init: init
  };

})();

wikiViewer.init();
