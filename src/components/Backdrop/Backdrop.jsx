import React from 'react';
import ReactDOM from 'react-dom';
import { BackdropContainer, CenteredMutatingDots, LoaderContainer } from './Backdrop.styled';

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
const Backdrop = () => <BackdropContainer/>;

const LoadingPortal = ({ isLoading }) => {
  const portalRoot = document.getElementById('popup-root');

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

export default LoadingPortal;
