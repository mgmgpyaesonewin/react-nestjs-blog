import {
  Card,
  Image,
  ActionIcon,
  Group,
  Text,
  Avatar,
  Badge,
  useMantineTheme,
  rem,
  Flex,
} from '@mantine/core';
import { useContext } from 'react';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import day from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import classes from './Post.module.css';
import PostType from '@/types/PostType';
import { AuthContext } from '@/context/AuthContext';
import { humanizeDate } from '@/helper';

day.extend(relativeTime);

export function Post(
    { post, handleDelete }:
    {
      post: PostType,
      handleDelete: (event: React.MouseEvent<HTMLButtonElement>) => void
    }
  ) {
  const theme = useMantineTheme();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/posts/${post.slug}`);
  };

  const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    navigate(`/posts/${post.id}/edit`);
  };

  return (
    <Card withBorder padding="lg" radius="md" className={classes.card} onClick={handleClick}>
      <Card.Section mb="sm">
        <Image
          src="https://images.unsplash.com/photo-1477554193778-9562c28588c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
          alt={post.title}
          height={180}
        />
      </Card.Section>

      <Text fw={700} className={classes.title}>
        {post.title}
      </Text>

      <Flex mt="xs" gap={5}>
        <Badge w="fit-content" variant="light">
          {post.category.title}
        </Badge>
        <Badge w="fit-content" variant={post.status === 'PUBLISHED' ? 'filled' : 'light'} color={post.status === 'PUBLISHED' ? 'green' : 'gray'}>
          {post.status}
        </Badge>
      </Flex>

      <Group mt="lg">
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png"
          radius="sm"
        />
        <div>
          <Text fw={500}>{ post.user.username }</Text>
          <Text fz="xs" c="dimmed">
            posted {humanizeDate(post.createdAt)}
          </Text>
        </div>
      </Group>

      <Card.Section className={classes.footer}>
        <Group justify="end">
          {
            post.user.id !== user?.id ? null : (
              <Group gap={0}>
                <ActionIcon variant="subtle" color="gray" onClick={handleEdit}>
                  <IconEdit
                    style={{ width: rem(20), height: rem(20) }}
                    color={theme.colors.yellow[6]}
                    stroke={1.5}
                  />
                </ActionIcon>
                <ActionIcon variant="subtle" color="gray" onClick={handleDelete}>
                  <IconTrash
                    style={{ width: rem(20), height: rem(20) }}
                    color={theme.colors.red[6]}
                    stroke={1.5}
                  />
                </ActionIcon>
              </Group>
            )
          }
        </Group>
      </Card.Section>
    </Card>
  );
}
