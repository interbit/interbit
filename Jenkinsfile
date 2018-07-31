node {
  currentBuild.result = "SUCCESS"

  try {
    stage('Checkout') {
      checkout scm
    }

    stage('Setup') {
      sh 'docker system prune --force'
      sh 'docker build -f docker-base.Dockerfile -t docker-base -t docker-base:latest .'
    }

    stage('Build Platform Deploy Docker') {
      env.NODE_ENV = "production"
      sh 'aws s3 cp s3://citizens-config/env-platform-deploy.sh env-platform-deploy.sh'
      sh 'docker build -f platform-deploy.Dockerfile -t platform-deploy -t 409163884834.dkr.ecr.us-east-2.amazonaws.com/platform-deploy:$BUILD_NUMBER -t 409163884834.dkr.ecr.us-east-2.amazonaws.com/platform-deploy:latest .'
    }

    stage('Build Web Auth Docker') {
      env.NODE_ENV = "production"
      sh 'aws s3 cp s3://citizens-config/env-web-auth.sh env-web-auth.sh'
      sh 'docker build -f web-auth.Dockerfile -t web-auth -t 409163884834.dkr.ecr.us-east-2.amazonaws.com/web-auth:$BUILD_NUMBER -t 409163884834.dkr.ecr.us-east-2.amazonaws.com/web-auth:latest .'
    }

    stage('Build Accounts') {
      sh 'rm -rf ./packages/app-account/build/'
      nodejs(nodeJSInstallationName: '10.4.1') {
        sh 'npm install'
        sh 'export APP_NAME=app-account; npm run postinstall; npm run build'
      }
    }

    stage('Deploy Platform Deploy') {
      sh script: './deploy.sh "platform-deploy"'
    }

    stage('Deploy Web Auth') {
      sh script: './deploy.sh "web-auth"'
    }

    stage('Deploy Static Sites') {
      sh 'aws s3 cp ./packages/app-account/build/ s3://citizens.interbit.io/ --recursive'
    }

    stage('Wait for Deployment Completion') {
      sh 'echo "Sleeping for deployment completion (180s)"'
      sh 'sleep 180'
    }

    stage('Run MTTF') {
      withCredentials([string(credentialsId: 'BROWSERSTACK_KEY', variable: 'BROWSERSTACK_KEY'), string(credentialsId: 'BROWSERSTACK_USER', variable: 'BROWSERSTACK_USER')]) {
        nodejs(nodeJSInstallationName: '10.4.1') {
          sh 'cd packages/interbit-e2e; npm run mttf'
        }
      }
    }

    stage('cleanup') {
        archiveArtifacts allowEmptyArchive: true, artifacts: '*.log'
    }
  }
  catch (err) {
    currentBuild.result = "FAILURE"
    throw err
  }
}
