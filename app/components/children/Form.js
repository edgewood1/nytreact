// Include React
var React = require("react");

// Creating the Form component
var Form = React.createClass({

  // Here we set a generic state associated with the text being searched for
  getInitialState: function () {
    return { term: "", 
    startYr: "", 
    endYr: "" 
  };
  },

  // This function will respond to the user input
  handleChange: function (event) {
    
    // capture query input

    var newState ={}
    newState[event.target.id] = event.target.value;
    this.setState(newState);

    console.log(newState)

    // this.setState({ term: event.target.value, 
    //  startYr: event.target.value});
    
    // this.setState({ term: event.target.value, startYr: event.target.value, endYr: event.target.value });
  },

  // When a user submits...
  handleSubmit: function (event) {
    // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
    // clicking the button
    event.preventDefault();

    // Set the parent to have the search term
    this.props.setTerm(this.state.term, this.state.startYr, this.state.endYr);

  },
  // Here we describe this component's render method
  render: function () {
    return (

      // this is the title for the whole panel

      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Search</h3>
        </div>

        {/* form number one*/}

        <div className="panel-body text-center">
          <form onSubmit={this.handleSubmit}>

            {/* INPUT ONE  */}

            <div className="form-group">

              <h4 className="">
                <strong>Topic</strong>
              </h4>

              {/*
                Note how each of the form elements has an id that matches the state.
                This is not necessary but it is convenient.
                Also note how each has an onChange event associated with our handleChange event.
              */}
              <input
                value={this.state.term}
                type="text"
                className="form-control text-center"
                id="term"
                onChange={this.handleChange}
                required
              />
            </div>
            <br />

            {/* INPUT TWO */}

       
             <div className="form-group">
              <h4 className="">
                <strong>Start Year</strong>
              </h4>
              <input
                value={this.state.startYr}
                type="text"
                className="form-control text-center"
                id="startYr"
                onChange={this.handleChange}
                required
              />
            </div>
            <br />
       
            {/* INPUT THREE */}

            <div className="form-group">
              <h4 className="">
                <strong>End Year</strong>
              </h4>

              <input
                value={this.state.endYr}
                type="text"
                className="form-control text-center"
                id="endYr"
                onChange={this.handleChange}
                required
              />
            </div>
            <br />

            {/* button */}

            <button
              className="btn btn-primary"
              type="submit"
            >
              Search
            </button>
           
          
          {/* form handlesubmit */}
          </form>
        {/*classname panel - body */}
      </div>
      </div >
    );
  }
});

// Export the component back for use in other files
module.exports = Form;
