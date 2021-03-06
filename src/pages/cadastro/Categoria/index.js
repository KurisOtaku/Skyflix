import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForms';
import Loading from '../../../components/Loading';
import categoriasRepositor from '../../../repositories/categorias';

function CadastroCategoria() {
  const randHexColor = () => { // RETORNA UM HEXADECIMAL ALEATÓRIO
    const n = (Math.random() * 0xfffff * 1000000).toString(16);
    return `#${n.slice(0, 6)}`;
  };

  const history = useHistory();
  const valoresIniciais = {
    titulo: '',
    descricao: '',
    cor: randHexColor(),
  };

  const { handleChange, values, clearForm } = useForm(valoresIniciais);

  const [categorias, setCategorias] = useState([]);

  function isValid({ titulo }) {
    const exist = Boolean(categorias.find(
      (categoria) => categoria.titulo === titulo,
    ));
    if (exist) return false;
    if (titulo === '') return false;
    return true;
  }

  useEffect(() => {
    categoriasRepositor.getAll().then((resposta) => {
      setCategorias(resposta);
    });
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
          if (isValid(values)) {
            categoriasRepositor.create({
              titulo: values.titulo,
              descricao: values.descricao,
              cor: values.cor,
            })
              .then(() => {
                setCategorias([...categorias, values]);
                clearForm();
                history.push('/cadastro/video');
              });
          }
        }}
      >
        <FormField
          label="Nome da Categoria"
          type="text"
          name="titulo"
          value={values.titulo}
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
          <li
            key={`${categoria.id}`}
            style={{
              textAlign: 'center',
              background: categoria.cor,
              color: '#fff',
              margin: '10px',
              borderColor: '#fff',
              border: '1px solid white',
              textShadow: '1px 0 0 #000, -1px 0 0 #000, 0 1px 0 #000, 0 -1px 0 #000, 1px 1px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000',
            }}
          >
            {categoria.titulo}
          </li>
        ))}
      </ul>
      <Link to="/">Ir para home</Link>
    </PageDefault>
  );
}

export default CadastroCategoria;
