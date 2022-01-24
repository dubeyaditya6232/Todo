import React, { useState, useEffect } from 'react';
import ShowData from './DisplayData/ShowData';
import AddData from './AddData';
import Header from './Header/Header';
import { Grid } from '@mui/material';
import axios from 'axios';

function Main({ isDark, setIsDark }) {

  const [state, setState] = useState({ name: '', priority: "", description: '' });
  const [filteredResult, setfilteredResult] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [id, setId] = useState(-1);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      axios.get('http://localhost:3000/data')
        .then(res => {
          if (JSON.stringify(res.data) !== JSON.stringify(list)) {
            setList(res.data);
            setLoading(false);
          }
        })
        .catch(err => { console.log(err); })
    }, 2000);
  }, [list]);

  return (
    <div className="App">
      <Header
        list={list}
        isDark={isDark}
        setIsDark={setIsDark}
        setIsFiltered={setIsFiltered}
        setfilteredResult={setfilteredResult}
      />
      <Grid container>
        <Grid item xs={12} md={6}>
          <ShowData
            list={list}
            setList={setList}
            state={state}
            setState={setState}
            setId={setId}
            isFiltered={isFiltered}
            filteredResult={filteredResult}
            setfilteredResult={setfilteredResult}
            loading={loading}
            setIsLoading={setLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AddData
            list={list}
            setList={setList}
            state={state}
            setState={setState}
            id={id}
            setId={setId}
            setFilteredResult={setfilteredResult}
            setIsFiltered={setIsFiltered}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default Main;