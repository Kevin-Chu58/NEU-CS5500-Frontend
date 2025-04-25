import http from "./http.ts";

// Define data models
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

export type TripViewModel = {
    id: number,
    name: string,
    description: string | null,
    createdBy: number,
    createdAt: string,
    lastUpdatedAt: string
};

// Get single trip details
const getTripDetail = async (tripId: number | string, token: string): Promise<TripDetailViewModel> => {
    console.log("getTripDetail called with ID:", tripId);
    console.log("API Base URL:", http.apiBaseURLs.api);
    
    try {
        // Ensure API path is correct
        const endpoint = `api/trips/${tripId}`;
        console.log("Full API endpoint:", `${http.apiBaseURLs.api}/${endpoint}`);
        
        // Use fetch directly to avoid potential issues
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

// Get all user trips
const getMyTrips = async (token: string): Promise<TripViewModel[]> => {
    console.log("getMyTrips called with token");
    
    try {
        const endpoint = "api/trips/my";
        console.log("Full API endpoint:", `${http.apiBaseURLs.api}/${endpoint}`);
        
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`);
        headers.append('Accept', 'application/json');
        
        const response = await fetch(`${http.apiBaseURLs.api}/${endpoint}`, {
            method: 'GET',
            headers: headers
        });
        
        if (!response.ok) {
            throw new Error(`Failed to fetch my trips: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        console.log("getMyTrips Response:", result);
        return result;
    } catch (error) {
        console.error("Error in getMyTrips service:", error);
        throw error;
    }
};

// Set trip hidden status
const setTripIsHidden = async (id: number, isHidden: boolean, token: string): Promise<TripViewModel> => {
    console.log(`Setting trip ${id} isHidden to ${isHidden}`);
    
    try {
        const endpoint = `api/trips/${id}/isHidden`;
        const newIsHidden = JSON.stringify(isHidden);
        
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`);
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        
        const response = await fetch(`${http.apiBaseURLs.api}/${endpoint}`, {
            method: 'PATCH',
            headers: headers,
            body: newIsHidden
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to update trip visibility: ${response.status} ${response.statusText}. Details: ${errorText}`);
        }
        
        const result = await response.json();
        console.log("setTripIsHidden Response:", result);
        return result;
    } catch (error) {
        console.error("Error updating trip visibility:", error);
        throw error;
    }
};

// Get all small trips for a specific trip
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

// Create new smallTrip (following API documentation)
const createSmallTrip = async (tripId: number | string, data: Omit<SmallTripPostViewModel, "tripId">, token: string): Promise<SmallTripViewModel> => {
    console.log("Creating small trip for tripId:", tripId);
    console.log("Request data:", data);
    
    try {
        // According to API docs, should use /api/SmallTrips endpoint
        const endpoint = `api/SmallTrips`;
        
        // Prepare request body, add tripId
        const requestData = {
            tripId: Number(tripId),
            ...data
        };
        
        console.log("Full request data:", requestData);
        
        // Send POST request
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

// Update existing smallTrip (following API documentation)
const updateSmallTrip = async (smallTripId: number | string, data: TripPatchViewModel, token: string): Promise<SmallTripViewModel> => {
    console.log("Updating small trip with ID:", smallTripId);
    console.log("Request data:", data);
    
    try {
        // According to API docs, should use /api/SmallTrips/{id} endpoint
        const endpoint = `api/SmallTrips/${smallTripId}`;
        
        // Send PATCH request
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

// Update trip (main trip) details
const updateTrip = async (id: number | string, data: TripPatchViewModel, token: string): Promise<TripViewModel> => {
    console.log("Updating trip with ID:", id);
    console.log("Request data:", data);
    
    try {
        // 使用api/trips/{id}端点
        const endpoint = `api/trips/${id}`;
        
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
            throw new Error(`Failed to update trip: ${response.status} ${response.statusText}. Details: ${errorText}`);
        }
        
        const result = await response.json();
        console.log("Update Trip Response:", result);
        return result;
    } catch (error) {
        console.error("Error updating trip:", error);
        throw error;
    }
}

const tripService = {
    getTripDetail,
    getSmallTrips,
    createSmallTrip,
    updateSmallTrip,
    getMyTrips,
    setTripIsHidden,
    updateTrip
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
 