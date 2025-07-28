const nodemailer = require('nodemailer');
const formidable = require('formidable');

// Vercel 환경에서는 req.body를 자동으로 파싱하지 않으므로, formidable을 사용해 수동으로 파싱합니다.
export const config = {
    api: {
        bodyParser: false,
    },
};

const transporter = nodemailer.createTransport({
    host: 'smtp.naver.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.NAVER_EMAIL,
        pass: process.env.NAVER_PASSWORD,
    },
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    // 환경 변수 확인
    if (!process.env.NAVER_EMAIL || !process.env.NAVER_PASSWORD || !process.env.RECIPIENT_EMAIL) {
        console.error('CRITICAL: Server environment variables are not set.');
        return res.status(500).json({
            success: false,
            message: '서버 환경 설정에 오류가 발생했습니다. 관리자에게 문의해주세요.',
        });
    }

    const form = formidable({});

    try {
        const [fields, files] = await form.parse(req);
        
        const name = fields.name?.[0];
        const email = fields.email?.[0];
        const phone = fields.phone?.[0];
        const message = fields.message?.[0];
        const attachmentFile = files.attachment?.[0];

        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: '필수 입력 필드가 누락되었습니다.' });
        }
        
        const mailOptions = {
            from: process.env.NAVER_EMAIL,
            to: process.env.RECIPIENT_EMAIL,
            subject: `[Vercel 견적의뢰] ${name}님의 문의`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
                <h2 style="color: #007bff;">(주)스마트계측 견적의뢰 (Vercel)</h2>
                <p><strong>이름:</strong> ${name}</p>
                <p><strong>이메일:</strong> ${email}</p>
                <p><strong>전화번호:</strong> ${phone || '미입력'}</p>
                <hr>
                <h3>문의 내용</h3>
                <p style="white-space: pre-wrap;">${message}</p>
                <hr>
                <p style="font-size: 12px; color: #888;">이 메일은 Vercel 배포 환경의 웹사이트 폼을 통해 발송되었습니다.</p>
              </div>
            `,
            attachments: attachmentFile ? [{
                filename: attachmentFile.originalFilename,
                path: attachmentFile.filepath,
            }] : [],
        };

        const info = await transporter.sendMail(mailOptions);

        console.log('Email sent successfully:', info.messageId);
        res.status(200).json({
            success: true,
            message: '견적의뢰가 성공적으로 전송되었습니다. 감사합니다.',
        });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            success: false,
            message: '이메일 전송 중 서버에서 오류가 발생했습니다.',
            error: error.message,
        });
    }
} 