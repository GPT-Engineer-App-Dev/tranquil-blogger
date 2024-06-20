import { useState } from "react";
import { useColorMode, IconButton } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";
import { Container, Heading, VStack, FormControl, FormLabel, Input, Textarea, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = { title, content };
    const existingPosts = JSON.parse(localStorage.getItem("posts")) || [];
    localStorage.setItem("posts", JSON.stringify([...existingPosts, newPost]));
    navigate("/");
  };

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
        <Heading as="h1" size="2xl" mb={4}>Add New Post</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl id="title" isRequired>
              <FormLabel>Title</FormLabel>
              <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </FormControl>
            <FormControl id="content" isRequired>
              <FormLabel>Content</FormLabel>
              <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
            </FormControl>
            <Button type="submit" colorScheme="blue" size="lg" width="full">Add Post</Button>
          </VStack>
        </form>
      </VStack>
    </Container>
  );
};

export default AddPost;