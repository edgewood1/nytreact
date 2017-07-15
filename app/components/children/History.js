// Include React
var React = require("react");

// This is the History component. It will be used to show a log of  recent searches.
var History = React.createClass({
  // Here we describe this component's render method

  handleClick1: function (result, e) {
    console.log("Clicked! " +
      result._id + "  " +
      result.title
    );
    this.props.deleteArticle(result);
  },

  render: function () {
    return (

      <div>
        {this.props.history.map(function (search, i) {
          var boundClick1 = this.handleClick1.bind(this, search);

          return (
            <div>
              <p> TITLE: {search.title} - DATE: {search.date}</p>
              <p>URL: {search.url}</p>
              <button key={search._id} onClick={boundClick1}> delete </button>
              <p> _________________________________</p>
            </div>

          );
        }.bind(this)
        )
        }
      </div>
    )
  }
});

// Export the component back for use in other files
module.exports = History;
