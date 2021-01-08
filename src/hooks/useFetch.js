import { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";

export default url => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("token");

    if (token === null) {
      return console.log("no deberias estar aqui");
    }

    const response = await fetch(url, {
      headers: {
        authorization: token
      }
    });
    const json = await response.json();

    setData(json);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { loading, data };
};
