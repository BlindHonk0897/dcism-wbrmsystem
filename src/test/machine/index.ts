import { Machine, interpret } from "xstate";
import { IContext } from "./types";
import config from "./config";
import options from "./options";

const default_context: IContext = {
  // error: null,
  application_config: {},
  application_data: {
    partner_details: {
      name: "",
      agent: "",
      contact: "",
      email: "",
      social_media_account: {
        facebook: "",
        twitter: "",
      },
    },
  },
};

export const spawn = (context: Partial<IContext>) => {
  const machine_config = {
    ...config,
    context: {
      ...default_context,
      ...context,
    },
  };
  return Machine(machine_config, options);
};

export const Interpret = (context: Partial<IContext>) => {
  const machine = spawn(context);
  const service = interpret(machine);
  return service;
};

export * from "./types";
