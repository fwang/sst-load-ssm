import AWS from "aws-sdk";
import * as cdk from "@aws-cdk/core";
import AuthStack from "./AuthStack";
import WebStack from "./WebStack";

const ssm = new AWS.SSM();

export default function main(app) {
  app.setDefaultRemovalPolicy(cdk.RemovalPolicy.DESTROY);

  const ssmParamName = `/${app.name}/${app.stage}/UserPoolId`;

  // Create Auth Stack
  const authStack = new AuthStack(app, "auth-stack", ssmParamName);

  // Fetch SSM value using AWS SDK
  ssm.getParameter({ Name: ssmParamName }, (err, data) => {
    const ssmParamValue = err ? "placeholder" : data.Parameter.Value;
    // Create Web Stack
    new WebStack(app, "web-stack", ssmParamValue);
  });
}
