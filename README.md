npm run # ASAI - AI System Assistance Interface

A retro-styled web application that teaches beginners how to effectively prompt and work with AI coding assistants.

## 🚀 Features

- **Project Type Selector**: Choose from various project types (React, Express.js, Mobile Apps, etc.)
- **Dynamic Prompt Templates**: Generate customized AI prompting templates based on your project
- **File Structure Recommendations**: Visual tree display of recommended project structures
- **Troubleshooting Guide**: Common coding issues and AI prompting solutions
- **Step-by-Step Workflows**: Proven AI collaboration strategies for different development phases
- **Progress Tracking**: Monitor your AI collaboration skills development

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **CSS3** - Custom retro styling with CSS variables
- **Axios** - HTTP client for API communication

### Backend
- **Express.js** - Node.js web framework
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger
- **Dotenv** - Environment variables management

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd asai
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install all dependencies (client + server)
npm run install-all
```

### 3. Environment Setup
Create a `.env` file in the `server` directory with the following variables:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

### 4. Start Development Servers
```bash
# Start both client and server concurrently
npm run dev

# Or start them separately:
# Terminal 1 - Start the backend server
npm run server

# Terminal 2 - Start the React frontend
npm run client
```

### 5. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📁 Project Structure

```
asai/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   │   └── layout/    # Layout components (Header, Footer)
│   │   ├── pages/         # Page components
│   │   ├── styles/        # CSS files
│   │   ├── App.js         # Main App component
│   │   └── index.js       # React entry point
│   └── package.json
├── server/                # Express.js backend
│   ├── routes/           # API route handlers
│   ├── server.js         # Express server setup
│   └── package.json
├── package.json          # Root package.json
└── README.md
```

## 🎨 Design Philosophy

ASAI features a retro-inspired design with:
- **1980s Terminal Aesthetic**: Green phosphor text on dark backgrounds
- **Monospace Typography**: Courier Prime font for authentic feel
- **Subtle CRT Effects**: Light scanlines and glowing text
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Accessible Design**: High contrast and keyboard navigation

## 🔧 Available Scripts

### Root Level
- `npm run dev` - Start both client and server in development mode
- `npm run install-all` - Install dependencies for all packages
- `npm run build` - Build the React app for production

### Client Scripts
- `npm start` - Start React development server
- `npm run build` - Build for production
- `npm test` - Run tests

### Server Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## 🚦 API Endpoints

### Projects
- `GET /api/projects` - Get all project types
- `GET /api/projects/:id` - Get specific project type
- `POST /api/projects/validate` - Validate project selection

### Templates
- `GET /api/templates` - Get all prompt templates
- `GET /api/templates/:projectType` - Get templates for project type
- `POST /api/templates/customize` - Customize template with user input

### Structures
- `GET /api/structures` - Get all file structures
- `GET /api/structures/:projectType` - Get structure for project type

### Troubleshooting
- `GET /api/troubleshooting` - Get troubleshooting guides
- `GET /api/troubleshooting/:id` - Get specific guide

### Workflows
- `GET /api/workflows` - Get all workflows
- `GET /api/workflows/:workflowType` - Get specific workflow

### Progress
- `GET /api/progress/structure` - Get progress tracking structure
- `GET /api/progress/:userId` - Get user progress
- `POST /api/progress/:userId/update` - Update user progress

## 🔮 Future Enhancements

- **Database Integration**: Persistent data storage with PostgreSQL/MongoDB
- **User Authentication**: User accounts and progress persistence
- **AI Integration**: Direct integration with OpenAI API for live assistance
- **Community Features**: Share templates and workflows with other users
- **Analytics Dashboard**: Detailed progress analytics and recommendations
- **Mobile App**: React Native companion app
- **Sound Effects**: Optional retro computer sounds for interactions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by retro computer terminals and 1980s computing aesthetics
- Built with modern web technologies for optimal performance
- Designed to bridge the gap between beginners and AI-assisted development

---

**ASAI** - *Optimizing Human-AI Collaboration* 🤖✨
