import React, { Component } from "react";
import {
  Typography
} from "@material-ui/core";
import {
  ArrowForwardIos as Arrow
} from "@material-ui/icons";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import AuthRequired from "../AuthRequired";
import AppList from "../AppList";
import * as vendors from "@/actionCreators/vendors"

class Stalls extends Component {
  componentWillMount() {
    this.props.getVendors()
  }
  render() {
    let sampleStruct;
    if (!this.props.vendors || !this.props.vendors.vendors) sampleStruct = []

    else {
      let openStalls = this.props.vendors.vendors.filter(({ closed }) => !closed);
      sampleStruct = openStalls.map(({ id, name }) => ({
        primary: name,
        secondary: "",
        link: `/stall/${id}/items`,
        Icon: () => <Arrow />
      }))
    }
    return (
      <AuthRequired>
        <Typography variant="h4">MENU</Typography>

        <AppList items={sampleStruct}/>

      </AuthRequired>
    )
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators(Object.assign({}, vendors), dispatch)
)

const mapStateToProps = state => ({
  vendors: state.vendors
})

export default connect(mapStateToProps, mapDispatchToProps)(Stalls)