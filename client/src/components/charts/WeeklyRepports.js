import React, { Component } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import FormatCurrency from "format-currency";
import "chartjs-plugin-labels";
import moment from 'moment';

export default class WeeklyRepports extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totals: [],
      labels: [],
      counts: []
    };
  }

  componentWillMount() {
    axios
      .get("http://127.0.0.1:8000/api/expenses_repports")
      .then(res => {
        if (res.data) {
          const weekly = res.data.weekly;
          console.log('weekly : ', weekly)
          if (weekly && typeof weekly === "object") {
            weekly.forEach(element => {
              if (this.state.labels.indexOf(moment(element.week).format("dddd, MMMM Do YYYY")) === -1) {
                this.state.labels.push(moment(element.week).format("dddd, MMMM Do YYYY"));
                this.state.totals.push(element.total);
                this.state.counts.push(element.count);
                this.forceUpdate();
              }
            });
          }
        }
      })
      .catch(error => {
        return error;
      });
  }

  render() {

    let barData = {
      labels: this.state.labels,
      datasets: [
        {
          label: `Weekly Expenses`,
          backgroundColor: [
            "#d9534f",
            "#FADBD8",
            "#641E16",
            "#17202A",
            "#7D6608",
            "#2980B9",
            "#F1C40F",
            "#4A235A",
            "#145A32",
            "#808000",
            "#00FF00",
            "#00FFFF",
            "#FF0000",
            "#FF00FF",
            "#008080",
            "#00FF00",
            "#FFFF00",
            "#808080",
            "#C0C0C0",
            "#000080"
          ],
          stack: "stack 0",
          borderWidth: 1,
          data: this.state.totals
        }
      ]
    };

    let pieData = {
      labels: this.state.labels,
      datasets: [
        {
          label: `Weekly Count Items`,
          data: this.state.counts.length > 0 ? this.state.counts : [],
          backgroundColor: [
            "#d9534f",
            "#FADBD8",
            "#641E16",
            "#17202A",
            "#7D6608",
            "#2980B9",
            "#F1C40F",
            "#4A235A",
            "#145A32",
            "#808000",
            "#00FF00",
            "#00FFFF",
            "#FF0000",
            "#FF00FF",
            "#008080",
            "#00FF00",
            "#FFFF00",
            "#808080",
            "#C0C0C0",
            "#000080"
          ]
        }
      ]
    };

    return (
      <div>
        <div>
          

          <div className="card mb-4">
            <div className="card-body">
              <div className="row no-gutters">
                <div className="col-lg-6">
                  <Bar
                    data={barData}
                    height={30}
                    width={70}
                    options={{
                      scales: {
                        xAxes: [{ ticks: { autoSkip: false } }]
                      },
                      responsive: true,
                      plugins: {
                        labels: [
                          {
                            render: function(args) {
                              if (args.value !== 0) {
                                let opts = { format: "%c %v", code: "ZAR" };
                                return FormatCurrency(`${args.value}`, opts);
                              } else {
                                ("");
                              }
                            },
                            fontSize: 12,
                            fontColor: "#000",
                            position: "outside",
                            fontFamily: "'Poppins', sans-serif"
                          }
                        ]
                      }
                    }}
                  />
                </div>
                <div className="col-lg-6">
                  <Pie
                    data={pieData}
                    height={30}
                    width={70}
                    options={{
                      plugins: {
                        maintainAspectRation: false,
                        responsive: true,
                        labels: [
                          {
                            render: "value",
                            position: "outside",
                            fontColor: "#000",
                            textMargin: 7
                          }
                        ]
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
