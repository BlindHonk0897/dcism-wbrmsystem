import { ConditionPredicate } from "xstate";
import { IContext, IMachineEvents } from "../types";
import { IRecord } from "../types";

const guards: IRecord<ConditionPredicate<IContext, IMachineEvents>> = {};

export default guards;
