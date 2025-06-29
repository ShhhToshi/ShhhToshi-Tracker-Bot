module.exports = async function autoDelete(ctx, message, delay = 60) {
  try {
    const chatId = message.chat.id;
    const messageId = message.message_id;

    setTimeout(() => {
      ctx.telegram.deleteMessage(chatId, messageId).catch(() => {});
    }, delay * 1000);
  } catch (err) {
    console.error('❌ Auto-delete failed:', err.message);
  }
};
