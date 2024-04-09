import { useEffect, useState } from 'react';
import { TinyEmitter } from 'tiny-emitter';
import {
  IconArticle,
  IconCircleFilled,
  IconEdit,
  IconLogout,
  IconTimeline,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { Badge, ScrollArea } from '@mantine/core';
import classes from './Navbar.module.css';
import { useCategories } from '@/hooks/useCategories';
import { TrendingCategoryType } from '@/types/CategoryType';

export function Navbar() {
  const { categories: trendingCategories, isLoading, setIsLoading, fetchCategories } = useCategories('/categories/trending');
  const [active, setActive] = useState('Activity');
  const [data, setData] = useState([
    { link: '/posts', label: 'Activity', icon: IconTimeline, withCount: 0 },
    { link: '/posts/my', label: 'My Posts', icon: IconEdit, withCount: 0 },
    { link: '/categories', label: 'All Categories', icon: IconArticle, withCount: 0 },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    if (trendingCategories.length > 0) {
      setData(prevData => [
        ...prevData,
        ...trendingCategories.map((category: TrendingCategoryType) => ({
          link: `/categories/${category.id}`,
          label: category.title,
          icon: IconCircleFilled,
          withCount: category.postCount,
        })),
      ]);
    }
  }, [isLoading]);

  const links = data.map((item) => (
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
      {
        item.withCount > 0 && (
          <Badge color="gray" mx="md">{item.withCount}</Badge>
        )
      }
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <ScrollArea h={550}>
          {links}
        </ScrollArea>
      </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}