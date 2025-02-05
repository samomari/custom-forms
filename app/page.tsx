import { currentUser } from "@/features/users/current-user";

export default async function Home() {
  const user = await currentUser();
  return (
    <div className="h-full w-full">
      {user && (
        <h1>
          Hi, {user.username} your user id is {user.id}
        </h1>
      )}
    </div>
  );
}
