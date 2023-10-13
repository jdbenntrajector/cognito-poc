#!/bin/bash
export AWS_REGION=us-east-2
export AWS_PROFILE=$1
domain=trajector
cognitoDomain="https://$domain.auth.$AWS_REGION.amazoncognito.com"
id=$(aws cognito-idp create-user-pool --pool-name $domain-users | jq -r '.UserPool.Id')
echo "User Pool Created:  $id"

aws cognito-idp create-user-pool-domain --domain $domain --user-pool-id $id
echo "Cognito Domain $cognitoDomain"

echo "Creating Default Resource Server"
resourceServer=$(aws cognito-idp create-resource-server --user-pool-id $id \
--identifier https://$domain.com --name $domain"Apis" \
--scopes ScopeName=api-access,ScopeDescription="Allows access to all $domain APIs")

machineAppClient=$(aws cognito-idp create-user-pool-client --user-pool-id $id \
--client-name demo-machine-app-client --generate-secret \
--allowed-o-auth-flows client_credentials --allowed-o-auth-scopes "https://$domain.com/api-access" | jq -r '.')

echo "$machineAppClient"

machineClientId=$(jq -r '.UserPoolClient.ClientId' <<< "${machineAppClient}")
machineClientSecret=$(jq -r '.UserPoolClient.ClientSecret' <<< "${machineAppClient}")

echo "User Pool, Default Resource Server and App Client created for Client Credentials flow"
echo "to obtain an access token:"
echo "curl -X POST $cognitoDomain/oauth2/token"
echo "     -H "Content-Type: application/x-www-form-urlencoded""
echo "     -d grant_type=client_credentials&client_id=$machineClientId&client_secret=$machineClientSecret"



# aws cognito-idp delete-user-pool-domain --user-pool-id $id --domain $domain
# aws cognito-idp delete-user-pool --user-pool-id $id