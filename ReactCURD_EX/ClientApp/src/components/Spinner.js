﻿import React, { Component } from 'react'
import loading from './loading.gif'


export class Spinner extends Component {
    render() {
        return (
            <>

                <div className='text-center'>
                    < img className='my-6' src={loading} alt="Loading" />
                </div>
            </>
        )
    }
}

export default Spinner