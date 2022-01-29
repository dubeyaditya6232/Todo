import React from 'react';
import PopOver from './PopOver';
import { Card, CardActions, CardContent, Typography, Grid, Button } from '@mui/material'

function cardDisplay({ list, handleClick, handleDelete }) {
    return <>
        {
            list.length === 0 ? <h3 className="text-center">No Data</h3> : (
                <Grid container spacing={6}>
                    {list.map((item, index) => {
                        return (
                            <Grid item key={item.id} xs={12} sm={6} md={5}>
                                <Card className="cardDisplay">
                                    <CardContent>
                                        <h4 className="text-center">Task #{index+1}</h4>
                                        <Typography variant="h6" component="h2">Task : {item.name}</Typography>
                                        <Typography variant="body1" component="p">Priority:{item.priority}</Typography>
                                        <PopOver item={item} />
                                    </CardContent>
                                    <CardActions>
                                        <Button variant='contained' color='success' onClick={() => handleClick(item)} >Edit</Button>
                                        <Button variant='contained' color="secondary" onClick={() => handleDelete(item)} >Delete</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            )
        }
    </>;
}

export default cardDisplay;
