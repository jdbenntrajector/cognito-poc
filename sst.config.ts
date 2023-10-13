import { SSTConfig } from "sst";
import { API } from "./stacks/CognitoStack";

export default {
  config(_input) {
    return {
      name: "authentication",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(API);
  }
} satisfies SSTConfig;
