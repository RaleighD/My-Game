//this file helps keep consistency throughout the project
//add to this where you want components to persist accross the site
//made this for navbar but we could do other things too
import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
