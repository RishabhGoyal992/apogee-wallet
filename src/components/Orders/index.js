import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Chip,
  Button,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@material-ui/core'
import {
  ExpandMore as ExpandMoreIcon
} from "@material-ui/icons"
import request from 'request'

import { handleResponse } from '@/utils'
import * as orders from "@/actionCreators/orders"
import * as ui from "@/actionCreators/ui"
import * as api from "@/constants/api"
import classes from './styles.module.scss'
import store from '@/store'

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.setOtpTrue = this.setOtpTrue.bind(this);
  }
  countOrders = shells => shells.map(shell => shell.orders).flat().length

  setOtpTrue = orderNumber => {
    const x = [...this.state.otpShown];
    x[orderNumber] = true;
    this.setState({ otpShown: x });
  }

  countOrderNumber = (i, j) => {
    const ordersBefore = this.countOrders(this.props.orders.orders.slice(0, j))
    const elem = ordersBefore + i;
    return elem;
  }

  CircularDiv = (props) => (
    <div style={{
      ...props,
      width: "10px",
      height: "10px",
      borderRadius: "20px",
    }}></div>
  )

  componentWillMount() {
    this.props.getOrders();
  }

  componentWillReceiveProps(props) {
    this.setState({
      otpShown: new Array(this.countOrders(props.orders.orders)).fill(false)
    })
  }


  render() {
    const { CircularDiv } = this
    const { orders } = this.props.orders
    const ReadyCode = 2;

    return (
      <>
        <Typography variant="h4">ORDERS</Typography>

        <div style={{ marginTop: '30px', width: '100%' }}>
          {orders.map(
            (shell, j) => shell.orders.map((order, i) => {
              return (
                <ExpansionPanel key={`${shell.id}-${order.id}`} style={{ width: "100%" }}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                    <div className={classes.orderSummaryContainer}>
                      <div className={classes.orderNameDate}>
                        <Typography >{order.vendor.name}</Typography>
                        <Typography
                          fontWeight={300}
                          variant="subtitle2"
                          classes={{
                            root: classes.timestampDisplay
                          }}
                        >
                          {shell.timestamp}
                        </Typography>
                      </div>
                      <div style={{
                        display: "flex",
                        flexDirection: "row",
                      }}>
                        {/* {order.status === this.ReadyCode && <Chip label={order.status} />} */}
                        {/* {order.status > this.ReadyCode && <Chip label={order.status} />} */}
                        {order.status === ReadyCode &&
                          <Button
                            variant="outlined"
                            size="small"
                            color="primary"
                            disabled={this.state.otpShown[this.countOrderNumber(i, j)]}
                            classes={{
                              disabled: classes.otpDisableButton
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              this.props.showLoader();
                              request({
                                method: 'POST',
                                url: api.MAKE_OTP_SEEN,
                                headers: {
                                  'Content-Type': 'application/json',
                                  'X-Wallet-Token': api.WALLET_TOKEN,
                                  'Access-Control-Allow-Origin': '*',
                                  'Authorization': `JWT ${store.getState().auth.JWT}`,
                                },
                                body: JSON.stringify({
                                  order_id: order.id
                                })
                              }, (error, response, body) => {
                                handleResponse(error, response, body, () => {
                                  this.setOtpTrue(this.countOrderNumber(i, j));
                                });
                              });
                            }}
                          >
                            {this.state.otpShown[this.countOrderNumber(i, j)] ? order.otp : "OTP"}
                          </Button>}
                        {order.status > ReadyCode &&
                          <Button
                            variant="outlined"
                            size="small"
                            color="primary"
                            disabled
                            classes={{
                              disabled: classes.otpDisableButton
                            }}
                          >
                            {order.otp}
                          </Button>}

                        <div className={classes.orderStatus}>
                          <Typography style={{ textAlign: "right" }}>{
                            ["Pending", "Accepted", "Ready", "Finished", "Declined"][order.status]
                          }</Typography>
                          <div className={classes.orderStatusVis}>
                            {
                              [<CircularDiv key="pending" backgroundColor="red" marginRight="4px" />,
                              <CircularDiv key="accepted" backgroundColor="yellow" marginRight="4px" />,
                              <CircularDiv key="finished" backgroundColor="green" />].splice(0, 1 + order.status)
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails
                    classes={{
                      root: classes.expansionTable
                    }}>
                    <Table>
                      <TableHead />
                      <TableBody>
                        {order.items.map(item => (
                          <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell align="right">{item.quantity}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              )
            })
          ).flat()}
        </div>
      </>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(
  Object.assign({}, orders, ui), dispatch
)

const mapStateToProps = state => ({
  orders: state.orders
})

export default connect(mapStateToProps, mapDispatchToProps)(Orders)