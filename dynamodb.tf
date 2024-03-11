resource "aws_dynamodb_table" "my_dynamo_db_table" {
  name           = "my-dynamo-db-table"
  billing_mode   = "PAY_PER_REQUEST"
  
  attribute {
    name = "game_session"
    type = "S"
  }

  attribute {
    name = "hostname"
    type = "S"
  }

  attribute {
    name = "players"
    type = "N"
  }

  attribute {
    name = "map"
    type = "S"
  }

  attribute {
    name = "mode"
    type = "S"
  }
}