import * as SecureStore from "expo-secure-store";

const KEY = "ReVision";

const storeAuthToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync(KEY, token);
  } catch (error) {
    console.log("Error storing auth token: ", error);
  }
};

const getAuthToken = async () => {
  try {
    return await SecureStore.getItemAsync(KEY);
  } catch (error) {
    console.log("Error getting auth token: ", error);
  }
};

const deleteAuthToken = async () => {
  try {
    return await SecureStore.deleteItemAsync(KEY);
  } catch (error) {
    console.log("Error deleting auth token: ", error);
  }
};

export { getAuthToken, storeAuthToken, deleteAuthToken };
