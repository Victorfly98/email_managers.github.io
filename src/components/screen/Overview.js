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
      dataBonces: [],
      dataDelivered: [],
      label: [],
      labelDelivered: [],
      labelBonces: []
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
    this.props.getEvent();
  };
  // test server
  convertData(dataConvert) {
    dataConvert.sort(function (a, b) {
      return a.time - b.time;
    });
    let groups = _.groupBy(dataConvert, "date");
    var result = Object.keys(groups).map(function (key) {
      return [new Date(key), groups[key]];
    });
    let data = [];
    result.map(vl => {
      data.push({
        x: vl[0],
        y: vl[1].length
      });
    });
    console.log(data, 'data')
    return data
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops !== this.props) {
      let dataBoncesEmail = nextprops.monitor.bouncesEmail.map(vl => {
        let time = Date.parse(vl.created_at);
        let date = this.formatDate(vl.created_at);
      //  console.log("date", date);
        return {
          date: date,
          time: time,
          ...vl
        };
      });
      let dataDeliveredEmail = nextprops.monitor.deliver.map(vl => {
        let timestamptodate = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        }).format(vl.timestamp * 1000);

        let date = this.formatDate(timestamptodate);
        return {
          date: date,
          time: vl.timestamp,
          ...vl
        };
      });
      // set state data bonces
      const dataBonces = this.convertData(dataBoncesEmail)
      // set state data delivered
      const dataDelivered = this.convertData(dataDeliveredEmail)

      this.setState({ dataBonces: dataBonces, dataDelivered: dataDelivered });
    }
  }
  render() {
    const { dataBonces, dataDelivered } = this.state;
    const optionsData = {
      chart: {
        type: "spline"
      },
      credits: {
        enabled: false
      },
      title: {
        text: 'MAIL STATISTICS'
      },

      xAxis: {
        type: 'datetime',
        labels: {
          format: '{value:%b %e \%Y}',
          rotation: -45,
          align: 'right'
        }
      },
      yAxis: {
        title: {
          text: 'Number of email'
        }
      },
      series: [
        {
          name: "Bounces",
          data: dataBonces,
        }, {
          name: "Delivered",
          data: dataDelivered
        },
      ]
    };
    return (
      <div style={{ width: 1000 }}>
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
    },
    getEvent: () => {
      dispatch(getAction.action.getEvent());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
