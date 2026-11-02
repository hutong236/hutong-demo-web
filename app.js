// API Base URL管理
const DEFAULT_API_URL = 'http://localhost:3000';
let apiBaseUrl = localStorage.getItem('apiBaseUrl') || DEFAULT_API_URL;

// DOM元素
const apiBaseUrlInput = document.getElementById('apiBaseUrl');
const saveUrlBtn = document.getElementById('saveUrl');
const responseBody = document.getElementById('responseBody');
const statusBadge = document.getElementById('statusBadge');
const timestamp = document.getElementById('timestamp');
const actionButtons = document.querySelectorAll('.btn-primary[data-endpoint]');

// 初始化
function init() {
    apiBaseUrlInput.value = apiBaseUrl;
    
    // 保存URL配置
    saveUrlBtn.addEventListener('click', saveApiUrl);
    
    // 绑定API调用按钮
    actionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const endpoint = button.getAttribute('data-endpoint');
            callApi(endpoint);
        });
    });
}

// 保存API URL
function saveApiUrl() {
    const newUrl = apiBaseUrlInput.value.trim();
    if (!newUrl) {
        alert('请输入有效的API URL');
        return;
    }
    
    apiBaseUrl = newUrl;
    localStorage.setItem('apiBaseUrl', apiBaseUrl);
    
    showNotification('✓ API URL已保存');
}

// 调用API
async function callApi(endpoint) {
    const url = `${apiBaseUrl}${endpoint}`;
    const startTime = Date.now();
    
    updateStatus('loading', '调用中...');
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const duration = Date.now() - startTime;
        const contentType = response.headers.get('content-type');
        
        let data;
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            data = await response.text();
        }
        
        displayResponse({
            success: response.ok,
            status: response.status,
            statusText: response.statusText,
            duration,
            data,
            url,
            endpoint
        });
        
    } catch (error) {
        displayResponse({
            success: false,
            error: error.message,
            url,
            endpoint
        });
    }
}

// 显示响应结果
function displayResponse(result) {
    const now = new Date().toLocaleString('zh-CN');
    timestamp.textContent = `时间: ${now}`;
    
    if (result.success) {
        statusBadge.textContent = `✓ ${result.status} ${result.statusText}`;
        statusBadge.className = 'status-badge success';
        
        const output = {
            endpoint: result.endpoint,
            status: result.status,
            duration: `${result.duration}ms`,
            response: result.data
        };
        
        responseBody.textContent = JSON.stringify(output, null, 2);
    } else {
        statusBadge.textContent = result.status 
            ? `✗ ${result.status} ${result.statusText}` 
            : '✗ 请求失败';
        statusBadge.className = 'status-badge error';
        
        const output = {
            endpoint: result.endpoint,
            error: result.error || '请求失败',
            url: result.url,
            message: '请确保API服务正在运行且URL配置正确'
        };
        
        responseBody.textContent = JSON.stringify(output, null, 2);
    }
}

// 更新状态
function updateStatus(type, message) {
    statusBadge.textContent = message;
    statusBadge.className = 'status-badge';
    responseBody.textContent = '';
}

// 显示通知
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// 添加动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 启动应用
init();
