import axios from 'axios';
import React from 'react';
import { Row, Col, Button } from 'reactstrap';


function ShowData({ list, setList, setId, setState, state }) {

    function handleClick(item) {
        setState({ ...state, name: item.name, description: item.description });
        setId(item.id);
    }

    function handleDelete(item) {
        let items = [...list];
        axios.delete(`http://localhost:3000/data/${item.id}`)
            .then(res => {
                items.splice(items.indexOf(item.id), 1);
                setList(items);
            })
            .catch(err => { console.log(err); })
    }

    return (
        <div>
            <h3 className='text-center'>Show Data</h3>
            {(list.length === 0) ? <p>No Data</p> : (
                <ul>
                    {list.map((item) => {
                        return (
                            <div key={item.id}>
                                <li>
                                    <Row>
                                        <Col xs={12} sm={8}>
                                            <p>{item.description}</p>
                                            <p>{item.name}</p>
                                        </Col>
                                        <Col xs={12} sm={4}>
                                            <Button onClick={() => handleClick(item)} color="primary">Edit</Button>
                                            <br />
                                            <br />
                                            <Button onClick={() => handleDelete(item)} color="danger">Delete</Button>
                                        </Col>
                                    </Row>
                                </li>
                                <hr />
                            </div>
                        )
                    })}
                </ul>
            )}
        </div>
    );
}
export default ShowData;