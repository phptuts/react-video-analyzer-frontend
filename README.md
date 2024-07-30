# Video Analyzer

A website for for using Open AI and Firebase to analyze videos.

## Setup

1. Create a file in the root of your project named .env
2. Copy the .env.example file contents into that file
3. Go to your project settings page copy all the values from it into your .env


## Firestore Rules

```bash
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    match /videos/{videoId} {
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
      allow update, read: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

## Firestorage Rules

```bash
rules_version = '2';

// Craft rules based on data in your Firestore database
// allow write: if firestore.get(
//    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
service firebase.storage {
  match /b/{bucket}/o {
    match /videos/{userId}/{videoId} {
      allow read, write: if request.auth != null && // auth required
                            request.auth.uid == userId && // must match the user id uploading the file
                            request.resource.size < 1 * 1024 * 1024 * 1024; // must be under 1 gigabyte
    }
  }
}
```
