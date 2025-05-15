const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'notification-app',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

const run = async () => {
  await producer.connect();
  setInterval(async () => {
    const message = {
      content: 'Notification - ' + new Date().toISOString(),
      user: 'user@example.com'
    };
    await producer.send({
      topic: 'test-topic',
      messages: [{ value: JSON.stringify(message) }]
    });
    console.log('✅ Message produit:', message);
  }, 2000);
};

run().catch(console.error);
