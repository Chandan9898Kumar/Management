# User Management Table

A modern React application for managing user data with filtering, sorting, and pagination capabilities.

## Features

- **User Management Dashboard**: View and manage user data in a clean, responsive table
- **Advanced Filtering**: Filter users by name, email, and role
- **Sorting**: Sort users by any column in ascending or descending order
- **Pagination**: Navigate through user data with a paginated interface
- **Edit User**: Update user information through a modal dialog
- **Responsive Design**: Works on desktop and mobile devices
- **Error Handling**: Graceful error states and loading indicators

## Tech Stack

- **React 19** with TypeScript
- **React Router** for navigation
- **React Query** for data fetching and state management
- **Tailwind CSS** for styling
- **Radix UI** for accessible UI components
- **Zod** for form validation
- **Vite** for fast development and building

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd User-Management-Table
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── assets/           # Static assets
├── components/       # Reusable UI components
│   ├── CircularLoader/
│   └── ui/           # UI component library
├── error/           # Error handling components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── pages/           # Main application pages
├── schemas/         # Validation schemas
├── services/        # API service functions
└── types/           # TypeScript type definitions
```

## API Integration

The application uses [JSONPlaceholder](https://jsonplaceholder.typicode.com) as a mock API for user data. The API integration is handled in the `UserService.tsx` file.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint to check for code issues
- `npm run preview` - Preview the production build locally

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.