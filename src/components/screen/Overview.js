import React, { Component } from "react";
import getAction from "../../redux/action";
import { connect } from "react-redux";
import _ from "lodash";
import { Typography } from "antd";
import CanvasJSReact from "./../../assets/canvasjs.react";
//import HighchartsReact
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
// import HC_more from "highcharts/highcharts-more"; //module
// HC_more(Highcharts); //init module

const { CanvasJSChart } = CanvasJSReact;
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
      labelBounces: []
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
  // test server
  convertData(dataConvert) {
    dataConvert.sort(function(a, b) {
      return a.time - b.time;
    });
    let groups = _.groupBy(dataConvert, "date");
    var result = Object.keys(groups).map(function(key) {
      return [String(key), groups[key]];
    });
    let data = [];
    result.map(vl => {
      data.push({
        x: new Date(vl[0]),
        label: vl[0],
        y: vl[1].length
      });
    });

    return data;
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops !== this.props) {
      let dataBouncesEmail = nextprops.monitor.bouncesEmail.map(vl => {
        let time = Date.parse(vl.created_at);
        let date = this.formatDate(vl.created_at);
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
        // console.log(timestamptodate, "time");
        let date = this.formatDate(timestamptodate).split("-");
        return {
          date: date,
          time: vl.timestamp,
          ...vl
        };
      });
      // set state data bonces
      const dataBounces = this.convertData(dataBouncesEmail);
      // const labelBonces = this.convertData(dataBoncesEmail).label;
      // set state data delivered
      const dataDelivered = this.convertData(dataDeliveredEmail);
      // const labelDelivered = this.convertData(dataDeliveredEmail).label;

      this.setState({
        dataBounces: dataBounces,
        dataDelivered: dataDelivered
        // label: labelBonces.concat(labelDelivered)
      });
    }
  }
  render() {
    const { dataBounces, dataDelivered } = this.state;
    console.log(dataBounces, "dataBounces");
    console.log(dataDelivered, "dataDe");

    //  console.log(label, "label");
    // const optionsData = {
    //   chart: {
    //     type: "spline"
    //   },
    //   credits: {
    //     enabled: false
    //   },
    //   title: {
    //     text: "MAIL STATISTICS"
    //   },
    //   // ??? gop mang
    //   xAxis: {
    //     categories: label
    //   },
    //   yAxis: {
    //     title: {
    //       text: "Number of email"
    //     }
    //   },
    //   // set 2 data
    //   series: [
    //     {
    //       name: "Bounces",
    //       data: dataBonces
    //     },
    //     {
    //       name: "Delivered",
    //       data: dataDelivered
    //     }
    //   ]
    // };
    const option = {
      animationEnabled: true,
      title: {
        text: "EMAIL STATISTICS"
      },
      credits: {
        enabled: false
      },
      axisX: {
        gridColor: "#faf9f7",
        labelAngle: 150
      },
      axisY: {
        gridColor: "#faf9f7",
        title: "Number Of Email"
        // includeZero: true
      },
      legend: {
        cursor: "pointer",
        itemclick: this.toggleDataSeries
      },
      data: [
        {
          name: "Bounces",
          type: "spline",
          showInLegend: true,
          dataPoints: dataDelivered
        },
        {
          name: "Delivered",
          // yValueFormatString: "$#,###",
          // xValueFormatString: "MMMM",
          showInLegend: true,
          type: "spline",
          dataPoints: dataBounces
        }
      ]
    };

    return (
      <div style={{ width: 1000 }}>
        <Title level={3}>OVERVIEW</Title>
        {/* <HighchartsReact highcharts={Highcharts} options={optionsData} /> */}
        <CanvasJSChart options={option} onRef={ref => (this.chart = ref)} />
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
