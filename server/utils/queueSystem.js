const { Queue, Worker } = require('bullmq');
const ioredis = require('ioredis');

// الاتصال بـ Redis (يجب أن يكون مثبتاً على سيرفرك)
const connection = new ioredis({ maxRetriesPerRequest: null });

const videoQueue = new Queue('videoProcessing', { connection });

// دالة إضافة مهمة للطابور
const addToQueue = async (data) => {
  await videoQueue.add('generateTask', data, {
    attempts: 3, // إعادة المحاولة 3 مرات في حال الفشل
    backoff: { type: 'exponential', delay: 1000 }
  });
};

module.exports = { addToQueue, videoQueue };