resource "aws_cloudwatch_event_rule" "game_session_event_rule" {
  name                = "game-session-event-rule"
  event_bus_name      = "my-event-bus"
  event_pattern       = <<PATTERN
{
  "source": ["code-challenge"],
  "detail-type": ["game-session-request.requested"]
}
PATTERN

  target {
    arn = aws_sfn_state_machine.game_session_state_machine.arn
    id  = "StartGameSessionWorkflow"
  }
}