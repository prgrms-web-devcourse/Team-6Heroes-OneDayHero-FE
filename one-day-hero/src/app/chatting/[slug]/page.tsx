import ChattingClientContainer from "@/components/domain/chatting/ChattingClientContainer";

const ChattingPage = ({ params }: { params: { slug: string } }) => {
  return (
    <>
      <ChattingClientContainer roomId={params.slug} />
    </>
  );
};

export default ChattingPage;
