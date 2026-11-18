# BuraqPartner

Partner app for **Buraq**, built with React Native. It supports login with OTP verification and a main experience with bottom-tab navigation (Order, Items, Business, Account).

## Tech Stack

- **React Native** 0.83 · **React** 19.2
- **TypeScript**
- **React Navigation** (native-stack, bottom-tabs)
- **Zustand** + **AsyncStorage** (auth state, persisted)
- **TanStack React Query** (data fetching)
- **react-native-unistyles** (theming, light/dark)
- **react-native-gesture-handler** · **react-native-reanimated**
- **react-native-svg** + **react-native-svg-transformer**
- **patch-package** (for dependency patches)

## Prerequisites

- [Set up your React Native environment](https://reactnative.dev/docs/set-up-your-environment) (Node, JDK, Android Studio / Xcode, etc.)
- **Node.js** >= 20
- For iOS: **CocoaPods** and **Ruby** (for `bundle` / `pod install`)

## Project Structure

```
BuraqPartner/
├── App.tsx                 # Root app: auth gate, navigation, theme
├── index.js                # Entry: unistyles config + AppRegistry
├── src/
│   ├── constants/          # Theme and app constants
│   ├── unistyles/          # Unistyles theme config (light/dark)
│   └── container/
│       ├── components/     # e.g. ScreenWrapper
│       ├── context/        # Wrapper (Query, Gesture, SafeArea)
│       ├── navigation/     # Root stack + bottom tab navigators
│       ├── screens/        # Login, OtpVerification, Order, Items, Business, Account
│       ├── store/          # Zustand store (auth: login/logout, persisted)
│       └── utilities/
├── assets/fonts/           # Custom fonts (e.g. SF Pro Rounded)
├── android/                # Android native project
├── ios/                    # iOS native project
├── patches/                # patch-package patches (e.g. masked-view)
├── babel.config.js         # Unistyles plugin (root: 'src'), worklets
├── metro.config.js         # SVG transformer
└── react-native.config.js  # Asset linking (fonts)
```

## Getting Started

### 1. Install dependencies

```bash
npm install
# or
yarn install
```

`postinstall` runs `patch-package` automatically.

### 2. Start Metro

From the project root:

```bash
npm start
# or
yarn start
```

To clear Metro cache (e.g. after changing Unistyles or Babel config):

```bash
npm start -- --reset-cache
# or
yarn start --reset-cache
```

### 3. Run the app

With Metro running, in another terminal:

**Android**

```bash
npm run android
# or
yarn android
```

**iOS**

First time (or after updating native deps):

```bash
bundle install
cd ios && bundle exec pod install && cd ..
```

Then:

```bash
npm run ios
# or
yarn ios
```

## Environment

The app uses env files (e.g. `.env`, `.env.development`, `.env.production`) with `react-native-dotenv`. Do not commit secrets; use `.env.example` for required keys if needed.

## Main Features

- **Auth flow**: Login → OTP verification. Login state is stored in Zustand and persisted with AsyncStorage (`auth-storage`).
- **Navigation**:  
  - Not logged in: stack (Login, OtpVerification).  
  - Logged in: bottom tabs (Order, Items, Business, Account).
- **Theming**: Unistyles with light/dark themes; navigation theme is synced from Unistyles in `App.tsx`.
- **Global context**: React Query, GestureHandler, SafeAreaProvider wrapped in `Wrapper`.

## Available Scripts

| Command           | Description                    |
|------------------|--------------------------------|
| `npm start`      | Start Metro bundler            |
| `npm run android`| Build and run on Android       |
| `npm run ios`    | Build and run on iOS           |
| `npm run lint`   | Run ESLint                     |
| `npm test`       | Run Jest tests                 |

## Patches

The project uses [patch-package](https://github.com/ds300/patch-package). Patches (e.g. `@react-native-community/masked-view` for `jcenter` → `mavenCentral`) live in `patches/` and are applied on `npm install` / `yarn install`.

## Troubleshooting

- **Unistyles “not initialized”**: Ensure `babel.config.js` includes `react-native-unistyles/plugin` with `root: 'src'`, and that any file using Unistyles (e.g. `useUnistyles`, `StyleSheet.create`) is under `src/`. Then run Metro with `--reset-cache`.
- **Android build (jcenter)**: The masked-view patch should fix this; if not, run `npm install` again so patches are applied.
- **iOS**: If pods fail, try `cd ios && pod install --repo-update`.
- General: [React Native Troubleshooting](https://reactnative.dev/docs/troubleshooting).

## Learn More

- [React Native](https://reactnative.dev)
- [React Navigation](https://reactnavigation.org)
- [Zustand](https://github.com/pmndrs/zustand)
- [Unistyles](https://www.unistyl.es)
