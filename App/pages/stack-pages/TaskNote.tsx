import { GlobalScreen } from "../../components/GlobalScreenWrapper";
import { CenterContainer } from "../../components/CenterContainer";
import { HeaderWithBack } from "../../components/ui/headers/HeaderWithBack";
import { styled } from "styled-components/native";
import { useRoute } from "@react-navigation/native";
import { DataTextLottieImage } from "../../types";
import { ScrollView } from "react-native";
import { ApiRoute, BASE_URL, ErrorMessage, NameFolder } from "../../const";
import { useEffect } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useLazyGetTaskLottieQuery, useLazyGetTaskQuery } from "../../api/api";
import deepEqual from "deep-equal";
import { getDataTaskCopy, getTaskInTask } from "../../store/tasksSelectors";
import { useFileSystem } from "../../hooks/useFileSystem";
import { normalize } from "../../utils";
import { setTasksInTask, setDataTasksCopy } from "../../store/tasksSlice";
import { getIsOffline } from "../../store/offlineSelectors";
import { useToastCustom } from "../../hooks/useToastCustom";
import { Preloader } from "../../components/ui/animate-elements/Preloader";

export function TaskNote() {
  const route = useRoute();
  const { taskId } = route.params as { taskId: string };
  const dataTaskCopy = useAppSelector(getDataTaskCopy(taskId));
  const task = useAppSelector(getTaskInTask(taskId));
  const isOffline = useAppSelector(getIsOffline);
  const dispatch = useAppDispatch();
  const [getTaskQuery] = useLazyGetTaskQuery();
  const [getTaskLottieQuery] = useLazyGetTaskLottieQuery();
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
    const { data } = await getTaskQuery({ id: taskId, isStatistics: false });

    if (data) {
      if (!deepEqual(data, dataTaskCopy)) {
        try {
          await deleteFile(NameFolder.Tasks + `/${taskId}`);
          await createDirectory(NameFolder.Tasks + `/${taskId}`);
          const result = {} as DataTextLottieImage;
          result.data = [];
          result.kind = data.kind;
          result.title = data.title;
          result._id = data._id;
          for (const node of data?.data) {
            if (node.type === "image") {
              const uri = await download(
                BASE_URL +
                  ApiRoute.Tasks +
                  ApiRoute.Filename +
                  `/${node.payload}`,
                NameFolder.Tasks + `/${taskId}`,
                node.payload
              );
              uri &&
                result.data.push({
                  type: node.type,
                  payload: uri,
                  _id: node._id,
                });
            } else if (node.type === "lottie") {
              const response = await getTaskLottieQuery(node.payload);
              response.data &&
                (await downloadJSON(
                  NameFolder.Tasks + `/${taskId}`,
                  node.payload,
                  response.data
                ));
              const jsonObj = (await readJSON(
                getFilePath(NameFolder.Tasks + `/${taskId}`, node.payload)
              )) as string;
              result.data.push({
                type: node.type,
                payload: jsonObj,
                _id: node._id,
              });
            } else {
              result.data.push({
                type: node.type,
                payload: node.payload,
                _id: node._id,
              });
            }
          }
          dispatch(setTasksInTask(result));
          dispatch(setDataTasksCopy(data));
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
          <TextTitle numberOfLines={2} ellipsizeMode="tail">
            {task && task.title}
          </TextTitle>
        </HeaderWithBack>
        {!task && <Preloader />}
        <ScrollView showsVerticalScrollIndicator={false}>
          <Container>
            {task &&
              task.data.map((node) => {
                if (node.type === "text") {
                  return (
                    <TextNodes key={node._id}>
                      {node.payload.split("\n").map((text, index) => (
                        <TextNode key={`${node._id}-${index}`}>{text}</TextNode>
                      ))}
                    </TextNodes>
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
  text-align: right;
  width: 90%;
  font-family: "Poppins-Medium";
  font-size: ${normalize(18)}px;
  color: ${({ theme }) => theme.color.standard};
`;

const Container = styled.View`
  gap: 20px;
  margin-bottom: ${normalize(390)}px;
`;

const TextNodes = styled.View`
  gap: 15px;
`;

const TextNode = styled.Text`
  font-family: "Poppins-Regular";
  font-size: ${normalize(18)}px;
  line-height: ${normalize(22)}px;
  color: ${({ theme }) => theme.color.standard};
`;
