import React, { Component } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

class JokeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: [],
    }; // Initialize state with an empty array to store jokes
    this.generateNewJokes = this.generateNewJokes.bind(this); // Bind the generateNewJokes function to 'this'
    this.vote = this.vote.bind(this); // Bind the vote function to 'this'
  }

  componentDidMount() {
    if (this.state.jokes.length === 0) {
      this.getJokes();
    } // Fetch jokes when the component mounts if jokes are not already present in state
  }

  async getJokes() {
    const { numJokesToGet } = this.props; // Get the number of jokes to fetch from props
    let j = []; // Create a copy of the current jokes array in state
    let seenJokes = new Set(); // Create a Set to store the IDs of seen jokes to avoid duplicates
    try {
      while (j.length < numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" },
        }); // Fetch jokes from API until the desired number of jokes is obtained
        let { status, ...jokeObj } = res.data; // Extract the joke object from the API response, removing the 'status' field

        if (!seenJokes.has(jokeObj.id)) {
          // Check if the joke is not a duplicate
          seenJokes.add(jokeObj.id); // Add the joke ID to the Set of seen jokes
          j.push({ ...jokeObj, votes: 0 }); // Add the joke object to the jokes array in state with an initial vote count of 0
        } else {
          console.error("duplicate found!"); // Log an error message if a duplicate joke is found
        }
      }
      this.setState({ jokes: j }); // Update the state with the fetched jokes
    } catch (e) {
      console.log(e); // Log any errors that occur during the API request
    }
  }

  generateNewJokes() {
    this.getJokes(); // Call getJokes() to fetch new jokes and update state
  }

  vote(id, delta) {
    this.setState((st) => ({
      jokes: st.jokes.map((j) =>
        j.id === id ? { ...j, votes: j.votes + delta } : j
      ),
    })); // Update the vote count of a joke in state based on the ID and the vote delta (1 or -1)
  }

  render() {
    if (this.state.jokes.length) {
      // Check if there are jokes in state to render
      let sortedJokes = [...this.state.jokes].sort((a, b) => b.votes - a.votes); // Sort the jokes array in descending order based on vote count

      return (
        <div className="JokeList">
          <button className="JokeList-getmore" onClick={this.generateNewJokes}>
            Get New Jokes
          </button>

          {sortedJokes.map((j) => (
            <Joke
              text={j.joke}
              key={j.id}
              id={j.id}
              votes={j.votes}
              vote={this.vote}
            />
          ))}
        </div>
      );
    }

    return null;
  }
}

// Set default props using static defaultProps property
JokeList.defaultProps = {
  numJokesToGet: 10, // Set default value for numJokesToGet
};

export default JokeList;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Joke from "./Joke";
// import "./JokeList.css";

// function JokeList({ numJokesToGet = 10 }) {
//   const [jokes, setJokes] = useState([]);

//   /* get jokes if there are no jokes */

//   useEffect(function() {
//     async function getJokes() {
//       let j = [...jokes];
//       let seenJokes = new Set();
//       try {
//         while (j.length < numJokesToGet) {
//           let res = await axios.get("https://icanhazdadjoke.com", {
//             headers: { Accept: "application/json" }
//           });
//           let { status, ...jokeObj } = res.data;

//           if (!seenJokes.has(jokeObj.id)) {
//             seenJokes.add(jokeObj.id);
//             j.push({ ...jokeObj, votes: 0 });
//           } else {
//             console.error("duplicate found!");
//           }
//         }
//         setJokes(j);
//       } catch (e) {
//         console.log(e);
//       }
//     }

//     if (jokes.length === 0) getJokes();
//   }, [jokes, numJokesToGet]);

//   /* empty joke list and then call getJokes */

//   function generateNewJokes() {
//     setJokes([]);
//   }

//   /* change vote for this id by delta (+1 or -1) */

//   function vote(id, delta) {
//     setJokes(allJokes =>
//       allJokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j))
//     );
//   }

//   /* render: either loading spinner or list of sorted jokes. */

//   if (jokes.length) {
//     let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);

//     return (
//       <div className="JokeList">
//         <button className="JokeList-getmore" onClick={generateNewJokes}>
//           Get New Jokes
//         </button>

//         {sortedJokes.map(j => (
//           <Joke text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={vote} />
//         ))}
//       </div>
//     );
//   }

//   return null;

// }

// export default JokeList;