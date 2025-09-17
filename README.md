# LapGenius - Laptop E-commerce Platform

A modern, full-stack e-commerce platform for laptops built with React, Node.js, and MongoDB. Features a responsive Arabic interface with admin dashboard and real-time order management.

## 🌟 Features

### For Customers
- **Browse Products**: View laptop catalog with detailed specifications
- **Smart Recommendations**: AI-powered laptop suggestions based on major and budget
- **Shopping Cart**: Add, remove, and manage cart items
- **Order Management**: Track order status and history
- **User Authentication**: Secure login/registration system
- **Responsive Design**: Works perfectly on desktop and mobile devices

### For Administrators
- **Dashboard**: Comprehensive admin panel with analytics
- **Product Management**: Add, edit, and delete laptop products
- **Order Management**: Update order statuses (pending, paid, shipped, cancelled)
- **User Management**: View and manage customer accounts
- **Suggestion System**: Review and respond to customer suggestions
- **Real-time Updates**: Instant status changes and notifications

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Context API** - State management
- **CSS3** - Custom styling with Arabic RTL support

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

### Development Tools
- **Nodemon** - Auto-restart server
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger
- **Swagger** - API documentation

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd LapGeniusFullReact/server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the server directory:
   ```env
   PORT=5001
   MONGO_URL=mongodb:/x.x.x.x:27017/lapgenius
   JWT_SECRET=your_jwt_secret_here
   ```

4. **Database Setup**
   ```bash
   npm run seed
   ```

5. **Start the server**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../src
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

## 🚀 Usage

### Default Admin Account
- **Email**: `admin1@example.com`
- **Password**: `admin123A`

### API Endpoints

#### Authentication
- `POST /api/admin/login` - Admin login
- `POST /api/client/login` - Client login
- `POST /api/client` - Client registration

#### Products
- `GET /api/laptop` - Get all laptops
- `POST /api/laptop` - Add new laptop (admin only)
- `PUT /api/laptop/:id` - Update laptop (admin only)
- `DELETE /api/laptop/:id` - Delete laptop (admin only)

#### Orders
- `GET /api/order` - Get all orders
- `POST /api/order` - Create new order
- `PUT /api/order/:id` - Update order status (admin only)

#### Cart
- `GET /api/cart/:clientId` - Get user cart
- `POST /api/cart/:clientId/add` - Add item to cart
- `DELETE /api/cart/:clientId/item/:itemId` - Remove item from cart

## 📁 Project Structure

```
LapGeniusFullReact/
├── server/                 # Backend API
│   ├── src/
│   │   ├── models/         # Database models
│   │   ├── middleware/     # Authentication middleware
│   │   ├── v1/routes/      # API routes
│   │   ├── scripts/        # Database seeding
│   │   └── server.js       # Main server file
│   └── package.json
├── src/                    # Frontend React app
│   ├── components/         # Reusable components
│   ├── pages/             # Page components
│   ├── hooks/             # Custom React hooks
│   ├── context/           # React context providers
│   ├── api/               # API client
│   └── styles/            # CSS styles
├── index.html
└── package.json
```

## 🔐 Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Role-based Access**: Admin and client role separation
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configured for secure cross-origin requests

## 🎨 UI/UX Features

- **Arabic RTL Support**: Full right-to-left layout support
- **Responsive Design**: Mobile-first approach
- **Modern Interface**: Clean and intuitive user experience
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages

## 📊 Performance Optimizations

- **No Caching**: Real-time data updates
- **Database Indexing**: Optimized queries with indexes
- **Efficient Queries**: Populated relationships for faster loading
- **Timestamp Prevention**: Prevents browser caching issues

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Frontend Development**: React.js, Vite, CSS3
- **Backend Development**: Node.js, Express.js, MongoDB
- **Database Design**: Mongoose ODM, MongoDB
- **Authentication**: JWT, bcryptjs
- **UI/UX**: Arabic RTL support, responsive design

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the API documentation at `/api-docs` when server is running

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables
2. Configure MongoDB connection
3. Run `npm start` for production

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service

---

**LapGenius** - Your smart laptop shopping companion! 🖥️✨
