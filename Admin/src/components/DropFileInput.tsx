import {
  useState,
  DragEvent,
  forwardRef,
  ForwardedRef,
  ChangeEvent,
  useRef,
  useEffect,
} from "react";
import styled from "styled-components";
import { FontSizeStandard } from "../mixins";
import { Color } from "../const";
import imageDefault from "/images/image.svg";
import Lottie from "react-lottie-player";
import EmptyLottie from "/public/lottie/empty.json";
import { Audio } from "./Audio";

type DropFileInputProps = {
  onChange: (files: File) => void;
  type: string;
  id?: string;
  withLabel?: boolean;
  labelText?: string;
  isNotArray?: boolean;
  name?: string;
  src?: string;
};

export const DropFileInput = forwardRef(
  (props: DropFileInputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { onChange, type, id, isNotArray, withLabel, labelText, name, src } =
      props;
    const [isDrag, setIsDrag] = useState(false);
    const [imagePreview, setImagePreview] = useState(src ? src : imageDefault);
    const [audioPreview, setAudioPreview] = useState("");
    const [lottiePreview, setLottiePreview] = useState(EmptyLottie);
    const lottieRef = useRef(null);

    const convertToLocalFile = (obj: DataTransfer | EventTarget) => {
      if ("files" in obj) {
        onChange(obj.files[0]);

        if (type === "image") {
          URL.revokeObjectURL(imagePreview);
          setImagePreview(URL.createObjectURL(obj.files[0]));
        } else if (type === "lottie") {
          const reader = new FileReader();
          reader.onload = (event: ProgressEvent<FileReader>) => {
            const str = event.target?.result as string;
            const json = JSON.parse(str);
            setLottiePreview(json);
          };
          reader.readAsText(obj.files[0]);
        } else {
          URL.revokeObjectURL(audioPreview);
          setAudioPreview(URL.createObjectURL(obj.files[0]));
        }
        setIsDrag(false);
      }
    };

    const getAccept = () => {
      if (type === "image") {
        return "image/png, image/jpeg";
      } else if (type === "lottie") {
        return "application/json";
      } else {
        return "audio/mp3";
      }
    };

    const dragStartHandler = (e: DragEvent) => {
      e.preventDefault();
      setIsDrag(true);
    };

    const dragEndHandler = (e: DragEvent) => {
      e.preventDefault();
      setIsDrag(false);
    };

    const onDropHandler = (e: DragEvent) => {
      e.preventDefault();

      convertToLocalFile(e.dataTransfer);
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      convertToLocalFile(e.target);
    };

    const createFile = async () => {
      if (src) {
        let extension = src.split(".").pop();
        const extensionName = extension;
        if (extension === "jpg") {
          extension = "jpeg";
        }

        if (type === "image") {
          const response = await fetch(src);
          const data = await response.blob();
          const file = new File([data], `image.${extensionName}`, {
            type: `image/${extension}`,
          });
          onChange(file);
        } else {
          const response = await fetch(src);
          const dataJson = await response.json();
          setLottiePreview(dataJson);
          const str = JSON.stringify(dataJson);
          const bytes = new TextEncoder().encode(str);
          const blob = new Blob([bytes], {
            type: "application/json;charset=utf-8",
          });
          const file = new File([blob], `lottie.json`, {
            type: "application/json",
          });
          onChange(file);
        }
      }
    };

    useEffect(() => {
      if (lottieRef.current) {
        const lottieRefCurrent = lottieRef.current as {
          play: () => void;
          loop: boolean;
        };
        lottieRefCurrent.loop = true;
        lottieRefCurrent.play();
      }
    }, [lottiePreview]);

    useEffect(() => {
      if (src) {
        createFile();
      }
    }, []);

    return (
      <>
        {withLabel && <LabelText htmlFor={name}>{labelText}</LabelText>}
        <InputField
          ref={ref}
          onChange={onChangeHandler}
          type="file"
          id={isNotArray ? name : `file-${id}`}
          accept={getAccept()}
          multiple={false}
        />
        <Container $isNotArray={isNotArray}>
          <Label
            $isDrag={isDrag}
            htmlFor={isNotArray ? name : `file-${id}`}
            onDragStart={dragStartHandler}
            onDragOver={dragStartHandler}
            onDragLeave={dragEndHandler}
            onDrop={onDropHandler}
          >
            {isDrag
              ? "Опустите файл, чтобы загрузить"
              : "Нажмите или перетащите файл, чтобы загрузить"}
          </Label>
          {type === "image" && <ImgPreview src={imagePreview} alt="Превью" />}
          {type === "lottie" && (
            <LottieWrapper>
              <Lottie ref={lottieRef} loop animationData={lottiePreview} play />
            </LottieWrapper>
          )}
          {type === "audio" && <Audio src={audioPreview} />}
        </Container>
      </>
    );
  }
);

const InputField = styled.input`
  display: none;
`;

const Container = styled.div<{ $isNotArray?: boolean }>`
  box-sizing: border-box;
  width: ${({ $isNotArray }) => ($isNotArray ? "100%" : "90%")};
  display: flex;
  align-items: stretch;
  height: 150px;
  gap: 5px;
`;

const Label = styled.label<{ $isDrag: boolean }>`
  ${FontSizeStandard}
  font-size: 12px;
  width: 205px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  padding: 10px;
  text-align: center;
  background-color: ${({ $isDrag }) =>
    $isDrag ? `${Color.Primary}70` : "transparent"};
  border: 5px dashed ${Color.Primary};
  border-radius: 25px;
  transition: background-color 0.6s ease, border 0.6s ease;

  &::before {
    content: url(/images/cloud-load.svg);
    width: 60px;
    height: 60px;
  }
`;

const ImgPreview = styled.img`
  ${FontSizeStandard}
  object-fit: cover;
  box-sizing: border-box;
  width: 150px;
  padding: 10px;
  border: 5px dashed ${Color.Primary};
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LottieWrapper = styled.div`
  overflow: hidden;
  width: 150px;
  padding: 10px;
  border: 5px dashed ${Color.Primary};
  border-radius: 25px;
`;

const LabelText = styled.label`
  ${FontSizeStandard}
  cursor: pointer;
  color: ${Color.TextStandard};
`;
