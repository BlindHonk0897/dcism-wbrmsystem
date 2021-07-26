import { MachineConfig, AnyStateNodeDefinition } from "xstate";
import { IContext, IMachineEvents } from "./types";

const config: MachineConfig<
  IContext,
  AnyStateNodeDefinition,
  IMachineEvents
> = {
  initial: "start",
  states: {
    start: {
      invoke: [],
      on: {},
      entry: [],
      exit: [],
    },
  },
};

export default config;
