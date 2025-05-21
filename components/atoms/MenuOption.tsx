import { ReactNode } from 'react';
import { Text, TouchableOpacity } from 'react-native';

export const MenuOption = ({
    onSelect,
    children,
}: {
    onSelect: () => void;
    children: ReactNode;
}) => {
    return (
        <TouchableOpacity onPress={onSelect} className='p-2'>
            <Text>{children}</Text>
        </TouchableOpacity>
    );
};