import Link from "next/link";
import { Button } from "rsuite";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const Home = () => {
  const { data } = useQuery(gql`
    query Consumers {
      consumers {
        id
        name
      }
    }
  `);
  console.log("data: ", data);

  return (
    <div className="flex min-h-screen justify-center items-center">
      <Button>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </Button>
    </div>
  );
};

export default Home;
