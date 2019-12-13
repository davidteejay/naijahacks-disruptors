import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import Nav from './Navbar'
import Loader from './Loader'

const Wrapper = props => {
  useEffect(() => {
    // Check user & refresh token
  })

  return (
    <div className={`wrapper ${props.className}`}>
      {props.loading && <Loader transparent={true}/>}
      <Nav isHome={props.className === 'home'}/>
      {props.children}
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.loading
})

export default connect(mapStateToProps, {})(Wrapper)
