import React, { Component } from 'react'
import { TextField, Button, InputAdornment } from '@material-ui/core'
import { connect } from 'react-redux'
import request from 'request'

import MoneyDrawerBase from './MoneyDrawerBase'
import classes from './styles.module.scss'
import * as api from '@/constants/api'
import { handleResponse } from '@/utils'
import * as ui from '@/actionCreators/ui'
import { bindActionCreators } from 'redux';

class SendMoneyDrawer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      walletId: "",
      amount: "",
    }
    this.sendMoney = this.sendMoney.bind(this)
  }

  sendMoney() {
    const amount = Number(this.state.amount)
    if (Number.isNaN(amount)) return this.props.showSnackbar('Please enter a valid amount');

    this.props.showLoader();
    request({
      method: 'POST',
      url: api.TRANSFER_MONEY,
      headers: {
        'Content-Type': 'application/json',
        'X-Wallet-Token': api.WALLET_TOKEN,
        'Authorization': `JWT ${this.props.auth.JWT}`
      },
      body: JSON.stringify({ id: this.state.walletId, amount }),
    }, (error, response, body) => {
      handleResponse(error, response, body, () => {
        try {
          this.props.showSnackbar("Money sent successfully.");
          this.props.close();
        }
        catch (e) {
          throw new Error(e.message || "")
        }
      })
    });
  }

  render() {
    return (
      <MoneyDrawerBase open={this.props.open} close={this.props.close}>
        <div className={classes.moneyDrawersCommon}>
          <h3 className = {classes.topText}>SEND MONEY</h3>
          <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <h4>I WANT TO SEND</h4>
            <TextField
              label="Amount"
              value={this.state.amount}
              onChange={e => this.setState({ amount: e.target.value })}
              margin="normal"
              variant="outlined"
              InputProps={{
                startAdornment: <InputAdornment position="start">INR</InputAdornment>,
              }}
              className = {classes.inputBox}
            />
            <h4>TO</h4>
            <TextField
              label="WalletId"
              value={this.state.walletId}
              onChange={e => this.setState({ walletId: e.target.value })}
              margin="normal"
              variant="outlined"
              InputProps={{
                startAdornment: <InputAdornment position="start">#</InputAdornment>,
              }}
              className = {classes.inputBox}
            />
          </div>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              console.log('clicked')
              this.sendMoney()
            }}>
            SEND
          </Button>
        </div>

      </MoneyDrawerBase>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  userProfile: state.userProfile,

})

const mapDispatchToProps = dispatch => bindActionCreators(
  Object.assign({}, ui),
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(SendMoneyDrawer)