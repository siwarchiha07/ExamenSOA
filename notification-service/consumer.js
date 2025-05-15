const { Kafka } = require('kafkajs');
const mongoose = require('mongoose');

// Connexion MongoDB
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

// Kafka Consumer
const kafka = new Kafka({
  clientId: 'notification-app',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'notification-group' });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const msg = JSON.parse(message.value.toString());
      const notif = new Notification(msg);
      await notif.save();
      console.log('📥 Message enregistré en DB:', msg);
    }
  });
};

run().catch(console.error);
