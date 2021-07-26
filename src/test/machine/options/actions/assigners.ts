import { ActionFunctionMap, assign } from 'xstate'
import { IContext, IMachineEvents, IGotPartnerDetails } from '../../types'

const actions: ActionFunctionMap<IContext, any> = {
  assignPartnerData: assign({
    application_data: (
      { application_data },
      { payload }: IGotPartnerDetails
    ) => ({ ...application_data, partner_details: payload })
  })
}

export default actions
