# dockerfile_deployments

## Dockerfile

1) created 3 microservices (fe, be [with 3 apis])

2) then created Dockerfile for each services to build the apps using multistage so we can reduce the apps size

3) commands: docker build -t fe:v1 ./fe (to build locally)

             docker run -p 80:80 fe:v1 (running docker locally)

             docker tag fe:v1 <username>/fe:v1

             docker push <username>/.fe:v1   (to push the img to registry for everyone)
