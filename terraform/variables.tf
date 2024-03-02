variable "access" {
  description = "The Amazon Access ID"
  type        = string
  default     = ""
}

variable "secret" {
  description = "The Amazon Secret Key"
  type        = string
  default     = ""
}

variable "dynamodb-name" {
  description = "The Amazon Dynamodb Name"
  type        = string
  default     = "dynamodb"
}

variable "sfn-name" {
  description = "The Amazon Step Function Name"
  type        = string
  default     = "sfn"
}

variable "session-id" {
  description = "Session ID of reference to DB"
  type        = string
  default     = "$.detail.sessionId"
}

variable "role-arn" {
  description = "The Amazon IAM Rode"
  type        = string
  default     = ""
}

variable "function-name" {
  description = "The Amazon Function Name"
  type        = string
  default     = "function"
}