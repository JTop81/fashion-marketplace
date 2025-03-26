# Unik App Client

A modern e-commerce platform connecting artisans and buyers, featuring real-time chat, AI-powered search, and social commerce capabilities.

## 🚀 Features

- **Social Commerce**: Product posts with likes, comments, and sharing functionality
- **Real-time Chat**: Integrated messaging system between buyers and sellers
- **AI Search**: Advanced AI-powered product search and recommendations
- **Multi-Platform Integration**: Support for Etsy and Shopify product listings
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Feature Flags**: LaunchDarkly integration for feature management

## 🛠️ Tech Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS with custom configurations
- **State Management**: Zustand for global state
- **Real-time Communication**: Socket.IO
- **Feature Management**: LaunchDarkly
- **API Integration**: React Query
- **UI Components**: Headless UI
- **Icons**: React Icons
- **Date Handling**: Luxon
- **Routing**: React Router DOM

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Environment variables (see below)

## 🔧 Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
REACT_APP_SOCKET_SERVER_HOST=your_socket_server_host
REACT_APP_SOCKET_SERVER_PORT=your_socket_server_port
REACT_APP_VERCEL_ENV=development
REACT_APP_VERCEL_URL=your_vercel_url
```

## 🚀 Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/unik-app-client.git
   cd unik-app-client
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npm start
   # or
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
src/
├── api/                 # API services and interfaces
├── common/             # Shared components and utilities
│   ├── components/     # Reusable UI components
│   ├── hooks/         # Custom React hooks
│   ├── shared/        # Shared business components
│   └── util/          # Utility functions
├── pages/             # Page components
│   ├── buyer-home/    # Buyer-specific pages
│   └── seller-home/   # Seller-specific pages
├── setup/             # App setup and configuration
│   └── store/         # Zustand stores
├── socket.ts          # Socket.IO configuration
└── types/             # TypeScript type definitions
```

## 🔑 Key Components

### Chat System

- Real-time messaging using Socket.IO
- Chat categories (All, Unread, Archived, Blocked)
- Message status tracking
- Popup chat interface for desktop

### Product Posts

- Rich media support
- Social interactions (likes, comments)
- Description truncation with "Show More"
- Multi-platform product linking

### AI Search

- Natural language product search
- Search suggestions
- Historical search tracking
- Real-time search results

## 🔒 Feature Flags

The application uses LaunchDarkly for feature management. Key features that can be toggled:

- Chat functionality (`enabledChats`)
- AI search capabilities
- Platform integrations

## 🧪 Testing

Run the test suite:

```bash
npm test
# or
yarn test
```

## 📦 Building for Production

Create a production build:

```bash
npm run build
# or
yarn build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Socket.IO](https://socket.io/)
- [LaunchDarkly](https://launchdarkly.com/)
- All other open-source contributors

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.
