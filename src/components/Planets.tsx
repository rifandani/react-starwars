import React, { useState } from 'react';
import { useQuery } from 'react-query';
// components
import Planet from './Planet';

const fetchPlanets = async (key: string, page: number) => {
  const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);

  // return Promise
  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);

  /*
  status = 'loading' | 'success' | 'error'
  data = {
    count: number;
    next: string; //next page
    previous: null;
    results: array;
  }
  array[0] = queryKey / key
  sisa arraynya untuk query params, penamaan terserah
  */
  const { data, status } = useQuery(['planets', page], fetchPlanets, {
    // staleTime: 1000, // default 0
    // cacheTime: 10, // default 300000
    onSuccess: () =>
      console.log('Data fetch success, add notif onSuccess fetch'),
  });

  return (
    <div>
      <h2>Planets</h2>

      <button onClick={() => setPage(1)}>page 1</button>
      <button onClick={() => setPage(2)}>page 2</button>
      <button onClick={() => setPage(3)}>page 3</button>

      {status === 'loading' && <div>Loading Data</div>}
      {status === 'error' && <div>Error Fetching Data</div>}
      {status === 'success' && (
        <div>
          {data?.results.map((planet: any, i: number) => (
            <Planet key={i} planet={planet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Planets;
