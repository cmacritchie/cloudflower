import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux'
import {actionCreators as flowerActionCreators } from '../store/flowerReducer';

const useStyles = makeStyles({
  table: {
    maxWidth:650
  },
});

export default function BasicTable() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const { Flowers } = useSelector(({Flowers}) => { 
    return { Flowers }
  })

  useEffect(() => {
    if(!Flowers.loaded) {
      dispatch(flowerActionCreators.fetchAllFlowers())
    }
  },[Flowers.loaded, Flowers.catalogued.length])

  if(!Flowers.loaded) {
    return <h5 className="header-center">Loading...</h5>
  }

  const onDeleteRecord = (flowerId) => {
    dispatch(flowerActionCreators.deleteFlowerRecord(flowerId))
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Flower Type</TableCell>
            <TableCell align="right">Sepal Length (cm)</TableCell>
            <TableCell align="right">Sepal Width (cm)</TableCell>
            <TableCell align="right">Petal Length (cm)</TableCell>
            <TableCell align="right">Petal Width (cm)</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {Object.keys(Flowers.catalogued).map((id) => {
            const record = Flowers.catalogued[id];
            return(
              <TableRow key={record.id}>
                <TableCell component="th" scope="row">
                  {record.flower_type}
                </TableCell>
                <TableCell align="right">{record.sepal_length}</TableCell>
                <TableCell align="right">{record.sepal_width}</TableCell>
                <TableCell align="right">{record.petal_length}</TableCell>
                <TableCell align="right">{record.petal_width}</TableCell>
                <TableCell align="right"><Button color="primary" onClick={()=> onDeleteRecord(record.id)}>Delete</Button></TableCell>
            </TableRow>
            )
          })
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}