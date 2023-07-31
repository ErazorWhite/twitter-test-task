import { useEffect, useState } from 'react';
import { Section } from 'components/Section/Section';
import { useParams } from 'react-router-dom';
import { getProfileDetails } from 'api/mockAPI';
import ProfileDetails from 'components/ProfileDetails/ProfileDetails';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profileDetails, setProfileDetails] = useState({});
  const { userName } = useParams();

  useEffect(() => {
    setIsLoading(true);

    const asyncWrapper = async () => {
      try {
        const profileDetails = await getProfileDetails(userName);
        setProfileDetails(profileDetails);
      } catch (e) {
        console.log(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    asyncWrapper();
  }, [userName]);

  return (
    <Section>
      {isLoading && <div>LOADING ...</div>}
      {profileDetails ? (
        <ProfileDetails profileDetails={profileDetails} />
      ) : (
        <div>Oops!</div>
      )}
    </Section>
  );
};

export default Profile;
