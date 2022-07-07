import React, { useEffect, useState } from 'react';
import Repository from '../../repositories/categorias';

function Tests() {
  const [cars, setDadosIniciais] = useState([]);

  useEffect(() => {
    Repository
      .getTest()
      .then((list) => {
        setDadosIniciais(JSON.stringify(list));
        console.log(list);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>{cars}</div>
  );
}

export default Tests;
