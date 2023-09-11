import { styled } from "styled-components/native";
import { GlobalScreen } from "../../components/GlobalScreen";
import { CenterContainer } from "../../components/CenterContainer";
import { Title } from "../../components/ui/Titles/Title";
import { Input } from "../../components/ui/Input";
import { AddIcon } from "../../components/icons/AddIcon";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MeditationData, NotesScreenProp } from "../../types";
import { useEffect } from "react";

export function Notes() {
  const navigation = useNavigation<NotesScreenProp>();
  const route = useRoute();

  useEffect(() => {
    if (route.params) {
      const { meditation } = route.params as { meditation: MeditationData };
      navigation.navigate("Note", { meditation });
    }
  }, [route.params]);

  return (
    <>
      <GlobalScreen>
        <CenterContainer>
          <Title>Ежедневник</Title>
          <Input
            onChangeText={() => {}}
            width="100%"
            placeholder="Поиск заметок"
          />
          <NotesContainer>
            <TouchableHighlightNote $backgroundColor="#469ab2">
              <>
                <NoteTitle
                  $color="#f5f4fa"
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  rhthhthrthrthrthrthrthrththrthr
                </NoteTitle>
                <NoteText
                  $color="#f5f4fa"
                  numberOfLines={4}
                  ellipsizeMode="tail"
                >
                  gerger rhthhthrthrthrthrthrthrththrthr
                  vrhthhthrthrthrthrthrthrththrthr
                  rhthhthrthrthrthrthrthrththrthr
                  rhthhthrthrthrthrthrthrththrthr
                  rhthhthrthrthrthrthrthrththrthr
                </NoteText>
                <DateText numberOfLines={1} ellipsizeMode="tail">
                  19 Августа
                </DateText>
              </>
            </TouchableHighlightNote>
            <TouchableHighlightNote $backgroundColor="#d2f2d0">
              <>
                <NoteTitle $color="#313131">rhth</NoteTitle>
                <NoteText $color="#313131">gerger</NoteText>
                <DateText numberOfLines={1} ellipsizeMode="tail">
                  19 Августа
                </DateText>
              </>
            </TouchableHighlightNote>
            <TouchableHighlightNote $backgroundColor="#d2f2d0">
              <>
                <NoteTitle $color="#313131">rhth</NoteTitle>
                <NoteText $color="#313131">gerger</NoteText>
                <DateText numberOfLines={1} ellipsizeMode="tail">
                  19 Августа
                </DateText>
              </>
            </TouchableHighlightNote>
            <TouchableHighlightNote $backgroundColor="#469ab2">
              <>
                <NoteTitle $color="#f5f4fa">rhth</NoteTitle>
                <NoteText $color="#f5f4fa">gerger</NoteText>
                <DateText numberOfLines={1} ellipsizeMode="tail">
                  19 Августа
                </DateText>
              </>
            </TouchableHighlightNote>
          </NotesContainer>
        </CenterContainer>
      </GlobalScreen>
      <PressableStyled onPress={() => navigation.navigate("Note")}>
        <ViewPlus>
          <AddIcon />
        </ViewPlus>
      </PressableStyled>
    </>
  );
}

const PressableStyled = styled.Pressable`
  position: absolute;
  right: 40px;
  bottom: 100px;
`;

const ViewPlus = styled.View`
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: #313131;
`;

const NotesContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
`;

const TouchableHighlightNote = styled.TouchableHighlight<{
  $backgroundColor: string;
}>`
  width: 48%;
  height: 48%;
  aspect-ratio: 1 / 1;
  padding: 15px;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  border-radius: 25px;
`;

const NoteTitle = styled.Text<{ $color: string }>`
  font-family: "Poppins-Medium";
  font-size: 14px;
  color: ${({ $color }) => $color};
`;

const NoteText = styled.Text<{ $color: string }>`
  flex: 1;
  opacity: 0.6;
  font-family: "Poppins-Medium";
  font-size: 12px;
  color: ${({ $color }) => $color};
`;

const DateText = styled.Text`
  align-self: flex-end;
  opacity: 0.6;
  font-family: "Poppins-Regular";
  font-size: 12px;
`;
