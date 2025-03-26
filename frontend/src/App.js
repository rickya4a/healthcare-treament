import React from 'react';
import { Box, Container, Heading, Text } from '@chakra-ui/react';
import TreatmentForm from './components/TreatmentForm';

function App() {
  return (
    <Box bg="gray.50" minH="100vh" py={10}>
      <Container maxW="container.xl">
        <Box textAlign="center" mb={10}>
          <Heading as="h1" size="xl" mb={2} color="teal.600">
            Healthcare Treatment Management
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Record and manage medical treatments and medications for patients
          </Text>
        </Box>

        <TreatmentForm />
      </Container>
    </Box>
  );
}

export default App;