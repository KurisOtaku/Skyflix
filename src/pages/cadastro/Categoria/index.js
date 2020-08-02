import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForms';
import Loading from '../../../components/Loading';

function CadastroCategoria() {
  const valoresIniciais = {
    titulo: '',
    descricao: '',
    cor: '#0000ff',
  };

  const { handleChange, values, clearForm } = useForm(valoresIniciais);

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    //    categoriasRepository.getAllCategoriesWithVideos();

  }, []);

  return (
    <PageDefault>
      <h1>
        Cadastro Categoria:
        {values.nome}
      </h1>

      <form
        onSubmit={function handleSubmit(event) {
          event.preventDefault();
          setCategorias([...categorias, values]);
          clearForm();
        }}
      >
        <FormField
          label="Nome da Categoria"
          type="text"
          name="nome"
          value={values.nome}
          onChange={handleChange}
        />

        <FormField
          label="Descrição"
          type="textarea"
          name="descricao"
          value={values.descricao}
          onChange={handleChange}
        />

        <FormField
          label="Cor"
          type="color"
          name="cor"
          value={values.cor}
          onChange={handleChange}
        />

        <Button>Cadastrar</Button>
      </form>

      {categorias.length === 0 && <Loading />}
      <ul>
        {categorias.map((categoria) => (
          <li key={`${categoria.id}`}>
            [
            {categoria.id}
            ][
            {categoria.titulo}
            ][
            {categoria.descricao}
            ][
            {categoria.cor}
            ]
          </li>
        ))}
      </ul>
      <Link to="/">Ir para home</Link>
    </PageDefault>
  );
}

export default CadastroCategoria;
