import React, { Component, Fragment } from 'react'
import {
  ArrowBackIos as ArrowIcon,
  AddCircleOutline as AddIcon,
  RemoveCircleOutline as RemoveIcon,
} from '@material-ui/icons'
import {
  List,
  Button,
  ListItem,
  Typography,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'

import * as vendors from "@/actionCreators/vendors"
import * as cart from "@/actionCreators/cart"

class StallItems extends Component {
  componentWillMount() {
    this.props.getItems(this.props.match.params.id);
  }

  render() {
    let struct;

    if (!this.props.items || !this.props.stallName || !this.props.stallId || !this.props.cart) struct = [];
    else {
      let availableItems = this.props.items.filter(({ is_available }) => is_available);
      struct = availableItems.map(item => ({
        ...item,
        primary: item.name,
        secondary: item.price,
        Icon: () => (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <RemoveIcon onClick={this.props.decreaseQty.bind(this, this.props.stallId, item.id)} style={{ marginLeft: "5px" }} />
            <span style={{
              width: "17px",
              textAlign: "center"
            }}>{
                (this.props.cart[this.props.stallId] && this.props.cart[this.props.stallId].items[item.id]) ?
                  this.props.cart[this.props.stallId].items[item.id].quantity : 0
              }</span>
            <AddIcon
              onClick={this.props.addToCart.bind(this, this.props.stallName,
                this.props.stallId,
                item.name,
                item.id,
                item.price)} style={{ marginRight: "5px" }} />
          </div>
        )
      }));
    }

    return (
      <Fragment>
        <Link to="/stalls">
          <Button style={{
            position: "absolute",
            left: "0px"
          }}>
            <ArrowIcon />
          </Button>
        </Link>
        <Typography variant="h4"> {this.props.stallName} </Typography>
        <List style={{
          width: "100%"
        }}>
          {
            struct.map(({ primary, secondary, Icon }) => (
              <ListItem key={primary}>
                <ListItemText primary={primary} secondary={secondary} />
                <ListItemSecondaryAction>
                  <Icon />
                </ListItemSecondaryAction>
              </ListItem>
            ))
          }
        </List >
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  items: state.vendors.items,
  stallName: state.vendors.name,
  stallId: state.vendors.id,
  cart: state.cart
})

const mapDispatchToProps = dispatch => (
  bindActionCreators(Object.assign({}, vendors, cart), dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(StallItems)