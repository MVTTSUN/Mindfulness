import { PropsWithChildren, useState } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { styled } from "styled-components/native";
import { normalize } from "../../../utils";
import { Leaf } from "../../svg/images/Leaf";
import { Color } from "../../../const";

type TouchableHighlightCardProps = PropsWithChildren<{
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  id: number;
}>;

export function TouchableHighlightCardMain(props: TouchableHighlightCardProps) {
  const { style, children, onPress, id } = props;
  const [colorLeaf, setColorLeaf] = useState(Color.PrimaryPastelPressed);

  return (
    <TouchableHighlightStyled
      $mainColor={Color.PrimaryPastel}
      style={style}
      onPress={onPress}
      underlayColor={Color.PrimaryPastelPressed}
      onShowUnderlay={() => setColorLeaf(Color.PrimaryPastel)}
      onHideUnderlay={() => setColorLeaf(Color.PrimaryPastelPressed)}
    >
      <>
        {id === 1 && (
          <LeafWrapperOne>
            <Leaf color={colorLeaf} />
          </LeafWrapperOne>
        )}
        {id === 2 && (
          <LeafWrapperTwo>
            <Leaf color={colorLeaf} />
          </LeafWrapperTwo>
        )}
        {id === 3 && (
          <LeafWrapperThree>
            <Leaf color={colorLeaf} />
          </LeafWrapperThree>
        )}
        {id === 4 && (
          <LeafWrapperFour>
            <Leaf color={colorLeaf} />
          </LeafWrapperFour>
        )}
        <TextStyled>{children}</TextStyled>
      </>
    </TouchableHighlightStyled>
  );
}

const TouchableHighlightStyled = styled.TouchableHighlight<{
  $mainColor: string;
}>`
  overflow: hidden;
  position: relative;
  height: ${normalize(100)}px;
  flex: 1;
  flex-basis: 48%;
  justify-content: center;
  align-items: center;
  padding: ${normalize(10)}px;
  background-color: ${({ $mainColor }) => $mainColor};
  border-radius: ${normalize(25)}px;
`;

const TextStyled = styled.Text`
  text-align: center;
  font-family: "Poppins-Medium";
  font-size: ${normalize(14)}px;
  line-height: ${normalize(18)}px;
  color: ${Color.TextStandard};
`;

const LeafWrapperOne = styled.View`
  position: absolute;
  top: ${normalize(-20)}px;
  left: ${normalize(-45)}px;
  width: ${normalize(95)}px;
  height: ${normalize(100)}px;
  transform: scale(1, -1) rotate(260deg);
`;

const LeafWrapperTwo = styled.View`
  position: absolute;
  left: ${normalize(-25)}px;
  bottom: ${normalize(-10)}px;
  width: ${normalize(115)}px;
  height: ${normalize(130)}px;
  transform: rotate(290deg);
`;

const LeafWrapperThree = styled.View`
  position: absolute;
  left: ${normalize(-15)}px;
  bottom: ${normalize(-50)}px;
  width: ${normalize(95)}px;
  height: ${normalize(100)}px;
  transform: scale(1, -1) rotate(150deg);
`;

const LeafWrapperFour = styled.View`
  position: absolute;
  bottom: ${normalize(-20)}px;
  right: ${normalize(-35)}px;
  width: ${normalize(115)}px;
  height: ${normalize(130)}px;
  transform: scale(1, -1) rotate(260deg);
`;
