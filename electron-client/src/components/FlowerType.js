import React from 'react';
import Button from '@material-ui/core/Button';
import setosaImage from '../images/setosa.PNG'
import versicolorImage from '../images/versicolor.PNG'
import virginicaImage from '../images/virginica.PNG'
import { useDispatch } from 'react-redux'
import {actionCreators as flowerActionCreators } from '../store/flowerReducer';

const flowerTypes = {
    setosa:"setosa",
    versicolor:"versicolor",
    virginica:"virginica"
}

const FlowerType = ({ type, flowerToSubmit, flowerSubmittedCallback }) => {
    const dispatch = useDispatch()
    let image;

    switch(type){
        case flowerTypes.setosa:
            image = setosaImage;
            break;
        case flowerTypes.versicolor:
            image = versicolorImage;
            break;
        case flowerTypes.virginica:
            image = virginicaImage;
    }

    const submitRecord = e => {
        e.preventDefault()
        const record = {
            ...flowerToSubmit,
            flower_type: type
        }

        dispatch(flowerActionCreators.createFlowerRecord(record))
        flowerSubmittedCallback()
    }

    return(
        <div>
            {type &&
            <>
                <h3 className="flower-header">{type}</h3>
                <img src={image} />
                <p>The Iris type you identified is {type}</p>
                <Button variant="contained" color="secondary" onClick={submitRecord}>Submit</Button>
            </>
            }
        </div>
    )
}

export default FlowerType