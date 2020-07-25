import React from 'react'
import { useQuery } from 'react-query'
import Planet from './Planet'

const fetchPlanets = async () => {
  const res = await fetch('http://swapi.dev/api/planets/')

  // return Promise
  return res.json()
}

const Planets = () => {
  /*
  status = 'loading' | 'success' | 'error'
  data = {
    count: number;
    next: string; //next page
    previous: null;
    results: array;
  }
  */
  const {data, status} = useQuery('planets', fetchPlanets)
  console.log(data)

  return (
    <div>
      <h2>Planets</h2>

      {status === 'loading' && (
        <div>Loading Data</div>
      )}
      {status === 'error' && (
        <div>Error Fetching Data</div>
      )}
      {status === 'success' && (
        <div>
          { data?.results.map((planet: any, i: number) => <Planet key={i} planet={planet} />) }
        </div>
      )}

    </div>
  )
}

export default Planets
