import React, { Component } from "react";
import "./Joke.css";

class Joke extends Component {
  constructor(props) {
    super(props);

    // Bind the methods to the instance of the class
    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
  }

  // Method to handle upvoting a joke
  upVote() {
    const { vote, id } = this.props;
    vote(id, +1);
  }

  // Method to handle downvoting a joke
  downVote() {
    const { vote, id } = this.props;
    vote(id, -1);
  }

  render() {
    const { votes, text } = this.props;
    return (
      <div className="Joke">
        <div className="Joke-votearea">
          <button onClick={this.upVote}>
            <i className="fas fa-thumbs-up" />
          </button>

          <button onClick={this.downVote}>
            <i className="fas fa-thumbs-down" />
          </button>

          {votes}
        </div>

        <div className="Joke-text">{text}</div>
      </div>
    );
  }
}

export default Joke;

// import React from "react";
// import "./Joke.css";

// function Joke({ vote, votes, text, id }) {
//   const upVote = () => vote(id, +1);
//   const downVote = () => vote(id, -1);

//   return (
//     <div className="Joke">
//       <div className="Joke-votearea">
//         <button onClick={upVote}>
//           <i className="fas fa-thumbs-up" />
//         </button>

//         <button onClick={downVote}>
//           <i className="fas fa-thumbs-down" />
//         </button>

//         {votes}
//       </div>

//       <div className="Joke-text">{text}</div>
//     </div>
//   );
// }

// export default Joke;