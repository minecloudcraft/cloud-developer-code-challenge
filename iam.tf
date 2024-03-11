resource "aws_iam_role" "step_function_execution_role" {
  name = "step-function-execution-role"
  assume_role_policy = jsonencode({
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Principal": {
        "Service": "states.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_policy_attachment" "step_function_execution_policy_attachment" {
  name       = "step-function-execution-policy-attachment"
  roles      = [aws_iam_role.step_function_execution_role.name]
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSStepFunctionsFullAccess"
}