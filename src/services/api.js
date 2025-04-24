// 简单直接的API服务，不依赖任何其他模块
const API_BASE_URL = "https://travel-tips-api-epe5bnd7hza6h9eg.westus2-01.azurewebsites.net";
const DEFAULT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MDZjNzQxNzJkZWM2N2YxMGQxNzU0OSIsImlhdCI6MTc0NTM2MDIxMSwiZXhwIjoxNzQ3OTUyMjExfQ.gY3e041pCBRVdYgaDizVYIINkgY_y4NU1eK6-frhuoQ";

/**
 * 获取Trip详情
 */
export const getTrip = async (tripId) => {
  console.log(`[DEBUG API] 开始获取Trip ID: ${tripId}`);
  
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${DEFAULT_TOKEN}`);
  headers.append('Accept', 'application/json');
  
  try {
    console.log(`[DEBUG API] 请求URL: ${API_BASE_URL}/api/trips/${tripId}`);
    const response = await fetch(`${API_BASE_URL}/api/trips/${tripId}`, {
      method: 'GET',
      headers: headers
    });
    
    console.log(`[DEBUG API] 响应状态: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`请求失败: ${response.status} ${response.statusText}. 详情: ${errorText}`);
    }
    
    const data = await response.json();
    console.log('[DEBUG API] 成功获取数据:', data);
    return data;
  } catch (error) {
    console.error('[DEBUG API] 获取Trip失败:', error);
    throw error;
  }
};

/**
 * 获取所有SmallTrips
 */
export const getSmallTrips = async (tripId) => {
  console.log(`[DEBUG API] 开始获取Trip ID ${tripId}的所有SmallTrips`);
  
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${DEFAULT_TOKEN}`);
  headers.append('Accept', 'application/json');
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/smallTrips/${tripId}`, {
      method: 'GET',
      headers: headers
    });
    
    if (!response.ok) {
      throw new Error(`请求失败: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('[DEBUG API] 成功获取SmallTrips:', data);
    return data;
  } catch (error) {
    console.error('[DEBUG API] 获取SmallTrips失败:', error);
    throw error;
  }
};

/**
 * 创建新的SmallTrip
 */
export const createSmallTrip = async (tripId, data) => {
  console.log(`[DEBUG API] 开始为Trip ID ${tripId}创建SmallTrip`);
  console.log('[DEBUG API] 请求数据:', data);
  
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${DEFAULT_TOKEN}`);
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/smallTrips/${tripId}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`请求失败: ${response.status} ${response.statusText}. 详情: ${errorText}`);
    }
    
    const result = await response.json();
    console.log('[DEBUG API] 成功创建SmallTrip:', result);
    return result;
  } catch (error) {
    console.error('[DEBUG API] 创建SmallTrip失败:', error);
    throw error;
  }
};

export default {
  getTrip,
  getSmallTrips,
  createSmallTrip
}; 