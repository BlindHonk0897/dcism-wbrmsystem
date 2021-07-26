import { AnyEventObject } from "xstate";

export interface IContext {}

export interface IMachineEvents extends AnyEventObject {}

export interface IRecord<TEntry> {
  [key: string]: TEntry;
}
