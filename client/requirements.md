## Packages
date-fns | Date formatting for message timestamps
framer-motion | Smooth entry animations for incoming messages
lucide-react | High quality icons for the UI

## Notes
Polling for messages is configured to 3 seconds on the number details page using React Query's refetchInterval.
The backend must ensure CORS is correctly configured if deployed separately, and that the database has seeded virtual numbers for testing.
