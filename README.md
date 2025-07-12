# 🧠 Telegram Tracker Bot

A powerful and lightweight Telegram bot built with **Node.js** and **Telegraf.js** to track user activity in groups. It features message leaderboards, daily stats, chart auto-posting, and essential admin controls — perfect for active crypto communities, events, or engagement tracking.

---

## 🚀 Features

- 📊 **Leaderboard System**  
  - `/leaderboard` – Shows top message senders  
  - `/top10today` – Shows top users for today  
  - `/myrank` – Displays your personal rank and count  

- 🖼️ **Auto Chart Poster**  
  - Posts chart images (e.g., token charts) every 30 minutes

- 🛠️ **Admin Commands**  
  - `/resetall` – Resets all-time message count  
  - `/resetday` – Resets today’s stats  
  - `/eventmode on|off` – Toggles live leaderboard posting

---

## 🧩 Tech Stack

- [Node.js](https://nodejs.org)
- [Telegraf.js](https://telegraf.js.org/)
- [MongoDB](https://www.mongodb.com/)
- [Fly.io](https://fly.io/) / Docker-compatible

---

## 🛠️ Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/ShhhToshi/ShhhToshi-Tracker-Bot.git
   cd ShhhToshi-Tracker-Bot
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create Your `.env` File**
   - Use the `.env.example` as a reference:
     ```env
     BOT_TOKEN=your_telegram_bot_token_here
     MONGO_URI=your_mongodb_connection_string_here
     ```

4. **Start the Bot**
   ```bash
   node index.js
   ```

---

## 🐳 Docker (Optional)

```bash
docker build -t shhhtoshi-tracker-bot .
docker run -d --env-file .env shhhtoshi-tracker-bot
```

---

## ☁️ Fly.io Deployment

1. Install Fly CLI: https://fly.io/docs/hands-on/install-flyctl/
2. Launch and deploy:
   ```bash
   fly launch
   fly deploy
   ```

---

## 🧾 License

This project is licensed under the [MIT License](LICENSE).

---

## 💬 Contact

Need help or want to contribute?  

