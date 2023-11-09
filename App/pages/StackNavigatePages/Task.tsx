import { GlobalScreen } from "../../components/GlobalScreenWrapper";
import { CenterContainer } from "../../components/CenterContainer";
import { HeaderWithBack } from "../../components/ui/headers/HeaderWithBack";
import { styled } from "styled-components/native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  DataTextLottieImage,
  NotesScreenProp,
  TasksScreenProp,
} from "../../types";
import { Pressable, ScrollView } from "react-native";
import { AddIcon } from "../../components/svg/icons/other-icons/AddIcon";
import LottieView from "lottie-react-native";
import {
  ApiRoute,
  AppRoute,
  BASE_URL,
  Color,
  ErrorMessage,
  NameFolder,
  Theme,
} from "../../const";
import { useEffect } from "react";
import { LikeIcon } from "../../components/svg/icons/other-icons/LikeIcon";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from "react-native-reanimated";
import { addTaskLike, removeTaskLike } from "../../store/likesSlice";
import { useLazyGetTaskLottieQuery, useLazyGetTaskQuery } from "../../api/api";
import deepEqual from "deep-equal";
import { getDataTaskCopy, getTaskInTask } from "../../store/tasksSelectors";
import { useFileSystem } from "../../hooks/useFileSystem";
import { normalize } from "../../utils";
import { setTasksInTask, setDataTasksCopy } from "../../store/tasksSlice";
import { getIsLikeTask} from "../../store/likesSelectors";
import { getIsOffline } from "../../store/offlineSelectors";
import { Tracker } from "../../components/ui/Tracker";
import { useToastCustom } from "../../hooks/useToastCustom";

export function Task() {
  const route = useRoute();
  const { taskId } = route.params as { taskId: string };
  const navigation = useNavigation<NotesScreenProp & TasksScreenProp>();
  const theme = useAppSelector((state) => state.theme.value);
  const isLike = useAppSelector(getIsLikeTask(taskId));
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
  const scaleLike = useSharedValue(1);
  const likeStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleLike.value }],
  }));

  const toggleLike = () => {
    scaleLike.value = withSequence(
      withSpring(1),
      withSpring(1.2),
      withSpring(1)
    );
    if (isLike) {
      dispatch(removeTaskLike(task._id));
    } else {
      dispatch(addTaskLike(task._id));
    }
  };

  const downloadData = async () => {
    const { data } = await getTaskQuery(taskId);

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
    <>
      <GlobalScreen withoutScrollView>
        <CenterContainer>
          <HeaderWithBack>
            <TextTitle>{task && task.title}</TextTitle>
            <Pressable onPress={toggleLike}>
              <Animated.View
                style={[{ backgroundColor: "transparent" }, likeStyle]}
              >
                <LikeIcon
                  color={
                    theme === Theme.Light ? Color.TextStandard : Color.TextWhite
                  }
                  isActive={isLike}
                />
              </Animated.View>
            </Pressable>
          </HeaderWithBack>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Container>
              {task &&
                task.data.map((node) => {
                  if (node.type === "text") {
                    return <TextNode key={node._id}>{node.payload}</TextNode>;
                  } else if (node.type === "image") {
                    return (
                      <ImageWrapper key={node._id}>
                        <ImageNode source={{ uri: node.payload }} />
                      </ImageWrapper>
                    );
                  } else if (node.type === "lottie") {
                    return (
                      <LottieWrapper key={node._id}>
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
      <Tracker id={taskId} title={task?.title} />
      <PressableStyled
        onPress={() =>
          navigation.navigate(AppRoute.NotesStack, {
            screen: AppRoute.Notes,
            params: { screen: AppRoute.Note, task },
          })
        }
      >
        <ViewPlus>
          <AddIcon />
        </ViewPlus>
      </PressableStyled>
    </>
  );
}

const PressableStyled = styled.Pressable`
  position: absolute;
  right: ${normalize(40)}px;
  bottom: ${normalize(100)}px;
`;

const ViewPlus = styled.View`
  align-items: center;
  justify-content: center;
  width: ${normalize(50)}px;
  height: ${normalize(50)}px;
  border-radius: ${normalize(25)}px;
  background-color: ${Color.TextStandard};
`;

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
  border: ${normalize(7)}px dotted ${Color.Task};
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
  border: ${normalize(7)}px dotted ${Color.Task};
  overflow: hidden;
`;

const ImageNode = styled.Image`
  width: 100%;
  flex: 1;
`;
