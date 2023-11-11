import styled from "styled-components";
import { FontSizeSubtitle, ResetButton, ResetList } from "../mixins";
import { DataMeditation, DataTextLottieImage } from "../types/server";
import {
  useDeleteMeditationMutation,
  useDeleteTaskMutation,
} from "../services/api";
import { Link, useLocation } from "react-router-dom";
import { BrowserRoute, Color, Image } from "../const";

type DisplayCardsTasksAndMeditationsProps = {
  data?: DataTextLottieImage[] | DataMeditation[];
};

export function DisplayCardsTasksAndMeditations(
  props: DisplayCardsTasksAndMeditationsProps
) {
  const { data } = props;
  const { pathname } = useLocation();
  const [deleteTask] = useDeleteTaskMutation();
  const [deleteMeditation] = useDeleteMeditationMutation();
  const { dataCopy } = JSON.parse(JSON.stringify({ dataCopy: data })) as {
    dataCopy: DataTextLottieImage[] | DataMeditation[];
  };
  const isMeditation = pathname === BrowserRoute.Meditation;

  const deleteCard = (id: string) => {
    if (isMeditation) {
      deleteMeditation(id);
    } else {
      deleteTask(id);
    }
  };

  return (
    <Container>
      {dataCopy
        ?.sort((a, b) =>
          a.title && b.title ? a.title.localeCompare(b.title) : -1
        )
        .map((item) => (
          <li key={item._id}>
            <ButtonDelete type="button" onClick={() => deleteCard(item._id)} />
            <LinkStyled
              to={`${
                isMeditation ? BrowserRoute.Meditation : BrowserRoute.Task
              }/${item._id}`}
            >
              <Card $isMeditation={isMeditation}>
                <TitleCard $isMeditation={isMeditation}>{item.title}</TitleCard>
              </Card>
            </LinkStyled>
          </li>
        ))}
    </Container>
  );
}

const Container = styled.ul`
  ${ResetList}
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 320px;
  justify-content: center;
  align-content: baseline;
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
`;

const Card = styled.article<{ $isMeditation: boolean }>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 100px;
  height: 100px;
  border-radius: 25px;
  background-color: ${({ $isMeditation }) =>
    $isMeditation ? Color.Meditation : Color.Task};
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }

  @media (max-width: 420px) {
    width: 85px;
    height: 85px;
  }
`;

const TitleCard = styled.h3<{ $isMeditation: boolean }>`
  ${FontSizeSubtitle}
  font-size: 12px;
  color: ${({ $isMeditation }) =>
    $isMeditation ? Color.TextWhite : Color.TextStandard};
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -moz-box;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  line-clamp: 5;
  -webkit-line-clamp: 5;

  @media (max-width: 550px) {
    font-size: 10px;
  }
`;

const ButtonDelete = styled.button`
  ${ResetButton}
  display: block;
  margin-left: auto;
  width: 25px;
  height: 25px;
  background: url(${Image.Close}) no-repeat center;
`;
