const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3001;

mongoose.connect('mongodb://localhost:27017/notifications', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const notificationSchema = new mongoose.Schema({
  content: String,
  user: String,
  date: { type: Date, default: Date.now }
});

const Notification = mongoose.model('Notification', notificationSchema);

// Route GET pour récupérer les messages
app.get('/notifications', async (req, res) => {
  const notifs = await Notification.find().sort({ date: -1 });
  res.json(notifs);
});

app.listen(PORT, () => {
  console.log(`🚀 API REST sur http://localhost:${PORT}`);
});
