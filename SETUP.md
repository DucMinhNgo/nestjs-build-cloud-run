https://www.youtube.com/watch?v=ZmfDlUAokYc

Mac: docker buildx build --platform linux/amd64 -t test .

Linux: docker build -t app .

docker run -p 8888:80 app

# Config

gcloud

# Auth

gcloud auth login

gcloud auth configure-docker

# Push docker to container registry

docker tag image_name gcr.io/project_id/app

docker tag app gcr.io/test-upload-47a24/app

docker push gcr.io/test-upload-47a24/app
