// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// NyTimes API
var apiKey = "9189e6ca2509411491bbcfd0a29c3ee9";

// Helper functions for making API Calls
var helpers = {

  // This function serves our purpose of running the query to geolocate.
  runQuery: function (topic, beginYr, endYr) {
    var date = "0101";
    parseInt(date);
    beginYr = beginYr + date;
    endYr = endYr + date;

    var queryUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key="+ apiKey + "&q=" + topic + "&begin_date=" + beginYr + "&end_date=" + endYr;


    return axios.get(queryUrl).then(function (response) {

      // If get get a result, return that result's formatted address property
      var newResults = [];
      var fullResults = response.data.response.docs;
      var counter = 0;
console.log(fullResults)
      //Gets first 5 articles that have all 3 components
      for (var i = 0; i < fullResults.length; i++) {
        newResults.push(fullResults[i])
      }
      return newResults
    })
  },


  deleteArticle: (articleID) => {

    console.log("We have an article to delete in helper: " + articleID);

    return axios.delete("/api/saved/" + articleID)

      .then(res => {
        console.log("Delete response from axios: " + res);
      })
      .catch(err => {
        console.log("Error pushing to delete: " + err);
      });

  },


  getArticle: function () {
    return axios.get("/api/saved");
  },


  // This function posts saved articles to our database.
  postArticle: function (title, pub_date, url) {
    // postArticle: function (result) {
    console.log("first title " + title)
    console.log("date " + pub_date);
    console.log("url: " + url);
    return axios.post('/api/saved',
      {
        title: title,
        date: pub_date,
        url: url
      })
  }
}


// We export the API helper
module.exports = helpers;
