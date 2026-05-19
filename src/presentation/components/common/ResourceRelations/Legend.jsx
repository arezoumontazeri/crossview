import { Box, Text } from '@chakra-ui/react';
import { getBorderColor } from '../../../utils/theme.js';

export function Legend({ colorMode }) {
  return (
    <Box
      position="absolute"
      top={8}
      right={8}
      display="flex"
      gap={4}
      alignItems="center"
      zIndex={3000}
    >
      <Box w="16px" h="16px" borderRadius="full" bg="#38A169" />
      <Text fontSize="xs">Healthy</Text>
      <Box w="16px" h="16px" borderRadius="full" bg="#E53E3E" />
      <Text fontSize="xs">Unhealthy</Text>
      <Box w="16px" h="16px" borderRadius="full" bg="#DD6B20" />
      <Text fontSize="xs">Warning/Unknown</Text>
      <Box w="16px" h="16px" borderRadius="full" bg={getBorderColor(colorMode, 'gray')} />
      <Text fontSize="xs">No status</Text>
    </Box>
  );
}
