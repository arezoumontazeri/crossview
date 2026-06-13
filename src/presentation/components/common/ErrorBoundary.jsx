import { Component } from 'react';
import { Box, Text, VStack, Icon, Button } from '@chakra-ui/react';
import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Unhandled render error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" minH="100vh" bg="gray.50" _dark={{ bg: 'gray.900' }}>
          <VStack spacing={4} maxW="500px" p={8} bg="white" _dark={{ bg: 'gray.800', borderColor: 'gray.700' }} borderRadius="lg" boxShadow="lg" border="1px solid" borderColor="gray.200">
            <Icon as={FiAlertCircle} boxSize={12} color="red.500" />
            <Text fontSize="xl" fontWeight="bold" textAlign="center">
              Something went wrong
            </Text>
            <Text fontSize="md" color="gray.600" _dark={{ color: 'gray.400' }} textAlign="center">
              An unexpected error occurred while rendering this page. Reloading the page usually resolves it.
            </Text>
            <Button
              leftIcon={<FiRefreshCw />}
              colorScheme="blue"
              onClick={() => window.location.reload()}
              mt={2}
            >
              Reload Page
            </Button>
          </VStack>
        </Box>
      );
    }

    return this.props.children;
  }
}
