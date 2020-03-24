import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import {
  Typography,
  List, 
  ListSubheader, 
  ListItem, 
  ListItemText, 
  Divider
} from "@material-ui/core";

import * as orders from '@/actionCreators/orders'
import classes from './styles.module.scss'

class PastTransactions extends Component {
  componentWillMount() {
    this.props.getPastTransactions()
  }
  render() {
    console.log(this.props.orders.pastTransactions);
    if (!this.props.orders.pastTransactions) return <></>
    return (
      <>
        <Typography variant="h4">PAST TRANSACTIONS</Typography>
        <List id={classes.pastTransactionTable} subheader={<li />}>
          {
            this.props.orders.pastTransactions.map((order, key) => (
              <li key={key}>
                <ul>
                  <ListSubheader >{order.vendor.name}</ListSubheader>
                  {order.items.map(item => (
                    <ListItem key={item.id} >
                      <ListItemText primary={item.name} secondary={item.quantity} />
                      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}></div>
                    </ListItem>
                  ))}
                  <Divider />
                </ul>
              </li>
            ))

          }
        </List>
      </>
    )
  }
}

const mapStateToProps = state => ({
  orders: state.orders
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(Object.assign({}, orders), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PastTransactions)