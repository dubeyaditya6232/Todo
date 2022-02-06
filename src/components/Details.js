import React, { useState } from 'react';
import Header from './Header/Header';

import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import { Card, CardActions, CardContent, CardMedia, CardHeader, Avatar, Grid, Typography, IconButton, Tooltip } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function AddCard({ values, value, setFormValue, setValues, index, show, setShow }) {

  const handleDelete = (id) => {
    const arr = values.filter(val => val.id !== id);
    setValues([...arr]);
    setFormValue({ name: '', email: '' });
  }

  /*   const handleClose = (id) => {
      setShow(show.map(showId => {
        if (showId.id === id) {
          return { ...showId, show: false }
        }
        return showId;
      }))
      setFormValue({ name: '', email: '' });
    } */

  return (
    <div>
      <Card sx={{ minWidth: 250 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="display-card">
              {index + 1}
            </Avatar>
          }
          action={
            <>
              <Tooltip title="delete">
                <IconButton aria-label='close' onClick={() => handleDelete(value.id)} >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </>
          }
          title="card"
          subheader={new Date().toUTCString()} />
        {/* <CardMedia /> */}
        <CardContent>
          <Typography>{value.name}</Typography>
          <Typography>{value.email}</Typography>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </div>
  );
}

function FormComponent({ value, values, setValues, formValue, setFormValue, show, setShow }) {

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
    console.log(formValue);
  }

  const handleDelete = (id) => {
    const arr = values.filter(val => val.id !== id);
    setValues([...arr]);
    setFormValue({ name: '', email: '' });
  }

  const handleClose = (id) => {
    const newvalues = values.map(val => {
      if (val.id === id) {
        return { ...val, name: formValue.name, email: formValue.email, show: false }
      }
      return val;
    });
    setValues([...newvalues]);
    setFormValue({ name: '', email: '' });
  }

  const handleSubmit = (e, id) => {
    e.preventDefault();
    console.log(formValue);
    handleClose(id);
  }

  return <div className='container'>
    <div className='Details_Add_CloseBtn'>
      <Tooltip title="close">
        <IconButton aria-label='close' onClick={() => handleClose(value.id)} >
          <CloseIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="delete">
        <IconButton aria-label='close' onClick={() => handleDelete(value.id)} >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </div>
    <Form onSubmit={(e) => handleSubmit(e, value.id)}>
      <FormGroup>
        <Label>Name</Label>
        <Input type="text" className="form-control" value={formValue.name} name="name" onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label>Email</Label>
        <Input type="email" className="form-control" value={formValue.email} name="email" onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Button type="submit" color='primary'>Submit</Button>
      </FormGroup>
    </Form>
  </div>
}

function CloseForm({ value, values, setValues, index }) {

  const handleEdit = (id) => {
    const newvalues = values.map(val => {
      if (val.id === id) {
        return { ...val, show: true }
      }
      return val;
    });
    setValues([...newvalues]);
  }

  return <>
    <div className="d-flex p-2 bg-secondary">
      <Avatar sx={{ bgcolor: "red" }} aria-label="display-card">
        {index + 1}
      </Avatar>
      <div className='Details_Add_CloseBtn' >
        <Tooltip title="Edit">
          <IconButton size='small' aria-label='edit' onClick={() => handleEdit(value.id)} >
            <EditIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  </>
}

function Details({ isDark, setIsDark }) {

  const [values, setValues] = useState([]);
  const [formValue, setFormValue] = useState({ name: '', email: '', show: true });

  const handleAddClick = () => {
    setValues([...values, { id: Date.now(), name: formValue.name, email: formValue.email, show: true }]);
  }

  return <div>
    <Header
      list={[]}
      isDark={isDark}
      setIsDark={setIsDark}
    />
    {console.log({ values })}
    <div className='container'>
      <div className='Details_Add_CloseBtn' >
        <Tooltip title="Add">
          <IconButton onClick={() => handleAddClick()}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
    <div className='container'>
      <Grid container spacing={2} className='mt-1'>
        {values.map((value, index) => {
          return (
            (value.show) ? (
              <Grid key={value.id} item xs={12}>
                <FormComponent
                  value={value}
                  values={values}
                  setValues={setValues}
                  formValue={formValue}
                  setFormValue={setFormValue}
                />
              </Grid>
            ) : (
              <Grid key={value.id} item xs={12}>
                <CloseForm
                  value={value}
                  values={values}
                  setValues={setValues}
                  formValue={formValue}
                  setFormValue={setFormValue}
                  index={index}
                />
              </Grid>
            )
          )
        })}
      </Grid>
    </div>
    <div className='container'>
      <Grid container spacing={3} className='mt-1'>
        {values.map((value, index) => {
          return (
            <Grid key={value.id} item xs={12} sm={6} md={3}>
              {(value.name === '' && value.email === '') ? ("") : (
                <AddCard
                  values={values}
                  value={value}
                  setFormValue={setFormValue}
                  setValues={setValues}
                  index={index}
                />
              )}
            </Grid>
          );
        })}
      </Grid>
    </div>

  </div>;
}

export default Details;
