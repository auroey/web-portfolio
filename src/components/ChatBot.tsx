import { useContext, useState } from 'react';

import styled from 'styled-components';

import { AppContext } from 'App/AppContext';
import { Theme } from 'types';

const C = {
  Container: styled.div<{ $isMobile: boolean }>`
    position: fixed;
    bottom: ${({ $isMobile }) => ($isMobile ? '20px' : '40px')};
    right: ${({ $isMobile }) => ($isMobile ? '20px' : '40px')};
    z-index: 100;
  `,
  ChatButton: styled.button<{ $theme: Theme }>`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    transition: transform 0.2s;
    color: white;
    &:hover {
      transform: scale(1.1);
    }
  `,
  ChatWindow: styled.div<{ $isMobile: boolean; $theme: Theme }>`
    position: fixed;
    bottom: ${({ $isMobile }) => ($isMobile ? '0' : '120px')};
    right: ${({ $isMobile }) => ($isMobile ? '0' : '40px')};
    width: ${({ $isMobile }) => ($isMobile ? '100vw' : '380px')};
    height: ${({ $isMobile }) => ($isMobile ? '100vh' : '500px')};
    background: ${({ $theme }) =>
      $theme.key === 'dark'
        ? 'rgba(26, 26, 46, 0.95)'
        : 'rgba(255, 255, 255, 0.95)'};
    backdrop-filter: blur(10px);
    border-radius: ${({ $isMobile }) => ($isMobile ? '0' : '16px')};
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  `,
  Header: styled.div<{ $theme: Theme }>`
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  Title: styled.h3`
    margin: 0;
    font-size: 18px;
    font-weight: 600;
  `,
  CloseButton: styled.button`
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      opacity: 0.8;
    }
  `,
  Messages: styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  `,
  Message: styled.div<{ $isUser: boolean; $theme: Theme }>`
    padding: 12px 16px;
    border-radius: 12px;
    max-width: 80%;
    align-self: ${({ $isUser }) => ($isUser ? 'flex-end' : 'flex-start')};
    background: ${({ $isUser, $theme }) =>
      $isUser
        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        : $theme.key === 'dark'
          ? 'rgba(255, 255, 255, 0.1)'
          : 'rgba(0, 0, 0, 0.05)'};
    color: ${({ $isUser, $theme }) =>
      $isUser ? 'white' : $theme.key === 'dark' ? '#e0e0e0' : '#2c3e50'};
    word-wrap: break-word;
  `,
  InputArea: styled.div<{ $theme: Theme }>`
    padding: 20px;
    border-top: 1px solid
      ${({ $theme }) =>
        $theme.key === 'dark'
          ? 'rgba(255, 255, 255, 0.1)'
          : 'rgba(0, 0, 0, 0.1)'};
    display: flex;
    gap: 10px;
  `,
  Input: styled.input<{ $theme: Theme }>`
    flex: 1;
    padding: 12px 16px;
    border-radius: 24px;
    border: 1px solid
      ${({ $theme }) =>
        $theme.key === 'dark'
          ? 'rgba(255, 255, 255, 0.2)'
          : 'rgba(0, 0, 0, 0.2)'};
    background: ${({ $theme }) =>
      $theme.key === 'dark'
        ? 'rgba(255, 255, 255, 0.05)'
        : 'rgba(0, 0, 0, 0.02)'};
    color: ${({ $theme }) => ($theme.key === 'dark' ? '#e0e0e0' : '#2c3e50')};
    font-size: 14px;
    outline: none;
    &:focus {
      border-color: #667eea;
    }
  `,
  SendButton: styled.button`
    padding: 12px 24px;
    border-radius: 24px;
    border: none;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: transform 0.2s;
    &:hover {
      transform: scale(1.05);
    }
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `,
  QuickQuestions: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 10px;
  `,
  QuickButton: styled.button<{ $theme: Theme }>`
    padding: 10px 16px;
    border-radius: 20px;
    border: 1px solid
      ${({ $theme }) =>
        $theme.key === 'dark'
          ? 'rgba(255, 255, 255, 0.2)'
          : 'rgba(0, 0, 0, 0.2)'};
    background: ${({ $theme }) =>
      $theme.key === 'dark'
        ? 'rgba(255, 255, 255, 0.05)'
        : 'rgba(0, 0, 0, 0.02)'};
    color: ${({ $theme }) => ($theme.key === 'dark' ? '#e0e0e0' : '#2c3e50')};
    cursor: pointer;
    font-size: 13px;
    text-align: left;
    transition: all 0.2s;
    &:hover {
      background: ${({ $theme }) =>
        $theme.key === 'dark'
          ? 'rgba(255, 255, 255, 0.1)'
          : 'rgba(0, 0, 0, 0.05)'};
      border-color: #667eea;
    }
  `,
};

interface Message {
  text: string;
  isUser: boolean;
}

const knowledgeBase = {
  greeting: '你好！我是 Xinrui Tang 的数字分身。我可以回答关于我的问题。',
  about: '我是一名人工智能方向的研究生，目前专注于 AIGC 领域的学习和研究。',
  doing:
    '我最近在入门 AIGC（AI Generated Content），探索生成式人工智能的各种应用和技术。',
  interests: '我喜欢桌游、端游、有氧户外运动，也喜欢看电影和读书。',
  works: '我正在积累 AIGC 相关的项目经验，欢迎通过邮箱联系我了解更多详情。',
  contact:
    '你可以通过页面上的 Email 按钮联系我，或者访问我的 GitHub 和 LinkedIn。',
  skills:
    '我专注于 AIGC 方向，包括大语言模型、图像生成、多模态 AI 等技术领域。',
};

const quickQuestions = ['你最近在做什么？', '你有哪些作品？', '怎么联系你？'];

export const ChatBot = () => {
  const { isMobile, theme } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: knowledgeBase.greeting, isUser: false },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const callAPI = async (message: string): Promise<string> => {
    try {
      // 使用环境变量或默认的 API 端点
      const apiEndpoint = process.env.REACT_APP_API_ENDPOINT ?? '/api/chat';

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('API 调用失败');
      }

      const data = (await response.json()) as { reply: string };
      return data.reply;
    } catch {
      return '抱歉，我现在无法回答。请稍后再试。';
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const reply = await callAPI(currentInput);
      const botResponse: Message = {
        text: reply,
        isUser: false,
      };
      setMessages((prev) => [...prev, botResponse]);
    } catch {
      const errorMessage: Message = {
        text: '抱歉，出现了一些问题。请稍后再试。',
        isUser: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    setTimeout(() => {
      void handleSend();
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      void handleSend();
    }
  };

  return (
    <C.Container $isMobile={isMobile}>
      {!isOpen && (
        <C.ChatButton
          $theme={theme}
          onClick={() => {
            setIsOpen(true);
          }}
          aria-label="打开聊天窗口"
        >
          💬
        </C.ChatButton>
      )}

      {isOpen && (
        <C.ChatWindow $theme={theme} $isMobile={isMobile}>
          <C.Header $theme={theme}>
            <C.Title>数字分身</C.Title>
            <C.CloseButton
              onClick={() => {
                setIsOpen(false);
              }}
              aria-label="关闭聊天窗口"
            >
              ×
            </C.CloseButton>
          </C.Header>

          <C.Messages>
            {messages.map((msg, index) => (
              <C.Message key={index} $isUser={msg.isUser} $theme={theme}>
                {msg.text}
              </C.Message>
            ))}

            {messages.length === 1 && !isLoading && (
              <C.QuickQuestions>
                {quickQuestions.map((q, index) => (
                  <C.QuickButton
                    key={index}
                    $theme={theme}
                    onClick={() => {
                      handleQuickQuestion(q);
                    }}
                  >
                    {q}
                  </C.QuickButton>
                ))}
              </C.QuickQuestions>
            )}

            {isLoading && (
              <C.Message $isUser={false} $theme={theme}>
                正在思考...
              </C.Message>
            )}
          </C.Messages>

          <C.InputArea $theme={theme}>
            <C.Input
              $theme={theme}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              onKeyPress={handleKeyPress}
              placeholder="输入你的问题..."
              disabled={isLoading}
            />
            <C.SendButton
              onClick={() => {
                void handleSend();
              }}
              disabled={!input.trim() || isLoading}
            >
              {isLoading ? '...' : '发送'}
            </C.SendButton>
          </C.InputArea>
        </C.ChatWindow>
      )}
    </C.Container>
  );
};
