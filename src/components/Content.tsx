import { useContext } from 'react';

import styled, { css } from 'styled-components';

import { AppContext } from 'App/AppContext';
import { Theme } from 'types';

const sharedStyles = css`
  transition: color 0.5s linear;
  font-weight: 600;
  position: relative;
  z-index: 1;
  letter-spacing: -0.02em;
`;

const C = {
  Name: styled.h1<{ $theme: Theme }>`
    ${sharedStyles};
    font-size: 6rem;
    margin: 0;
    color: ${({ $theme }) => $theme.primaryTextColor};
    font-weight: 700;
    @media only screen and (max-device-width: 820px) and (-webkit-min-device-pixel-ratio: 2) {
      font-size: 4.5rem;
    }
  `,
  Title: styled.h2<{ $theme: Theme }>`
    ${sharedStyles};
    font-size: 2rem;
    margin: 2rem 0;
    color: ${({ $theme }) => $theme.secondaryTextColor};
    font-weight: 400;
    letter-spacing: 0.02em;
    @media only screen and (max-device-width: 820px) and (-webkit-min-device-pixel-ratio: 2) {
      font-size: 1.8rem;
    }
  `,
};

export const Content = () => {
  const { config, theme } = useContext(AppContext);

  return (
    <>
      <C.Name data-v2="name" $theme={theme}>
        {config.name.display}
      </C.Name>
      <C.Title data-v2="title" $theme={theme}>
        {config.title.display}
      </C.Title>
    </>
  );
};
