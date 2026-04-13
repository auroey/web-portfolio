import { useContext } from 'react';

import styled from 'styled-components';

import { AppContext } from 'App/AppContext';
import { Theme } from 'types';

const P = {
  Container: styled.div<{ $theme: Theme }>`
    transition: background 0.5s linear;
    position: absolute;
    background: ${({ $theme }) => $theme.background};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
    width: 100vw;
    height: 100vh;
    z-index: 0;
  `,
};

export const Particles = () => {
  const { theme } = useContext(AppContext);

  return <P.Container data-v2="particles" $theme={theme} />;
};
