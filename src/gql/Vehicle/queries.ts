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
      Vehicle_Make
      Vehicle_Model
      Vehicle_Model_Version
      Misc_Seats
      Range_Real
      Availability_Date_From
      Images
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

export default {
  getVehicleByMakesAndModels,
  vehiclesMakes,
  getVehicleModels,
};
