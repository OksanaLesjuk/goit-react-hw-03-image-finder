import { BtnLoadMore } from './Button.styled';

const Button = ({ handleBtnLoad }) => {
  return (
    <BtnLoadMore onClick={handleBtnLoad} type="button">
      Load more
    </BtnLoadMore>
  );
};

export default Button;
