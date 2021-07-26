// import { createModel } from '@xstate/test';
// import { spawn } from './index';
// import { ITestParameters } from './types';

// const test_parameters: ITestParameters = {
//   context: {},
//   events: {
//     EVENT: {
//       exec: async () => {},
//       cases: [
//         {
//           payload: {},
//         },
//       ],
//     },
//   },
// };

// describe('State Coverage Test: Shell', () => {
//   const { context, events } = test_parameters;
//   const machine = spawn(context);
//   const model = createModel(machine).withEvents(events);

//   it('should have full coverage', async () => {
//     return model.getCoverage({});
//   });
// });

// describe('Event Coverage Test: Shell', () => {
//   const { context, events, path_filter } = test_parameters;
//   const machine = spawn(context);
//   const model = createModel(machine).withEvents(events);
//   const plans = model.getShortestPathPlans({
//     filter: path_filter,
//   });

//   const forEachPath = (path) => {
//     it(path.description, (done) => {
//       const { state } = path;

//       if (state.done) {
//         done();
//       } else {
//         path
//           .test(state)
//           .then(() => done())
//           .catch((error) => done(error));
//       }
//     });
//   };

//   const forEachPlan = (plan) =>
//     describe(plan.description, () => {
//       plan.paths.forEach(forEachPath);
//     });

//   plans.forEach(forEachPlan);

//   it('should have full coverage', async () => {
//     return model.getCoverage({});
//   });
// });
export {}
