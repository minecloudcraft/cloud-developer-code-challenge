# cloud-developer-code-challenge

## My approach

To complete this challenge I used my AWS account and did the hole project using the console and reading the AWS Documentation when any difficulties appeared.

## My assumptions

At first I thought the challenge would be more complicated than it actually was, but after a few time studying an starting to do it, I realized that with dedication I could overcome it.

## Instructions

To use this code firts you need to create a event bus named "my-event-bus" in the Amazon EventBridget and a tablem named "my-dynamo-db-table" in Amazon DynamoDB. Then you create a satate machine using the AWS Step Functions and put the code "step_function_state_machine". Then you go to Amazon EventBridget and create a rule with the code "event-bus-rule" (don't forget to adapt the code to your situation, such as the AWS region and the state machine name). After that you can create a new event in the event bus, putting in the source "code-challenge", and it will trigger the work flow.It is essential that the event has the following pattern in "Event detail":

```json
"sessionId": "<unique_session_id>",
"gameDetails": {
    "hostname": "<hostname>",
    "players": "<number_of_players>",
    "map": "<game_map>",
    "mode": "<game_mode>"
}
```

The follow image represents the workflow created in the state machine:

![workflow](assets/workflow.jpg)