# Portfolio Template Backend

This is the backend server for a customizable portfolio system. It supports multiple front-end templates (hosted in separate repos) and is designed to help beginners get started with full-stack development.

>  You **do NOT need to know advanced coding** to use this. Follow the instructions and you'll be up and running fast.

---

## Create Your Project Directory

Before starting, create a local folder to hold everything:

```bash
mkdir my-portfolio-site
cd my-portfolio-site
```

Then clone this backend into a subfolder:

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/portfolio-template-backend backend
```

Next, go to GitHub and choose one of the front-end templates:

- [Corporate Climber Template](https://github.com/YOUR_GITHUB_USERNAME/corporate-climber-portfolio-template)
- [Creative Technologist Template](https://github.com/YOUR_GITHUB_USERNAME/creative-technologist-portfolio-template)
- [Data Driven Template](https://github.com/YOUR_GITHUB_USERNAME/data-driven-portfolio-template)

Clone your chosen frontend into a `frontend` folder.

---

## What This Backend Does

This backend powers your portfolio site with features like:

- Project and skill APIs
- Contact form submission and storage
- Optional admin login for editing content
- File upload support (like project images)
- Sample data seeding script

---

## Tech Stack

- Node.js + Express
- MongoDB (local or Atlas)
- JWT Auth (for optional admin login)
- File Uploads
- Contact form support via MongoDB and email

---

## Installation

```bash
cd backend
npm install
```

---

## Setup Environment Variables

Rename the `.env` file:

```bash
cp .env .env.local
```

Edit `.env.local` to customize the following:

```env
MONGODB_URI=mongodb://localhost:27017/portfolio
PORT=5001
JWT_SECRET=your_secret_key_here
FILE_UPLOAD_PATH=./public/uploads
```

If you want contact form emails to be forwarded:

```env
EMAIL_SERVICE=gmail
EMAIL_USERNAME=your-email@gmail.com
EMAIL_PASSWORD=your-password
CONTACT_EMAIL=your-email@gmail.com
```

---

## Seed Sample Data (optional)

You can add sample projects and an admin account:

```bash
npm run seed
```

Use the seeded login:
- Email: `admin@example.com`
- Password: `password123`

---

## Start the Server

```bash
npm run dev
```

Then visit:

```
http://localhost:5001
```

You should see:
```json
{
  "success": true,
  "message": "Welcome to the Portfolio Backend API"
}
```

---

## File Structure

```bash
backend/
│
├── src/
│   ├── config/             # DB connection & seeder
│   ├── controllers/        # Logic for handling API requests
│   ├── middleware/         # Auth middleware (optional login)
│   ├── models/             # Mongoose schemas for User, Project, Contact
│   ├── routes/             # API route files
│   ├── index.js            # Main server file
│
├── public/                 # Static folder for uploads
├── .env                    # Environment variables (example included)
├── package.json            # Dependencies and scripts
```

---

## What Your Frontend Talks To (Beginner-Friendly)

The table below shows how your frontend connects to the backend. These routes are already set up — you don’t need to create them yourself.

> ⚠️ You don’t need to call these manually — your template will use them behind the scenes.

| What it does               | What URL it uses                | Login needed? | Can visitors use it? |
|---------------------------|----------------------------------|----------------|----------------------|
| Show your projects        | `GET /api/projects`             | ❌             | ✅ Yes               |
| Add a new project         | `POST /api/projects`            | ✅             | ❌ No                |
| Update a project          | `PUT /api/projects/:id`         | ✅             | ❌ No                |
| Delete a project          | `DELETE /api/projects/:id`      | ✅             | ❌ No                |
| Upload project image      | `PUT /api/projects/:id/image`   | ✅             | ❌ No                |
| Submit contact form       | `POST /api/contact`             | ❌             | ✅ Yes               |
| View contact messages     | `GET /api/contact`              | ✅ (admin)     | ❌ No                |
| Create an account         | `POST /api/auth/register`       | ❌             | ✅ Yes               |
| Log in                    | `POST /api/auth/login`          | ❌             | ✅ Yes               |
| View your own profile     | `GET /api/auth/me`              | ✅             | ❌ No                |


###  What does this mean?

These are the built-in tools your frontend uses to:

        - Get your project data and show it on your site

        - Let visitors send you a message

        - (Optional) Let you log in and edit your content securely

You don’t have to write these — they’re ready to use!

---

## Do I Need to Log In?

**No!** You do **not need to log in to view the portfolio**.

Login is only required if:
- You want to **edit your portfolio content through an admin panel**
- You build your own dashboard (future feature)

Employers or recruiters will only see your beautiful, public site.

---

## 💬 Questions?

If you're new to coding and anything is unclear, each file contains beginner-friendly comments showing what to edit, what to leave alone, and where to add your info.

---

## Coming Next

This backend powers **three different front-end templates** designed for:
- 🎓 Business and Consulting professionals
- 📊 Data and Analytics grads
- 💻 Developers and Tech creatives

You can pick any of those templates and connect them to this backend — or just use the frontend standalone.

---

## 🌐 Deploying

- Backend: Render / Railway / Heroku (Express-compatible)
- Frontend: Netlify / Vercel (React-compatible)

I'll include deployment guides in each repo.

---

## 📢 License

MIT — free to use, modify, and customize for personal or professional use.

---

Ready to build your portfolio? Clone this repo and start customizing! 
