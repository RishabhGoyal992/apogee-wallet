import React, { Component } from "react";
import {
  Fab,
  Icon,
  Table,
  Button,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Typography,
} from "@material-ui/core";
import {
  Refresh as RefreshIcon
} from "@material-ui/icons"
import { connect } from "react-redux";
import QRCode from "qrcode-react";
import { bindActionCreators } from "redux"

import * as userProfile from "@/actionCreators/userProfile"
import classes from "./styles.module.scss";
import AuthRequired from "../AuthRequired";
import AddMoneyDrawer from "../MoneyDrawers/AddMoneyDrawer"
import RecieveMoneyDrawer from "../MoneyDrawers/RecieveMoneyDrawer"
import SendMoneyDrawer from "../MoneyDrawers/SendMoneyDrawer"
import ProfshowDrawer from "../MoneyDrawers/ProfshowDrawer"

class Profile extends Component {
  closeDrawer = drawerName => () => this.setState({
    [`${drawerName}DrawerOpened`]: false
  });
  constructor(props) {
    super(props)
    this.state = {
      addMoneyDrawerOpened: false,
      recieveMoneyDrawerOpened: false,
      sendMoneyDrawerOpened: false,
      profshowDrawerOpened: false,
    }
    this.closeDrawer = this.closeDrawer.bind(this);
  }
  render() {
    let qrVal = "";
    let balance = "-";
    if (this.props.userProfile.qrCode) qrVal = this.props.userProfile.qrCode;
    if (this.props.userProfile.balance != null) balance = this.props.userProfile.balance;
    let that = this;
    return (
      <AuthRequired>
        <Typography variant="h4">{this.props.userProfile.name}</Typography>
        {/* <Typography variant="h5">WALLET ID: {this.props.userProfile.userId}</Typography> */}

        {/* <div className={classes.balance}>
          <Typography variant="h4">{this.props.userProfile.balance}</Typography>
          <Typography variant="h6">BALANCE</Typography>
        </div>

        <div className={classes.balance}>
          <Typography variant="h4">{this.props.userProfile.tokens}</Typography>
          <Typography variant="h6">TOKENS</Typography>
        </div> */}
        <Table style={{ marginBottom: "5px" }}>
          <TableHead />
          <TableBody>
            {Object.entries({
              "Wallet ID": that.props.userProfile.userId,
              "Balance": `&#8377; ${balance}`,
              "Tokens": that.props.userProfile.tokens
            }).map(([name, val]) => (
              <TableRow key={name}>
                <TableCell align="center">
                  <Typography style={{ fontWeight: "bold" }}>{name}</Typography>
                </TableCell>
                <TableCell
                  align="center"
                  dangerouslySetInnerHTML={{ __html: val }}>
                </TableCell>
              </TableRow>
            ))}
            {/* <TableRow>
              <TableCell align="center"><Typography style={{ fontWeight: "bold" }}>Wallet ID</Typography></TableCell>
              <TableCell align="center">{this.props.userProfile.userId}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Balance</TableCell>
              <TableCell>&#8377;{this.props.userProfile.balance}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tokens</TableCell>
              <TableCell>{this.props.userProfile.tokens}</TableCell>
            </TableRow> */}
          </TableBody>
        </Table>

        <div style={{ position: "relative" }}>
          <QRCode className={classes.qr} value={qrVal} />
          <Fab
            color="secondary"
            aria-label="Edit"
            size="small"
            style={{
              position: "absolute",
              right: "-15px",
              bottom: "-10px",
              height: "30px",
              width: "30px",
              minHeight: "0"
            }}
            onClick={this.props.refreshQR}
          >
            <RefreshIcon />
          </Fab>
        </div>

        <div className={classes.btnWrap}>
          <Button
            className={classes.btns}
            variant="contained"
            color="primary"
            onClick={() => this.setState({
              addMoneyDrawerOpened: true,
              recieveMoneyDrawerOpened: false,
              sendMoneyDrawerOpened: false,
              profshowDrawerOpened: false,
            })}>
            Add Money
            </Button>
          {/* <Button
            className={classes.btns}
            variant="contained"
            color="primary"
            onClick={() => this.setState({
              addMoneyDrawerOpened: false,
              recieveMoneyDrawerOpened: true,
              sendMoneyDrawerOpened: false,
              profshowDrawerOpened: false,
            })}>
            Receive Money
            </Button> */}
          <Button
            className={classes.btns}
            variant="contained"
            color="primary"
            onClick={() => this.setState({
              addMoneyDrawerOpened: false,
              recieveMoneyDrawerOpened: false,
              sendMoneyDrawerOpened: true,
              profshowDrawerOpened: false,
            })}>
            Send Money
          </Button>
          <Button
            className={classes.btns}
            variant="contained"
            color="primary"
            onClick={() => this.setState({
              addMoneyDrawerOpened: false,
              recieveMoneyDrawerOpened: false,
              sendMoneyDrawerOpened: false,
              profshowDrawerOpened: true,
            })}>
            Profshows signed
          </Button>

          <AddMoneyDrawer
            open={this.state.addMoneyDrawerOpened}
            close={this.closeDrawer('addMoney')} />
          <RecieveMoneyDrawer
            open={this.state.recieveMoneyDrawerOpened}
            close={this.closeDrawer('recieveMoney')} />
          <SendMoneyDrawer
            open={this.state.sendMoneyDrawerOpened}
            close={this.closeDrawer('sendMoney')} />
          <ProfshowDrawer
            open={this.state.profshowDrawerOpened}
            close={this.closeDrawer('profshow')} />

        </div>
      </AuthRequired>
    )
  }
}

const mapStateToProps = state => ({
  userProfile: state.userProfile
})

const mapDispatchToProps = dispatch => bindActionCreators(
  Object.assign({}, userProfile), dispatch
)
export default connect(mapStateToProps, mapDispatchToProps)(Profile)