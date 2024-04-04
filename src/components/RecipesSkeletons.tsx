import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const RecipesSkeletons = () => {
  return (
    <Card padding="10px" borderRadius={10} overflow="hidden">
      <Skeleton height={170}>
        <CardBody>
          <SkeletonText paddingBlock={3} borderRadius={10} />
        </CardBody>
      </Skeleton>
    </Card>
  );
};

export default RecipesSkeletons;
