import { fullGap, statement, row, gap, text } from "./_kit";

const bookinggo = {
  slug: "bookinggo",
  name: "BookingGo",
  year: "2018",
  discipline: "Product Design",
  role: "Product Designer",
  services: ["Product Design", "Service Design", "UX/UI"],
  tags: ["Product Design", "Service Design"],
  cover: { grad: ["#5d8079", "#30473f"] },
  grad: ["#5d8079", "#30473f"],
  hoverImages: [],
  summary: "Rideways · 2018",
  published: true,
  lede: { lead: "BookingGo,", rest: "airport transfers from both sides of the ride." },
  detail: {
    eyebrow: "Rideways",
    heading: "Two users, one journey.",
    body: [
      "Rideways is BookingGo's pre-booked airport transfer service. A transfer only works when two people meet at the right place and time, so the product was designed from both perspectives: the customer arriving, and the driver collecting.",
    ],
  },
  modules: [
    fullGap("Rideways", "Hero: customer and driver apps side by side, 16:9."),
    statement("Rideways is a pre-booked airport taxi service. We designed it from both sides of the ride — the traveller landing in an unfamiliar place, and the driver waiting to meet them.", "Two perspectives"),
    row(
      gap(6, "4:5", "Customer", "Customer app in a device frame (bleed)."),
      gap(6, "4:5", "Driver", "Design call-out: pair the driver app in a second device on a contrasting ground — the two-sided story told in one row.")
    ),
    row(
      text(4, "Service", "Pick-up is the moment that matters. Both apps were designed around it.", "Meeting point", true),
      gap(8, "16:9", "Journey", "Service blueprint or key moments, 16:9.")
    ),
  ],
  overview: {
    heading: "Overview",
    body: ["BookingGo is the ground transport arm of Booking.com. As product designer I worked on Rideways, its pre-booked airport transfer service, across the customer and driver experiences."],
  },
};

export default bookinggo;
