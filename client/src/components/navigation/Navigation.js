import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
  return (
    isSignedIn
      ? <>
        <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <strong onClick={() => onRouteChange('signout')} className='f3 link dim green underline pa3 pointer'>SIGN OUT</strong>
        </nav>
      </>
      : <>
        <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <p onClick={() => onRouteChange('signin')} className='f3 link dim black bg-transparent pa3 pointer'>SIGN IN</p>
          <p onClick={() => onRouteChange('register')} className='f3 link dim black pa3 bg-transparent pointer'>REGISTER</p></nav>
      </>
  );
}
export default Navigation;