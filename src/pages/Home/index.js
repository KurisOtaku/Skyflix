import React, { useEffect, useState } from 'react';
import BannerMain from '../../components/BannerMain';
import Carousel from '../../components/Carousel';
import PageDefault from '../../components/PageDefault';
import categoriasRepository from '../../repositories/categorias';
import Loading from '../../components/Loading';

function Home() {
  const [dadosIniciais, setDadosIniciais] = useState([]);
  const [destaquevideo, setDestaqueVideo] = useState({
    id: 1,
    categoriaId: 1,
    titulo: 'Taishi feat. みとせのりこ - Rainscall',
    url: 'https://www.youtube.com/watch?v=0b2N1vrmshs',
  });

  useEffect(() => {
    categoriasRepository
      .getAllWithVideos()
      .then((categoriasComVideos) => {
        setDadosIniciais(categoriasComVideos);
        const destaqueId = 0 + Math.floor((categoriasComVideos[0].videos.length - 1 - 0) * Math.random());
        setDestaqueVideo(categoriasComVideos[0].videos[destaqueId]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <PageDefault>
      {dadosIniciais.length === 0 && <Loading />}

      {dadosIniciais.map((categoria, indice) => {
        if (indice === 0) {
          return (
            <div key={categoria.id}>
              <BannerMain
                videoTitle={destaquevideo.titulo}
                url={destaquevideo.url}
              />

              <Carousel category={dadosIniciais[0]} />
            </div>
          );
        }
        return (
          <Carousel key={categoria.id} category={categoria} />
        );
      })}
    </PageDefault>
  );
}

export default Home;
