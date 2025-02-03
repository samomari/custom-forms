import { currentUser } from "@clerk/nextjs/server";
import { NavigationHeader } from "@/components/navigation/navigation-header";


export default async function Home() {
  const user = await currentUser();

  const plainUser = user ? {
    id: user.id,
    email: user.primaryEmailAddress?.emailAddress,
    username: user.username,
  } : null;

  return (
    <div className="h-full w-full">
       <NavigationHeader user={plainUser}/>
       {user && (<h1>Hi, {user.username} your user id is {user.id}</h1>)}
    </div>
   
  );
}
