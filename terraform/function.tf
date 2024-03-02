resource "aws_sfn_state_machine" "game_session_workflow" {
  name     = var.function-name
  role_arn = var.role-arn
  type     = "EXPRESS"
  definition = <<EOF
{
  "Comment": "Game Session Workflow",
  "StartAt": "EventPublishing",
  "States": {
    "EventPublishing": {
      "Type": "Task",
      "Resource": "arn:aws:states:::events:putEvents",
      "Parameters": {
        "Entries": [
          {
            "EventBusName": "my-event-bus",
            "DetailType": "game-session-request.started",
            "Detail": {
              "sessionId.$": "$.detail.sessionId"
            }
          }
        ]
      },
      "Next": "DynamoDBInteraction"
    },
    "DynamoDBInteraction": {
      "Type": "Task",
      "Resource": "arn:aws:states:::dynamodb:putItem",
      "Parameters": {
        "TableName": "my-dynamo-db-table",
        "Item": {
          "sessionId": {
            "S.$": "$.detail.sessionId"
          },
          "hostname": {
            "S.$": "$.detail.gameDetails.hostname"
          },
          "players": {
            "N.$": "$.detail.gameDetails.players"
          },
          "map": {
            "S.$": "$.detail.gameDetails.map"
          },
          "mode": {
            "S.$": "$.detail.gameDetails.mode"
          }
        }
      },
      "Catch": [
        {
          "ErrorEquals": ["States.ALL"],
          "Next": "ErrorHandling"
        }
      ],
      "Next": "SuccessCompletion"
    },
    "ErrorHandling": {
      "Type": "Task",
      "Resource": "arn:aws:states:::events:putEvents",
      "Parameters": {
        "Entries": [
          {
            "EventBusName": "my-event-bus",
            "DetailType": "game-session-request.failed",
            "Detail": {
              "sessionId.$": "$.detail.sessionId",
              "error.$": "$.Error"
            }
          }
        ]
      },
      "End": true
    },
    "SuccessCompletion": {
      "Type": "Task",
      "Resource": "arn:aws:states:::events:putEvents",
      "Parameters": {
        "Entries": [
          {
            "EventBusName": "my-event-bus",
            "DetailType": "game-session-request.finished",
            "Detail": {
              "sessionId.$": "$.detail.sessionId",
              "gameDetails.$": "$.detail.gameDetails"
            }
          }
        ]
      },
      "End": true
    }
  }
}
EOF
}