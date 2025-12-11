# dockerfile_deployments

## Dockerfile

1) created 3 microservices (fe, be [with 3 apis])

2) then created Dockerfile for each services to build the apps using multistage so we can reduce the apps size

3) commands: 

             docker build -t fe:v1 ./fe (to build locally)

             docker run -p 80:80 fe:v1 (running docker locally)

             docker tag fe:v1 <username>/fe:v1

             docker push <username>/.fe:v1   (to push the img to registry for everyone)


## Docker Compose

1) prev it is taking time to build one by one img in every microservices so to reduce that load we can directly use docker compose to manage and start the microservices in docker.

2) Drawbacks are:

                  when each container crahsed --> so IP changes --> API breaks

                  scaling --> new replicas --> it will create conflict between unknown IP's

                  managing multiple services become headache (solution Internal DNS)

3) so I have created docker compose (.yaml) files in that files I mentioned every microservices with exposed port and commands as usual we used in Dockerfile
