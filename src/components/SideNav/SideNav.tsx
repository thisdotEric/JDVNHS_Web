import React, { FC } from 'react';
import './SideNav.scss';
import { NavLink } from 'react-router-dom';
import { SchoolLogo } from '../../assets';

interface SideNavProps {}

interface ILink {
  to: string;
  name: string;
}

const links: ILink[] = [
  {
    to: '/subject',
    name: 'Subject',
  },
  {
    to: '/students',
    name: 'Students',
  },
  {
    to: '/grades',
    name: 'Grades',
  },
  {
    to: '/attendance',
    name: 'Students',
  },
  {
    to: '/students',
    name: 'Grades',
  },
];

const SideNav: FC<SideNavProps> = ({}: SideNavProps) => {
  return (
    <nav>
      {links.map((link, index) => (
        <NavLink key={index} className="link" to={link.to}>
          {link.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default SideNav;
