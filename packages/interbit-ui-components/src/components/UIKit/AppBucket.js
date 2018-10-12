import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

/**
 * UI Component that behaves as a popover-style menu to navigate between different apps.
 */
export default class AppBucket extends React.Component {
  static propTypes = {
    /** An array of objects to be displayed in the AppBucket. */
    items: PropTypes.arrayOf(
      PropTypes.shape({
        /** The app name that is displayed below the icon. */
        label: PropTypes.string.isRequired,
        /** The image source for the app icon. */
        icon: PropTypes.string.isRequired,
        /** The location to link to. */
        to: PropTypes.string.isRequired,
        /** The function that is triggered on click of the icon or app name. */
        clickHandler: PropTypes.func
      })
    ).isRequired,
    /** Is true if the AppBucket is visible. This prop is updated via mapStateToProps from react-redux. */
    isVisible: PropTypes.bool,
    /** The function is triggered when a user click anywhere outside the AppBucket. This function should update *isVisible* property */
    onClose: PropTypes.func.isRequired,
    /** Element to be rendered in-place where the AppBucket is defined.  **/
    children: PropTypes.node.isRequired
  }

  static defaultProps = {
    isVisible: false
  }

  constructor(props) {
    super(props)

    this.popoverRef = null
    this.triggerRef = null
  }

  componentDidMount() {
    this.recalculateArrowPosition()
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.outsideClickListener)
    window.addEventListener('resize', this.recalculateArrowPosition)
  }
  setBoxRef = element => {
    this.popoverRef = element
    this.detectClickOutside(element, () => {
      this.props.onClose()
    })
  }
  setTriggerRef = element => {
    this.triggerRef = element

    this.detectWindowResize()
  }

  detectWindowResize = () =>
    window.addEventListener('resize', this.recalculateArrowPosition)

  recalculateArrowPosition = () => {
    if (!this.popoverRef || !this.triggerRef) return
    const windowWidth = window.innerWidth
    const triggerWidth = utils.getWidth(this.triggerRef)
    const dropWrapperWidth = 252
    const restWidth = (dropWrapperWidth - triggerWidth) / 2
    const triggerPosition = utils.getOffset(this.triggerRef).left
    const restWindowWidth = windowWidth - triggerPosition - triggerWidth
    const check = restWindowWidth - restWidth
    this.popoverRef.style.display = 'block'
    if (check < 0) {
      this.popoverRef.style.left = `${check}px`
    } else {
      this.popoverRef.style.left = '50%'
    }
  }
  detectClickOutside = (element, callback) =>
    document.addEventListener(
      'click',
      this.outsideClickListener(element, callback)
    )

  outsideClickListener = (element, callback) => event => {
    if (!this.popoverRef.contains(event.target)) {
      const isVisible = elem =>
        !!+window.getComputedStyle(elem).getPropertyValue('opacity')

      if (isVisible(this.popoverRef)) {
        callback && callback(element)
      }
    }
  }

  render() {
    const { items, isVisible, children } = this.props
    return (
      <div className="ibweb-app-bucket">
        <div
          className={`ibweb-app-bucket-container ${isVisible ? 'open' : ''}`}>
          <div className="ibweb-app-bucket-trigger" ref={this.setTriggerRef}>
            {children}
          </div>
          <div className="ibweb-app-bucket-popover" ref={this.setBoxRef}>
            <div className="ibweb-app-bucket-item-row">
              {items.map(({ label, icon, to, clickHandler }) => (
                <Link
                  key={`link-${label}`}
                  to={to}
                  clickHandler={clickHandler}
                  className="ibweb-app-bucket-item-wrapper">
                  <div
                    className={`ibweb-app-bucket-item ${
                      icon ? '' : 'ibweb-app-bucket-item-placeholder'
                    }`}>
                    {icon && <img src={icon} alt={label} />}
                  </div>
                  <div className="ibweb-app-bucket-item-text">{label}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const utils = {
  getOffset: el => {
    if (!el) return { top: 0, left: 0 }
    const box = el.getBoundingClientRect()

    return {
      top: box.top + window.pageYOffset - document.documentElement.clientTop,
      left: box.left + window.pageXOffset - document.documentElement.clientLeft
    }
  },
  getHeight: el => {
    if (!el) return 0
    const styles = window.getComputedStyle(el)
    const height = el.offsetHeight
    const borderTopWidth = parseFloat(styles.borderTopWidth)
    const borderBottomWidth = parseFloat(styles.borderBottomWidth)
    const paddingTop = parseFloat(styles.paddingTop)
    const paddingBottom = parseFloat(styles.paddingBottom)
    return (
      height - borderBottomWidth - borderTopWidth - paddingTop - paddingBottom
    )
  },
  getWidth: el => {
    if (!el) return 0
    const styles = window.getComputedStyle(el)
    const width = el.offsetWidth
    const borderLeftWidth = parseFloat(styles.borderLeftWidth)
    const borderRightWidth = parseFloat(styles.borderRightWidth)
    const paddingRight = parseFloat(styles.paddingRight)
    const paddingLeft = parseFloat(styles.paddingLeft)
    return (
      width - borderLeftWidth - borderRightWidth - paddingRight - paddingLeft
    )
  }
}
