import React, { useEffect, useState } from 'react';
import PageDefault from '../../components/PageDefault';
import Repository from '../../repositories/categorias';

function Tests() {
  const [cars, setDadosIniciais] = useState([]);

  useEffect(() => {
    Repository
      .getTest()
      .then((list) => {
        setDadosIniciais(list);
        console.log(list);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div>{JSON.stringify(cars)}</div>
  );
}

export default Tests;
