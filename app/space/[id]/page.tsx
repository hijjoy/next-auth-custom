import { ProfileResponse } from "@/types/profile";
import { axiosInstance } from "@/libs/axiosInstance";
import DetailSpaceUi from "@/app/space/(components)/detail-space-ui";

const getProfile = async (id: string): Promise<ProfileResponse | null> => {
  try {
    const res = await axiosInstance.get<ProfileResponse>(
      `/api/v1/academy/${id}`
    );
    console.log(res);
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default async function DetailSpace({
  params,
}: {
  params: { id: string };
}) {
  const profile = await getProfile(params.id);

  return <DetailSpaceUi profile={profile?.result} />;
}
