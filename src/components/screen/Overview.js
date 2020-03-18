import React, { Component } from 'react';

import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import getAction from "../../redux/action";
import { connect } from "react-redux";
import _ from "lodash";

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datasrc: [],
      data: []
    }
  }
  formatDate(string){
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([],options);
  }
  componentDidMount = () => {
    this.props.getMonitorEmail();
  };
  componentWillReceiveProps(nextprops) {
    if(nextprops !== this.props ){
        let datamonitorEmail = nextprops.monitor.bouncesEmail.map(vl => {
        let time = Date.parse(vl.created_at)
        let date = this.formatDate(vl.created_at);
          return {
            key: vl["address"],
            date: date,
            time: time,
            ...vl,
          }
        })
        datamonitorEmail.sort(function (a, b) {
            return a.time - b.time;
          });
        let groups = _.groupBy(datamonitorEmail, 'date');
        var result = Object.keys(groups).map(function (key) { 
          return [String(key), groups[key]]; 
        });
        let data = []
        result.map(vl => {
            data.push({
                date: vl[0],
                Bounces: vl[1].length
            })
        })
        this.setState({data: data})
    }
  }

  render() {
    const { data } = this.state;

    return (
      <ResponsiveContainer className="chart" height={300}>
          <LineChart 
            width={600} 
            height={300} 
            data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
          <XAxis dataKey="date"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Legend />
          <Line type="monotone" dataKey="Bounces" stroke="#8884d8" activeDot={{r: 8}}/>
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

const mapStateToProps = state => {
    return {
      monitor: state.reducer
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      getMonitorEmail: () => {
        dispatch(getAction.action.getMonitorEmail());
      }
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Overview);