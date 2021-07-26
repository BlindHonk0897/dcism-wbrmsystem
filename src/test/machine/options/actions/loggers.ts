import { ActionFunctionMap } from 'xstate'
import { IContext, IMachineEvents } from '../../types'

const actions: ActionFunctionMap<IContext, IMachineEvents> = {
  logPartnerData: context => {
    console.log('xxxPartnerDetails', context?.application_data?.partner_details)
  },
  logReady: () => {
    console.log('[ATOMIC_PARTNER_CARD ENTRY READY]')
  },
  logDone: () => {
    console.log('[ATOMIC_PARTNER_CARD] DONE event')
  }
}

export default actions
