var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// asset-input/aws/stacks/LambdaModule/infra/api/session-creation-notification/handler.ts
var handler_exports = {};
__export(handler_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(handler_exports);

// asset-input/src/infra/adapters/aws-step-function-to-lambda-adapter.ts
var adaptStepFunctionToLambda = async (req, controller) => {
  const response = await controller.handle(req);
  return response;
};

// asset-input/src/presentation/helpers/http-helpers.ts
var serverError = (error, displayMessage) => ({
  statusCode: 500,
  body: {
    errorCode: "InternalServerError",
    errorMessage: "Internal Server Error",
    error: error.name,
    displayMessage: displayMessage || error.message
  },
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "*"
  }
});
var ok = (data) => ({
  statusCode: 200,
  body: JSON.stringify(data),
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "*"
  }
});

// asset-input/src/presentation/controllers/session-creation-notification-controller.ts
var SessionCreationNotificationController = class {
  constructor(sessionCreationNotification) {
    this.sessionCreationNotification = sessionCreationNotification;
  }
  async handle(httpRequest) {
    try {
      const event = httpRequest.body;
      const success = await this.sessionCreationNotification.send(event);
      return ok({ success });
    } catch (error) {
      console.log("error: ", error);
      return serverError(error);
    }
  }
};

// asset-input/config.ts
var Event2Topic = {
  ["game-session-creation.finished"]: "topicArn"
};

// asset-input/src/data/use-cases/ds-session-creation-notification.ts
var DsSessionCreationNotification = class {
  constructor(sendNotification, publishEvent) {
    this.sendNotification = sendNotification;
    this.publishEvent = publishEvent;
  }
  async send(event) {
    await this.sendNotification.send({ body: event.detail, topic: Event2Topic[event.detailType] }).then(async (data) => {
      await this.publishEvent.publish({
        body: {
          source: "code-challenge",
          detailType: "notify-player-workflow.finished",
          detail: {
            sessionId: "",
            message: "Game session notification sent successfully."
          }
        },
        bus: ""
      });
    }).catch(async (e) => {
      await this.publishEvent.publish({
        body: {
          source: "code-challenge",
          detailType: "notify-player-workflow.failed",
          detail: {
            sessionId: "",
            error: e.message
          }
        },
        bus: ""
      });
    });
  }
};

// asset-input/src/infra/event-bridge/eb-publish-event-repository.ts
var import_client_eventbridge2 = require("@aws-sdk/client-eventbridge");

// asset-input/src/infra/event-bridge/helpers/eb-helper.ts
var import_client_eventbridge = require("@aws-sdk/client-eventbridge");

// asset-input/env.ts
var env = {
  awsRegion: "us-east-1",
  awsAccountId: "",
  awsLambdaRole: "LambdaFullAccess"
};

// asset-input/src/infra/event-bridge/helpers/eb-helper.ts
var eventBridgeClient = {
  client: {},
  connect() {
    this.client = new import_client_eventbridge.EventBridgeClient({ region: env.awsRegion });
  },
  getClient() {
    if (!this.client) {
      this.connect();
    }
    return this.client;
  }
};

// asset-input/src/infra/event-bridge/eb-publish-event-repository.ts
var EbPublishEventRepository = class {
  eventBridgeClient;
  constructor() {
    this.eventBridgeClient = eventBridgeClient.getClient();
  }
  async publish(data) {
    const event = {
      Entries: [
        {
          Source: "",
          DetailType: "",
          Detail: ""
        }
      ]
    };
    await this.eventBridgeClient.send(new import_client_eventbridge2.PutEventsCommand(event)).then((data2) => console.log("Event published successfully!")).catch((e) => console.error("Erro publishing event: ", JSON.stringify(e)));
  }
};

// asset-input/src/infra/simple-notification-service/sns-send-notification-repository.ts
var import_client_sns2 = require("@aws-sdk/client-sns");

// asset-input/src/infra/simple-notification-service/helpers/sns-helper.ts
var import_client_sns = require("@aws-sdk/client-sns");
var snsHelper = {
  client: {},
  connect() {
    this.client = new import_client_sns.SNSClient({ region: env.awsRegion });
  },
  getClient() {
    if (!this.client) {
      this.connect();
    }
    return this.client;
  }
};

// asset-input/src/infra/simple-notification-service/sns-send-notification-repository.ts
var SnsSendNotificationRepository = class {
  snsClient;
  constructor() {
    this.snsClient = snsHelper.getClient();
  }
  async send(data) {
    const message = {
      TargetArn: data.topic,
      Message: JSON.stringify(data.body),
      MessageStructure: "json",
      Subject: data.topic
    };
    await this.snsClient.send(new import_client_sns2.PublishCommand(message));
  }
};

// asset-input/src/main/factories/use-cases/db-session-creation-notification-factory.ts
var makeDbSessionCreationNotificationUseCase = () => {
  const sendNotificationRepository = new SnsSendNotificationRepository();
  const publishEventRepository = new EbPublishEventRepository();
  return new DsSessionCreationNotification(
    sendNotificationRepository,
    publishEventRepository
  );
};

// asset-input/src/main/factories/controllers/session-creation-notification-factory.ts
var makeSessionCreationNotificationController = () => {
  return new SessionCreationNotificationController(makeDbSessionCreationNotificationUseCase());
};

// asset-input/aws/stacks/LambdaModule/infra/api/session-creation-notification/handler.ts
async function handler(event) {
  console.log("event: ", JSON.stringify(event));
  const response = await adaptStepFunctionToLambda(event, makeSessionCreationNotificationController());
  return response;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
