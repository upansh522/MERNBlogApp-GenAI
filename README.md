📝 Blogify — Full-Stack MERN Blogging Platform

A comprehensive MERN-based blogging platform that allows users to create, manage, and interact with blog posts — integrated with Firebase Authentication, Cloudinary, and JWT-based security for seamless performance and security.

🚀 Features
👤 Authentication

Google OAuth sign-in using Firebase Authentication

Secure JWT token issuance and validation

Persistent login with HTTP-only cookies

🖼️ Blog Management

Create, edit, update, and delete blogs

Upload and store images using Multer + Cloudinary

AI-generated content integration for blog drafts

🏷️ Categories

Blogs categorized into topics such as Technology, Programming, AI, Cloud, DevOps, and more

Filter blogs by category or search by slug

💬 Interactions

Comment system with user authentication

Like and unlike blogs

Redux-powered state management for smooth UI updates

🛠️ Admin Panel

Manage users and blogs

Moderate user-generated content

Update or remove inappropriate posts

🧩 Tech Stack
Layer	Technology
Frontend	React.js, Redux Toolkit, TailwindCSS
Backend	Node.js, Express.js
Database	MongoDB Atlas
Authentication	Firebase Auth (Google OAuth)
File Uploads	Multer + Cloudinary
Security	JWT Middleware, HTTP-only Cookies
AI Integration	Google Gemini API
Deployment	Vercel (frontend) + Render (backend)
⚙️ System Workflow Overview

Below is a summarized explanation of the flow represented in the diagram above 👇

1️⃣ User Authentication Flow

User initiates Google Sign-In (via Firebase).

Firebase returns an OAuth token.

Backend verifies token → issues a JWT → stores in HTTP-only cookie.

User gains access to protected routes (blogs, comments, etc.).

2️⃣ Blog Creation Flow

User uploads an image (handled by Multer).

Multer sends the file to Cloudinary → returns a hosted image URL.

The user submits blog content (title, body, image URL, category).

Backend validates JWT → stores blog post in MongoDB.

3️⃣ AI-Assisted Blog Generation

User can trigger AI content suggestion using Google Gemini API.

The generated content is returned and prefilled in the editor.

User reviews or edits before publishing.

4️⃣ Reading & Browsing Blogs

Fetch all published blogs or filter by category.

Retrieve single blog via slug.

Redux handles caching and UI updates.

5️⃣ Interactions (Likes, Comments)

Authenticated users can like/unlike or comment on posts.

Backend updates MongoDB and returns updated counts.

Redux updates UI dynamically without full reload.

6️⃣ Admin Operations

Admin authenticates via JWT-protected route.

Can manage users, moderate comments, and delete inappropriate blogs.

System logs updates and confirmations after each moderation.