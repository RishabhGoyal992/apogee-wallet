import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { SwipeableDrawer, List, ListItem, ListItemText, ListItemIcon, AppBar, Toolbar, IconButton, Typography, Button, Badge } from '@material-ui/core';
import { 
  ShoppingCartOutlined as ShoppingCartIcon, 
  Menu as MenuIcon, 
  Mail as MailIcon,
  AccountCircle as AccountCircleIcon,
  Store as StoreIcon,
  Fastfood as FastfoodIcon,
  LocalActivity as LocalActivityIcon } from '@material-ui/icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AuthRequired from '../AuthRequired'
import classes from './styles.module.scss';
import * as auth from '@/actionCreators/auth'

import Profile from '../Profile';
import Cart from '../Cart';
import Stalls from '../Stalls';
import StallItems from '../StallItems';
import Profshows from '../Profshows';
import Orders from '../Orders';
import KindStore from '../KindStore';

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDrawerOpen: false
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }

  toggleDrawer(boolVal) {
    this.setState({ isDrawerOpen: boolVal });
  }

  logoutUser () {
    this.props.changeLoginStatus(false, null);
  }

  render() {

    const pages = [
      {
        name: 'Profile',
        link: '/',
        icon: () => <AccountCircleIcon />
      },
      {
        name: 'Menu',
        link: '/stalls',
        icon: () => <StoreIcon />
      },
      {
        name: 'Orders',
        link: '/orders',
        icon: () => <FastfoodIcon />
      },
      // {
      //   name: 'Past Transactions',
      //   link: '/past_transactions',
      //   icon: () => <MoneyIcon />
      // },
      {
        name: 'Buy Profshow Tickets',
        link: '/profshows',
        icon: () => <LocalActivityIcon />
      },
      {
        name: 'Kind Store',
        link: '/kindstore',
        icon: () => <StoreIcon />
      },
    ]

    let totalItems = 0;
    for (let stallId in this.props.cart) {
      let items = this.props.cart[stallId].items;
      for (let itemId in items) {
        totalItems += items[itemId].quantity;
      }
    }

    return (
      <AuthRequired>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu" onClick={this.toggleDrawer.bind(this, true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Wallet
            </Typography>
            <Link to = "/cart">
              <Badge badgeContent = {totalItems} color = "secondary">
                <Button color="inherit"><ShoppingCartIcon /></Button>
              </Badge>
            </Link>
          </Toolbar>
        </AppBar>

        <SwipeableDrawer
          open={this.state.isDrawerOpen}
          onClose={() => this.toggleDrawer(false)}
          onOpen={() => this.toggleDrawer(true)}
          variant="temporary"
          transitionDuration={300}>
          <List className={classes.list}>
            {pages.map((page) => (
              <Link to={page.link} key={page.name}>
                <ListItem button onClick={() => this.toggleDrawer(false)}>
                  <ListItemIcon><page.icon /></ListItemIcon>
                  <ListItemText primary={page.name} />
                </ListItem>
              </Link>
            ))}
              <ListItem button onClick = {this.logoutUser}>
                <ListItemIcon><MailIcon /></ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
          </List>
        </SwipeableDrawer>

        <div className={classes.pageContainer}>
          <Switch>
            <Route exact path='/' component={Profile} />
            <Route path='/cart' component={Cart} />
            <Route path='/stalls' component={Stalls} />
            <Route path='/stall/:id/items' component={StallItems} />
            <Route path='/orders' component={Orders} />
            {/* <Route path='/past_transactions' component={PastTransactions} /> */}
            <Route path='/profshows' component={Profshows} />
            {/* <Route path='/kindstore' component={KindStore} /> */}
          </Switch>
        </div>
      </AuthRequired>
    )
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, auth), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);