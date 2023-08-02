import { Field, Form } from 'formik';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { styled } from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1600;
`;

export const ModalWrapper = styled.div`
  height: 100%;
  padding: 20px 0;
  display: flex;
  align-items: center;
`;

export const StyledErrorMessage = styled.div`
  font-size: 1em;
  color: red;
`;

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: auto;
  min-width: 300px;
  height: 100%;
  max-height: 550px;
  border-radius: 3%;
  padding: 40px 24px;
  color: var(--secondary-light);
  background-color: var(--primary-light);
`;

export const TextareaBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const CharacterCounter = styled.p`
  position: absolute;
  bottom: -20px;
  right: 5px;
`;

export const StyledClose = styled(AiOutlineCloseCircle)`
  position: absolute;
  top: 12px;
  right: 12px;
  height: 32px;
  width: 32px;
  fill: var(--secondary-light);
  cursor: pointer;
`;

export const H2 = styled.h2`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  margin-bottom: 4px;
  font-weight: 500;
`;

export const StyledField = styled(Field)`
  resize: none;
  padding: 12px;
  border: 1px solid rgba(33, 33, 33, 0.2);
  border-radius: 4px;
  margin-bottom: 10px;
`;

export const StyledSubmit = styled.button`
  margin-left: auto;
  margin-right: auto;
  min-width: 200px;
  min-height: 50px;
  background-color: #2196f3;
  color: #fff;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 4px;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0.06em;
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: 20px;
  &:focus,
  &:hover {
    background-color: #188ce8;
  }
`;
