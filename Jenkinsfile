pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }      
    }
    post {
        success {
            sh 'cp -r /var/lib/jenkins/workspace/template /home/proz/deployment/'
            
        }
        failure {
            sh 'cp -f /var/lib/jenkins/workspace/template /home/proz/deployment/'
        }
    }
}
