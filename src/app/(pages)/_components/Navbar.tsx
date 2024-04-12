import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Link, usePathname } from 'expo-router';
import { routes } from '@/constants/constants';

export default function Navbar() {
  const currentPath = usePathname();

  return (
    <View className="bg-slate-900 h-20 w-screen">
      <View className='h-full w-full flex flex-row justify-between items-center px-16'>
        {routes.map((route, index) => (
          <CustomLinks
            key={index}
            icon={<MaterialIcons name={route.icon as keyof typeof MaterialIcons.glyphMap} size={25} color={`${currentPath === route.path ? "white" : "gray"}`} />}
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
      <View className='h-full flex flex-col justify-center items-center gap-0'>
        {icon}
        <Text className={`${path === link ? "text-gray-100" : "text-gray-600"} font-medium text-xl`}>{text}</Text>
      </View>
    </Link>
  );
};
