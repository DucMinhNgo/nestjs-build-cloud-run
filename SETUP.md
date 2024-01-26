https://vincenttechblog.com/fixed-cloud-run-failed-to-start-and-then-listen-on-the-port-defined-by-the-port/

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

# Push Cloud Functions
cd gcp-function

gcloud config set project YOUR_PROJECT_ID

gcloud functions deploy processBucketEvent \
  --runtime nodejs16 \
  --trigger-resource YOUR_BUCKET_NAME \
  --trigger-event google.storage.object.finalize 

gcloud config set project test-upload-47a24

gcloud functions deploy processBucketEvent \
  --runtime nodejs16 \
  --trigger-resource dustin-upload-file-function \
  --trigger-event google.storage.object.finalize 
  --project test-upload-47a24 
