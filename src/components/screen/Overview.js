import React, { Component } from "react";
import getAction from "../../redux/action";
import { connect } from "react-redux";
import _ from "lodash";
import { Typography } from "antd";
//import HighchartsReact
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
// import HC_more from "highcharts/highcharts-more"; //module
// HC_more(Highcharts); //init module

const { Title } = Typography;

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datasrc: [],
      data: [],
      label: []
    };
    this.toggleDataSeries = this.toggleDataSeries.bind(this);
  }
  toggleDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    this.chart.render();
  }
  formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }
  componentDidMount = () => {
    this.props.getMonitorEmail();
  };

  componentWillReceiveProps(nextprops) {
    if (nextprops !== this.props) {
      let datamonitorEmail = nextprops.monitor.bouncesEmail.map(vl => {
        let time = Date.parse(vl.created_at);
        let date = this.formatDate(vl.created_at);
        return {
          date: date,
          time: time,
          ...vl
        };
      });
      datamonitorEmail.sort(function(a, b) {
        return a.time - b.time;
      });
      let groups = _.groupBy(datamonitorEmail, "date");
      var result = Object.keys(groups).map(function(key) {
        return [String(key), groups[key]];
      });
      let data = [];
      result.map(vl => {
        data.push({
          label: vl[0],
          y: vl[1].length
        });
      });
      var label = data.map(e => {
        return e.label;
      });
      this.setState({ data: data, label: label });
    }
  }
  render() {
    const { data, label } = this.state;
    console.log(label, "label");
    const optionsData = {
      chart: {
        type: "spline"
      },
      credits: {
        enabled: false
      },
      title:{
        text: 'MAIL STATISTICS'
      },
      xAxis: {
        categories: label
      },
      yAxis: {
        title: {
          text: 'Number of email'
        }
      },
      series: [
        {
          name: "Bounces",
          data: data
        }
      ]
    };
    return (
      <div style={{width: 1000}}>
        <Title level={3}>OVERVIEW</Title>
        <HighchartsReact
          highcharts={Highcharts}
          options={optionsData}
        />
      </div>
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
