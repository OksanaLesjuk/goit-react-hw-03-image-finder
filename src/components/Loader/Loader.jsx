import React from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';
import { LoaderWrap } from './Loader.styled';

const Loader = () => {
  return (
    <LoaderWrap>
      <MagnifyingGlass
        visible={true}
        height="200"
        width="200"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#e15b64"
      />
    </LoaderWrap>
  );
};

export default Loader;
