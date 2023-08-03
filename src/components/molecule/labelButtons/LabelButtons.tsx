/**
 * @createdBy 한수민
 * @description 댓글 작성 시 선택 버튼 컴포넌트
 */

import Image from 'next/image';

import { useTheme } from '@mui/material';

import { selectArray, selectOptions } from '~/types/labelButton';
import {
  SelectArrayWrapper,
  SelectButton,
  SelectTypography,
} from './labelButtons.styled';

interface LabelButtonsProps {
  options: string[];
  setOptions: (options: string[]) => void;
}

const LabelButtons = ({ options, setOptions }: LabelButtonsProps) => {
  const theme = useTheme();
  const textColor = theme.palette.grey[400];
  const borderColor = theme.palette.grey[100];

  // 버튼 클릭 시
  const handleButtonClick = (title: string) => {
    // 이미 선택되었으면 선택 해제, 선택 안되어있으면 선택하여 상태값 update
    const updatedOptions = options.includes(title)
      ? options.filter((option: string) => option !== title)
      : [...options, title];

    setOptions(updatedOptions);
  };

  return (
    <SelectArrayWrapper>
      {selectArray.map((select) => (
        <SelectButton
          key={selectOptions[select].title}
          variant="outlined"
          size="small"
          color="info"
          onClick={() => handleButtonClick(selectOptions[select].title)}
          color1={borderColor}
          selected={options.includes(selectOptions[select].title)}
        >
          <Image src={selectOptions[select].imgSvg} alt="" />
          <SelectTypography
            variant="body2"
            selected={options.includes(selectOptions[select].title)}
            color1={textColor}
          >
            {selectOptions[select].title}
          </SelectTypography>
        </SelectButton>
      ))}
    </SelectArrayWrapper>
  );
};

export default LabelButtons;
