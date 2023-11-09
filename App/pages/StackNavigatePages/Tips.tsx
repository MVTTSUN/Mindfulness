import styled from "styled-components/native";
import { CenterContainer } from "../../components/CenterContainer";
import { GlobalScreen } from "../../components/GlobalScreenWrapper";
import { HeaderWithBack } from "../../components/ui/headers/HeaderWithBack";
import { ScrollView } from "react-native";
import LottieView from "lottie-react-native";
import {
  ApiRoute,
  BASE_URL,
  Color,
  ErrorMessage,
  NameFolder,
} from "../../const";
import { useEffect } from "react";
import { useLazyGetTipsLottieQuery, useLazyGetTipsQuery } from "../../api/api";
import { useFileSystem } from "../../hooks/useFileSystem";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getDataTipsCopy, getTips } from "../../store/tipsSelectors";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setDataTipsCopy, setTips } from "../../store/tipsSlice";
import deepEqual from "deep-equal";
import { normalize } from "../../utils";
import { getIsOffline } from "../../store/offlineSelectors";
import { useToastCustom } from "../../hooks/useToastCustom";

export function Tips() {
  const tips = useAppSelector(getTips);
  const dataTipsCopy = useAppSelector(getDataTipsCopy);
  const isOffline = useAppSelector(getIsOffline);
  const dispatch = useAppDispatch();
  const [getTipsQuery] = useLazyGetTipsQuery();
  const [getTipsLottieQuery] = useLazyGetTipsLottieQuery();
  const {
    deleteFile,
    download,
    getFilePath,
    createDirectory,
    downloadJSON,
    readJSON,
  } = useFileSystem();
  const { onErrorToast } = useToastCustom();

  const downloadData = async () => {
    const { data } = await getTipsQuery();

    if (data) {
      if (!deepEqual(dataTipsCopy, data[0]?.data)) {
        try {
          await deleteFile(NameFolder.Tips);
          await createDirectory(NameFolder.Tips);
          const result = [];
          for (const node of data[0]?.data) {
            if (node.type === "image") {
              const uri = await download(
                BASE_URL +
                  ApiRoute.Tips +
                  ApiRoute.Filename +
                  `/${node.payload}`,
                NameFolder.Tips,
                node.payload
              );
              result.push({ type: node.type, payload: uri, id: node._id });
            } else if (node.type === "lottie") {
              const response = await getTipsLottieQuery(node.payload);
              response.data &&
                (await downloadJSON(
                  NameFolder.Tips,
                  node.payload,
                  response.data
                ));
              const jsonObj = (await readJSON(
                getFilePath(NameFolder.Tips, node.payload)
              )) as string;
              result.push({ type: node.type, payload: jsonObj, id: node._id });
            } else {
              result.push({
                type: node.type,
                payload: node.payload,
                id: node._id,
              });
            }
          }
          dispatch(setTips(result));
          dispatch(setDataTipsCopy(data[0]?.data));
        } catch {
          onErrorToast(ErrorMessage.DownloadFile);
        }
      }
    }
  };

  useEffect(() => {
    if (!isOffline) {
      downloadData();
    }
  }, []);

  return (
    <GlobalScreen withoutScrollView>
      <CenterContainer>
        <HeaderWithBack>
          <TextTitle>Как медитировать правильно?</TextTitle>
        </HeaderWithBack>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Container>
            {tips.map((node) => {
              if (node.type === "text") {
                return <TextNode key={node.id}>{node.payload}</TextNode>;
              } else if (node.type === "image") {
                return (
                  <ImageWrapper key={node.id}>
                    <ImageNode source={{ uri: node.payload }} />
                  </ImageWrapper>
                );
              } else if (node.type === "lottie") {
                return (
                  <LottieWrapper key={node.id}>
                    <LottieNode
                      source={
                        node.payload.charAt(0) === "{" &&
                        JSON.parse(node.payload)
                      }
                      autoPlay
                      loop
                      resizeMode="cover"
                    />
                  </LottieWrapper>
                );
              }
            })}
          </Container>
        </ScrollView>
      </CenterContainer>
    </GlobalScreen>
  );
}

const TextTitle = styled.Text`
  font-family: "Poppins-Medium";
  font-size: ${normalize(18)}px;
  color: ${({ theme }) => theme.color.standard};
`;

const Container = styled.View`
  gap: 20px;
  margin-bottom: ${normalize(270)}px;
`;

const LottieWrapper = styled.View`
  overflow: hidden;
  height: ${normalize(250)}px;
  width: 100%;
  border-radius: ${normalize(25)}px;
  border: ${normalize(7)}px dotted ${Color.Primary};
`;

const LottieNode = styled(LottieView)`
  flex: 1;
`;

const TextNode = styled.Text`
  text-align: justify;
  font-family: "Poppins-Regular";
  font-size: ${normalize(18)}px;
  line-height: ${normalize(24)}px;
  color: ${({ theme }) => theme.color.standard};
`;

const ImageWrapper = styled.View`
  height: ${normalize(250)}px;
  width: 100%;
  border-radius: ${normalize(25)}px;
  border: ${normalize(7)}px dotted ${Color.Primary};
  overflow: hidden;
`;

const ImageNode = styled.Image`
  object-fit: cover;
  height: ${normalize(250)}px;
  width: 100%;
  border-radius: ${normalize(25)}px;
`;
