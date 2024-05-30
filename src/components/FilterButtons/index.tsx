import { styled } from "styled-components";

import { Button as AntdButton, Flex, Typography } from "antd";

import { useFilter } from "../../store";
import { Filter } from "../../types";

const { Title: AntdTitle } = Typography;

const FlexContainer = styled(Flex)`
  padding: 20px;
  background: #18171c;
  border-radius: 10px;
`;

const Title = styled(AntdTitle)`
  align-self: start;
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 768px) {
    flex-direction: row;
  }
  @media (max-width: 425px) {
    flex-direction: column;
  }
`;

const Button = styled(AntdButton)`
  width: 100%;
`;

export const FilterButtons = () => {
  const { filter, setFilter } = useFilter();

  return (
    <FlexContainer gap={10} vertical>
      <Title level={2}>Filters</Title>
      <ButtonGroup>
        <Button disabled={filter === Filter.All} onClick={() => setFilter(Filter.All)}>
          All
        </Button>
        <Button
          disabled={filter === Filter.Active}
          onClick={() => setFilter(Filter.Active)}
        >
          Active
        </Button>
        <Button
          disabled={filter === Filter.Completed}
          onClick={() => setFilter(Filter.Completed)}
        >
          Completed
        </Button>
        <Button
          disabled={filter === Filter.Favourite}
          onClick={() => setFilter(Filter.Favourite)}
        >
          Favourites
        </Button>
      </ButtonGroup>
    </FlexContainer>
  );
};
