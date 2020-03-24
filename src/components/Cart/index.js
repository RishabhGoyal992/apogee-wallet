import React, { Component } from "react";
import AuthRequired from "../AuthRequired";

import classes from './styles.module.scss';
import {
  Typography,
  List,
  ListSubheader, 
  ListItem, 
  ListItemText, 
  Divider, 
  Button
} from "@material-ui/core";
import {
  AddCircleOutline as AddIcon,
  RemoveCircleOutline as RemoveIcon,
} from "@material-ui/icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cart from "@/actionCreators/cart"

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalPrice: 0
    }

    this.computeTotalPrice.bind(this);
  }

  componentDidMount() {
    this.computeTotalPrice();
  }

  componentDidUpdate() {
    this.computeTotalPrice();
  }

  computeTotalPrice() {
    let totalPrice = 0;
    Object.keys(this.props.cart).forEach(stallId => {
      Object.keys(this.props.cart[stallId].items).forEach(itemId => {
        let item = this.props.cart[stallId].items[itemId];
        totalPrice += (item.price * item.quantity)
      })
    })

    if (totalPrice !== this.state.totalPrice) {
      this.setState({ totalPrice });
    }
  }

  render() {
    return (
      <AuthRequired>
        <Typography variant="h4">CART</Typography>

        <List className={classes.cartList} subheader={<li />}>
          {
            Object.keys(this.props.cart).map(stallId => (
              <li key={this.props.cart[stallId].stallName}>
                <ul>
                  <ListSubheader className={classes.stallName}>{this.props.cart[stallId].stallName}</ListSubheader>
                  {Object.keys(this.props.cart[stallId].items).map(itemId => (
                    <ListItem key={itemId} className={classes.cartItem}>
                      <ListItemText primary={this.props.cart[stallId].items[itemId].itemName} secondary={`INR ${this.props.cart[stallId].items[itemId].price}`} />
                      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <RemoveIcon onClick={this.props.decreaseQty.bind(this, stallId, itemId)} style={{ marginLeft: "5px" }} />
                        <span className = "qty-display">{this.props.cart[stallId].items[itemId].quantity}</span>
                        <AddIcon onClick={this.props.increaseQty.bind(this, stallId, itemId)} style={{ marginRight: "5px" }} />
                      </div>
                    </ListItem>
                  ))}
                  <Divider />
                </ul>
              </li>
            ))
          }
        </List>
        <div className={classes.bottom}>
          <Typography variant="h6">Total Price: INR <span>{this.state.totalPrice}</span></Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={this.props.placeOrder}>
            Place Order
          </Button>
        </div>
      </AuthRequired>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart
});

const mapDispatchToProps = dispatch => (
  bindActionCreators(Object.assign({}, cart), dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Cart);