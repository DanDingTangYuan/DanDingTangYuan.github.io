// src/pages/api/debug.js
export const GET = ({ request }) => {
  // 檢查變數是否存在（只印前幾碼，不要印出完整的 Secret 以策安全）
  const clientId = import.meta.env.KEYSTATIC_GITHUB_CLIENT_ID;
  const hasSecret = !!import.meta.env.KEYSTATIC_GITHUB_CLIENT_SECRET;
  
  return new Response(JSON.stringify({
    check_id: clientId ? clientId.slice(0, 5) + '...' : 'MISSING',
    check_secret: hasSecret ? 'PRESENT' : 'MISSING',
    node_env: process.env.NODE_ENV,
    url: request.url
  }), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}