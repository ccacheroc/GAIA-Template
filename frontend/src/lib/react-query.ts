import { QueryClient } from '@tanstack/react-query';

// [Feature: Task Management] [Ticket: TM-USER-001-FE-T03]
// Centralized QueryClient configuration for caching and data fetching strategies.
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60, // 1 minute
            retry: 1,
        },
    },
});
