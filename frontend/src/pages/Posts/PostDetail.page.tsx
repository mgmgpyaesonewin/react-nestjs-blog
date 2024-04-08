import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, Container, Group, Text, Title, TypographyStylesProvider } from '@mantine/core';
import PostType from '@/types/PostType';
import { fetcher } from '@/api';
import { humanizeDate } from '@/helper';
import classes from './PostDetail.module.css';

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<PostType | null>(null);

  useEffect(() => {
    // Get Slug from URL
    const fetchPost = async () => {
      try {
        const { data } = await fetcher(`/posts/slug/${slug}`, 'GET');
        setPost(data);
      } catch (error) {
        console.error('Failed to fetch post:', error);
      }
    };
    fetchPost();
  }, [slug]);

  if (!post) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <Container size="sm">
      <Title order={3} className={classes.title} my="lg">{post.title}</Title>
      <Group>
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
          alt="Jacob Warnhalter"
          radius="xl"
        />
        <div>
          <Text fz="md">{post.user.username}</Text>
          <Text fz="xs" c="dimmed">
            posted {humanizeDate(post.createdAt)}
          </Text>
        </div>
      </Group>
      <TypographyStylesProvider className={classes.body}>
        <div
          className={classes.content}
          dangerouslySetInnerHTML={{
            __html:
              post.content,
          }}
        />
      </TypographyStylesProvider>
    </Container>
  );
}
