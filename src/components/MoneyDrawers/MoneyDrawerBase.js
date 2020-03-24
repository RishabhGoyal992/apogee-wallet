import React from 'react'
import { Drawer, Button } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'

import classes from './styles.module.scss'

const MoneyDrawerBase = ({ children, open, close }) => {
  return (
    <Drawer
      open={open} 
      onClose={close}
      variant="temporary" 
      anchor="bottom"
      transitionDuration={300}
      classes={{
        paper: classes.moneyDrawerBase
      }}>
      <Button onClick={close}><CloseIcon /></Button>
      {children}
    </Drawer>
  )
}

export default MoneyDrawerBase