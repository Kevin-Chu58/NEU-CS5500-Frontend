import http from "./http.ts";

// <<<<<<< featuresOnApi
// 定义数据模型
export type TripDetailViewModel = {
    id: number,
    name: string,
    description: string,
    createdBy: number,
    createdAt: string,
    lastUpdatedAt: string,
    smallTrips: SmallTripViewModel[]
}

export type SmallTripViewModel = {
    id: number,
    name: string,
    description: string,
    tripId: number,
}

export type SmallTripPostViewModel = {
    tripId: number,
    name: string,
    description: string,
}

export type TripPatchViewModel = {
    name: string,
    description: string,
}

// 获取单个trip详情
const getTripDetail = async (tripId: number | string, token: string): Promise<TripDetailViewModel> => {
    console.log("getTripDetail called with ID:", tripId);
    console.log("API Base URL:", http.apiBaseURLs.api);
    
    try {
        // 确保API路径正确
        const endpoint = `api/trips/${tripId}`;
        console.log("Full API endpoint:", `${http.apiBaseURLs.api}/${endpoint}`);
        
        // 直接使用fetch，避免可能的问题
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`);
        headers.append('Accept', 'application/json');
        
        const response = await fetch(`${http.apiBaseURLs.api}/${endpoint}`, {
            method: 'GET',
            headers: headers
        });
        
        if (!response.ok) {
            throw new Error(`Failed to fetch trip: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        console.log("API Response in service:", result);
        return result;
    } catch (error) {
        console.error("Error in getTripDetail service:", error);
        throw error;
    }
}

// 获取特定trip的所有small trips
const getSmallTrips = async (tripId: number | string, token: string): Promise<SmallTripViewModel[]> => {
    console.log("getSmallTrips called with tripId:", tripId);
    
    try {
        const endpoint = `api/smallTrips/${tripId}`;
        const result = await http.get<SmallTripViewModel[]>(http.apiBaseURLs.api, endpoint, token);
        console.log("Get Small Trips Response:", result);
        return result;
    } catch (error) {
        console.error("Error in getSmallTrips service:", error);
        throw error;
    }
}

// 创建新的smallTrip (完全按照API文档)
const createSmallTrip = async (tripId: number | string, data: Omit<SmallTripPostViewModel, "tripId">, token: string): Promise<SmallTripViewModel> => {
    console.log("Creating small trip for tripId:", tripId);
    console.log("Request data:", data);
    
    try {
        // 根据API文档，应该使用 /api/SmallTrips 端点
        const endpoint = `api/SmallTrips`;
        
        // 准备请求体，添加tripId
        const requestData = {
            tripId: Number(tripId),
            ...data
        };
        
        console.log("Full request data:", requestData);
        
        // 发送POST请求
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`);
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        
        const response = await fetch(`${http.apiBaseURLs.api}/${endpoint}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestData)
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to create small trip: ${response.status} ${response.statusText}. Details: ${errorText}`);
        }
        
        const result = await response.json();
        console.log("Create Small Trip Response:", result);
        return result;
    } catch (error) {
        console.error("Error creating small trip:", error);
        throw error;
    }
}

// 更新已有的smallTrip (完全按照API文档)
const updateSmallTrip = async (smallTripId: number | string, data: TripPatchViewModel, token: string): Promise<SmallTripViewModel> => {
    console.log("Updating small trip with ID:", smallTripId);
    console.log("Request data:", data);
    
    try {
        // 根据API文档，应该使用 /api/SmallTrips/{id} 端点
        const endpoint = `api/SmallTrips/${smallTripId}`;
        
        // 发送PATCH请求
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`);
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        
        const response = await fetch(`${http.apiBaseURLs.api}/${endpoint}`, {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to update small trip: ${response.status} ${response.statusText}. Details: ${errorText}`);
        }
        
        const result = await response.json();
        console.log("Update Small Trip Response:", result);
        return result;
    } catch (error) {
        console.error("Error updating small trip:", error);
        throw error;
    }
}

const tripService = {
    getTripDetail,
    getSmallTrips,
    createSmallTrip,
    updateSmallTrip
}

export default tripService; 
// =======
// type TripViewModel = {
//     Id: number,
//     Name: string,
//     Description: string | null,
//     CreatedBy: number,
//     CreatedAt: Date,
//     LastUpdatedAt: Date
// };

// const getMyTrips = async (token: string): Promise<TripViewModel[]> => {
//     return await http.get(http.apiBaseURLs.api, "api/trips/my", token);
// };

// const setTripIsHidden = async (id: number, isHidden: boolean, token: string): Promise<TripViewModel> => {
//     var newIsHidden = JSON.stringify(isHidden);
//     return await http.patch(http.apiBaseURLs.api, `api/trips/${id}/isHidden`, newIsHidden, undefined, token);
// }

// const tripService = {
//     getMyTrips,
//     setTripIsHidden,
// };

// export default tripService;
// >>>>>>> main
