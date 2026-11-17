import { fullMedia, statement, row, media, phone } from "./_kit";

const M = "/media/bookinggo/";

const bookinggo = {
  slug: "bookinggo",
  name: "BookingGo",
  year: "2018",
  discipline: "Product Design",
  role: "Product Designer",
  services: ["Product Design", "Service Design", "UX/UI"],
  tags: ["Product Design", "Service Design"],
  cover: { img: "/media/covers/bookinggo.webp" },
  grad: ["#5d8079", "#30473f"],
  hoverImages: [M + "s-01.webp", M + "s-02.webp", M + "s-03.webp"],
  summary: "Rideways · 2018",
  published: true,
  lede: { lead: "BookingGo,", rest: "airport transfers from both sides of the ride." },
  modules: [
    fullMedia("4:3", M + "s-00.webp", "Rideways", "Rideways on mobile"),
    statement(
      "A BookingGo and Rideways joint venture to create a leading pre-booked taxi service for airport transfers — improving the service by understanding both perspectives, and making the experience between driver and customer more seamless."
    ),
    row(
      media(6, "16:10", M + "s-01.webp", "Customer app", "Rideways customer app"),
      media(6, "16:10", M + "s-02.webp", "Customer app", "Rideways booking and pick-up")
    ),
    row(
      phone(6, M + "m-meeting.webp", "#1E4FA0"),
      phone(6, M + "m-driver.webp", "#E6E6E6")
    ),
    statement("Two perspectives, one moment: the customer finding their driver at arrivals, and the driver confirming the trip."),
    fullMedia("16:10", M + "s-03.webp", "Flows", "User flows"),
    fullMedia("free", M + "s-04.webp", "Workshop", "Team workshop"),
  ],
};

export default bookinggo;
