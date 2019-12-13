import React from 'react';

import Wrapper from '../components/Wrapper'
import HomeItem from '../components/HomeItem'

//Host your Home
const RentAHome = props => {
    const items = []

    for(let i = 0; i < 25; i++){
        items.push(<HomeItem/>)
    }

    return (
        <Wrapper className="rent" {...props}>
            <div className="rent-content">
                <div className="row">
                    {items.map(item => item)}
                </div>
            </div>
        </Wrapper>
    )
}

export default RentAHome;
