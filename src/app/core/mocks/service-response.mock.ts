import { ServiceResponse } from "@core/interfaces/service-response.interface";

export const MOCK_SERVICE_RESPONSE_SUCCESS = <T>(data: T): ServiceResponse<T> => ({ data, isSuccess: true, message: "" });