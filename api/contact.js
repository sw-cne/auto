// 2025.07.31-0005: 진단 테스트 후 원래 API 코드로 복원
// api/contact.js

// Import necessary modules
const nodemailer = require('nodemailer');
const formidable = require('formidable');

// IMPORTANT: Vercel's serverless functions require bodyParser to be turned off for formidable to work.
// This is the correct way to export config in Vercel.
module.exports.config = {
    api: {
        bodyParser: false,
    },
};

// Main handler function, exported for Vercel
module.exports = async (req, res) => {
    // We only want to handle POST requests
    if (req.method !== 'POST') {
        console.log(`[API_CONTACT] Denied access for method: ${req.method}`);
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
    
    console.log('[API_CONTACT] Received POST request. Starting form parsing.');

    // Check for essential environment variables
    if (!process.env.NAVER_EMAIL || !process.env.NAVER_PASSWORD || !process.env.RECIPIENT_EMAIL) {
        console.error('[API_CONTACT] CRITICAL: Server environment variables are not set.');
        return res.status(500).json({
            success: false,
            message: '서버 환경 설정에 오류가 발생했습니다. 관리자에게 문의해주세요.',
        });
    }

    const form = new formidable.IncomingForm();

    try {
        // Asynchronously parse the form data from the request
        const [fields, files] = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve([fields, files]);
            });
        });

        console.log('[API_CONTACT] Form parsing completed successfully.');

        // Extract fields. Formidable v3 wraps fields in an array.
        const name = fields.name?.[0];
        const email = fields.email?.[0];
        const phone = fields.phone?.[0];
        const message = fields.message?.[0];
        const attachmentFile = files.attachment?.[0];

        // Basic validation
        if (!name || !email || !message) {
            console.warn('[API_CONTACT] Validation failed. Missing required fields.');
            return res.status(400).json({ success: false, message: '필수 입력 필드가 누락되었습니다.' });
        }
        
        console.log(`[API_CONTACT] Parsed data: Name=${name}, Email=${email}, Phone=${phone || 'N/A'}`);

        // Configure nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: 'smtp.naver.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: process.env.NAVER_EMAIL,
                pass: process.env.NAVER_PASSWORD,
            },
        });

        // Email content
        const mailOptions = {
            from: `"스마트계측 웹사이트" <${process.env.NAVER_EMAIL}>`,
            to: process.env.RECIPIENT_EMAIL,
            subject: `[웹사이트 견적의뢰] ${name}님의 문의입니다.`,
            html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #1a73e8;">(주)스마트계측 신규 견적의뢰</h2>
                <p>웹사이트의 견적의뢰 폼을 통해 새로운 문의가 접수되었습니다.</p>
                <hr style="border: 0; border-top: 1px solid #eee;">
                <p><strong>보낸 사람:</strong> ${name}</p>
                <p><strong>이메일:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>연락처:</strong> ${phone || '입력되지 않음'}</p>
                <h3 style="margin-top: 20px; color: #1a73e8;">문의 내용</h3>
                <div style="padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
                  <p style="white-space: pre-wrap; margin: 0;">${message}</p>
                </div>
                <hr style="margin-top: 20px; border: 0; border-top: 1px solid #eee;">
                <p style="font-size: 12px; color: #888;">
                  이 메일은 스마트계측 웹사이트를 통해 자동으로 발송되었습니다.
                  ${attachmentFile ? '<br><strong>첨부파일이 포함되어 있습니다.</strong>' : ''}
                </p>
              </div>
            `,
            attachments: attachmentFile ? [{
                filename: attachmentFile.originalFilename,
                path: attachmentFile.filepath,
                contentType: attachmentFile.mimetype,
            }] : [],
        };
        
        console.log('[API_CONTACT] Mail options configured. Sending email...');

        // Send the email
        await transporter.sendMail(mailOptions);
        
        console.log('[API_CONTACT] Email sent successfully!');

        // Send success response to the client
        res.status(200).json({
            success: true,
            message: '견적의뢰가 성공적으로 전송되었습니다. 빠른 시일 내에 회신드리겠습니다.',
        });

    } catch (error) {
        // Log the detailed error on the server
        console.error('[API_CONTACT] An error occurred:', error);
        
        // Send a generic error response to the client
        res.status(500).json({
            success: false,
            message: '메일 전송 중 서버에 예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
            // Avoid sending detailed error info to the client for security reasons
        });
    }
};
