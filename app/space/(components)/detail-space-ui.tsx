"use client";

import { Profile } from "@/types/profile";

interface DetailSpaceUIProps {
  profile?: Profile;
}

export default function DetailSpaceUi({ profile }: DetailSpaceUIProps) {
  console.log(profile);
  if (!profile) {
    return <div>프로필을 불러오는 데 오류가 발생했습니다.</div>;
  }

  if (profile.academyRole === "STUDENT") {
    // academyRole뭐뭐있는지 아직 모름..
    return <div>학생 UI</div>; // 학생 UI
  } else if (profile.academyRole === "PRINCIPAL") {
    return <div>학원장 UI</div>; // 학원장 UI
  }
}
