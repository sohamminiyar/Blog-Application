# 📝Blog Platform (Frontend Assignment)

This ia a  **modern blog application** focused on **Finance, Accounting, Career, Regulations, and Technology** content.  
The application is built with a **clean UI**, **smooth UX**, and **industry-standard frontend architecture**.

It simulates a real-world product using a mock REST API and demonstrates scalable frontend practices.

---

## 🚀 Application Overview

The application allows users to:

- View all published blog articles
- Publish new blogs
- Search blogs by title
- Filter blogs by category
- Read full blog content on a dedicated page

All blog operations (GET, POST, fetch by ID) are handled via a mock backend using **json-server**.

---

## ✨ Key Features

### 📚 Blog Feed
- Displays all blogs in a **card-based layout**
- Blogs are automatically **sorted from latest to oldest**
- Each card includes:
  - Cover image
  - Blog title
  - Short description
  - Category tags
  - Published date

---

### ✍️ Create Blog
- Users can publish a new blog via a simple form
- Supported fields:
  - Title
  - Category (multi-select)
  - Description
  - Content
  - Cover image URL
- On publishing:
  - Blog is saved using API
  - Blog list updates instantly
  - New article appears at the top

---

### 🔍 Search Articles
- Real-time search by blog title
- Works together with category filters and sorting

---

### 🏷️ Filter by Category
- Filter blogs based on selected categories
- Supports multiple categories
- Works seamlessly with search functionality

---

### 📄 Blog Details Page
- Dedicated page for each blog
- Fetches blog data dynamically using blog ID
- Displays:
  - Full blog content
  - Cover image
  - Categories
  - Publish date

---

## 🎨 UI & UX

- Clean, modern, and professional design
- Subtle color palette suitable for finance and content platforms
- Fully responsive layout
- User-friendly navigation
- Minimal yet attractive UI using reusable components

---

## ⚙️ How to Run the Project

```bash
# Install dependencies
npm install

# Start mock backend
npx json-server --watch db.json --port 3001

# Start frontend
npm run dev
```
---

# Developer
- Soham Miniyar
- (miniyarsoham@gmail.com)
