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
          <p>data was loading ....</p>
        </div>
      );
    } else {
      return (
        <main>
          <div class="container my-5">
            <div class="row card text-center align-items-center rounded-3 border shadow-lg">
              <div class="card-header">
                <div class="match-tournament ">
                  <img src="pl-logo.png" alt="" />
                        English Premier League
                    </div>
              </div>

              <div class="scrollbar scrollbar-secondary cardfoot">
                {items.matches.map((item) => {
                  return (
                    <div class="card-body align-items-center row">
                      <div class="col-4 team">
                        <div class="team-logo"><img src="img/whufc.png" alt="" /></div>
                        <h6 class="mt-4 card-title">West Ham</h6>
                      </div>
                      <div class="col-4">
                        <div class="match-details">
                          <div class="match-date">
                            12 Aug at <strong>19:00</strong>
                          </div>
                          <div class="match-score">
                            <span class="match-score-number match-score-number--leading">2</span>
                            <span class="match-score-divider">:</span>
                            <span class="match-score-number">0</span>
                          </div>
                        </div>
                        <h6 class="mt-5 card-title">list davar</h6>
                        <div class="scrollbar davar mt-3 scrollbar-secondary ">
                          <ul class="list-group list-group-flush ">
                            <li class="list-group-item">Cras justo odio</li>
                            <li class="list-group-item">Dapibus ac facilisis in</li>
                            <li class="list-group-item">Morbi leo risus</li>
                            <li class="list-group-item">Porta ac consectetur ac</li>
                            <li class="list-group-item">Vestibulum at eros</li>
                          </ul>
                        </div>
                      </div>
                      <div class="col-4 team">
                        <div class="team-logo"><img src="img/chelsea.png" alt="" /></div>
                        <h6 class="mt-4 card-title">Chelsea</h6>
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
