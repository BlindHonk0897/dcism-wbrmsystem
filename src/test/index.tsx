import React, { useEffect, memo } from "react";
import { PartnerCardProps } from "./types";
import styled from "styled-components";
import { usePersistedMachine } from "@utils/hooks";
import { spawn } from "./machine";

// sample data
// import partnerLogo from './assets/logo.png'

const PartnerCard: React.FC<PartnerCardProps> = (props) => {
  const { id, onDataChanged, instance } = props;
  // const [connection, state, send] = useWorkflow({
  //   workflow_type: 'ATOMIC_PARTNER',
  //   params: {
  //     id
  //   },
  //   work_offline: false,
  //   instance
  // })

  const machine = spawn({
    params: {
      id,
    },
  });
  const [state, send] = usePersistedMachine(
    machine,
    "reservation-details",
    instance
  );
  useEffect(
    () => () => {
      send("DONE");
    },
    []
  );

  useEffect(() => {
    //@ts-ignore
    onDataChanged(state?.context?.application_data?.partner_details);
  }, [state?.context?.application_data?.partner_details]);

  if (!state?.matches("ready"))
    return (
      <div className="shadow-md bg-white flex justify-center items-center flex-col flex-wrap p-5 m-2">
        <Spinner />
      </div>
    );

  const data = state?.context?.application_data;
  return (
    <div className="shadow-md bg-white flex flex-row flex-wrap p-5 pb-3 m-2">
      <div className="flex-1 flex flex-col">
        <img
          alt="Partners logo"
          src={data?.partner_details?.logo}
          className="w-60"
        />
        <div className="flex items-center">
          <Avatar
            alt="this is alt value"
            size="regular"
            src={data?.partner_details?.avatar}
          />
          <div className="flex flex-col pl-2">
            <h2 className="text-gray-800 text-2xl font-bold">
              {data?.partner_details?.agent}
            </h2>
            <p className="text-gray-500 text-sm">
              {data?.partner_details?.position}
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="inline-flex items-center">
            <Button className="hover:bg-gray-100">
              <i className="fas fa-phone"></i>
            </Button>
            <span>{data?.partner_details?.contact}</span>
          </p>
          <p className="inline-flex items-center">
            <Button className="hover:bg-gray-100">
              <i className="fas fa-envelope"></i>
            </Button>
            <span>{data?.partner_details?.email}</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col flex-none bg-white">
        <StyledSocialButton
          icon="share-square-o"
          className="hover:bg-gray-100 text-red-500"
        />
        <StyledSocialButton
          icon="twitter-bird"
          className="hover:bg-gray-100 text-blue-500"
        />
        <StyledSocialButton
          icon="facebook-rounded"
          className="hover:bg-gray-100 text-blue-500"
        />
      </div>
    </div>
  );
};
export default memo(PartnerCard);

const StyledSocialButton = styled(Button)`
  i {
    font-size: 1.25rem;
  }
`;
