import { Helmet } from "react-helmet-async";
import { FormEmotion } from "../components/FormEmotion";
import { Subtitle } from "../components/Subtitle";
import { useDeleteEmotionMutation, useGetEmotionsQuery } from "../services/api";
import { ContainerOneSide } from "../components/ContainerOneSide";
import styled from "styled-components";
import { FontSizeStandard, ResetButton, ResetList } from "../mixins";
import { Color, Image } from "../const";
import { DataEmotion } from "../types/get-results";

export function EmotionsPage() {
  const { data, error } = useGetEmotionsQuery();
  const [deleteEmotion] = useDeleteEmotionMutation();
  const errorError = error && "error" in error ? error.error : "";
  const dataCopy =
    data && (JSON.parse(JSON.stringify(data)) as DataEmotion[] | undefined);
  const dataSorted =
    dataCopy && dataCopy.sort((a, b) => a.value.localeCompare(b.value));

  return (
    <>
      <Helmet>
        <title>Эмоции - Mindfulness</title>
      </Helmet>
      <Subtitle>Эмоции</Subtitle>
      <ContainerOneSide>
        {!errorError && (
          <>
            <Container>
              {dataSorted?.map((item, index) => (
                <Item key={item._id}>
                  <Text>{`${index + 1}. ${item.value}`}</Text>
                  <ButtonDelete
                    type="button"
                    onClick={() => deleteEmotion(item._id)}
                  />
                </Item>
              ))}
            </Container>
            <FormEmotion />
          </>
        )}
      </ContainerOneSide>
    </>
  );
}

const Container = styled.ul`
  ${ResetList}
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  border: 5px dashed ${Color.Primary};
  border-radius: 10px;
  padding: 5px;
`;

const Text = styled.p`
  ${FontSizeStandard}
  color: ${Color.TextStandard};
  text-align: justify;
`;

const ButtonDelete = styled.button`
  ${ResetButton}
  width: 25px;
  height: 25px;
  background: url(${Image.Close}) no-repeat center;
`;
