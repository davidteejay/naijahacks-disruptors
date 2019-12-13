import React from 'react'

const Loader = ({ transparent = false }) => (
  <div className={transparent ? 'loader trans-loader' : 'loader'}>
    <div className="progress">
      <div className="indeterminate"/>
    </div>
  </div>
)

export default Loader
