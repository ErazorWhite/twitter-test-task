import { AiOutlinePlusSquare } from 'react-icons/ai';
import { Input, Ul, Li, Button } from './Constols.styled';
import cssVar from 'utilities/cssVarGetter';
import Select from 'react-select';

const options = [
  { value: 'newFirst', label: 'New first' },
  { value: 'oldFirst', label: 'Old first' },
];

export const Controls = ({ isDesktop }) => {
  return (
    <>
      <Ul>
        <Li>
          <label htmlFor="username">Username</label>
          <Input type="text" placeholder="@UserName" name="username" />
        </Li>
        <Li>
          <label htmlFor="message">Message</label>
          <Input type="text" placeholder="Type to Search" />
        </Li>
        <Li>
          <label htmlFor="sort">Sort</label>
          <Select
            name="dateFilter"
            id="dateFilter"
            options={options}
            isSearchable={false}
          />
        </Li>
        <Li>
          {!isDesktop && <label htmlFor="sort">Add new post:</label>}
          <Button
            onClick={() => {
              console.log('clicked');
            }}
          >
            <AiOutlinePlusSquare
              size={isDesktop ? 50 : 36}
              color={cssVar('--primary-light')}
            />
          </Button>
        </Li>
      </Ul>
    </>
  );
};
