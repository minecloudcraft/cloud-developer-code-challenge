# cloud-developer-code-challenge
Minecloudcraft - Cloud Developer - Code Challenges Placeholder

## Code Challenge (A)

### Objective
Your task is to demonstrate your skills in using Infrastructure as Code (IaC) to automate cloud resources provisioning. You will create a project on GitHub that provisions an AWS Step Function (Express) in AWS, integrating with other AWS services to simulate a game session workflow.

### Requirements

1. Infrastructure as Code: Utilize an IaC tool of your choice (e.g., AWS CloudFormation, Terraform) to provision the required AWS resources. Your code should be well-organized, commented, and follow best practices.
2. AWS Step Function (Express): Create an AWS Step Function (Express) that orchestrates the following workflow, which should be triggered by the reception of a **game-session-request.requested** event on the custom event bus `my-event-bus`:
    - Event Publishing:
At the start of the workflow, publish an event game-session-request.started to a custom event bus named my-event-bus.
    - DynamoDB Interaction: Insert an object into a DynamoDB table named my-dynamo-db-table. The object should describe a game session, including fields like hostname, players, map, and mode.
    - Error Handling: In case of any errors during the workflow, publish a game-session-request.failed event to my-event-bus.
    - Success Completion: Upon successful completion of the workflow, publish a game-session-request.finished event to my-event-bus.
3. Event Examples:

    - **game-session-request.requested**

```json
{
  "source": "code-challenge",
  "detail-type": "game-session-request.requested",
  "detail": {
    "sessionId": "<unique_session_id>",
    "gameDetails": {
      "hostname": "<hostname>",
      "players": <number_of_players>,
      "map": "<game_map>",
      "mode": "<game_mode>"
    }
  }
}
```
- **game-session-request.started**
```json
{
  "source": "code-challenge",
  "detail-type": "game-session-request.started",
  "detail": {
    "sessionId": "<unique_session_id>"
  }
}
```
- **game-session-request.failed**
```json
{
  "source": "code-challenge",
  "detail-type": "game-session-request.failed",
  "detail": {
    "sessionId": "<unique_session_id>",
    "error": "<error_message>"
  }
}
```
- **game-session-request.finished**
```json
{
  "source": "code-challenge",
  "event": "game-session-request.finished",
  "detail": {
    "sessionId": "<unique_session_id>",
    "gameDetails": {
      "hostname": "<hostname>",
      "players": <number_of_players>,
      "map": "<game_map>",
      "mode": "<game_mode>"
    }
  }
}
```

### Submission Guidelines

- Fork this GitHub repository
- Ensure your project is well-documented, explaining how to deploy and test your infrastructure.
- Once completed, submit a pull request to the main repository with your changes.
- Include a `NOTES.md` in your project detailing your approach, any assumptions made, and instructions on how to execute your IaC scripts.

### Evaluation Criteria

- Code Quality: Clarity, maintainability, and adherence to IaC best practices.
- Functionality: The AWS resources are provisioned as per the requirements, and the Step Function workflow executes correctly upon receiving the game-session-request.requested event.
- Documentation: Clear instructions and explanations in your project's NOTES.md.

Good luck, and we're looking forward to seeing your innovative solutions!
