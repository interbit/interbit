#!/usr/bin/env bash

set -e
set -u
set -o pipefail

JQ="jq --raw-output --exit-status"

# Pass in family at position 1
deploy_image() {
  eval $(aws ecr get-login --region us-east-2 --no-include-email)
  docker push 409163884834.dkr.ecr.us-east-2.amazonaws.com/$1:$BUILD_NUMBER | cat
  docker push 409163884834.dkr.ecr.us-east-2.amazonaws.com/$1:latest | cat
}

# Pass in family at position 1
make_task_def() {

    task_template='[
	{
	    "name":      "%s",
      "image":     "409163884834.dkr.ecr.us-east-2.amazonaws.com/%s:%s",
	    "essential": true,
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group":  "%s",
          "awslogs-region": "us-east-2"
        }
      },
	    "cpu":       1024,
	    "memory":    2048,
      "portMappings": [
        {
          "containerPort": 5000,
          "hostPort":      0,
          "protocol":      "tcp"
        }
      ],
      "links":     [],
      "command":     [],
      "environment": [],
      "mountPoints": []
	}
    ]'

    task_def=$(printf "$task_template" $1 $1 $BUILD_NUMBER $1)

}

register_definition() {
    if revision=$(aws ecs register-task-definition --region us-east-2 --container-definitions "$task_def" --family $family | $JQ '.taskDefinition.taskDefinitionArn'); then
        echo "Revision: $revision"
    else
        echo "Task Definition Registration Failure"
        return 100
    fi
}

deploy() {
    family="$1"

    deploy_image $family

    make_task_def $family

    register_definition

    if [[ $(aws ecs update-service --region us-east-2 --cluster citizens --service $family --task-definition $revision | \
                   $JQ '.service.taskDefinition') != $revision ]]; then
        echo "Error updating service."
        return 1
    fi
}

echo "Deploying $1"

deploy $1
