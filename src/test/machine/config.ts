import { MachineConfig, AnyStateNodeDefinition } from "xstate";
import { IContext, IMachineEvents } from "./types";

const config: MachineConfig<
  IContext,
  AnyStateNodeDefinition,
  IMachineEvents
> = {
  initial: "get_partner_data",
  states: {
    get_partner_data: {
      invoke: [
        {
          id: "get-partner-data",
          src: "getPartnerData",
        },
      ],
      on: {
        SUCCESS: {
          actions: ["assignPartnerData"],
          target: "ready",
        },
        ERROR: {
          target: "error",
        },
      },
    },

    ready: {
      entry: ["logReady"],
      on: {
        DONE: {
          actions: ['logDone'],
          target: 'done'
        }
      },
    },
    error: {
      id: "error",
      entry: ["logError"],
      type: "final",
    },
    done: {
      id: "done",
      type: "final",
    },
  },
};

export default config;
