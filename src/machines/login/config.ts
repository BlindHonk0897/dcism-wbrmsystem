import { MachineConfig, AnyStateNodeDefinition } from "xstate";
import { IContext, IMachineEvents } from "./types";

const config: MachineConfig<IContext, AnyStateNodeDefinition, IMachineEvents> =
  {
    id: "my-machine",
    type: "parallel",
    context: {
      retries: 0,
    },
    states: {
      connection: {
        initial: "initialize_db",
        states: {
          initialize_db: {
            on: {
              CONNECTED: {
                actions: [],
                target: "running",
              },
              FAILED: {
                actions: [],
                target: "failure",
              },
            },
          },
          running: {
            on: {
              DISCONNECTED: {
                actions: [],
                target: "failure",
              },
              ERROR: {
                actions: [],
                target: "running",
              },
            },
          },
          failure: {
            on: {
              RECONNECT_SUCCEED: {
                actions: [],
                target: "running",
              },
              RECONNECT_FAILED: {
                actions: [],
                target: "failure",
              },
            },
          },
        },
      },
      application: {
        id: "application",
        initial: "login_page",
        states: {
          login_page: {
            id: "login-page",
            initial: "loading",
            on: {
              SWITCH_TO_REGISTER: {
                actions: [],
                target: "register_page",
              },
            },
            states: {
              loading: {
                on: {
                  LOADED: {
                    actions: [],
                    target: "waiting_for_submit",
                  },
                },
              },
              waiting_for_submit: {
                on: {
                  INPUT_USERNAME_CHANGE: {
                    actions: ["assignUsername"],
                  },
                  INPUT_PASSWORD_CHANGE: {
                    actions: ["assignPassword"],
                  },
                  SUBMIT: {
                    actions: ["logCredentials"],
                    target: "authenticating",
                  },
                },
              },
              authenticating: {
                invoke: [
                  {
                    id: "authenthicate-credentials",
                    src: "authenticate",
                  },
                ],
                on: {
                  SUCCESS: {
                    actions: [],
                    target: "#portal-page",
                  },
                  FAILED: {
                    actions: [],
                    target: "waiting_for_submit",
                  },
                },
              },
            },
          },
          register_page: {
            id: "register-page",
            on: {
              SWITCH_TO_LOGIN: {
                actions: [],
                target: "login_page",
              },
            },
          },
          portal_page: {
            id: "portal-page",
            type: "parallel",
            states: {
              dashboard: {},
              users_menu: {},
            },
          },
        },
      },
    },
  };

export default config;
