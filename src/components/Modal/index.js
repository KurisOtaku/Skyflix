import React from 'react';
import styled from 'styled-components';

const ModalHandle = styled.div`
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */

  /* Modal Content */
  .modal-content {
    font-weight: bold;
    background-color: #000;
    color: #fff;

    margin: auto;
    padding: 20px;
    border: 1px solid #2a7ae4;
    width: 80%;
  }

  /* The Close Button */
  .close {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: #fff;
    text-decoration: none;
    cursor: pointer;
  }
`;
function Modal() {
  return (
    <ModalHandle
      id="myModal"
      className="modal"
    >
      <div className="modal-content">
        <span className="close">&times;</span>
        <p>Preencha corretamente os campos</p>
      </div>
    </ModalHandle>
  );
}

export default Modal;
