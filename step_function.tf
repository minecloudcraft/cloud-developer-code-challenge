resource "aws_sfn_state_machine" "game_session_state_machine" {
  name     = "game-session-state-machine"
  role_arn = aws_iam_role.step_function_execution_role.arn

  definition = <<DEFINITION
{
  "StartAt": "PublishStartedEvent",
  "States": {
    "PublishStartedEvent": {
      "Type": "Task",
      "Resource": "arn:aws:states:::events:putEvents",
      "Parameters": {
        "Entries": [{
          "EventBusName": "my-event-bus",
          "DetailType": "game-session-request.started",
          "Detail": {
            "sessionId.$": "$.detail.sessionId"
          }
        }]
      },
      "Next": "InsertIntoDynamoDB"
    },
    "InsertIntoDynamoDB": {
      "Type": "Task",
      "Resource": "arn:aws:states:::dynamodb:putItem",
      "Parameters": {
        "TableName": "${aws_dynamodb_table.my_dynamo_db_table.name}",
        "Item": {
          "game_session": { "S.$": "$.detail.sessionId" },
          "hostname": { "S.$": "$.detail.gameDetails.hostname" },
          "players": { "N.$": "$.detail.gameDetails.players" },
          "map": { "S.$": "$.detail.gameDetails.map" },
          "mode": { "S.$": "$.detail.gameDetails.mode" }
        }
      },
      "Retry": [{
        "ErrorEquals": ["States.ALL"],
        "IntervalSeconds": 3,
        "MaxAttempts": 2,
        "BackoffRate": 2.0
      }],
      "Next": "PublishFinishedEvent",
      "Catch": [{
        "ErrorEquals": ["States.ALL"],
        "Next": "PublishFailedEvent"
      }]
    },
    "PublishFinishedEvent": {
      "Type": "Task",
      "Resource": "arn:aws:states:::events:putEvents",
      "Parameters": {
        "Entries": [{
          "EventBusName": "my-event-bus",
          "DetailType": "game-session-request.finished",
          "Detail": {
            "sessionId.$": "$.detail.sessionId",
            "hostname.$": "$.detail.gameDetails.hostname",
            "players.$": "$.detail.gameDetails.players",
            "map.$": "$.detail.gameDetails.map",
            "mode.$": "$.detail.gameDetails.mode"
          }
        }]
      },
      "End": true
    },
    "PublishFailedEvent": {
      "Type": "Task",
      "Resource": "arn:aws:states:::events:putEvents",
      "Parameters": {
        "Entries": [{
          "EventBusName": "my-event-bus",
          "DetailType": "game-session-request.failed",
          "Detail": {
            "sessionId.$": "$.detail.sessionId",
            "error": "Error occurred"
          }
        }]
      },
      "End": true
    }
  }
}
DEFINITION
}