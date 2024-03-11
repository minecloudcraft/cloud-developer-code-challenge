output "dynamodb_table_arn" {
  value = aws_dynamodb_table.my_dynamo_db_table.arn
}

output "state_machine_arn" {
  value = aws_sfn_state_machine.game_session_state_machine.arn
}