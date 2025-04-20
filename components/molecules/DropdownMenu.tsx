import React, { useRef, useEffect, useState } from 'react';
import { View, Modal, TouchableWithoutFeedback } from 'react-native';

interface DropdownMenuProps {
    visible: boolean;
    handleClose: () => void;
    handleOpen: () => void;
    trigger: React.ReactNode;
    children: React.ReactNode;
    dropdownWidth?: number;
}

export function DropdownMenu({
    visible,
    handleOpen,
    handleClose,
    trigger,
    children,
    dropdownWidth = 150,
}: DropdownMenuProps) {
    const triggerRef = useRef<View>(null);
    const [position, setPosition] = useState({ x: 0, y: 0, width: 0 });

    useEffect(() => {
        if (triggerRef.current && visible) {
            triggerRef.current.measure((fx, fy, width, height, px, py) => {
                setPosition({
                    x: px,
                    y: py + height,
                    width: width,
                });
            });
        }
    }, [visible]);

    return (
        <View>
            <TouchableWithoutFeedback onPress={handleOpen}>
                <View ref={triggerRef}>{trigger}</View>
            </TouchableWithoutFeedback>
            {visible && (
                <Modal
                    transparent={true}
                    visible={visible}
                    animationType="fade"
                    onRequestClose={handleClose}>
                    <TouchableWithoutFeedback onPress={handleClose}>
                        <View className="flex-1 bg-black/50">
                            <View
                                className="absolute bg-white rounded-md p-2 shadow-lg"
                                style={{
                                    top: position.y,
                                    left: position.x + position.width / 2 - dropdownWidth / 2,
                                    width: dropdownWidth,
                                }}>
                                {children}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            )}
        </View>
    );
}