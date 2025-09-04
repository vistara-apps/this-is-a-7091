# Token Tracker Pro

A comprehensive web application for creators to track their token earnings and project metrics across different launchpad projects, consolidating data from Supabase for easy analysis.

## 🚀 Features

### Core Features
- **Live Earnings Dashboard** - Real-time view of token earnings from all tracked creator projects
- **Historical Earnings Analysis** - Tools to view past earnings data and identify performance trends
- **Token Metric Aggregation** - Consolidated essential token data (market cap, volume, holders)
- **Creator Earning Attribution** (Premium) - Links project activity to specific creator earnings

### Subscription Tiers
- **Free** - Limited projects, basic dashboard
- **Pro ($10/mo)** - Unlimited projects, advanced analytics, historical data
- **Premium ($25/mo)** - All Pro features + creator attribution insights

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom design system
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Authentication**: Mock system (ready for Supabase integration)
- **State Management**: React Context API

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/                 # Authentication components
│   │   ├── AuthPage.tsx
│   │   ├── LoginForm.tsx
│   │   └── SignupForm.tsx
│   ├── layout/               # Layout components
│   │   └── DashboardLayout.tsx
│   ├── ui/                   # Reusable UI components
│   │   ├── DataTable.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── SidebarNav.tsx
│   │   └── StatCard.tsx
│   └── views/                # Main view components
│       ├── Analytics.tsx
│       ├── Attribution.tsx
│       ├── Dashboard.tsx
│       ├── Projects.tsx
│       └── Settings.tsx
├── contexts/                 # React contexts
│   └── AuthContext.tsx
├── hooks/                    # Custom hooks
│   └── useSubscription.tsx
├── services/                 # API services
│   └── api.ts
├── types/                    # TypeScript type definitions
│   └── index.ts
└── App.tsx                   # Main app component
```

## 🎨 Design System

The application uses a comprehensive design system with:

- **Colors**: Dark theme with primary blue, accent green, and surface grays
- **Typography**: Responsive text scales from xs to 6xl
- **Spacing**: Consistent spacing scale (xs: 4px to xl: 32px)
- **Components**: Modular, reusable components with variants
- **Motion**: Smooth transitions with cubic-bezier easing

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd token-tracker-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🔐 Authentication

The application includes a complete authentication system:

- **Login/Signup forms** with validation
- **Session persistence** via localStorage
- **Protected routes** with authentication guards
- **User context** for global state management

**Demo Credentials:**
- Email: `demo@example.com`
- Password: `demo123`

## 📊 Data Management

### Mock Data
The application currently uses mock data for development and testing:
- Sample projects with realistic metrics
- Historical data generation
- Simulated API delays for realistic UX

### Supabase Integration (Ready)
The API service is structured for easy Supabase integration:
- Database schema defined in types
- API methods ready for Supabase queries
- Authentication hooks prepared for Supabase Auth

## 🎯 Key Components

### Dashboard
- Real-time earnings overview
- Project performance cards
- Recent activity feed
- Quick stats and metrics

### Analytics (Pro/Premium)
- Historical data visualization
- Multiple chart types (line, bar)
- Date range selection
- Data export functionality (CSV/JSON)

### Projects
- Project management (CRUD operations)
- Search and filtering
- Add project modal with validation
- Subscription-based project limits

### Attribution (Premium)
- Volume to earnings ratio analysis
- Holder growth impact metrics
- Market cap correlation insights
- Optimization recommendations

## 🔄 API Integration

### Current Implementation
```typescript
// Mock API with realistic delays
const api = {
  getProjects(): Promise<Project[]>
  addProject(data): Promise<Project>
  getTokenMetrics(): Promise<TokenMetrics[]>
  getHistoricalMetrics(): Promise<TokenMetrics[]>
  getCreatorAttribution(): Promise<AttributionData>
  exportData(format): Promise<string>
}
```

### Supabase Integration (Future)
```typescript
// Ready for Supabase implementation
const supabase = {
  fetchProjects(): Promise<Project[]>
  fetchTokenMetrics(): Promise<TokenMetrics[]>
  // Additional methods...
}
```

## 📱 Responsive Design

The application is fully responsive with:
- **Mobile-first approach**
- **Collapsible sidebar** for mobile
- **Responsive grid layouts**
- **Touch-friendly interactions**
- **Optimized for all screen sizes**

## 🚀 Performance Features

- **Code splitting** ready for implementation
- **Lazy loading** for route components
- **Optimized bundle size**
- **Efficient re-renders** with React best practices
- **Smooth animations** with CSS transitions

## 🔒 Security Features

- **Input validation** on all forms
- **XSS protection** with proper sanitization
- **Authentication guards** for protected routes
- **Secure data handling** practices
- **Environment variable** support for sensitive data

## 📈 Analytics & Insights

### Free Tier
- Basic dashboard view
- Limited project tracking
- Essential metrics display

### Pro Tier
- Historical data analysis
- Advanced charts and visualizations
- Data export capabilities
- Unlimited project tracking

### Premium Tier
- Creator attribution analysis
- Advanced correlation insights
- Optimization recommendations
- Priority support features

## 🛣 Roadmap

### Phase 1 (Current)
- ✅ Complete UI implementation
- ✅ Authentication system
- ✅ Mock data integration
- ✅ Responsive design

### Phase 2 (Next)
- [ ] Supabase integration
- [ ] Real-time data updates
- [ ] WebSocket connections
- [ ] Enhanced error handling

### Phase 3 (Future)
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Team collaboration features
- [ ] API for third-party integrations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments for implementation details

---

**Token Tracker Pro** - Empowering creators with comprehensive token analytics and insights.
