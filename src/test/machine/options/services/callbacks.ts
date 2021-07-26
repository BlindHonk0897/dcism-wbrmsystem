import { ServiceConfig } from 'xstate'
import { IContext, IMachineEvents } from '../../types'
import { IRecord } from '../../types'
// import { startWorkflow } from "@dnamicro/client";
import axios from 'axios'

interface IHttpResponse<T = Record<string, unknown>> {
  payload: T
}
const { MANAGER_HOST = 'http://localhost', MANAGER_PORT = 4002 } = process.env

const services: IRecord<ServiceConfig<IContext, IMachineEvents>> = {
  getPartnerData: context => async send => {
    try {
      // console.log('getPartnerData_l0g: ', id)
      // const { payload } = await startWorkflow({
      //   workflow_type: 'atomic-partner-card-fn',
      //   params: {
      //     type: 'partner_details',
      //     partner_id: id
      //   },
      //   endpoint: {
      //     host: MANAGER_HOST,
      //     port: +MANAGER_PORT
      //   }
      // })
      const {
        data: { payload }
      } = await axios.post<IHttpResponse<any>>('/fn', {
        workflow_type: 'atomic-partner-card-fn',
        params: {
          type: `partner_details`,
          partner_id: context.params?.id
        }
      })
      console.log('PAYLOAD****************PARTNER', payload)

      send({
        type: 'SUCCESS',
        payload
      })
    } catch (error) {
      send({
        type: 'ERROR',
        event_error_catch: {
          error: true,
          errorText: typeof error === 'object' ? JSON.stringify(error) : error
        }
      })
    }
  }

  // getPartnerDatsa: ({ params }) => async (send) => {
  //   try {
  //     const { payload } = await startWorkflow({
  //       workflow_type: "ATOMIC_PARTNER_CARD_FN",
  //       params: {
  //         type: "partner_details",
  //       },
  //       endpoint: {
  //         host: MANAGER_HOST,
  //         port: +MANAGER_PORT,
  //       },
  //     });

  //     console.log("PAYLOAD****************PARTNER", payload);

  //     send({
  //       type: "SUCCESS",
  //       payload,
  //     });
  //   } catch (error) {
  //     console.log("ERROR ATOMIC_GRID : getPartnerData", error);
  //   }
  // },
}

export default services
