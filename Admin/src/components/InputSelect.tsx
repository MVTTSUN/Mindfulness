import { styled } from "styled-components";
import { useFormContext } from "react-hook-form";
import { FontSizeStandard } from "../mixins";
import { Color } from "../const";
import { useState } from "react";

type InputSelectProps = {
  options: string[];
  name: string;
  labelText?: string;
  withLabel?: boolean;
};

export const InputSelect = (props: InputSelectProps) => {
  const { options, name, labelText, withLabel } = props;
  const { setValue, register, clearErrors } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);

  const changeOption = (data: string) => {
    setValue(name, data);
    clearErrors(name);
    setIsOpen(false);
  };

  return (
    <Container>
      {withLabel && <Label htmlFor={name}>{labelText}</Label>}
      <Select
        {...register(name)}
        id={name}
        disabled
        placeholder="Не выбрано"
        onMouseLeave={() => setIsOpen(false)}
        onMouseOver={() => setIsOpen(true)}
      />
      {isOpen && (
        <TooltipOptions
          onMouseLeave={() => setIsOpen(false)}
          onMouseOver={() => setIsOpen(true)}
        >
          {options.map((data, id) => (
            <Option onClick={() => changeOption(data)} key={`${id + 1}`}>
              {data}
            </Option>
          ))}
        </TooltipOptions>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const Label = styled.label`
  ${FontSizeStandard}
  cursor: pointer;
  color: ${Color.TextStandard};
  margin-bottom: 8px;
  display: inline-block;
`;

const TooltipOptions = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  background: ${Color.BackgroundMain};
  box-shadow: 0px 4px 20px #31313120;
  border: 5px dashed ${Color.Primary};
  border-radius: 25px;
`;

const Select = styled.input`
  ${FontSizeStandard}
  cursor: pointer;
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  border: 5px dashed ${Color.Primary};
  border-radius: 25px;
  background: ${Color.BackgroundMain};
  outline-style: dashed;
  outline-width: 3px;
  outline-color: transparent;
  outline-offset: 5px;
  transition: outline-color 0.3s ease;
  color: ${Color.TextStandard};
  caret-color: transparent;

  &:focus {
    outline-color: ${Color.Dark};
  }

  &::placeholder {
    color: ${Color.TextStandard};
    opacity: 0.4;
  }
`;

const Option = styled.p`
  ${FontSizeStandard}
  cursor: pointer;
  margin: 0;
  padding: 10px;
  color: ${Color.TextStandard};

  &:hover {
    background: #31313110;
    border-radius: 25px;
  }
`;
