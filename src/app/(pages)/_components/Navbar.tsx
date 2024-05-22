import React from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, usePathname } from "expo-router";
import { routes } from "@/constants/constants";

export default function Navbar() {
  const currentPath = usePathname();

  return (
    <View className="bg-[#13304B] h-[9%] w-screen rounded-t-2xl ">
      <View className="h-full w-full flex flex-row justify-around items-center px-8">
        {routes.map((route, index) => (
          <CustomLinks
            key={index}
            icon={
              <MaterialIcons
                name={route.icon as keyof typeof MaterialIcons.glyphMap}
                size={30}
                color={`${currentPath === route.path ? "white" : "#8190B6"}`}
              />
            }
            text={route.name}
            link={route.path}
            path={currentPath}
          />
        ))}
      </View>
    </View>
  );
}

const CustomLinks = ({ icon, text, link, path }) => {
  return (
    <Link href={link} disabled={link === path}>
      <View className="h-full flex flex-col justify-center items-center gap-0">
        {icon}
        <Text
          className={`${
            path === link ? "text-gray-100" : "text-[#8190B6]"
          } font-medium text-sm`}
        >
          {text}
        </Text>
      </View>
    </Link>
  );
};
