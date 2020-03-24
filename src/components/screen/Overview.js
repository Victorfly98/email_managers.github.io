import React, { Component } from "react";
import getAction from "../../redux/action";
import { connect } from "react-redux";
import _ from "lodash";
import { Typography, Switch } from "antd";
//import HighchartsReact
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";
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
      labelBonces: [],
      categories: [],
      type: "spline"
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
    dataConvert.sort(function(a, b) {
      return a.time - b.time;
    });
    let groups = _.groupBy(dataConvert, "date");
    this.setState({ categories: Object.keys(groups) });
    console.log(groups, "groups");
    var result = Object.keys(groups).map(function(key) {
      return [key, groups[key]];
    });
    console.log(result, "result");
    let data = [];
    result.map(vl => {
      data.push([
        new Date(vl[0]).valueOf() + 60 * moment().utcOffset() * 1000,
        vl[1].length
      ]);
    });
    console.log(data, "data");
    return data;
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops !== this.props) {
      let dataBoncesEmail = nextprops.monitor.bouncesEmail.map(vl => {
        let time = moment.utc(vl.created_at);
        let date = this.formatDate(vl.created_at);
        //  console.log("date", date);
        return {
          date,
          time,
          ...vl
        };
      });
      let dataDeliveredEmail = nextprops.monitor.deliver.map(vl => {
        let date = this.formatDate(vl.timestamp * 1000);
        return {
          date: date,
          time: vl.timestamp,
          ...vl
        };
      });
      // set state data bonces
      const dataBonces = this.convertData(dataBoncesEmail);
      // set state data delivered
      const dataDelivered = this.convertData(dataDeliveredEmail);

      this.setState({ dataBonces: dataBonces, dataDelivered: dataDelivered });
    }
  }

  onChange = checked => {
    if (checked) {
      this.setState({ type: "column" });
    } else {
      this.setState({ type: "spline" });
    }
  };
  render() {
    const { dataBonces, dataDelivered } = this.state;
    console.log(dataDelivered, "dataDelivered");
    console.log(dataBonces, "dataBonces");
    console.log(this.state.categories, "this.state.categories");
    const optionsData = {
      chart: {
        type: this.state.type
      },
      credits: {
        enabled: false
      },
      title: {
        text: "MAIL STATISTICS"
      },

      xAxis: {
        type: "datetime",
        labels: {
          format: "{value:%b %e %Y}",
          rotation: -45,
          align: "right"
        }
      },
      yAxis: {
        title: {
          text: "Number of email"
        }
      },
      series: [
        {
          name: "Bounces",
          data: dataBonces
        },
        {
          name: "Delivered",
          data: dataDelivered
        }
      ]
    };
    return (
      <div style={{ width: 1000 }}>
        <Title level={3}>OVERVIEW</Title>
        <Switch
          style={{ textAlign: "center" }}
          checkedChildren="Spline"
          unCheckedChildren="Bar"
          onChange={this.onChange}
        />
        <HighchartsReact highcharts={Highcharts} options={optionsData} />
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
