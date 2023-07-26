import React, { useEffect, useState } from "react";
import { Text } from "react-native";

const CountdownComponent = ({ discountEndDate }) => {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const endTime = new Date(discountEndDate).getTime();
      const timeRemaining = endTime - currentTime;

      if (timeRemaining > 0) {
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        setCountdown(
          `${days} gün ${hours} saat ${minutes} dakika ${seconds} saniye`
        );
      } else {
        setCountdown("İndirim süresi doldu!");
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [discountEndDate]);

  return (
    <Text
      style={{
        fontSize: 14,
        margin: 0,
        color: "red",
        backgroundColor: "#f5f5f5",
        fontWeight: "bold",
      }}
    >
      {countdown}
    </Text>
  );
};

export default CountdownComponent;
