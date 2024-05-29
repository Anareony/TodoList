import { Button, Flex, Typography } from "antd";
import { useFilter } from "../../store";
import { styled } from "styled-components";

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

export const FilterButtons = () => {
  const { filter, setFilter } = useFilter();

  return (
    <FlexContainer gap={10} vertical>
      <Title level={2}>Filters</Title>
      <Button disabled={filter === "all"} onClick={() => setFilter("all")}>
        All
      </Button>
      <Button
        disabled={filter === "active"}
        onClick={() => setFilter("active")}
      >
        Active
      </Button>
      <Button
        disabled={filter === "completed"}
        onClick={() => setFilter("completed")}
      >
        Completed
      </Button>
      <Button
        disabled={filter === "favourite"}
        onClick={() => setFilter("favourite")}
      >
        Favourites
      </Button>
    </FlexContainer>
  );
};
