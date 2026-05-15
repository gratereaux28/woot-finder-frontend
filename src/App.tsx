import { MantineProvider } from '@mantine/core';
import AppContent from './AppContent';

export default function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <AppContent />
    </MantineProvider>
  );
}
