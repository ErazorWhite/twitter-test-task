import React from 'react';
import ReactDOM from 'react-dom';
import Backdrop from 'components/Backdrop/Backdrop';
import { CenteredMutatingDots, LoaderContainer } from './LoadingSpinner.styled';

const Loader = () => (
  <CenteredMutatingDots
    height="100"
    width="100"
    color="#4fa94d"
    secondaryColor="#4fa94d"
    radius="12.5"
    ariaLabel="mutating-dots-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
  />
);

const LoadingSpinner = ({ isLoading }) => {
  const portalRoot = document.getElementById('loading-root');

  return (
    isLoading &&
    ReactDOM.createPortal(
      <>
        <Backdrop />
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      </>,
      portalRoot
    )
  );
};

export default LoadingSpinner;
