import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import QRCode from "qrcode-react";
import request from 'request'

import MoneyDrawerBase from './MoneyDrawerBase'
import classes from './styles.module.scss'
import * as api from '@/constants/api'
import * as ui from '@/actionCreators/ui'
import { handleResponse } from '@/utils'

class AddMoneyDrawer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: ""
    }

    this.addMoney = this.addMoney.bind(this);
  }

  addMoney() {
    const amount = Number(this.state.amount);
    if (amount > 0) {
      this.props.showLoader();

      request({
        method: 'POST',
        url: api.ADD_MONEY,
        headers: {
          'Content-Type': 'application/json',
          'X-Wallet-Token': api.WALLET_TOKEN,
          'Authorization': `JWT ${this.props.auth.JWT}`
        },
        body: JSON.stringify({ amount }) 
      }, (error, response, body) => {
        handleResponse(error, response, body, () => {
          try {
            this.props.showSnackbar("Money added successfully.");
            this.props.close();
          }
          catch (e) {
            throw new Error(e.message || "");
          }
        })
      });
    }
    else {
      this.props.showSnackbar("Please enter a valid amount");
    }
  }

  render() {

    const isBitsian = this.props.userProfile.isBitsian;

    const text = isBitsian ? "ADD MONEY USING SWD" : "SHOW THE QR CODE TO THE TELLER"

    let qrVal = "";
    if (this.props.userProfile.qrCode) qrVal = this.props.userProfile.qrCode;

    const Content = isBitsian ?
      (<>
        <TextField
          label="Amount"
          value={this.state.amount}
          onChange={e => this.setState({ amount: e.target.value })}
          margin="normal"
          variant="outlined"
          className = {classes.inputBox}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={this.addMoney}
          >
          ADD
        </Button>
      </>) :
      (<><QRCode value={qrVal} /></>)

    return (
      <MoneyDrawerBase open={this.props.open} close={this.props.close}>
        <div
          className={classes.moneyDrawersCommon}
          style={{
            justifyContent: isBitsian ? "space-around" : "center"
          }}>
          <h3
            style={{ marginBottom: isBitsian ? "" : "20px" }}
            className = {classes.topText}>
            {text}
          </h3>
          {Content}
        </div>
      </MoneyDrawerBase>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  userProfile: state.userProfile
})

const mapDispatchToProps = dispatch => bindActionCreators(
  Object.assign({}, ui),
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(AddMoneyDrawer)