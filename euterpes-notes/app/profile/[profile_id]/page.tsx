import ProfilePage from "./ProfilePage";

interface ProfileRoutePageProps {
  params: {
    profile_id: string;
  };
}

export default function ProfileRoutePage({ params }: ProfileRoutePageProps) {
  return <ProfilePage profileId={decodeURIComponent(params.profile_id)} />;
}
