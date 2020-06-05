import React, { useRef } from 'react'
import PropTypes from 'prop-types'

const Mutable = (props)=> {
  const element = useRef()

  const onMove = (e)  =>{
    let elem = element.current
    const h = elem.offsetHeight
    const w = elem.offsetWidth
    const t = elem.offsetTop
    const l = elem.offsetLeft
    const y = t + h - e.pageY
    const x = l + w - e.pageX
    
    const follow = (e) => {
      elem.style.top = `${e.pageY + y - h}px`
      elem.style.left = `${e.pageX + x - w}px`
    }
    
    const resize = (e) => {
      const w = (e.pageX - l + x)
      const h = (e.pageY - t + y)
      elem.style.width = `${w}px`
      elem.style.height = `${h}px`
      if(props.onResize){
        props.onResize({
          w,
          h
        })
      }
    }
    const unresize = (e) => {
      document.removeEventListener('mousemove', resize);
      document.removeEventListener("mouseup", unresize);
      e.preventDefault();
    }
    
    const unfollow = (e) => {
      document.removeEventListener('mousemove', follow)
      document.removeEventListener("mouseup", unfollow)
      e.preventDefault();
    }
    
    if (x > 12 && y > 12) {
      document.addEventListener("mousemove", follow)
      document.addEventListener("mouseup", unfollow)
      e.preventDefault()
    } else {
      document.addEventListener("mousemove", resize)
      document.addEventListener("mouseup", unresize)
      e.preventDefault()
    }
  
  }

 return (
 <div
    style={{
      width: props.width || '100px',
      height: props.height || '100px',
      top: props.top || '100px',
      left: props.left || '100px',
      position: 'absolute',
      resize: 'both',
      cursor: 'grab'
    }}
    ref={element}
    onMouseDown={onMove}
    onMouseOver={props.onMouseOver}
    onMouseLeave={props.onMouseLeave}>
    {props.children}
    <div 
    onMouseDown={onMove}
    style={{
      position: 'absolute',
      right: '0px',
      bottom: '0px',
      width: '20px',
      height: '20px',
      cursor: 'nwse-resize',
      zIndex: 600
    }}/>
</div>)
}

Mutable.propTypes = {
 onResize: PropTypes.func,
 onMouseLeave: PropTypes.func,
 onMouseOver: PropTypes.func,
 width: PropTypes.string,
 height: PropTypes.string,
 top: PropTypes.string,
 left: PropTypes.string
}

export default Mutable