import React from "react";
import PageDefault from "../../components/PageDefault";
import "./index.css";
import Error from "../../assets/img/404.png";
import { Link } from 'react-router-dom';

function Pagina404() {
  return (
    <PageDefault>
      <div>
        <Link to="/">
          <img className="center" src={Error} alt="Error 404" />
        </Link>
      </div>
    </PageDefault>
  );
}

export default Pagina404;
