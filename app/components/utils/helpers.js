// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// NyTimes API
var apiKey = "9189e6ca2509411491bbcfd0a29c3ee9";

// Helper functions for making API Calls
var helpers = {

  // This function serves our purpose of running the query to geolocate.
  runQuery: function(topic, beginYr, endYr) {
 var date="0101";
 parseInt(date);
 beginYr=date+beginYr;
 endYr=date+endYr;

 var queryUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=9189e6ca2509411491bbcfd0a29c3ee9&q="+ topic + "&begin_date="+ beginYr +"&end_date="+endYr;

// var queryUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?" + $.param({
//   'api-key': "9189e6ca2509411491bbcfd0a29c3ee9",
//   'q': topic
  // 'begin_date': beginYr,
  // 'end_date': endYr
// });


   return axios.get(queryUrl).then(function(response) {
      // If get get a result, return that result's formatted address property
      var newResults = [];
 
      var fullResults = response.data.response.docs;
      var counter=0;
//Gets first 5 articles that have all 3 components
				for(var i = 0; i < fullResults.length; i++){
          newResults.push(fullResults[i])
        }
          // newResults.headline = fullResults[0].headline.main;
          // newResults.web_url = fullResults[0].web_url;
          // newResults.date= fullResults[0].pub_date;
          // var hello="headline: " +fullResults[0].headline.main + " date: " + fullResults[0].pub_date+ " </br> " + " URL: " + fullResults[0].web_url

	return newResults
    
        
        // {

				// 	if(counter > 4) {
				// 		return newResults;
				// 	}

				// 	if(fullResults[counter].headline.main && fullResults[counter].pub_date && fullResults[counter].web_url) {
				// 		newResults.push(fullResults[counter]);
				// 		counter++;
				// 	}
				// }

				// return newResults;
		})

 

     
 
  },

    getArticle: function() {
    return axios.get("/api");
  },
// This function posts saved articles to our database.
	postArticle: function(title, date, url){
console.log("first title " + title) 
		return axios.post('/api/saved', 
    {
      title: title, 
      date: date, 
      url: url
    })
 

	 
		 
	
	}

}


// We export the API helper
module.exports = helpers;
