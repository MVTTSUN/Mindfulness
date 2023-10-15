import { Helmet } from "react-helmet-async";
import { ContainerTwoSides } from "../components/ContainerTwoSides";
import { FormTextLottieImage } from "../components/FormTextLottieImage";
import { Subtitle } from "../components/Subtitle";
import { useDeleteTaskMutation, useGetTasksQuery } from "../services/api";
import styled from "styled-components";
import { FontSizeSubtitle, ResetButton, ResetList } from "../mixins";
import { BrowserRoute, Color } from "../const";
import { Link } from "react-router-dom";

export function TasksPage() {
  const { data } = useGetTasksQuery();
  const [deleteTask] = useDeleteTaskMutation();

  return (
    <>
      <Helmet>
        <title>Задания - Mindfulness</title>
      </Helmet>
      <Subtitle>Задания</Subtitle>
      <ContainerTwoSides>
        <FormTextLottieImage />
        <ContainerTasks>
          {data?.map((task) => (
            <li key={task._id}>
              <ButtonDelete
                type="button"
                onClick={() => deleteTask(task._id)}
              />
              <LinkStyled to={`${BrowserRoute.Task}/${task._id}`}>
                <Task>
                  <TitleTask>{task.title}</TitleTask>
                </Task>
              </LinkStyled>
            </li>
          ))}
        </ContainerTasks>
      </ContainerTwoSides>
    </>
  );
}

const ContainerTasks = styled.ul`
  ${ResetList}
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 320px;
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
`;

const Task = styled.article`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 100px;
  height: 100px;
  border-radius: 25px;
  background-color: ${Color.Task};
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }
`;

const TitleTask = styled.h3`
  ${FontSizeSubtitle}
  font-size: 12px;
  color: ${Color.TextStandard};
  text-align: center;
`;

const ButtonDelete = styled.button`
  ${ResetButton}
  display: block;
  margin-left: auto;
  width: 25px;
  height: 25px;
  background: url(/images/close.svg) no-repeat center;
`;
