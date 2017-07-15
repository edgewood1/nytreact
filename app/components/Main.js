// Include React
var React = require("react");
var axios = require('axios');


// Here we include all of the sub-components
var Form = require("./children/Form");
var Results = require("./children/Results");
var History = require("./children/History");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

// Creating the Main component
var Main = React.createClass({

  // Here we set a generic state associated with the number of clicks
  // Note how we added in this history state variable
  getInitialState: function () {
    return {
      searchTerm: "", results: [], history: [], savedArticles: [],
      topic: "",
      startYr: "",
      endYr: ""
    };
  },

  // DID - loads after loading? 
  // The moment the page renders get the History
  // Get the latest history.
  componentDidMount: function () {

    helpers.getArticle().then(function (response) {
      console.log(response);
      if (response !== this.state.history) {
        console.log("History", response.data);
        this.setState({ savedArticles: response.data });
      }
    }.bind(this));
  },

  // If the component changes (i.e. if a search is entered)...
  componentDidUpdate: function () {

    // Run the query for the address
    helpers.runQuery(this.state.topic, this.state.startYr, this.state.endYr).then(function (data) {
      if (data !== this.state.results) {
        console.log("Address", data);


        this.setState({ results: data });

      }
    }.bind(this));
  },

  getArticle: function () {
    axios.get('/api/saved')
      .then(function (response) {
        this.setState({
          savedArticles: response.data
        });
      }.bind(this));
  },

  saveArticle: function (result) {
    console.log("what i'll save: " + result.headline.main, result.pub_date, result.web_url)
    helpers.postArticle(result.headline.main, result.pub_date, result.web_url);


    this.getArticle();
  },

  deleteArticle: function (result) {
    console.log("This is the id for the article we want to delete: " + result._id);
    helpers.deleteArticle(result._id).then(() => {
      this.setState((prevState) => ({
        saved: [...prevState.saved.slice(0, index), ...prevState.saved.slice(index + 1)]
      }));
    });
    this.getArticle();
  },
  // This function allows childrens to update the parent.
  setTerm: function (topic, startYr, endYr) {
    this.setState({
      topic: topic,
      startYr: startYr,
      endYr: endYr
    });
  },
  // Here we render the function
  render: function () {
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron">
            <h2 className="text-center">New York Times Article Subscriber</h2>
            <p className="text-center">
              <em>Search for and annotated articles of interest</em>
            </p>
          </div>
          <div className="row">
            <div className="col-md-8 col-md-offset-2">

              {/* FORM - FIRST PAGE */}
              <Form setTerm={this.setTerm} />

            </div>
          </div>
        </div>
        <div className="row">


          <div className="col-md-8 col-md-offset-2">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title text-center">Search Results</h3>
              </div>
              <div className="panel-body text-center">

                {/* RESULTS - SECOND PAGE */}

                <Results results={this.state.results} saveArticle={this.saveArticle} />
              </div>
            </div>
          </div>

        </div>
        <div className="row">
          <div className="col-md-8 col-md-offset-2">

            {/* HISTORY - THIRD PAGE */}

            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title text-center">Search History</h3>
              </div>
              <div className="panel-body text-center">

                <History history={this.state.savedArticles} deleteArticle={this.deleteArticle} />
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
