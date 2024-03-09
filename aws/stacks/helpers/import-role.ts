import { Role } from 'aws-cdk-lib/aws-iam'
import { Construct } from 'constructs'
import { env } from '../../../env'

export const importRole = (app: Construct, roleId: string, roleName: string): any => {
  // Gets Role by constructing the ARN
  const importedRole = Role.fromRoleArn(app, roleId, `arn:aws:iam::${env.awsAccountId}:role/${roleName}`, { mutable: false }) as any
  return importedRole
}
