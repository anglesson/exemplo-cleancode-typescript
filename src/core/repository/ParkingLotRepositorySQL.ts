import ParkingLot from "../entity/ParkingLot";
import ParkingLotRepository from "./ParkingLotRepository";
import database from "../../infra/database/database";
import ParkingLotAdapter from "../../adapter/ParkingLotAdapter";

export default class ParkingLotRepositorySQL implements ParkingLotRepository {

  async getParkingLot(code: string): Promise<ParkingLot> {
    const parkingLotData = await database.collection('parking_lot').findOne({code: code});
    const occupied_spaces = await database.collection('parked_car').count();
    return ParkingLotAdapter.create(parkingLotData.code, parkingLotData.capacity, parkingLotData.open_hour, parkingLotData.close_hour, occupied_spaces);
  }

  async saveParkedCar(code: string, plate: string, date: Date): Promise<void> {
    await database.collection('parked_car').insertOne({code, plate, date});
  }

}