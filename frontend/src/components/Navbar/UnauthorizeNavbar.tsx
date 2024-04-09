import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconLogin, IconUserPlus } from '@tabler/icons-react';
import classes from './Navbar.module.css';

export function UnauthorizeNavbar() {
  const [active, setActive] = useState('Login');
  const navigate = useNavigate();

  const linksData = [
    { link: '/login', label: 'Login', icon: IconLogin },
    { link: '/register', label: 'Register', icon: IconUserPlus },
  ];

  const links = linksData.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        navigate(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        {links}
      </div>
    </nav>
  );
}
