import { styled } from "styled-components/native";
import { CenterContainer } from "../../components/CenterContainer";
import { GlobalScreen } from "../../components/GlobalScreen";
import { TopWithBack } from "../../components/ui/TopWithBack";
import { Platform } from "react-native";
import * as FileSystem from "expo-file-system";
import { useAppSelector } from "../../hooks/useAppSelector";
import { TouchableHighlight } from "../../components/ui/Touchables/TouchableHighlight";
import { shareAsync } from "expo-sharing";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import * as DocumentPicker from "expo-document-picker";
import { setLikes } from "../../store/likesSlice";
import { setNotes } from "../../store/notesSlice";

export function ImportAndExport() {
  const likes = useAppSelector((state) => state.likes);
  const notes = useAppSelector((state) => state.notes.notes);
  const dispatch = useAppDispatch();

  const exportFile = async () => {
    const data = { likes, notes };

    if (Platform.OS === "android") {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

      if (permissions.granted) {
        const directoryUri = permissions.directoryUri;

        await FileSystem.StorageAccessFramework.createFileAsync(
          directoryUri,
          "Mindfulness",
          "application/json"
        )
          .then(async (fileUri) => {
            await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data), {
              encoding: FileSystem.EncodingType.UTF8,
            });
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        alert("You must allow permission to save.");
      }
    }

    if (Platform.OS === "ios") {
      const fileUri = FileSystem.documentDirectory + "Mindfulness.json";
      FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data), {
        encoding: FileSystem.EncodingType.UTF8,
      });
      const UTI = "Mindfulness.json";
      await shareAsync(fileUri, { UTI });
    }
  };

  const importFile = async () => {
    let parsedData = { likes: [], notes: [] };
    const fileInfo = await DocumentPicker.getDocumentAsync({
      type: "application/json",
    });

    if (fileInfo.type === "success") {
      const data = await FileSystem.readAsStringAsync(fileInfo.uri);
      parsedData = JSON.parse(data);
    }

    if (parsedData.likes.length !== 0 && parsedData.notes.length !== 0) {
      dispatch(setLikes(parsedData.likes));
      dispatch(setNotes(parsedData.notes));
    }
  };

  return (
    <GlobalScreen>
      <CenterContainer>
        <TopWithBack>
          <TextTitle>Импорт/экспорт</TextTitle>
        </TopWithBack>
        <TextInfo>
          Экспортируются только избранные медитации, задания и ежедневник. Файл
          будет иметь такой вид: "Mindfulness.json"
        </TextInfo>
        <ButtonContainer>
          <TouchableHighlight onPress={exportFile}>Экспорт</TouchableHighlight>
          <TouchableHighlight onPress={importFile}>Импорт</TouchableHighlight>
        </ButtonContainer>
      </CenterContainer>
    </GlobalScreen>
  );
}

const TextTitle = styled.Text`
  font-family: "Poppins-Medium";
  font-size: 18px;
  color: ${({ theme }) => theme.color.standard};
`;

const TextInfo = styled.Text`
  margin-bottom: 20px;
  text-align: justify;
  font-family: "Poppins-Regular";
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.color.standard};
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;
