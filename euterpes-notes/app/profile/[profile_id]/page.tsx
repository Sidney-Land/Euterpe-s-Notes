import ProfilePage from "./ProfilePage";

interface ProfileRoutePageProps {
  params: Promise<{ profile_id: string }>; // Updated to Promise for newer Next.js compatibility
}

export default async function ProfileRoutePage({ params }: ProfileRoutePageProps) {
  const resolvedParams = await params;
  const profileId = decodeURIComponent(resolvedParams.profile_id);

  return <ProfilePage profileId={profileId} />;
}