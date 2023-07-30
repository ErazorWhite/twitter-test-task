import React, { useEffect, useState } from 'react';
import { TfiLocationPin } from 'react-icons/tfi';
import { AiOutlineLink } from 'react-icons/ai';
import { BiCalendar } from 'react-icons/bi';
import {
  AdditionalDescItem,
  AdditionalDescList,
  AvatarThumb,
  BannerThumb,
  FollowDigit,
  FollowList,
  H2,
  Text,
} from './ProfileDetails.styled';
import { Img } from './ProfileDetails.styled';
import DateParser from 'utilities/dateParser';
import { getProfilePosts } from 'api/mockAPI';
import { PostsList } from 'components/PostsList/PostsList';
import { Section } from 'components/Section/Section';

const ProfileDetails = ({
  profileDetails: {
    avatar,
    banner,
    city,
    country,
    description,
    followers,
    following,
    registeredAt,
    url,
    username,
    userId,
  },
}) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { month, year } = DateParser(registeredAt);

  useEffect(() => {
    setIsLoading(true);
    const asyncWrapper = async () => {
      try {
        const posts = await getProfilePosts(userId);
        setPosts(posts);
      } catch (e) {
        console.log(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    asyncWrapper();
  }, [userId]);

  return (
    <>
      <h1>{username}</h1>
      <Text>TotalMessages</Text>
      <BannerThumb>
        <Img src={banner} alt="banner" width={'600'} height={'200'} />
      </BannerThumb>
      <AvatarThumb>
        <Img src={avatar} alt="avatar" width={'40'} height={'40'} />
      </AvatarThumb>
      <H2>{username}</H2>
      <Text>{description}</Text>
      <AdditionalDescList>
        <AdditionalDescItem>
          <TfiLocationPin size={19} />
          <p>
            {country}, {city}
          </p>
        </AdditionalDescItem>
        <AdditionalDescItem>
          <AiOutlineLink size={19} />
          <a href={url}>{url}</a>
        </AdditionalDescItem>
        <AdditionalDescItem>
          <BiCalendar size={19} />
          <p>
            Joined {month} {year}
          </p>
        </AdditionalDescItem>
      </AdditionalDescList>
      <FollowList>
        <li>
          <FollowDigit>{following}</FollowDigit> Following
        </li>
        <li>
          <FollowDigit>{followers}</FollowDigit> Followers
        </li>
      </FollowList>
      <Section>
        {isLoading && <div>LOADING ...</div>}
        <PostsList posts={posts} />
      </Section>
    </>
  );
};

export default ProfileDetails;
