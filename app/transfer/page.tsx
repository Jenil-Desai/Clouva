import { headers } from "next/headers";

export default async function Page() {
  const headersList = await headers();
  const userEmail = headersList.get('x-user-email');

  return (
    <div>
      <h1>Welcome to the Protected Page</h1>
      <p>You are successfully logged in.</p>
      <p>User Email: {userEmail}</p>
    </div>
  );
}
