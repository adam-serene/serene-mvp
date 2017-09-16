import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import './styles/Progress.css';

export default class Leaderboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      stats:[]
    }
  }

  async componentDidMount(){
    const leaderboardData = await fetch('http://localhost:5000/user-place');
    const leaderboardDataJson = await leaderboardData.json();
    this.setLeaderboard(leaderboardDataJson);
  }

  setLeaderboard = (json) => {
    let leaderboardArr = [];
    let leaderboardObj = {};
    for (var i = 0; i < json.length; i++) {
      if(leaderboardObj[json[i].user_id]){
        leaderboardObj[json[i].user_id].score += 1;
        leaderboardObj[json[i].user_id].mostRecent = json[i].description;
        leaderboardObj[json[i].user_id].mostRecent = json[i].place_id;
      } else {
        leaderboardObj[json[i].user_id]={
          user: json[i].full_name,
          score: 1,
          placeName: json[i].description,
          mostRecent: json[i].place_id,
        }
      }
    }
    let keyArr = Object.keys(leaderboardObj)
    for (var j = 0; j < keyArr.length; j++) {
      leaderboardArr.push(leaderboardObj[keyArr[j]])
    }
    function bubbleSort(arr) {
      let done = false,
          i;
      while (!done) {
        done = true;
        for (i = 1; i < arr.length; i++) {
          if (arr[i-1].score < arr[i].score) {
            done = false;
            [arr[i-1], arr[i]] = [arr[i], arr[i-1]]
          }
        }
      }
      return arr;
    }
    leaderboardArr = bubbleSort(leaderboardArr)
    this.setState({stats: leaderboardArr})
  }

  render(){
    return(
      <Table
        className='leaderboard-table'>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
          className='leaderboard-header'>
          <TableRow
            className='leaderboard-row'>
            <TableHeaderColumn
              className='leaderboard-col'>
              RANK
            </TableHeaderColumn>
            <TableHeaderColumn
              className='leaderboard-col'>
              NAME
            </TableHeaderColumn>
            <TableHeaderColumn
              className='leaderboard-col'>
              # of CHECK INS
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>

        <TableBody
          displayRowCheckbox={false}
          className='leaderboard-body'>
          {this.state.stats.map( (row, index) => (
          <TableRow
            key={index}
            className='leaderboard-row'>
            <TableRowColumn
              className='leaderboard-col'>
              {index+1}
            </TableRowColumn>
            <TableRowColumn
              className='leaderboard-col'>
              {row.user}
            </TableRowColumn>
            <TableRowColumn
              className='leaderboard-col'>
              {row.score}
            </TableRowColumn>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}