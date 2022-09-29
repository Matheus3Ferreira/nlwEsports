import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, Modal, ModalProps } from "react-native";

import { styles } from "./styles";

interface IProfileMenuProps extends ModalProps {
  username: string;
  discriminator: string;
  onClose: () => void;
}

export function ProfileMenu({
  onClose,
  username,
  discriminator,
}: IProfileMenuProps) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Modal transparent statusBarTranslucent animationType="fade">
        <TouchableOpacity style={styles.invisibleButtonClose} onPress={onClose}>
          <View style={styles.content}>
            <View>
              <Text style={styles.text}>Olá!</Text>
              <Text style={styles.username}>
                {username}#<Text style={styles.text}>{discriminator}</Text>
              </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={[styles.text, styles.buttonLogOut]}>Log out</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
