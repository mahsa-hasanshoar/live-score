import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch("https://api.football-data.org/v2/competitions/2021/matches", {
      method: "GET",
      headers: {
        "X-Auth-Token": "ea7cb0230e764362aef72269a19ed9d5",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          items: json,
        });
      })
      .catch((error) => console.error(error));
  }

  render() {
    var { isLoaded, items } = this.state;
    if (!isLoaded) {
      return (
        <div className="App">
          <img src={logo} className="App-logo" alt="logo" />
          <p>data was loading ....</p>
        </div>
      );
    } else {
      return (
        <div className="App">
          <div class="container">
            <h1>ScoreBoard</h1>
            {items.matches.map((item) => {
              return (
                <div>
                  <div class="title-box">
                    <p>Home Team</p>
                    <p id="elapsed">{item.status}</p>
                    <p>Away Team</p>
                  </div>
                  <div class="title-box">
                    <div class="team">
                      <img
                        id="homeLogo"
                        src={
                          "https://crests.football-data.org/" +
                          item.homeTeam.id +
                          ".svg"
                        }
                      ></img>
                      <p id="homeName">{item.homeTeam.name}</p>
                    </div>
                    <p id="goals">
                      {item.score.fullTime.homeTeam +
                        " - " +
                        item.score.fullTime.awayTeam}
                    </p>
                    <div class="team">
                      <img
                        id="awayLogo"
                        src={
                          "https://crests.football-data.org/" +
                          item.awayTeam.id +
                          ".svg"
                        }
                      ></img>
                      <p id="awayName">{item.awayTeam.name}</p>
                    </div>
                  </div>
                  <div>
                    <ul>
                      {item.referees.map((ref) => (
                        <li>{ref.name}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p>{formatDate(item.utcDate)}</p>
                  </div>
                  <hr></hr>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }
}

function formatDate(string) {
  var options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  };
  return new Date(string).toLocaleDateString([], options);
}

export default App;
