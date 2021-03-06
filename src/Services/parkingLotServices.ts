import {apiClient} from './Api';
import {HOST} from '@constants/Config';

import {AuthState} from '@store/reducers/authReducer';
import {Fee} from '@constants/Types';

// add

export function addParkingLot(
  auth: AuthState,
  address?: string,
  name?: string,
  spaceCount?: number,
) {
  return new apiClient(auth).post(`${HOST}parkingLot/addParkingLot`, {
    address,
    name,
    spaceCount,
  });
}

export function getAllParkingLots(auth: AuthState) {
  return new apiClient(auth).get(`${HOST}parkingLot`);
}

export function getPark(auth: AuthState, id: number) {
  return new apiClient(auth).get(`${HOST}parkingLot/${id}`);
}

export function getActiveSession(auth: AuthState, id: number, page?: number) {
  console.log(
    `${HOST}parkingLot/${id}/getActiveSession${page ? `?page=${page}` : ''}`,
  );
  return new apiClient(auth).get(
    `${HOST}parkingLot/${id}/getActiveSession${page ? `?page=${page}` : ''}`,
  );
}

export function searchVehicle(auth: AuthState, id: number, keyword: string) {
  return new apiClient(auth).get(
    `${HOST}parkingLot/${id}/searchVehicle?keyword=${keyword}`,
  );
}

export function searchUser(auth: AuthState, keyword: string) {
  return new apiClient(auth).get(`${HOST}searchUser?keyword=${keyword}`);
}

export function addPartner(auth: AuthState, id: number, partnerId: number) {
  return new apiClient(auth).post(`${HOST}parkingLot/${id}/addPartner`, {
    partnerId,
  });
}

export function getPartner(auth: AuthState, id: number) {
  return new apiClient(auth).get(`${HOST}parkingLot/${id}/getPartner`);
}

export function deletePartner(auth: AuthState, id: number, partnerId: number) {
  return new apiClient(auth).delete(`${HOST}parkingLot/${id}/deletePartner`, {
    partnerId,
  });
}
