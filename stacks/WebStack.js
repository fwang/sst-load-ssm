import * as ssm from "@aws-cdk/aws-ssm";
import * as sst from "@serverless-stack/resources";

export default class WebStack extends sst.Stack {
  constructor(scope, id, ssmParamValue) {
    super(scope, id);

    console.log({ ssmParamValue });
  }
}

