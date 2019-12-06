import React, { Component } from 'react';
import './App.css';
import Minion from './components/Minion';

class App extends Component {
  constructor() {
    super();
    this.state = {
      teams: [
        {
          name: 'team 1',
          minions: [
            {
              name: 'dire_wolf',
              attack: 10,
              health: 10
            }
          ]
        },
        {
          name: 'team 2',
          minions: [
            {
              name: 'nightmare_amalgram',
              attack: 4,
              health: 4
            },
            {
              name: 'nightmare_amalgram',
              attack: 5,
              health: 5
            },
            {
              name: 'hungry_crab',
              attack: 10,
              health: 10
            }
          ]
        },
      ],
      attacking_team: undefined,
      defending_team: undefined,
      interval: undefined,
      winner: undefined
    }
  }

  componentDidMount() {
    let { interval, teams } = this.state;
    const team_1 = { ...teams[0] };
    const team_2 = { ...teams[1] };
    
    this.setState({
      attacking_team: team_1,
      defending_team: team_2
    }, () => {
      interval = setInterval(() => {
        this.attack();
      }, 1000);
      this.setState({
        interval
      });
    });
  }

  attack = () => {
    let { interval, attacking_team, defending_team, winner, teams } = this.state;
    let attacker, defender, attacker_alive_minons, defender_alive_minons;

    attacker_alive_minons = this.getAliveMinions(attacking_team.minions);
    defender_alive_minons = this.getAliveMinions(defending_team.minions);

    attacker = this.getFirstMinion(attacker_alive_minons);
    defender = this.getRandomMinion(defender_alive_minons);

    attacker.health -= defender.attack;
    defender.health -= attacker.attack;

    if (attacker.health <= 0) {
      attacker_alive_minons = this.removeMinionFromList(attacker, attacker_alive_minons);
    }

    if (defender.health <= 0) {
      defender_alive_minons = this.removeMinionFromList(defender, defender_alive_minons);
    }

    if (attacker_alive_minons.length <= 0 || defender_alive_minons.length <= 0) {
      clearInterval(interval);
      winner = attacker_alive_minons.length <= 0 && defender_alive_minons.length <= 0 ? 'draw' : attacker_alive_minons.length <= 0 ? defending_team.name : attacking_team.name;
      console.log(teams);
      console.log(attacking_team);
      console.log(defending_team);
    }

    this.setState({
      attacking_team: defending_team,
      defending_team: attacking_team,
      winner
    });
  }

  getAliveMinions = (listOfMinions) => listOfMinions.filter((minion) => minion.health > 0);
  getRandomMinion = (listOfMinions) => listOfMinions[Math.floor(Math.random() * listOfMinions.length)];
  getFirstMinion = (listOfMinions) => listOfMinions[0];
  removeMinionFromList = (minion, listOfMinons) => listOfMinons.filter(m => m !== minion);

  render() {
    const { teams, winner } = this.state;

    return (
      <div>
        {
          teams.map((team, index) => {
            return (
              <div key={index}>
                <h1>{team.name}</h1>
                {
                  team.minions.map((minion, index) => {
                    return (
                      <Minion name={minion.name} attack={minion.attack} health={minion.health} key={index} />
                    );
                  })
                }
              </div>
            );
          })
        }
        <h1>{winner === 'draw' ? 'draw' : winner !== undefined ? winner + ' won' : undefined}</h1>
      </div>
    );
  }
}

export default App;
