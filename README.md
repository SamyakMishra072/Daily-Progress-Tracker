# Track Samyak - Daily Progress Tracker

A beautiful, modern, and fully responsive daily progress tracker built with React, TypeScript, and Tailwind CSS. This application helps you monitor your daily productivity and track your achievements over time.

## Features

- **Modern Dashboard**: Clean, intuitive interface with summary statistics
- **Progress Tracking**: Log daily tasks, satisfaction levels, and personal remarks
- **Advanced Filtering**: Sort and filter entries by date, satisfaction, or search terms
- **Data Export**: Export your progress data to CSV for external analysis
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Local Storage**: Data persists locally (backend integration ready)
- **Toast Notifications**: User-friendly feedback for all actions

## Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the application in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Serve Static Files

After building, you can serve the static files from the `dist/` folder using any static file server:

```bash
# Using a simple HTTP server
npx serve dist

# Or using Python
python -m http.server 8000 -d dist

# Or using Node.js
npx http-server dist
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard.tsx    # Main dashboard component
│   ├── AddEntryForm.tsx # Form for adding new entries
│   ├── EntryTable.tsx   # Table displaying all entries
│   ├── SummaryCards.tsx # Statistics cards
│   ├── ThemeToggle.tsx  # Dark/light mode toggle
│   └── Toast.tsx        # Toast notification component
├── hooks/               # Custom React hooks
│   ├── useLocalStorage.ts
│   └── useTheme.ts
├── utils/               # Utility functions
│   ├── api.ts          # API integration (stub)
│   └── export.ts       # CSV export and statistics
├── types/              # TypeScript type definitions
│   └── index.ts
├── data/               # Mock data
│   └── mockData.ts
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## Backend Integration

The application is designed to work with a backend API. Currently, it uses local storage for data persistence, but you can easily integrate with your backend by:

1. **Update API endpoints** in `src/utils/api.ts`:
   - Replace `https://api.example.com` with your actual API base URL
   - Implement proper error handling for your API responses

2. **Modify data fetching** in `src/components/Dashboard.tsx`:
   - Replace local storage with API calls
   - Add proper loading states and error handling

3. **Configure authentication** (if needed):
   - Add authentication headers to API calls
   - Implement login/logout functionality

### API Endpoints Expected

```
POST /api/progress      # Create new entry
GET  /api/progress      # Get all entries
PUT  /api/progress/:id  # Update entry
DELETE /api/progress/:id # Delete entry
```

### Expected Data Format

```typescript
interface ProgressEntry {
  id: string;
  date: string;           // YYYY-MM-DD format
  tasksCompleted: string; // Multiline text
  satisfied: 'Y' | 'N';   // Satisfaction level
  remarks: string;        // Optional remarks
  createdAt: string;      // ISO timestamp
}
```

## Customization

### Colors & Themes

The application uses a comprehensive color system defined in `tailwind.config.js`. You can customize:

- **Primary colors**: Blue theme for main actions
- **Secondary colors**: Green theme for success states
- **Accent colors**: Purple theme for highlights
- **Dark mode**: Automatic theme switching

### Components

All components are modular and can be easily customized:

- **Dashboard layout**: Modify `src/components/Dashboard.tsx`
- **Form fields**: Update `src/components/AddEntryForm.tsx`
- **Table columns**: Customize `src/components/EntryTable.tsx`
- **Statistics**: Modify `src/components/SummaryCards.tsx`

## Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server
- **Lucide React** - Beautiful, customizable icons
- **ESLint** - Code linting and quality

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Deployment

The application is ready for deployment to any static hosting service:

- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your Git repository
- **GitHub Pages**: Use the `dist` folder as your source
- **Any CDN**: Upload the contents of `dist` folder

Make sure to build the project first:

```bash
npm run build
```

Then deploy the `dist` folder to your hosting service of choice.