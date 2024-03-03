## Code Challenge (A)

### Build Guidelines
- Created folder and structure of terraform files
    * /terraform

- Started by providers and access keys
    * Terraform and AWS, Access key "personal" acess temporary (saving in secreat of github)
    * Acessed to step functions, logs and events, not console just services on credentials file

- Build function app
    * basically create resource and import the structions of readme.md

- Build connection with db (dynamodb)
    * Taked sessionId from functionApp

- Build CI github workflows actions yaml
    * Created stages of ci/cd 3 enviroments, dev, int and ope. with push on branchs and manually tringer.
    * Init, validate, plan, deploy, destroy (after sleep 6min, just for validate all)
    * Taked secrets from github and import to terraform
    * installed packges and dependeces of pipeline will needed to working fine
    * Builded credential files for import and save terraform .tfstate on s3 bucket
    * After runing task, (needs) depends task before to run next.