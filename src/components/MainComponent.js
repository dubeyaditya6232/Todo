import React, { useState, useEffect } from 'react';
import ShowData from './DisplayData/ShowData';
import AddData from './AddData';
import Header from './Header/Header';
import { Grid } from '@mui/material';

import { navBarSearch,useAuth } from '../useContext';

//firebase stuff
import { db } from '../firebase/firebase';
import { collection, onSnapshot, query,where } from 'firebase/firestore';

function Main({ isDark, setIsDark }) {

  const [state, setState] = useState({ name: '', priority: "", description: '' });
  const [filteredResult, setfilteredResult] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [id, setId] = useState(-1);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(null);

  const { user } = useAuth();

  const fetchData = () => {
    const collectionRef=collection(db, "Task");
    const q=query(collectionRef ,where("userId", "==", user.uid));
    return onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setList([...data]);
      setLoading(false);
      setSearch(null);
      setIsFiltered(false);
    });
  }


  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <navBarSearch.Provider value={{ search, setSearch }}>
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
              state={state}
              setState={setState}
              setId={setId}
              isFiltered={isFiltered}
              filteredResult={filteredResult}
              setfilteredResult={setfilteredResult}
              loading={loading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <AddData
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
    </navBarSearch.Provider>
  );
}

export default Main;