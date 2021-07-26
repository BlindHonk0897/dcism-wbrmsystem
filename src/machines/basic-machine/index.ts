import { Machine, interpret } from 'xstate';
import { isMainThread, workerData, parentPort } from 'worker_threads';

import { IContext } from './types';
import config from './config';
import options from './options';

export const spawn = (context: IContext) =>
  Machine(
    //@ts-ignore
    {
      ...config,
      context,
    },
    options
  );

export const Interpret = (context: IContext) => {
  const machine = spawn(context);
  const service = interpret(machine);
  return service;
};

export const runThread = (): number => {
  if (isMainThread) {
    return 0;
  }

  const { id } = workerData;

  const service = Interpret({ ...workerData });

  service.onTransition((state) => {
    parentPort?.postMessage({
      type: 'STATE_TRANSITION',
      id,
      state_value: state.value,
    });
  });

  service.start();

  return 1;
};
