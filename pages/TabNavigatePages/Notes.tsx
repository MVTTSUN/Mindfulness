import { styled } from "styled-components/native";
import { GlobalScreen } from "../../components/GlobalScreen";
import { CenterContainer } from "../../components/CenterContainer";
import { Title } from "../../components/ui/Titles/Title";
import { Input } from "../../components/ui/Input";
import { AddIcon } from "../../components/icons/AddIcon";
import { Pressable } from "react-native";

export function Notes() {
  return (
    <GlobalScreen>
      <CenterContainer>
        <TitleContainer>
          <Title>Ежедневник</Title>
          <Test>
            <Pressable onPress={() => console.log(1)}>
              <AddIcon />
            </Pressable>
          </Test>
        </TitleContainer>
        <Input width="70%" placeholder="Поиск" />
        <Input width="100%" withoutIcon placeholder="Название" />
        <Input isTextarea width="100%" withoutIcon placeholder="Текст" />
      </CenterContainer>
    </GlobalScreen>
  );
}

const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Test = styled.View`
  height: 50px;
`;
