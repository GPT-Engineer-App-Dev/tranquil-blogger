import { Container, Text, VStack, Heading, Box, Image, HStack, Link, Button, useColorMode, IconButton } from "@chakra-ui/react";
import { FaTwitter, FaLinkedin, FaGithub, FaSun, FaMoon, FaTrash } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";

const Index = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [posts, setPosts] = useState([]);

  const handleDelete = (index) => {
    const updatedPosts = posts.filter((_, i) => i !== index);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);
  }, []);

  return (
    <Container centerContent maxW="container.md" py={10}>
      <IconButton
        aria-label="Toggle theme"
        icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
        onClick={toggleColorMode}
        position="fixed"
        top="1rem"
        right="1rem"
      />
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={4}>Welcome to My Blog</Heading>
          <Text fontSize="lg">Sharing my thoughts and experiences on web development, technology, and more.</Text>
        </Box>
        <Box>
          <Image borderRadius="md" src="/images/blog-banner.jpg" alt="Blog Banner" />
        </Box>
        <Box textAlign="center">
          <Button as={RouterLink} to="/add-post" colorScheme="teal" size="lg">Add New Post</Button>
        </Box>
        <Box>
          <Heading as="h2" size="xl" mb={4}>Recent Posts</Heading>
          <VStack spacing={4} align="stretch">
            {posts.map((post, index) => (
              <Box key={index} p={5} shadow="md" borderWidth="1px" borderRadius="md" position="relative">
                <Heading fontSize="xl">{post.title}</Heading>
                <Text mt={4}>{post.content}</Text>
                <IconButton
                  aria-label="Delete post"
                  icon={<FaTrash />}
                  colorScheme="red"
                  position="absolute"
                  top="1rem"
                  right="1rem"
                  onClick={() => handleDelete(index)}
                />
              </Box>
            ))}
          </VStack>
        </Box>
        <Box textAlign="center">
          <Heading as="h2" size="xl" mb={4}>Follow Me</Heading>
          <HStack spacing={4} justify="center">
            <Link href="https://twitter.com" isExternal>
              <FaTwitter size="24px" />
            </Link>
            <Link href="https://linkedin.com" isExternal>
              <FaLinkedin size="24px" />
            </Link>
            <Link href="https://github.com" isExternal>
              <FaGithub size="24px" />
            </Link>
          </HStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;