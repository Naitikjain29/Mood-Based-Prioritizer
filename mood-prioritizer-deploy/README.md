# 🚀 Deploy Mood Prioritizer to Google Cloud App Engine

## What's in this folder
- `index.html` — your app
- `app.yaml`   — App Engine config

---

## Prerequisites (one-time setup)

1. **Install Google Cloud SDK**
   → https://cloud.google.com/sdk/docs/install

2. **Login to Google**
   ```
   gcloud auth login
   ```

3. **Set your project** (use your existing project ID like `mythic-fire-494008-r4`)
   ```
   gcloud config set project YOUR_PROJECT_ID
   ```
   To create a NEW project:
   ```
   gcloud projects create YOUR_NEW_PROJECT_ID
   gcloud config set project YOUR_NEW_PROJECT_ID
   ```

4. **Enable App Engine** (only needed for new projects)
   ```
   gcloud app create --region=us-central
   ```

---

## Deploy (just one command!)

Open a terminal, navigate to this folder, then run:

```
gcloud app deploy
```

Type **Y** when prompted.

---

## Your live URL

After deploy, your site will be live at:
```
https://YOUR_PROJECT_ID.uc.r.appspot.com
```

Open it with:
```
gcloud app browse
```

Works on ALL devices — phone, tablet, desktop. ✅
