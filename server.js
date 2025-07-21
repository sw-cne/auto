require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 정적 파일 서빙 설정 (public 폴더를 기준으로 함)
app.use(express.static('public'));


// 파일 업로드 설정
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// 이메일 전송 설정 (네이버 SMTP)
const transporter = nodemailer.createTransport({
    host: 'smtp.naver.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.NAVER_EMAIL,
        pass: process.env.NAVER_PASSWORD
    }
});

// 견적의뢰 이메일 전송 API
app.post('/api/contact', upload.single('attachment'), async (req, res) => {
    console.log('=== 견적의뢰 API 호출됨 ===');
    console.log('요청 바디:', req.body);
    console.log('첨부파일:', req.file);
    
    try {
        const { name, email, phone, message } = req.body;
        const attachment = req.file;

        // 환경 변수 확인
        if (!process.env.NAVER_EMAIL || process.env.NAVER_EMAIL === 'your_email@naver.com') {
            console.log('환경 변수가 설정되지 않았습니다. 테스트 모드로 실행합니다.');
            return res.json({
                success: true,
                message: '테스트 모드: 견적의뢰가 성공적으로 접수되었습니다. (실제 이메일은 전송되지 않습니다)',
                testMode: true,
                formData: { name, email, phone, message }
            });
        }

        // 이메일 내용 구성
        const mailOptions = {
            from: process.env.NAVER_EMAIL,
            to: process.env.RECIPIENT_EMAIL,
            subject: `[견적의뢰] ${name}님의 문의사항`,
            html: `
                <div style="font-family: 'Noto Sans KR', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
                        🏢 (주)스마트계측 견적의뢰
                    </h2>
                    
                    <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #1e293b; margin-bottom: 15px;">📋 문의자 정보</h3>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #64748b; width: 100px;">이름:</td>
                                <td style="padding: 8px 0; color: #1e293b;">${name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">이메일:</td>
                                <td style="padding: 8px 0; color: #1e293b;">${email}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">전화번호:</td>
                                <td style="padding: 8px 0; color: #1e293b;">${phone || '미입력'}</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #1e293b; margin-bottom: 15px;">💬 문의사항</h3>
                        <div style="background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #2563eb;">
                            <p style="margin: 0; line-height: 1.6; color: #374151; white-space: pre-wrap;">${message}</p>
                        </div>
                    </div>
                    
                    ${attachment ? `
                    <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <h4 style="color: #92400e; margin-bottom: 10px;">📎 첨부파일</h4>
                        <p style="margin: 0; color: #92400e;">파일명: ${attachment.originalname}</p>
                    </div>
                    ` : ''}
                    
                    <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
                        <p style="margin: 0; color: #065f46; font-size: 14px;">
                            📅 문의 접수 시간: ${new Date().toLocaleString('ko-KR')}
                        </p>
                    </div>
                    
                    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
                    
                    <div style="text-align: center; color: #6b7280; font-size: 12px;">
                        <p>이 이메일은 (주)스마트계측 홈페이지 견적의뢰 폼을 통해 자동으로 발송되었습니다.</p>
                        <p>© 2024 (주)스마트계측. All rights reserved.</p>
                    </div>
                </div>
            `,
            attachments: attachment ? [{
                filename: attachment.originalname,
                path: attachment.path
            }] : []
        };

        // 이메일 전송
        const info = await transporter.sendMail(mailOptions);
        
        console.log('이메일 전송 성공:', info.messageId);
        
        res.json({
            success: true,
            message: '견적의뢰가 성공적으로 전송되었습니다. 빠른 시일 내에 연락드리겠습니다.',
            messageId: info.messageId
        });

    } catch (error) {
        console.error('이메일 전송 실패:', error);
        res.status(500).json({
            success: false,
            message: '이메일 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
            error: error.message
        });
    }
});

// 헬스 체크 엔드포인트
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// 404 에러 핸들링
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 전역 에러 핸들링
app.use((err, req, res, next) => {
    console.error('서버 에러:', err);
    res.status(500).json({
        success: false,
        message: '서버 내부 오류가 발생했습니다.',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
    });
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
    console.log(`환경: ${process.env.NODE_ENV || 'development'}`);
    console.log(`http://localhost:${PORT}`);
});

module.exports = app; 