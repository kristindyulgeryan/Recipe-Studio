# Recipe Studio 🍳  

A cozy React-based platform for sharing and discovering recipes.  

## 🔍 Project Overview  
**Recipe Studio** is a Single Page Application (SPA) designed for cooking enthusiasts who want to share and discover delicious recipes in a warm, welcoming community. Whether you're a seasoned chef or a kitchen newbie, this platform provides an easy-to-use space to publish your culinary creations, connect with fellow food lovers, and draw inspiration from shared emotions and experiences around cooking. 

## 🎥 Demo 
![Recipe Studio Demo](https://raw.githubusercontent.com/kristindyulgeryan/Recipe-Studio/main/StudioRecipe.gif)

## Tech Stack
- **Frontend**: React 19 + Vite
- **Backend**: SoftUni Practice Server (REST API)

## ✨ Features
### **Core Functionality**
- 🍳 **Recipe Management**: Create, edit, delete recipes
- 🔐 **User Authentication**: JWT login/register with protected routes

### **Social Features**
- 💬 **Comments**: Add/delete comments with real-time count
- 🔍 **Search**:   Real-time search with debouncing

### **Communication**
- 📩 **Contact Form**: 
  - Message submission with form validation
  - Success/error feedback UI

### **Security & Validation**
- 🛡️ Route guards (public/private access)
- ❌ Input sanitization & error handling





### 🏗️ Project Architecture

└── React App

    ├── Public Components
    │   ├── Home
    │   ├── About
    │   ├── Contact
    │   ├── Auth (Login/Register)
    │   └── Search (User input)
    |    └── Guards (AuthGuards)
    │
    ├── API Services
    │   ├── AuthAPI
    │   ├── RecipeAPI
    │   ├── CommentsAPI
    │   └── ContactAPI
    │   └── SearchAPI
    │
    └── Core Utilities
        ├── Context (UserContext)
        ├── Hooks (useAuth, usePersistedState)
        └── Utils (Request, AuthValidation)
        └── Providers (UserProvider)
        

### 🚀 Quick Start

 #### cd client
- npm install
- npm run dev

 #### cd server
- node server

### 🏆 Implementation Best Practices:

 #### 1. Optimistic UI with useOptimistic
   
- Instant UI feedback before API confirmation

- Automatic rollback on errors

- Smooth UX with startTransition

   ![{10B282D3-A0D3-4C59-B81C-3EBC9CEAD90B}](https://github.com/user-attachments/assets/ea380b84-455b-4fa6-bd1c-f4cd144cf3f3)


#### 2. State Management with useReducer

- Centralized state logic

- Predictable state transitions

- Easier debugging with action types
  
![{09982D55-47BA-410D-8E98-071F24EA8244}](https://github.com/user-attachments/assets/f5443c60-39ae-4b59-a875-3b331a695026)


#### 3. Optimized Search with useCallback

- Memoizes expensive API call function
  
-  Clean parameter construction
  
-   Separation of concerns

![{7092D9B0-2411-439E-AE3B-3027EB080BAB}](https://github.com/user-attachments/assets/61e82152-ce10-4dd8-8652-33e9895b6e0e)

#### 4. Debounced Input with setTimeout

- Prevents API spamming during rapid typing

- Ensures cleanup on unmount

- Maintains query-per-second limits

![{84D0F528-2261-4A07-8227-E7BF3CEB495A}](https://github.com/user-attachments/assets/70d2afe6-ddd7-49a6-b710-874cf79b518b)

#### 5. Validation Rules Table


| Field        | Rules                          | Error Example                  |
|--------------|--------------------------------|--------------------------------|
| **Email**    | - Required<br>- Valid format (`user@example.com`) | `❌ Missing @ symbol`<br>`❌ Invalid domain` |
| **Password** | - 6+ characters<br>- Match confirmation | `🔒 Too short`<br>`🔐 Mismatch` |
| **Username** | - 3+ characters<br>- No special chars | `👤 Too short`<br>`👤 Invalid characters` |


### 🏁 Conclusion & Next Steps

#### ✅ Completed Features

- Recipe CRUD operations

- User authentication

- Real-time search & comments

- Responsive UI

### 🚧 Future Enhancements

- Recipe rating system

- Social sharing integration

- Advanced filtering (dietary restrictions)

#### Getting Help
###### For support or contributions:
- 📧 Contact: kristindyulgeryan@gmail.com


### Acknowledgments
# Special thanks to:

## SoftUni for the practice server

## React community for awesome libraries
- *Made with* ❤️ *using*   ![React Version](https://img.shields.io/badge/React-19-%2361DAFB)     *and too much* ☕ 
