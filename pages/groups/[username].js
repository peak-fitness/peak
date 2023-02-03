import { useRouter } from "next/router";

export default function Group() {
  const router = useRouter();
  const { username } = router.query;

  return <h1>Hello {username}</h1>;
}
