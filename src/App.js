import logo from "./logo.svg";
import "./App.css";
import "./bootstrap.min.css"
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
          <p id="loadingText">data was loading ....</p>
        </div>
      );
    } else {
      return (
        <main>
          <div class="container my-5">
            <div class="row card text-center align-items-center rounded-3 border shadow-lg">
              <div class="card-header">
                <div class="match-tournament ">
                  <img src={process.env.PUBLIC_URL + '/pl-logo.png'} alt="" />
                        English Premier League
                    </div>
              </div>

              <div class="scrollbar scrollbar-secondary cardfoot">
                {items.matches.map((item) => {
                  return (
                    <div class="card-body align-items-center row">
                      <div class="col-4 team">
                        <div class="team-logo"><img src={
                          "https://crests.football-data.org/" +
                          item.homeTeam.id +
                          ".svg"
                        } alt="" /></div>
                        <h6 class="mt-4 card-title">{item.homeTeam.name}</h6>
                      </div>
                      <div class="col-4">
                        <div class="match-details">
                          <div class="match-date">
                            {formatDate(item.utcDate)}
                          </div>
                          <div class="match-score">
                            <span class="match-score-number">{item.score.fullTime.homeTeam}</span>
                            <span class="match-score-divider"> - </span>
                            <span class="match-score-number">{item.score.fullTime.awayTeam}</span>
                          </div>
                          <p id="elapsed">{item.status}</p>
                        </div>
                        <h6 class="mt-5 card-title">Referees</h6>
                        <div class="scrollbar davar mt-3 scrollbar-secondary ">
                          <ul class="list-group list-group-flush ">
                            {item.referees.map((ref) => (
                              <li class="list-group-item">{ref.name}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div class="col-4 team">
                        <div class="team-logo"><img src={
                          "https://crests.football-data.org/" +
                          item.awayTeam.id +
                          ".svg"
                        } alt="" /></div>
                        <h6 class="mt-4 card-title">{item.awayTeam.name}</h6>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>


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
