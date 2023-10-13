export AWS_REGION=us-east-2
export AWS_PROFILE=$1

aws cognito-idp create-user-pool-client \
--user-pool-id us-east-2_6AWzN3GYE \
--client-name client-portal \
--no-generate-secret \
--callback-urls http://localhost:5000 \
--allowed-o-auth-flows code \
--allowed-o-auth-scopes openid email profile \
--supported-identity-providers AzureAD \
--allowed-o-auth-flows-user-pool-client


#aws cognito-idp create-identity-provider \
#--user-pool-id us-east-2_6AWzN3GYE \
#--provider-name=AzureAD \
#--provider-type SAML \
#--provider-details MetadataURL=https://login.microsoftonline.com/1d002f76-d7f6-43b6-86a5-4fb7293c2909/federationmetadata/2007-06/federationmetadata.xml?appid=446ae1f7-3235-4923-91b1-16dbe9e7a9b4 \
#--attribute-mapping email=http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress,ad-group=http://schemas.microsoft.com/ws/2008/06/identity/claims/groups

#aws cognito-idp add-custom-attributes \
#--user-pool-id us-east-2_6AWzN3GYE \
#--custom-attributes Name=ad-group,AttributeDataType="String"