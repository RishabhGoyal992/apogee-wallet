import React from 'react'
import {
  CircularProgress
} from '@material-ui/core'

import classes from './styles.module.scss'

const Progress = props => (
  <div id={classes.progressOverlay}>
    <CircularProgress />
  </div>
)

export default Progress