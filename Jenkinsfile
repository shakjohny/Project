pipeline {
  environment {
    dockerRegistry = "alekha/demo"
    dockerRegistryCredential = 'dockerhub'
    dockerImage = ''
  }
  agent any
  tools {
    nodejs "node"
  }
  stages {
    stage('Cloning Git') {
      steps {
        git 'https://github.com/alekha369/NodeJS'
      }
    }
    stage('Build') {
       steps {
         sh 'npm install'
       }
    }
    stage('Test') {
      steps {
        sh 'npm test'
      }
    }
    stage('Building image') {
      steps{
        script {
          dockerImage = docker.build dockerRegistry + ":$BUILD_NUMBER"
        }
      }
    }
    stage('Upload Image') {
      steps{
        script {
          docker.withRegistry( '', dockerRegistryCredential ) {
            dockerImage.push()
          }
        }
      }
    }
    stage('Remove Unused docker image') {
      steps{
        sh "docker rmi $dockerRegistry:$BUILD_NUMBER"
      }
    }
    
      stage ('Deploy') {
           steps {
               script{
                   def image_id = registry + ":$BUILD_NUMBER"
                   sh "ansible-playbook  playbook.yml --extra-vars \"image_id=${image_id}\""
               }
           }
       }
      
  }
 }
