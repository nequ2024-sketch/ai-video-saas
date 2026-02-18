import fs from 'fs';
import path from 'path';

export const sendWelcomeEmail = async (email: string) => {
  try {
    const htmlPath = path.join(process.cwd(), 'messages', 'welcome-email.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'NexaVision AI <welcome@nexavision.ai>',
        to: [email],
        subject: 'مرحباً بك في NexaVision AI',
        html: htmlContent,
      }),
    });
    return res.ok;
  } catch (error) {
    console.error("خطأ في البريد:", error);
    return false;
  }
};