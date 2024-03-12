import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormErrorMessage, FormLabel, Heading, Input, VStack, useToast } from "@chakra-ui/react";
import { FaSignInAlt } from "react-icons/fa";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Placeholder for API call
    try {
      // Mock success response
      const response = { accessToken: "mocked_access_token" };
      localStorage.setItem("accessToken", response.accessToken);
      toast({
        title: "Login successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (apiError) {
      setError(apiError.error || "Unexpected error occurred");
      toast({
        title: "Error",
        description: apiError.error || "Unexpected error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    setIsLoading(false);
  };

  const isEmailError = email === "";
  const isPasswordError = password === "";

  return (
    <Container centerContent>
      <VStack spacing={8} marginTop="20vh">
        <Heading as="h1">Welcome Back!</Heading>
        <Box p={8} maxWidth="400px" borderWidth={1} borderRadius={8} boxShadow="lg">
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isInvalid={isEmailError}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
                {isEmailError && <FormErrorMessage>Email is required.</FormErrorMessage>}
              </FormControl>
              <FormControl isInvalid={isPasswordError}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
                {isPasswordError && <FormErrorMessage>Password is required.</FormErrorMessage>}
              </FormControl>
              {error && (
                <Box color="red.500" textAlign="center">
                  {error}
                </Box>
              )}
              <Button leftIcon={<FaSignInAlt />} colorScheme="teal" variant="solid" type="submit" isLoading={isLoading} loadingText="Logging In" isFullWidth>
                Log In
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
