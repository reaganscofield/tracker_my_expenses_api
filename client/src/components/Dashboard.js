import React, { Component } from "react";
import axios from "axios";
import FormatCurrency from "format-currency";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import DailyRepports from "./charts/DailyRepports";
import WeeklyRepports from "./charts/WeeklyRepports";
import MonthlyRepports from "./charts/MonthlyRepports";
import YearlyRepports from "./charts/YearlyRepports";
import DatePicker from "react-datepicker";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totals: [],
      labels: [],
      counts: [],
      dateFrom: null,
      dateTo: null,
      datetimeObject: {},
      displayDaily: true,
      displayWeekly: false,
      displayMonthly: false,
      displayYearly: false,
      activeButton: "btn-danger",

      totalAmouns: 0,
      totalItems: 0,
    };
  }

  componentWillMount() {
    axios
      .get("http://127.0.0.1:8000/api/expenses_repports")
      .then(res => {
        if (res.data) {
          const total = res.data;
          console.log("all ", total)
          this.setState({
             totalAmouns: res.data.total_amounts,
             totalItems: res.data.total_items,
          });




          // if (daily && typeof daily === "object") {
          //   daily.forEach(element => {
          //     if (
          //       this.state.labels.indexOf(
          //         moment(element.daily).format("dddd, MMMM Do YYYY")
          //       ) === -1
          //     ) {
          //       this.state.labels.push(
          //         moment(element.daily).format("dddd, MMMM Do YYYY")
          //       );
          //       this.state.totals.push(element.total);
          //       this.state.counts.push(element.count);
          //       this.forceUpdate();
          //     }
          //   });
          // }
        }
      })
      .catch(error => {
        return error;
      });
  }

  handleDisplyDaily = () => {
    this.setState({
      displayDaily: true,
      displayWeekly: false,
      displayMonthly: false,
      displayYearly: false
    });
  };

  handleDisplyWeekly = () => {
    this.setState({
      displayWeekly: true,
      displayDaily: false,
      displayMonthly: false,
      displayYearly: false
    });
  };

  handleDisplyMonthly = () => {
    this.setState({
      displayMonthly: true,
      displayWeekly: false,
      displayDaily: false,
      displayYearly: false
    });
  };

  handleDisplyYearly = () => {
    this.setState({
      displayYearly: true,
      displayMonthly: false,
      displayWeekly: false,
      displayDaily: false
    });
  };

  __dateFrom = datetime => {
    this.setState({ dateFrom: datetime });
  };

  __dateTo = datetime => {
    if (this.state.dateFrom !== null) {
      this.setState({
        datetimeObject: {
          dateFrom: this.state.dateFrom,
          dateTo: datetime
        }
      });
    }
  };

  render() {
    let countTotals;
    if (this.state.counts.length > 0) {
      countTotals = this.state.counts.reduce((x, y) => {
        return x + y;
      });
    }

    let amountTotals;
    if (this.state.totals.length > 0) {
      amountTotals = this.state.totals.reduce((x, y) => {
        return x + y;
      });
    }

    let currency = { format: "%c %v", code: "ZAR" };

    return (
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg  mt-4">
          <div className="collapse navbar-collapse">
            <div className="navbar-nav mr-auto">
              <button
                onClick={this.handleDisplyDaily}
                className={`btn ${
                  this.state.displayDaily ? this.state.activeButton : "btn-info"
                } mr-3`}
              >
                Daily
              </button>
              <button
                onClick={this.handleDisplyWeekly}
                className={`btn ${
                  this.state.displayWeekly
                    ? this.state.activeButton
                    : "btn-info"
                } mr-3`}
              >
                Weekly
              </button>
              <button
                onClick={this.handleDisplyMonthly}
                className={`btn ${
                  this.state.displayMonthly
                    ? this.state.activeButton
                    : "btn-info"
                } mr-3`}
              >
                Monthly
              </button>
              <button
                onClick={this.handleDisplyYearly}
                className={`btn ${
                  this.state.displayYearly
                    ? this.state.activeButton
                    : "btn-info"
                } mr-3`}
              >
                Yearly
              </button>
            </div>
            <div className="form-inline my-2 my-lg-0">
              <label className="mr-2 filteredDate">Date From </label>
              <DatePicker
                format="YYYY-MM-DD"
                selected={this.state.dateFrom}
                className="form-control mr-sm-2"
                onChange={this.__dateFrom}
              />
              <label className="mr-2 filteredDate">Date To </label>
              <DatePicker
                format="YYYY-MM-DD"
                selected={this.state.dateFrom}
                className="form-control mr-sm-2"
                onChange={this.__dateTo}
              />
            </div>
          </div>
        </nav>

        <div className="mb-3 mt-3">
          <div className="d-inline p-2 bg-danger text-white sizeofcount mr-2">
            Items {this.state.totalItems}
          </div>
          <div className="d-inline p-2 bg-info text-white sizeofcount">
            {FormatCurrency(`${this.state.totalAmouns}`, currency)}
          </div>
        </div>
        {this.state.displayDaily ? (
          <DailyRepports filteredDates={this.state.datetimeObject} />
        ) : null}
        {this.state.displayWeekly ? (
          <WeeklyRepports filteredDates={this.state.datetimeObject} />
        ) : null}
        {this.state.displayMonthly ? (
          <MonthlyRepports filteredDates={this.state.datetimeObject} />
        ) : null}
        {this.state.displayYearly ? (
          <YearlyRepports filteredDates={this.state.datetimeObject} />
        ) : null}
      </div>
    );
  }
}
