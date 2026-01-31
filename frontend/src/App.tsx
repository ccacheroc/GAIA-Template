import { RouterProvider } from 'react-router-dom';
import { QueryProvider } from './app/providers/QueryProvider';
import { router } from './app/router';
import { AuthProvider } from './features/auth/context/AuthContext';

function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryProvider>
  );
}

export default App;
