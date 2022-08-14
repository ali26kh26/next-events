import { getFilteredEvents } from "../../../helpers/api-util";

async function handler(req, res) {
  const filterData = req.query.slug;

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    res.status(400).json({ message: "invalid input" });
    return;
  }

  const filteredEvents = await getFilteredEvents({
    year: Number(filterData[0]),
    month: Number(filterData[1]),
  });
  res.status(200).json({ filteredEvents });
}
export default handler;
