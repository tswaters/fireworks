
import React, {createRef, PureComponent} from 'react'
import * as FireworksCanvas from 'fireworks-canvas'

export class Fireworks extends PureComponent {

  constructor (props) {
    super(props)
    this.ref = createRef()
    this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this)
  }

  handleDocumentKeyDown (ev) {
    if (ev.keyCode === 27) { this.fireworks.stop() }
  }

  componentDidMount () {
    if (!this.ref.current) { return null}
    this.fireworks = new FireworksCanvas(this.ref.current)
  }

  componentDidUpdate () {
    if (this.props.active) {
      document.addEventListener('keydown', this.handleDocumentKeyDown)
      this.fireworks.start()
    } else {
      document.removeEventListener('keydown', this.handleDocumentKeyDown)
      this.fireworks.kill()
    }
  }

  componentWillUnmount () {
    this.fireworks.destroy()
  }

  render () {
    return (
      <div ref={this.ref} />
    )
  }

}
