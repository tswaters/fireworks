import React, { createRef, PureComponent } from 'react'
import * as FireworksCanvas from 'fireworks-canvas'

export class Fireworks extends PureComponent {
  constructor(props) {
    super(props)
    this.ref = createRef()
    this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this)
    this.handleResize = this.handleResize.bind(this)
  }

  handleDocumentKeyDown(ev) {
    if (ev.keyCode === 27) {
      this.fireworks.stop()
    }
  }

  handleResize() {
    this.fireworks.resetSize()
  }

  componentDidMount() {
    if (!this.ref.current) {
      return null
    }
    this.fireworks = new FireworksCanvas(this.ref.current)
    document.addEventListener('keydown', this.handleDocumentKeyDown)
    window.addEventListener('resize', this.handleResize)
  }

  componentDidUpdate() {
    if (this.props.active) {
      this.fireworks.start()
    } else {
      this.fireworks.kill()
    }
  }

  componentWillUnmount() {
    this.fireworks.destroy()
    document.removeEventListener('keydown', this.handleDocumentKeyDown)
    window.removeEventListener('resize', this.handleResize)
  }

  render() {
    return <div ref={this.ref} />
  }
}
