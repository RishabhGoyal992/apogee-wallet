import React, { Component } from 'react'
import {
  Table,
  Typography,
  // IconButton,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip
} from '@material-ui/core'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import MoneyDrawerBase from './MoneyDrawerBase'
import classes from './styles.module.scss'
import * as profshows from '@/actionCreators/profshows'
import { Help as HelpIcon } from '@material-ui/icons';

class RecieveMoneyDrawer extends Component {
  componentWillMount() {
    this.props.getMyProfshows();
  }
  render() {
    return (
      <MoneyDrawerBase open={this.props.open} close={this.props.close}>
        <div className={classes.moneyDrawersCommon}
          style={{
            justifyContent: "flex-start"
          }}
        >
          <h3
            style={{
              marginBottom: "20px"
            }}
            className={classes.topText}>PROFSHOWS SIGNED</h3>
          <Table>
            <TableHead className={classes.profshowTableHead}>
              <TableRow>
                <TableCell align="center">Profshow</TableCell>
                <TableCell align="center">Tickets<br/><span style={{
                  color: "grey",
                  fontSize: "12px"
                }}>(Remaining/Total)</span>&nbsp;
                {/* <Tooltip
                    title="Remaining/Total"
                    placement="top"
                    disableHoverListener
                  >
                    <IconButton>
                      <HelpIcon fontSize="small"/>
                    </IconButton>
                  </Tooltip> */}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                this.props.myProfshows
                &&
                Object.keys(this.props.myProfshows).map(key =>
                  <TableRow key={key} className={classes.profshowTableRow}>
                    <TableCell align="center">{this.props.myProfshows[key].show_name}</TableCell>
                    <TableCell align="center">{this.props.myProfshows[key].unused_count}/{this.props.myProfshows[key].used_count + this.props.myProfshows[key].unused_count}</TableCell>
                  </TableRow>
                )
              }
            </TableBody>

          </Table>
          {/* <QRCode value={this.props.userProfile.qrCode} /> */}
        </div>

      </MoneyDrawerBase>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  userProfile: state.userProfile,
  myProfshows: state.profshows.myShows
})

const mapDispatchToProps = dispatch => bindActionCreators(
  Object.assign({}, profshows),
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(RecieveMoneyDrawer)