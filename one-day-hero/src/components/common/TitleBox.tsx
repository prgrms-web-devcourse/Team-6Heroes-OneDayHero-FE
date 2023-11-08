import Container from "@/components/common/Container";
import Label from "@/components/common/Label";

type TitleBoxProps = {
  category: string;
  title: string;
};

const TitleBox = ({ category, title }: TitleBoxProps) => {
  return (
    <Container className="cs:w-full cs:px-5 cs:m-0">
      <Label size="sm">{category}</Label>
      <h1 className="mt-1 text-lg font-semibold">{title}</h1>
    </Container>
  );
};

export default TitleBox;
