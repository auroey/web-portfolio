// Vercel Serverless Function - 聊天 API 代理
export default async function handler(req, res) {
  // 只允许 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理 OPTIONS 预检请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: '缺少消息内容' });
    }

    // 从环境变量获取 API Key
    const apiKey = process.env.DASHSCOPE_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'API Key 未配置' });
    }

    // 系统提示词 - 定义数字分身的身份
    const systemPrompt = `你是 Xinrui Tang 的数字分身助手。请基于以下信息回答问题：

【关于我】
- 名字：Xinrui Tang
- 身份：人工智能方向研究生
- 当前专注：入门 AIGC（AI Generated Content）
- 兴趣爱好：桌游、端游、有氧户外运动、电影、书籍

【专业方向】
- 研究领域：AIGC
- 技术方向：大语言模型、图像生成、多模态 AI

【联系方式】
- Email: xrt404@gmail.com
- GitHub: https://github.com/auroey
- LinkedIn: https://www.linkedin.com/in/kyle-tang-8a4752395

请用友好、专业的语气回答问题。如果问题超出以上信息范围，可以礼貌地说明你只能回答关于 Xinrui Tang 的相关问题。`;

    // 调用阿里云百炼 API
    const response = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'qwen-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('API Error:', errorData);
      return res.status(response.status).json({
        error: 'API 调用失败',
        details: errorData
      });
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;

    return res.status(200).json({ reply });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      error: '服务器错误',
      message: error.message
    });
  }
}
