import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onBtnSubmit }) => {
  // const ImageLinkForm = (props) => {
  return (
    <>
      <p className='f3'>{'Magic Brain detect the faces in your pictures'}</p>
      <div>
        <div className='center'>
          <div className='form center pa4 br3 shadow-5'>
            <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange} />
            <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onBtnSubmit}>Detect</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImageLinkForm;