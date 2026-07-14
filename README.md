# RecipeApp — Expo Mobile App

A cross-platform mobile app built with **Expo + React Native**.

## Features (9 user stories)
- Signup / Login (AsyncStorage-backed)
- Home feed powered by TheMealDB API
- Recipe detail screen
- Favorites with local storage persistence
- Bottom tabs: Feed, Favorites, Profile
- Settings menu (⚙️ icon in header)
- Settings screen with toggles
- Local notifications via expo-notifications

## Run locally
```bash
npm install
npx expo start
```
Scan the QR code with the **Expo Go** app on your phone.

## Build APK
```bash
npm install -g eas-cli
eas build -p android --profile preview
```
