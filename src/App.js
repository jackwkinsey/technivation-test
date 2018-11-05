import React, { Component } from "react";
import Helmet from "react-helmet";

// components
import Card from "./components/Card";
import Rewards from "./components/Rewards";

import "./App.css";

const POINTS = 50;

const HOST = "http://technivationtestapi.azurewebsites.net/api/";
const GET_ACCOUNTS = HOST + "accounts";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accounts: [],
      accountView: null,
      loading: false,
      view: "list",
      darkTheme: false
    };

    this.toggleTheme = this.toggleTheme.bind(this);
    this.handleAccountClick = this.handleAccountClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleEnroll = this.handleEnroll.bind(this);
    this.handleRedeem = this.handleRedeem.bind(this);
  }

  async componentDidMount() {
    this.setState({ loading: true });

    try {
      const response = await fetch(GET_ACCOUNTS);
      if (!response.ok) {
        throw new Error(
          `Fetch failed! ${response.status} (${response.statusText})`
        );
      }
      const results = await response.json();
      results.forEach(res => {
        if (res.isEnrolledInRewards) {
          this.handleRedeem(res, 0);
        }
      });
      this.setState({ accounts: results, loading: false });
    } catch (error) {
      console.error(error);
      this.setState({
        loading: false
      });
    }
  }

  toggleTheme() {
    this.setState(prevState => {
      return { darkTheme: !prevState.darkTheme };
    });
  }

  handleAccountClick(account) {
    console.log("clicked", account);
    this.setState({ view: "account", accountView: account });
  }

  handleBackClick() {
    this.setState({ view: "list" });
  }

  async handleEnroll(account) {
    this.setState({ loading: true });

    try {
      const response = await fetch(HOST + account.number + "/enroll", {
        method: "POST"
      });
      if (!response.ok) {
        throw new Error(
          `Fetch failed! ${response.status} (${response.statusText})`
        );
      } else {
        let accounts = this.state.accounts.slice();
        let idx = accounts.findIndex(a => a.number === account.number);
        let found = accounts[idx];
        found.isEnrolledInRewards = true;
        found.rewardPoints = 0;

        this.setState({ accounts, loading: false });
      }
    } catch (error) {
      console.error(error);
      this.setState({
        loading: false
      });
    }
  }

  async handleRedeem(account, points) {
    console.log("REDEEM", points, "POINTS FOR:", account);
    const data = { redeemAmount: points };

    this.setState({ loading: true });

    try {
      const response = await fetch(HOST + account.number + "/redeem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(
          `Fetch failed! ${response.status} (${response.statusText})`
        );
      }

      const results = await response.json();
      let accounts = this.state.accounts.slice();
      let idx = accounts.findIndex(a => a.number === account.number);
      let found = accounts[idx];
      found.rewardPoints = results;

      this.setState({ accounts, loading: false });
    } catch (error) {
      console.error(error);
      this.setState({
        loading: false
      });
    }
  }

  buildListView() {
    const cards = this.state.accounts.map((account, idx) => {
      return (
        <Card
          key={idx}
          data={{
            header: account.nickname,
            subheader: account.maskedNumber
          }}
          onClick={e => {
            this.handleAccountClick(account, e);
          }}
        >
          <div className="flex">
            <div className="type">
              <h5>{account.accountType}</h5>
              <h6 className="text-muted">Account Type</h6>
            </div>
            <div>
              <h4 className="text-info">{account.formattedCurrentBalance}</h4>
              <h6 className="text-muted">Current Balance</h6>
            </div>
          </div>
        </Card>
      );
    });

    return <div className="account-list">{cards}</div>;
  }

  buildAccountView() {
    const account = this.state.accountView;

    return (
      <Card
        data={{
          header: account.nickname,
          subheader: account.maskedNumber,
          title: account.accountType,
          subtitle: "Account Type"
        }}
      >
        <div className="balance">
          <h4 className="text-info">{account.formattedCurrentBalance}</h4>
          <h6 className="text-muted">Current Balance</h6>
        </div>
        <div className="flex">
          <Rewards
            account={account}
            points={POINTS}
            onEnroll={this.handleEnroll}
            onRedeem={this.handleRedeem}
          />
          <div className="back-btn">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={this.handleBackClick}
            >
              Return to Accounts
            </button>
          </div>
        </div>
      </Card>
    );
  }

  render() {
    const themeFile = this.state.darkTheme ? (
      <link
        rel="stylesheet"
        href={`${process.env.PUBLIC_URL}/styles/bootstrap-darkly.min.css`}
      />
    ) : null;

    const cards = this.buildListView();
    const account =
      this.state.accountView && this.state.view === "account"
        ? this.buildAccountView()
        : null;

    return (
      <div className="App">
        <Helmet>{themeFile}</Helmet>
        <h3 className="title">Goliath National Bank</h3>
        {this.state.view === "list" ? cards : account}
        <div className="form-check" id="nightmode">
          <label className="form-check-label">
            <input
              className="form-check-input"
              type="checkbox"
              value={this.state.darkTheme}
              checked={this.state.darkTheme}
              onChange={this.toggleTheme}
            />
            Night Mode
          </label>
        </div>
      </div>
    );
  }
}

export default App;
