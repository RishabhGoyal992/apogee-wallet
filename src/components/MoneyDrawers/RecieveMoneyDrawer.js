import React, { Component } from 'react'
import { connect } from 'react-redux'
import QRCode from "qrcode-react";

import MoneyDrawerBase from './MoneyDrawerBase'
import classes from './styles.module.scss'

class RecieveMoneyDrawer extends Component {
  render() {
    let qrVal = "";
    if (this.props.userProfile.qrCode) qrVal = this.props.userProfile.qrCode;

    return (
      <MoneyDrawerBase open={this.props.open} close={this.props.close}>
        <div
          className={classes.moneyDrawersCommon}
          style={{
            justifyContent: "center"
          }}>
          <h3
          style={{
            marginBottom: "20px"
          }}
          className = {classes.topText}>ASK THE SENDER TO SCAN THE QR CODE</h3>
          <QRCode value={qrVal} />
        </div>

      </MoneyDrawerBase>
    )
  }
}

const mapStateToProps = state => ({
  userProfile: state.userProfile
})
export default connect(mapStateToProps, null)(RecieveMoneyDrawer)