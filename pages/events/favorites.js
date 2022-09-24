import { getSession } from "next-auth/react";
import Head from "next/head";
import EventList from "../../components/events/event-list";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { getFavoriteEvents } from "../../helpers/api-util";

const FavoritesPage = ({ session, favoriteEvents }) => {
  if (favoriteEvents.length === 0) {
    return (
      <div className="center">
        <ErrorAlert>
          <p>No Favorite events</p>
        </ErrorAlert>
        <Button link="/events">Explore Events </Button>
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>Favorite Events</title>
        <meta name="description" content={`A list of favorite events.`} />
      </Head>
      <div className="center">
        <h1> Favorite Events</h1>
        <Button link="/events">Show All Events</Button>
      </div>
      <EventList items={favoriteEvents} />
    </>
  );
};

export default FavoritesPage;

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    const favoriteEvents = await getFavoriteEvents(session);
    return {
      props: {
        session,
        favoriteEvents,
      },
    };
  }
}
