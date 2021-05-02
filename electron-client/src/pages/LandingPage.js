import React from 'react'
import MlForm from '../components/MlForm'
import DataTable from '../components/DataTable'
import { useSelector } from 'react-redux'


const HomePage= () => {
    const { User } = useSelector(({ User }) => { 
        return { User }
      })

    return(
        <div>
            <h3 className="header-center">Flower Classifier</h3>
            <div className="header-center">
                Congratulations on becoming a botanist! Your first task is data entry... Yuck. Input the Iris Sepal and Petal dimensions and let the ML model do the classification.
                Make sure you sign up if you don't have an account or sign in if you already created an account!
            </div>
            {!User.isAuthenticated ?
            <h5 className="header-center">Sign up and login in the top right to get started</h5>
            :
            <div>
                <MlForm />
                <div className="data-table">
                    <DataTable />
                </div>
            </div>
            }
        </div>
    )
}

export default HomePage 