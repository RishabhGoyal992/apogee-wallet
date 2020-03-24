import React, { Component, Fragment} from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { Link } from 'react-router-dom'

import classes from './styles.module.scss';

export default class AppList extends Component {
  render () {
    return (
      <List className={classes.appList} subheader={<li />}>
        {
          this.props.items.map(({primary = "", secondary = "", Icon = Fragment, link = ""}) => {
            if (link !== "") {
              return (
                <Link key={primary} to = {link}>
                  <ListItem>
                    <ListItemText primary={primary} secondary = {secondary}/>
                    <Icon />
                  </ListItem>
                </Link>
              )
            }
            else {
              return (
                <ListItem key={primary}>
                  <ListItemText primary={primary} secondary = {secondary}/>
                  <Icon />
                </ListItem>
              )
            }
            }
          )
        }
      </List>
    )
  }
}