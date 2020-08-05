import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import useForm from '../../../hooks/useForms';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import videosRepository from '../../../repositories/videos';
import categoriasRepository from '../../../repositories/categorias';
import Modal from '../../../components/Modal';

function isValid({ titulo, url, categoria }, categorias) {
  if (categorias.find((d) => d.titulo === categoria) === undefined) return false;
  if (titulo === '' || url === '') return false;
  return true;
}

function CadastroVideo() {
  const history = useHistory();
  const [categorias, setCategorias] = useState([]);
  const categoryTitles = categorias.map(({ titulo }) => titulo);
  const { handleChange, values } = useForm({
    titulo: '',
    url: '',
    categoria: '',
  });

  useEffect(() => {
    categoriasRepository.getAll().then((categoriasServer) => {
      setCategorias(categoriasServer);
    });
  }, []);

  // MODAL
  const modal = document.getElementById('myModal');
  console.log(modal);
  // eslint-disable-next-line eqeqeq
  if (modal != undefined) {
    modal.onclick = () => {
      modal.style.display = 'none';
    };
  }
  Modal.onclick = () => {
    modal.style.display = 'none';
  };
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };

  return (
    <PageDefault>

      <Modal
        id="myModal"
      />

      <Link
        to="/cadastro/categoria"
        style={{
          color: 'var(--white)',
          border: '1px solid var(--white)',
          background: 'var(--black)',
          cursor: 'pointer',
          padding: '16px 24px',
          outline: 'none',
          display: 'inline-block',
          transition: 'opacity 0.3s',
        }}

      >
        Cadastrar Categoria
      </Link>

      <h1>Cadastro Video</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (isValid(values, categorias)) {
            const categoriaId = categorias.find(
              (categoria) => categoria.titulo === values.categoria,
            ).id;
            videosRepository
              .create({
                categoriaId,
                titulo: values.titulo,
                url: values.url,
              })
              .then(() => {
                history.push('/');
              });
          } else {
            modal.style.display = 'block';
          }
        }}
      >
        <FormField
          label="Título"
          type="text"
          name="titulo"
          value={values.titulo}
          onChange={handleChange}
        />
        <FormField
          label="URL"
          type="text"
          name="url"
          value={values.url}
          onChange={handleChange}
        />
        <FormField
          label="Categoria"
          type="datalist"
          name="categoria"
          value={values.categoria}
          onChange={handleChange}
          suggestions={categoryTitles}
        />
        <Button type="submit">Cadastrar</Button>
      </form>
    </PageDefault>
  );
}
export default CadastroVideo;
