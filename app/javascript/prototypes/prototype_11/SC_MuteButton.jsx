import React, { PureComponent } from 'react'

export default class SC_MuteButton extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { text, handleClick } = this.props

    return (
      <div className="SC_MuteButton" onClick={handleClick}>
        {text}
      </div>
    )
  }
}
