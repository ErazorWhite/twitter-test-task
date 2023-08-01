import React, { useEffect, useState } from 'react';
import { TfiLocationPin } from 'react-icons/tfi';
import { AiOutlineLink } from 'react-icons/ai';
import { BiCalendar } from 'react-icons/bi';
import {
  AdditionalDescriptionItem,
  AdditionalDescriptionList,
  AvatarThumb,
  BannerThumb,
  FollowDigit,
  FollowList,
  H2,
  Text,
  Img,
} from './ProfileDetails.styled';
import DateParser from 'utilities/dateParser';
import { getNewsFeed } from 'api/mockAPI';
import { PostsList } from 'components/PostsList/PostsList';
import { Section } from 'components/Section/Section';
import { useSearchParams } from 'react-router-dom';
import defaultPhoto from 'images/img_not_found.jpg';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';

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
  const [searchParams] = useSearchParams();
  const accoutAvatar = avatar ? avatar : defaultPhoto;
  const accountBanner = banner ? banner : defaultPhoto;

  useEffect(() => {
    setIsLoading(true);
    const asyncWrapper = async () => {
      try {
        const params = {};
        params.authorId = userId;

        // Фильтрация
        for (const [key, value] of searchParams.entries()) {
          if (value) {
            params[key] = value;
          }
        }

        const posts = await getNewsFeed(params);
        setPosts(posts);
      } catch (e) {
        console.log(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    asyncWrapper();
  }, [userId, searchParams]);

  return (
    <>
      {true && <LoadingSpinner isLoading={isLoading} />}
      <h1>{username}</h1>
      <Text>TotalMessages</Text>
      <BannerThumb>
        <Img src={accountBanner} alt="banner" width={'600'} height={'200'} />
      </BannerThumb>
      <AvatarThumb>
        <Img src={accoutAvatar} alt="avatar" width={'40'} height={'40'} />
      </AvatarThumb>
      <H2>{username}</H2>
      <Text>{description}</Text>
      <AdditionalDescriptionList>
        <AdditionalDescriptionItem>
          <TfiLocationPin size={19} />
          <p>
            {country}, {city}
          </p>
        </AdditionalDescriptionItem>
        <AdditionalDescriptionItem>
          <AiOutlineLink size={19} />
          <a href={url}>{url}</a>
        </AdditionalDescriptionItem>
        <AdditionalDescriptionItem>
          <BiCalendar size={19} />
          <p>
            Joined {month} {year}
          </p>
        </AdditionalDescriptionItem>
      </AdditionalDescriptionList>
      <FollowList>
        <li>
          <FollowDigit>{following}</FollowDigit> Following
        </li>
        <li>
          <FollowDigit>{followers}</FollowDigit> Followers
        </li>
      </FollowList>
      <Section>
        <PostsList posts={posts} />
      </Section>
    </>
  );
};

export default ProfileDetails;
