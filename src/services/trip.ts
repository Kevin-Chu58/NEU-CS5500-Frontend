import http from "./http.ts";

type TripViewModel = {
    Id: number,
    Name: string,
    Description: string | null,
    CreatedBy: number,
    CreatedAt: Date,
    LastUpdatedAt: Date
};

const getMyTrips = async (token: string): Promise<TripViewModel[]> => {
    return await http.get(http.apiBaseURLs.api, "api/trips/my", token);
};

const setTripIsHidden = async (id: number, isHidden: boolean, token: string): Promise<TripViewModel> => {
    var newIsHidden = JSON.stringify(isHidden);
    return await http.patch(http.apiBaseURLs.api, `api/trips/${id}/isHidden`, newIsHidden, undefined, token);
}

const tripService = {
    getMyTrips,
    setTripIsHidden,
};

export default tripService;