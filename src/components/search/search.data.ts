import Fiona from "fiona";

export const getPersonList = (n: number, seed = "some-random-string") => {
  console.profile("data generation");
  const list = Fiona(seed).array(n, (seeded) =>
    seeded.object({
      id: seeded.regex(/[0-9a-f]{16}/),
      phone: seeded.regex(/\+\d{12}/),
      name: seeded.name(),
      img: seeded.img(),
      bio: seeded.paragraph(),
      email: (s) =>
        s.data.name.toLowerCase().replace(/\s+/g, ".") + "@gmail.com",
    })
  ) as unknown as {
    id: string;
    name: string;
    email: string;
    phone: string;
    img: string;
    bio: string;
  }[];
  console.profileEnd("data generation");
  return list;
};
