import classnames from 'classnames'
import React, { PureComponent } from 'react'

export default class SC_ToggleButton extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { text, isOn, handleClick } = this.props

    const classes = classnames({
      SC_TogglePosterButton: true,
      active: isOn
    })

    return (
      <div className={classes} onClick={handleClick}>
        <p>{text}</p>
      </div>
    )
  }
}
