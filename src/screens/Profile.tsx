import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Heading, Separator } from "../components/basic";
import { useAuthContext } from "../context/AuthContext";
import { deleteAuthToken } from "../storage/authStorage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import { NavigationProp } from "@react-navigation/native";
import { RootBottomTabParamList } from "../navigation/types";

interface ProfileProps {
  navigation: NavigationProp<RootBottomTabParamList, "ProfileScreen">;
}

interface menuItems {
  id: number;
  name: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  navigate: keyof RootBottomTabParamList;
}

const menuItems: menuItems[] = [
  {
    id: 1,
    name: "Profile",
    icon: "account-outline",
    navigate: "UserDetailScreen",
  },
  {
    id: 2,
    name: "Your Orders",
    icon: "shopping-outline",
    navigate: "OrdersScreen",
  },
  { id: 3, name: "Your Cart", icon: "cart-outline", navigate: "CartScreen" },
  {
    id: 4,
    name: "Your Wishlist",
    icon: "cards-heart-outline",
    navigate: "WishListScreen",
  },
  // { name: "Settings", icon: "cog-outline", navigate: "" },
  // { name: "Help & Support", icon: "help-circle-outline", navigate: "" },
  // { name: "About Us", icon: "store-outline", navigate: "" },
];

const Profile: React.FC<ProfileProps> = ({ navigation }) => {
  const { user, setAuthToken } = useAuthContext();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <View
          style={{
            height: 100,
            width: 100,
            backgroundColor: "lightgray",
            borderRadius: 100,
          }}
        /> */}
        <Heading color="primaryTheme" align="center">
          Welcome,{"             "}
        </Heading>
        <Heading size={26} bold color="primaryTheme" align="center">
          {"        "}
          {user?.name}
        </Heading>
      </View>
      <Separator height={60} />

      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => navigation.navigate(item.navigate)}
        >
          <View style={styles.menuItem}>
            <MaterialCommunityIcons
              size={20}
              name={item.icon}
              color={colors.mediumGray}
              style={styles.menuItemIcon}
            />
            <Heading color="mediumGrayText">{item.name}</Heading>
          </View>
          <View style={styles.bar} />
        </TouchableOpacity>
      ))}
      <Separator height={80} />
      <Button
        title="LOGOUT"
        onPress={() => {
          setAuthToken(null);
          deleteAuthToken();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  menuItemIcon: { marginRight: 5 },
  bar: {
    height: 1.5,
    margin: 3,
    backgroundColor: "lightgray",
    opacity: 0.25,
  },
});

export default Profile;
