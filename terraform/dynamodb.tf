resource "aws_dynamodb_table" "my_dynamo_db_table" {
  name           = var.dynamodb-name
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = var.session-id
  attribute {
    name = var.session-id
    type = "S"
  }
  depends_on = [ aws_sfn_state_machine.game_session_workflow ]
}