import React from 'react';
import './faceRecognition.css'

const faceRecognitionComponent = ({ imageUrl, box }) => {
  // console.log('hi', imageUrl, box)
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img className='pics' id='inputimage' src={imageUrl} alt='' width='500px' height='auto' />
        <div className='bounding-box' style={{ left: box.leftCol, top: box.topRow, right: box.rightCol, bottom: box.bottomRow }}> </div>
      </div>
    </div>
  )
}
export default faceRecognitionComponent;