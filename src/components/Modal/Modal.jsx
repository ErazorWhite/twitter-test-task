import { Formik, Field, ErrorMessage } from 'formik';
import {
  Overlay,
  ModalWrapper,
  StyledForm,
  H2,
  Label,
  StyledField,
  StyledSubmit,
  TextareaBox,
  CharacterCounter,
} from './Modal.styled';
import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Backdrop from 'components/Backdrop/Backdrop';
import * as yup from 'yup';
import { StyledErrorMessage, StyledClose } from './Modal.styled';
import css from './Field.module.css';
import { faker } from '@faker-js/faker';
import { createNewPost } from 'api/mockAPI';
import { toast } from 'react-toastify';

const initialValues = {
  author: '',
  message: '',
};

const schema = yup.object().shape({
  author: yup
    .string()
    .min(3, 'Must be at least 3 characters or more!')
    .max(24, 'Must be 24 characters or less')
    .matches(/^[a-zA-Z0-9\s]+$/, 'Invalid name')
    .matches(/^\S(.*\S)?$/, 'Too many spaces')
    .required('Required!'),
  message: yup
    .string()
    .max(200, 'Maximum 200 characters')
    .required('Required!'),
});

export const Modal = ({ closeModal }) => {
  const portalRoot = document.getElementById('modal-root');

  useEffect(() => {
    const handleEsc = e => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [closeModal]);

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const generateRandomValues = () => {
    const createdAt = new Date().toISOString();
    const avatar = faker.image.avatar();
    const image = faker.image.urlLoremFlickr({ category: 'cat' });
    const authorId = faker.string.uuid();
    const messageId = faker.string.uuid();
    return { createdAt, avatar, image, authorId, messageId };
  };

  const handleSubmit = async (value, { resetForm }) => {
    const randoms = generateRandomValues();
    const author = value.author.trim();
    const message = value.message.trim();
    const newPost = { author, message, ...randoms };

    await createNewPost(newPost);

    toast('🎉 Wow your post is awesome!');

    resetForm();
    closeModal();
  };

  return ReactDOM.createPortal(
    <>
      <Backdrop />
      <Overlay onClick={handleOverlayClick}>
        <ModalWrapper>
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            validateOnChange={true}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values }) => (
              <StyledForm>
                <StyledClose onClick={closeModal} />
                <H2>Leave new message</H2>
                <Label htmlFor="author">Name</Label>
                <StyledField
                  type="name"
                  name="author"
                  placeholder="Enter your name"
                />
                <ErrorMessage name="author" component={StyledErrorMessage} />
                <TextareaBox>
                  <Label htmlFor="message">Message</Label>
                  <Field
                    as="textarea"
                    type="text"
                    name="message"
                    placeholder="Enter your new message"
                    className={`${css.field} ${css.fieldTextarea}`}
                    maxLength={200}
                  />
                  <CharacterCounter>
                    {values.message.length}/200
                  </CharacterCounter>
                </TextareaBox>
                <ErrorMessage name="message" component={StyledErrorMessage} />
                <StyledSubmit type="submit" disabled={isSubmitting}>
                  Submit
                </StyledSubmit>
              </StyledForm>
            )}
          </Formik>
        </ModalWrapper>
      </Overlay>
    </>,
    portalRoot
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
