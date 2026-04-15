import { Email, GitHub, LinkedIn, Resume } from 'icons';
import { Config } from 'types';

export const config: Config = {
  name: {
    display: 'Xinrui Tang',
  },
  title: {
    display: 'AI Researcher | Machine Learning & AIGC',
  },
  buttons: [
    {
      name: 'resume',
      display: 'Resume',
      ariaLabel: 'Resume (opens in new window)',
      icon: <Resume />,
      href: 'https://auroey.github.io/',
    },
    {
      name: 'github',
      display: 'GitHub',
      ariaLabel: 'GitHub profile (opens in new window)',
      icon: <GitHub />,
      href: 'https://github.com/auroey',
    },
    {
      name: 'linked-in',
      display: 'LinkedIn',
      ariaLabel: 'LinkedIn profile (opens in new window)',
      icon: <LinkedIn />,
      href: 'https://www.linkedin.com/in/kyle-tang-8a4752395',
    },
    {
      name: 'email',
      display: 'Email',
      ariaLabel: 'Email contact (opens in new window)',
      icon: <Email />,
      href: 'mailto:xrt404@gmail.com',
    },
  ],
};
