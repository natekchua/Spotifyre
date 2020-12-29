const withSwCheck = (cb: () => void) => {
  if (!navigator.serviceWorker) {
    console.warn('Service workers are not supported');
    return;
  }

  cb();
};

const registerSw = (name: string) => withSwCheck(async () => {
  try {
    await navigator.serviceWorker
      .register(name);
  } catch (err) {
    console.error(`Failed to register ${name}`);
    throw err;
  }
});

export const registerFirebaseMessaging = () => registerSw('firebase-messaging-sw.js');
