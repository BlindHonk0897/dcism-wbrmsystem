import { State, AnyEventObject } from 'xstate'
import { TestEventsConfig } from '@xstate/test/lib/types'

export interface IContext {
  application_config?: IApplicationConfig
  application_data?: IApplicationData
  theme_config?: unknown
  params?: IParams
}

export interface IApplicationData {
  partner_details?: IPartnerDetails
}

export interface IApplicationConfig {}

export interface IPartnerDetails {
  name?: string
  agent?: string
  contact?: string
  email?: string
  social_media_account?: ISocialMediaAccount
  logo?: string
  avatar?: string
  position?: string
}

export interface ISocialMediaAccount {
  facebook: string
  twitter: string
}

export interface IParams {
  type?: string
  id: string
  partner_details?: IPartnerDetails
}

export interface IMachineEvents extends AnyEventObject {}

export interface IRecord<TEntry> {
  [key: string]: TEntry
}

export type TWorklflowState = State<IContext, IMachineEvents, any>

export interface ITestParameters {
  context: IContext
  events: TestEventsConfig<TWorklflowState>
  path_filter?: (state: TWorklflowState) => boolean
}

export interface IGotConfigEvent extends AnyEventObject {
  type: 'GOT_CONFIG'
  payload: IApplicationConfig
}

export interface IGotAppDataEvent extends AnyEventObject {
  type: 'GOT_APP_DATA'
  payload: IApplicationData
}
export interface IGotPartnerDetails extends AnyEventObject {
  type: 'SUCCESS'
  payload: IPartnerDetails
}
