import React, { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { Card, Select } from "antd";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { Vehicle } from "../src/gql";
import { IVehiclesByMakesVars } from "../src/gql/Vehicle/queries";

import { IVehicle } from "../src/gql/Vehicle/Types";
import { EVECard } from "../src/components";

export {};

const { Option } = Select;

const CAR_SET = 25;

const Index = () => {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const [hasFetchedAll, setHasFetchedAll] = useState<boolean>(false);

  const [makesSelected, setMakesSelected] = useState<string[]>([]);

  const [modelsOpts, setModelsOpts] = useState<string[]>([]);
  const [modelsSelected, setModelsSelected] = useState<string[]>([]);

  // * Fetch eVes
  const { data: eVes, loading: eVesLoading, fetchMore: getEVEs } = useQuery<
    { getVehicleByMakesAndModels: IVehicle[] },
    IVehiclesByMakesVars
  >(Vehicle.queries.getVehicleByMakesAndModels, {
    variables: {
      skip: 0,
      limit: CAR_SET,
    },
    fetchPolicy: "network-only",
  });

  // * Fetch Makes
  const { data: vehicleMakesData, loading: vehicleMakesLoading } = useQuery<{
    vehicleMakes: string[];
  }>(Vehicle.queries.vehiclesMakes);

  // * Fetch Models
  const [
    getVehicleModels,
    { data: getVehicleModelsData, loading: getVehicleModelsLoading },
  ] = useLazyQuery<
    {
      getVehicleModels: string[];
    },
    { makes: string[] }
  >(Vehicle.queries.getVehicleModels);

  const fetchMore = () => {
    if (!hasFetchedAll) {
      getEVEs({
        variables: {
          skip: skip + CAR_SET,
        },
        updateQuery(_, { fetchMoreResult }) {
          return fetchMoreResult;
        },
      });
      setSkip(skip + CAR_SET);
    }
  };
  useBottomScrollListener(fetchMore);

  // * Display eVes
  useEffect(() => {
    if (eVes) {
      // * Set eVes
      if (skip === 0) {
        setVehicles([...eVes.getVehicleByMakesAndModels]);
      } else {
        setVehicles([...vehicles, ...eVes.getVehicleByMakesAndModels]);
      }

      if (eVes.getVehicleByMakesAndModels.length < CAR_SET) {
        setHasFetchedAll(true);
      }
    }
  }, [eVes]);

  // * Update Models
  useEffect(() => {
    if (getVehicleModelsData) {
      setModelsOpts(getVehicleModelsData.getVehicleModels);
    }
  }, [getVehicleModelsData]);

  const LoadingGrid = () => (
    <>
      {[...Array(10)].map(() => (
        <Card
          key={Math.random()}
          loading={
            eVesLoading || vehicleMakesLoading || getVehicleModelsLoading
          }
        />
      ))}
    </>
  );

  const handleMakeChange = async (makes: string[]) => {
    setSkip(0);
    const isEmpty = !makes[0].length;
    setMakesSelected(isEmpty ? [] : makes);

    const variables: IVehiclesByMakesVars = {
      skip: 0,
    };

    if (!isEmpty) {
      variables.makes = makes;
    } else {
      setModelsOpts([]);
      setModelsSelected([]);
    }

    if (!isEmpty && modelsSelected.length) {
      variables.models = modelsSelected;
    }

    getEVEs({
      variables,
      updateQuery(_, { fetchMoreResult }) {
        return fetchMoreResult;
      },
    });

    getVehicleModels({
      variables: {
        makes,
      },
    });
  };

  const handleModelChange = (models: string[]) => {
    setSkip(0);

    const isEmpty = !models[0].length;

    setModelsSelected(isEmpty ? [] : models);

    const variables: IVehiclesByMakesVars = {
      makes: makesSelected,
      skip: 0,
    };

    if (!isEmpty) {
      variables.models = models;
    }

    getEVEs({
      variables,
      updateQuery(_, { fetchMoreResult }) {
        return fetchMoreResult;
      },
    });
  };

  return (
    <div>
      <div className="h-20 font-bold text-center flex justify-center items-center">
        <span className="text-5xl">eVe Catalogue</span>
      </div>

      <div className="p-24">
        <div className="flex pb-10">
          <div className="flex flex-col flex-1 pr-3">
            <span>Makes</span>
            <Select
              className="py-3"
              mode="multiple"
              placeholder="Select Makes"
              onChange={(e) => handleMakeChange(e.toString().split(","))}
              optionLabelProp="label"
              value={makesSelected}
            >
              {vehicleMakesData?.vehicleMakes?.map((v) => (
                <Option key={v} value={v} label={v}>
                  <div>{v}</div>
                </Option>
              ))}
            </Select>
          </div>

          <div className="flex flex-col flex-1 pl-3">
            <span>Models</span>
            <Select
              mode="multiple"
              className="py-3"
              placeholder="Select Model"
              onChange={(e) => handleModelChange(e.toString().split(","))}
              optionLabelProp="label"
              value={modelsSelected}
            >
              {modelsOpts.map((m) => (
                <Option key={m} value={m} label={m}>
                  <div>{m}</div>
                </Option>
              ))}
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-5">
          {vehicles.map((v) => (
            <EVECard
              key={v.Vehicle_ID}
              imgSource={v.Images[0]}
              title={`${v.Vehicle_Make} ${v.Vehicle_Model}`}
              description={v.Vehicle_Model_Version}
            />
          ))}

          {(eVesLoading || vehicleMakesLoading || getVehicleModelsLoading) && (
            <LoadingGrid />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
