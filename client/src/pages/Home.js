import React from 'react';

import Wrapper from '../components/Wrapper'

//Host your Home
const Home = props => {
  return (
    <Wrapper className="home" {...props}>
      <div className="home-content">
        <div className="overlay">
          <div className="content">
            
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Home;
