import * as ssm from "@aws-cdk/aws-ssm";
import * as sst from "@serverless-stack/resources";

export default class AuthStack extends sst.Stack {
  constructor(scope, id, ssmParamName) {
    super(scope, id);

    const auth = new sst.Auth(this, "Auth", {
      cognito: true,
    });

    this.ssmUserPoolId = new ssm.StringParameter(this, "UserPoolIdParameter", {
      parameterName: ssmParamName,
      stringValue: auth.cognitoUserPool.userPoolId,
    });
  }
}
