import PropTypes from 'prop-types';
import { StyledSection, H1 } from './Section.styled';

export const Section = ({ title, children }) => {
  return (
    <StyledSection>
      {title && <H1>{title}</H1>}
      <div>{children}</div>
    </StyledSection>
  );
};

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};
