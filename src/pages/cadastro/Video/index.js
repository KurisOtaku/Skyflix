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
  Modal.onclick = function () {
    modal.style.display = 'none';
  };
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };

  return (
    <PageDefault>

      <Modal
        id="myModal"
        className="modal"
      >
        <div className="modal-content">
          <span className="close">&times;</span>
          <p>Preencha corretamente os campos</p>
        </div>

      </Modal>

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
                console.log('Cadastro enviado');
                history.push('/');
              });
          } else {
            modal.style.display = 'block';
            console.log('Invalidos');
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
      <Link to="/cadastro/categoria">Cadastrar Categoria</Link>
    </PageDefault>
  );
}
export default CadastroVideo;
