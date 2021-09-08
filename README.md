```
npm install
```

Running in browser

```
npm run dev
```

Or running on a device / simulator

```
npm run build && npx cap sync
```

To add android

```
npm install @capacitor/android
npx cap add android
npx cap open android
```

Then [add camera permissions](https://capacitorjs.com/docs/apis/camera#android).