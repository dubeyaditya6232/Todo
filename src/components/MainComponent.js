import React, { useState, useEffect } from 'react';
import ShowData from './ShowData';
import AddData from './AddData';
import { Row, Col } from 'reactstrap'
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchData } from '../redux/ActionCreator';

/* const mapStateToProps = state => {
  return {
    list: state.list
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setList: () => dispatch(fetchData)
  }
} */

function Main(){
    const [list, setList] = useState([]);
    const [state, setState] = useState({ name: '', description: '' });
    const [id, setId] = useState(-1);
  
    useEffect(() => {
      axios.get('http://localhost:3000/data')
        .then(res => {
          if (JSON.stringify(res.data) !== JSON.stringify(list)) {
            setList(res.data);
          }
        })
        .catch(err => { console.log(err); })
    }, [list]);
    return (
        <div className="App">
        <Row>
          <Col item xs={12} md={6}>
            <ShowData
              list={list}
              setList={setList}
              state={state}
              setState={setState}
              setId={setId}
            />
          </Col>
          <Col item xs={12} md={6}>
            <AddData
              list={list}
              setList={setList}
              state={state}
              setState={setState}
              id={id}
              setId={setId}
            />
          </Col>
        </Row>
      </div>
    );
}

export default Main