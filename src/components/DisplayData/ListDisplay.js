import { Grid, Button } from '@mui/material';
import React from 'react';


function listDisplay({ list, handleClick, handleDelete }) {
    return <div>
        {(list.length === 0) ? <p>No Data</p> : (
            <>
                {
                    list.map((item) => {
                        return (
                            <div className="container" key={item.id} id={item.id}>
                                <Grid container>
                                    <Grid item xs={12} sm={8}>
                                        <p><b>Task : </b><i>{item.name}</i></p>
                                        <p><b>Description : </b><i>{item.description}</i></p>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Button variant='contained' color='success' onClick={() => handleClick(item)} >Edit</Button>
                                        <br />
                                        <br />
                                        <Button variant='contained' color="secondary" onClick={() => handleDelete(item)} >Delete</Button>
                                    </Grid>
                                </Grid>
                                <hr />
                            </div>
                        )
                    })
                }
            </>

        )}
    </div>;
}

export default listDisplay;
