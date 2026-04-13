# 部署到 Vercel 指南

## 前提条件

- 已有 GitHub 账号
- 已有阿里云百炼 API Key（记得重新生成一个新的，之前的已暴露）

## 部署步骤

### 1. 推送代码到 GitHub

```bash
git add .
git commit -m "feat: 添加 AI 聊天功能"
git push origin main
```

### 2. 注册并登录 Vercel

- 访问 https://vercel.com
- 使用 GitHub 账号登录

### 3. 导入项目

1. 点击 "Add New..." → "Project"
2. 选择你的 GitHub 仓库（auroey/v2）
3. 点击 "Import"

### 4. 配置环境变量

在 Vercel 项目设置中：

1. 进入 "Settings" → "Environment Variables"
2. 添加环境变量：
   - Name: `DASHSCOPE_API_KEY`
   - Value: 你的阿里云百炼 API Key（重新生成一个新的）
   - Environment: 选择 "Production", "Preview", "Development" 全部勾选
3. 点击 "Save"

### 5. 部署

- Vercel 会自动开始部署
- 等待几分钟，部署完成后会得到一个 URL（如 https://your-project.vercel.app）

### 6. 测试

访问你的 Vercel URL，点击右下角的聊天按钮，测试 AI 对话功能。

## 重要提示

### 安全性

- ✅ API Key 存储在 Vercel 环境变量中，不会暴露
- ✅ 前端通过 `/api/chat` 调用后端代理
- ✅ `.env.local` 文件已在 `.gitignore` 中，不会被提交

### 本地开发

如果要在本地测试 API 功能：

1. 复制 `.env.example` 为 `.env.local`
2. 填入你的 API Key
3. 运行 `npm start`

注意：本地开发时，Vercel Serverless Functions 不会运行。如果需要本地测试完整功能，可以使用 `vercel dev` 命令。

### 使用 Vercel CLI 本地测试（可选）

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 本地运行（会启动 Serverless Functions）
vercel dev
```

## 常见问题

### Q: 聊天功能不工作？

A: 检查：

1. Vercel 环境变量是否正确配置
2. API Key 是否有效
3. 浏览器控制台是否有错误信息

### Q: 如何更新 API Key？

A: 在 Vercel 项目设置 → Environment Variables 中修改，然后重新部署。

### Q: 可以继续使用 GitHub Pages 吗？

A: 不建议。GitHub Pages 是纯静态托管，无法运行 Serverless Functions。建议完全迁移到 Vercel。

## 成本

- Vercel 免费版足够个人项目使用
- 阿里云百炼有免费额度
- 总成本：0 元（在免费额度内）
