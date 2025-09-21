
"use client";

import { useState } from "react";

export default function PushSubscription() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [error, setError] = useState(null);

  const subscribe = async () => {
    try {
      const swRegistration = await navigator.serviceWorker.ready;
      const pushManager = swRegistration.pushManager;
      const subscription = await pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: "BHzSs0Fs3Lo-wdRY2eQ0nix3-wL2HhfSTLDPceKOwew5dBqNUdKG8I9l0UUCHkuzNoeH8pQFRGJNVRy3vd77BwE", // Replace with your VAPID public key
      });
      setIsSubscribed(true);
      setSubscription(subscription);
      console.log("User is subscribed.", subscription);
      // TODO: Send subscription to your server
    } catch (error) {
      setError(error);
      console.error("Failed to subscribe the user: ", error);
    }
  };

  const unsubscribe = async () => {
    try {
      const swRegistration = await navigator.serviceWorker.ready;
      const pushManager = swRegistration.pushManager;
      const subscription = await pushManager.getSubscription();
      if (subscription) {
        await subscription.unsubscribe();
        setIsSubscribed(false);
        setSubscription(null);
        console.log("User is unsubscribed.");
        // TODO: Send unsubscribe request to your server
      }
    } catch (error) {
      setError(error);
      console.error("Failed to unsubscribe the user: ", error);
    }
  };

  return (
    <div>
      <h2>Push Notifications</h2>
      {error && <p style={{ color: "red" }}>{error.message}</p>}
      {isSubscribed ? (
        <button onClick={unsubscribe}>Unsubscribe from Notifications</button>
      ) : (
        <button onClick={subscribe}>Subscribe to Notifications</button>
      )}
    </div>
  );
}
