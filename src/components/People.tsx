import React from 'react';
import { useQuery } from 'react-query';

import Person from "./Person";

const fetchPeople = async () => {
  const res = await fetch('http://swapi.dev/api/people/');

  // return Promise
  return res.json();
};

const People = () => {
  /*
  status = 'loading' | 'success' | 'error'
  data = {
    count: number;
    next: string; //next page
    previous: null;
    results: array;
  }
  */
  const { data, status, isLoading, error } = useQuery('people', fetchPeople);
  console.log(data);

  return (
    <div>
      <h2>People</h2>

      { isLoading && <div>Loading Data</div>}
      { error && <div>Error Fetching Data</div>}

      {status === 'success' && (
        <div>
          {data?.results.map((person: any, i: number) => (
            <Person key={i} person={person} />
          ))}
        </div>
      )}
    </div>
  );
};

export default People;
