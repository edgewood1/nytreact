// Include React
var React = require("react");

// Creating the Results component
var Results = React.createClass({
  // Here we render the function

  getInitialState: function () {
    return {
      title: "",
      // date: "",
      url: "",
      // results: []

    }
  },
  componentWillReceiveProps: function (nextProps) {
    
    // myResults contains ALL the objects from API call - 
  
    var myResults = nextProps.results[0];

    // var myResults = nextProps.results.map(function(obj, i) {
    //   return <div> {obj.headline.main} </div>
    // })
    // for (var i = 0; i < myResults.length; i++) {
    //   var newResults = newResults + (myResults[i].headline.main)
    // }
    // var newResults=myResults[0].headline.main
    //   console.log(nextProps[i])
    //   console.log(nextProps[i].headline.main);
    // }
    // console.log(newResults); 
    console.log(myResults);
    this.setState({ results: myResults })
    // console.log("next props is : " + JSON.stringify(nextProps))
  },

  handleClick: function (result, e) {
console.log("Clicked! " +
result.headline.main + "  " + 
result.web_url + "  " +
result.pub_date + " " +
result._id + "   " +

e.target);

this.props.saveArticle(result);
  },
  
  render: function () {

  //  var articles = this.props.results.map(function (article, index) {
   
        return(
        <div>
         {this.props.results.map(function(result, index){
           var boundClick = this.handleClick.bind(this, result);
            return (
              <div>
                
                <p>Headline {index}: {result.headline.main}</p>
                <p>URL: {result.web_url }</p>
                <p> Date: {result.pub_date}</p>
                <button key={result._id} onClick={boundClick}> save </button>
                <p> _________________________________</p>
              </div>
            )
          
    
          }.bind(this)
          )
        }

          ;
          </div>
          ) 
      
  // })

// })
  }
})
// Export the component back for use in other files
module.exports = Results;
