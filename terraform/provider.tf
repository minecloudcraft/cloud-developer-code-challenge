terraform {
  backend "s3" {
    bucket = "terraform-s3-state-1998"
    key = "cloud-code-challenge"
    region = "us-west-2"
    shared_credentials_file = "../credentials"
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region = "us-west-2"
  access_key = var.access
  secret_key = var.secret
}