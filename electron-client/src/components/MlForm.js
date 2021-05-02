import React, { useState } from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import config from '../utils/headerConfig'
import { useSelector } from 'react-redux'
import {  toastError } from '../utils/toastUtil'

import FlowerType from './FlowerType'

const flowerProperties = {
    sepal_length: "Sepal Length",
    sepal_width: "Sepal Width",
    petal_length: "Petal Length",
    petal_width: "Petal Width"
}

const startingState = Object.keys(flowerProperties).reduce((acc, curr) => {
return {...acc, [curr]:0}
}, {})

const MlForm = () => {
    const { User } = useSelector(({ User }) => { 
        return { User }
      })
    const [flower, setFlower] = useState(startingState)
    const [flowerType, setFlowerType] = useState(null)
    const [flowerToSubmit, setFlowerToSubmit] = useState(null)
    const [classifying, setClassifyingFlag] = useState(false)

    const submitValues = async e => {
        e.preventDefault()
        try {
            setClassifyingFlag(true)
            const mlResult = await axios.post(process.env.REACT_APP_FLOWER_ML, flower, config(User.jwt))
            setClassifyingFlag(false)
            const result = JSON.parse(mlResult.data.body)
            const type = result.message;
            setFlowerType(type)
            setFlowerToSubmit(flower)
        }
        catch(e) {
            toastError("problem classifying")
        }
    }

    const resetState = () => {
        setFlower(startingState)
        setFlowerType(null)
        setFlowerToSubmit(null)
    }

    return( 
        <div className="ml-container">
            <div className="ml-form">
                <form onSubmit={submitValues}>
                    {Object.keys(flowerProperties).map(x => {
                        return(<div key={x}>
                                <label htmlFor={x}>{flowerProperties[x]}</label>
                                <input value={flower[x]} onChange={e => setFlower({...flower, [x]:parseFloat(e.target.value) })} min="0" type="number" step="0.01" id={x} name={x} /><br /><br />
                            </div>
                        )
                    })
                    }
                    <Button variant="contained" color="secondary" type="submit">Run ML</Button>
                </form>
            </div>
            {
                classifying ?
                <div>
                    <h3>Classifiying...</h3>
                    <p>One Moment</p>
                </div>
                :
                <FlowerType flowerToSubmit={flowerToSubmit} type={flowerType} flowerSubmittedCallback={resetState} />
            }
        </div>
    )
}

export default MlForm 