import { getServerToken } from "@/app/utils/auth";
import CreateForm from "@/components/domain/mission/create/CreateForm";

const MissionCreatePage = () => {
  console.log(getServerToken());
  return (
    <div className="flex w-full flex-col items-center">
      <CreateForm />
    </div>
  );
};
export default MissionCreatePage;
