# hutong-demo-web

Demo web frontend for hutong-project-pm-v2 live smoke testing.

## 功能特性

- 🎯 零依赖的纯静态HTML/CSS/JavaScript实现
- 🔧 可配置的API基础URL（默认：`http://localhost:3000`）
- 📡 测试三个主要端点：
  - `GET /health` - 健康检查
  - `GET /hello` - 基本问候
  - `GET /items` - 项目列表（可选）
- 💾 本地存储API配置
- 🎨 现代化响应式UI设计

## 快速开始

### 方法一：使用npx serve（推荐）

```bash
npx serve
```

然后在浏览器中打开 `http://localhost:3000`（或终端显示的URL）。

### 方法二：使用Python HTTP服务器

**Python 3:**
```bash
python3 -m http.server 8080
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8080
```

然后在浏览器中打开 `http://localhost:8080`。

### 方法三：直接在浏览器中打开

直接在浏览器中打开 `index.html` 文件也可以工作（需要注意CORS限制）。

## 使用说明

1. **配置API URL**
   - 在页面顶部的输入框中输入你的API基础URL
   - 默认是 `http://localhost:3000`
   - 点击"保存配置"按钮

2. **测试端点**
   - 点击任何"调用 GET /{endpoint}"按钮
   - 响应结果会显示在页面底部
   - 包含状态码、响应时间和完整响应体

3. **查看结果**
   - 成功的请求显示绿色状态标记
   - 失败的请求显示红色状态标记
   - 响应体以JSON格式化显示

## 项目结构

```
.
├── index.html      # 主页面
├── style.css       # 样式文件
├── app.js          # JavaScript逻辑
└── README.md       # 本文件
```

## API要求

后端API应该提供以下端点：

- `GET /health` - 返回服务健康状态
- `GET /hello` - 返回问候消息
- `GET /items` - 返回项目列表（可选）

所有端点应该返回JSON响应或纯文本。

## 浏览器兼容性

支持所有现代浏览器：
- Chrome/Edge (最新版)
- Firefox (最新版)
- Safari (最新版)

## License

MIT
