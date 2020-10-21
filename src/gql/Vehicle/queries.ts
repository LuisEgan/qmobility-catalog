import { gql } from "apollo-boost";

export interface IVehiclesByMakesVars {
  makes?: string[];
  models?: string[];
  skip?: number;
  limit?: number;
}

export interface IvehiclesByMakes {
  Vehicle_ID: string;
  Vehicle_Make: string;
  Vehicle_Model: string;
  Vehicle_Model_Version: string;
  Misc_Seats: number;
  Range_Real: number;
  Availability_Date_From: string;
  Images: string[];
  id: string;
}

const getVehicleByMakesAndModels = gql`
  query VehiclesByMakes(
    $makes: [String!]
    $models: [String!]
    $limit: Float
    $skip: Float
  ) {
    getVehicleByMakesAndModels(
      vehiclesByMakesAndModelsInput: {
        makes: $makes
        models: $models
        limit: $limit
        skip: $skip
      }
    ) {
      Vehicle_ID
      Images
      Vehicle_Make
      Vehicle_Model
      Vehicle_Model_Version
      Battery_Capacity_Useable
      Battery_Capacity_Full
      Battery_Capacity_Estimate
      Range_Real
      Availability_Status
      Availability_Date_From
      Performance_Topspeed
      Fastcharge_ChargeTime
      Efficiency_Real
      Price_From_UK
      Misc_Seats
      id
    }
  }
`;

const vehiclesMakes = gql`
  query VehiclesMakes {
    vehicleMakes
  }
`;

const getVehicleModels = gql`
  query GetVehicleModels($makes: [String!]) {
    getVehicleModels(vehiclesModelsInput: { makes: $makes })
  }
`;

const bookTestDrive = gql`
  query BookTestDrive {
    bookTestDrive
  }
`;

export default {
  getVehicleByMakesAndModels,
  vehiclesMakes,
  getVehicleModels,
  bookTestDrive,
};
