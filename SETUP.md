https://vincenttechblog.com/fixed-cloud-run-failed-to-start-and-then-listen-on-the-port-defined-by-the-port/

https://www.youtube.com/watch?v=ZmfDlUAokYc

Mac: docker buildx build --platform linux/amd64 -t app-30-01-2024 .

Linux: docker build -t app .

docker run -p 8888:80 app

# Config

gcloud

# Auth

gcloud auth login

gcloud auth configure-docker

# Push docker to container registry

docker tag image_name gcr.io/project_id/app

docker tag app-30-01-2024 gcr.io/test-upload-47a24/app-30-01-2024

docker push gcr.io/test-upload-47a24/app-30-01-2024

# Push Cloud Functions
cd gcp-function

gcloud config set project YOUR_PROJECT_ID

gcloud functions deploy processBucketEvent \
  --runtime nodejs16 \
  --trigger-resource YOUR_BUCKET_NAME \
  --trigger-event google.storage.object.finalize 


gcloud config set project test-upload-47a24

gcloud functions deploy processBucketEvent \
  --runtime nodejs18 \
  --trigger-resource dustin-upload-file-function \
  --trigger-event google.storage.object.finalize 

# Push Cloud Jobs
https://cloud.google.com/run/docs/quickstarts/jobs/build-create-nodejs

gcloud run jobs deploy job-quickstart \
    --source . \
    --tasks 50 \
    --set-env-vars SLEEP_MS=10000 \
    --set-env-vars FAIL_RATE=0.1 \
    --max-retries 5 \
    --region REGION \
    --project=PROJECT_ID

gcloud run jobs execute job-quickstart --region REGION

gcloud run jobs deploy job-2 \
    --source . \
    --tasks 1 \
    --set-env-vars SLEEP_MS=10000 \
    --set-env-vars FAIL_RATE=0.1 \
    --max-retries 5 \
    --region us-central1 \
    --project=test-upload-47a24

gcloud run jobs execute job-2 --region us-central1

gcloud beta run jobs list --region us-central1
