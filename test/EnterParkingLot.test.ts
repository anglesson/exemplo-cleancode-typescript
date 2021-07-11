
import ParkingLotRepositorySQL from "../src/core/repository/ParkingLotRepositorySQL";
import EnterParkingLot from "../src/core/usecase/EnterParkingLot";
import GetParkingLot from "../src/core/usecase/GetParkingLot";
import ParkingLotRepositoryMemory from "../src/infra/repository/ParkingLotRepositoryMemory";

test.skip("Should get parking lot", async function () {
  //const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory();
  const parkingLotRepositorySQL = new ParkingLotRepositorySQL();
  const getParkingLot = new GetParkingLot(parkingLotRepositorySQL);
  const parkingLot = await getParkingLot.execute("shopping");
  expect(parkingLot.code).toBe("shopping");
});

test.skip("Should enter parking lot", async function () {
  //const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory();
  const parkingLotRepositorySQL = new ParkingLotRepositorySQL();
  const enterParkingLot = new EnterParkingLot(parkingLotRepositorySQL);
  const getParkingLot = new GetParkingLot(parkingLotRepositorySQL);
  
  const parkingLotBeforeEnter = await getParkingLot.execute("shopping");

  expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0);

  await enterParkingLot.execute("shopping", "MMM-0099", new Date("2021-01-01T10:00:00"));

  const parkingLotAfterEnter = await getParkingLot.execute("shopping");
  expect(parkingLotAfterEnter.occupiedSpaces).toBe(1);
});

test.skip("Should be closed", async function () {
  //const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory();
  const parkingLotRepositorySQL = new ParkingLotRepositorySQL();
  const enterParkingLot = new EnterParkingLot(parkingLotRepositorySQL);
  const getParkingLot = new GetParkingLot(parkingLotRepositorySQL);

  const parkingLotBeforeEnter = await getParkingLot.execute("shopping");
  console.log(parkingLotBeforeEnter);
  expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0);

  await enterParkingLot.execute("shopping", "MMM-0099", new Date("2021-01-01T21:00:00"));

});

test("Should be full", async function () {
  //const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory();
  const parkingLotRepositorySQL = new ParkingLotRepositorySQL();
  const enterParkingLot = new EnterParkingLot(parkingLotRepositorySQL);
  const getParkingLot = new GetParkingLot(parkingLotRepositorySQL);

  const parkingLotBeforeEnter = await getParkingLot.execute("shopping");
  expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0);

  await enterParkingLot.execute("shopping", "MMM-0099", new Date("2021-01-01T10:00:00"));
  await enterParkingLot.execute("shopping", "MMM-0099", new Date("2021-01-01T10:00:00"));
  await enterParkingLot.execute("shopping", "MMM-0099", new Date("2021-01-01T10:00:00"));
  await enterParkingLot.execute("shopping", "MMM-0099", new Date("2021-01-01T10:00:00"));
  await enterParkingLot.execute("shopping", "MMM-0099", new Date("2021-01-01T10:00:00"));

});
