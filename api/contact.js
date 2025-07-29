// 2025.07.31-0003: Final diagnostic test
module.exports = (req, res) => {
  // Log to Vercel that the function was called
  console.log('[DIAGNOSTIC_TEST] /api/contact endpoint was successfully reached.');
  console.log(`[DIAGNOSTIC_TEST] Request method: ${req.method}`);
  
  // Send a simple, immediate success response
  res.status(200).json({ 
    success: true, 
    message: '진단 테스트 성공! API 엔드포인트에 성공적으로 연결되었습니다.' 
  });
}; 