import { GlobalScreen } from "../../components/GlobalScreen";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { HomeScreenProp, MeditationData } from "../../types";
import { CenterContainer } from "../../components/CenterContainer";
import { Title } from "../../components/ui/Titles/Title";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { OPTIONS_DATA } from "../../const";
import { Subtitle } from "../../components/ui/Titles/Subtitle";
import { CardListMeditation } from "../../components/ui/CardListMeditation";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  likeMeditations,
  searchMeditations,
} from "../../store/meditationsSlice";
import { useCallback, useEffect, useState } from "react";
import { styled } from "styled-components/native";
import { LikeIcon } from "../../components/icons/LikeIcon";
import { useAppSelector } from "../../hooks/useAppSelector";
import { PlayIcon } from "../../components/icons/PlayIcon";

export function Meditation() {
  const navigation = useNavigation<HomeScreenProp>();
  const dispatch = useAppDispatch();
  const route = useRoute();
  const theme = useAppSelector((state) => state.theme.value);
  const likes = useAppSelector((state) => state.likes.likes);
  const [isActive, setIsActive] = useState(false);
  const [lastMeditation, setLastMeditation] = useState<null | MeditationData>(
    null
  );

  useEffect(() => {
    if (route.params) {
      const { meditation } = route.params as { meditation: MeditationData };
      navigation.navigate("Audio", { meditation });
    }
  }, [route.params]);

  const findFavorites = () => {
    if (isActive) {
      dispatch(likeMeditations(null));
    } else {
      dispatch(likeMeditations(likes));
    }
    setIsActive(!isActive);
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setIsActive(false);
      };
    }, [])
  );

  return (
    <GlobalScreen>
      <CenterContainer>
        <Title>Медитации</Title>
        <SearchView>
          <Input
            onChangeText={(text) => dispatch(searchMeditations(text))}
            width="70%"
            placeholder="Поиск"
          />
          <FavoritesButton
            onPress={findFavorites}
            underlayColor={theme === "light" ? "#d3d3db" : "#1f1f1f"}
          >
            <LikeIcon isActive={isActive} />
          </FavoritesButton>
        </SearchView>
      </CenterContainer>
      <Select optionsData={OPTIONS_DATA} />
      <CenterContainer>
        <CardListMeditation count={9} />
        <Subtitle>Последняя медитация</Subtitle>
        <LastMeditation>
          <TextStyled>
            {lastMeditation === null
              ? "Вы еще не слушали медитации"
              : lastMeditation.title}
          </TextStyled>
          <Play>
            <PlayIcon size="16px" />
          </Play>
        </LastMeditation>
        <Subtitle>Как медитировать правильно?</Subtitle>
        <RuleMeditation>
          <TextStyled>Есть несколько советов для этого</TextStyled>
        </RuleMeditation>
      </CenterContainer>
    </GlobalScreen>
  );
}

const SearchView = styled.View`
  flex-direction: row;
`;

const FavoritesButton = styled.TouchableHighlight`
  height: 30px;
  padding: 3px 10px;
  background-color: ${({ theme }) => theme.backgroundColor.meditationCard};
  border-radius: 20px;
  transform: translateY(7px);
`;

const LastMeditation = styled.View`
  margin-bottom: 20px;
  padding: 20px 18px 20px 30px;
  border-radius: 30px;
  background-color: #d4f4ef;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TextStyled = styled.Text`
  font-family: "Poppins-Medium";
  font-size: 14px;
  color: #313131;
`;

const Play = styled.View`
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 20px;
  background-color: #b5f2ea;
`;

const RuleMeditation = styled.View`
  margin-bottom: 20px;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.backgroundColor.meditationCard};
  padding: 25px 15px;
  border-radius: 30px;
`;
