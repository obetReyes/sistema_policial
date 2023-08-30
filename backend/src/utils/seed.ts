import { faker } from "@faker-js/faker";
import { User, Group, Role, Report, Summary } from "@prisma/client";
import { prisma } from "./prisma.service.utils";

export function seed() {
  const generateCuip = async () => {
    const randomWords = faker.lorem.words(10); // Generate 10 random words
    const maxLength = 25;
    const randomString = randomWords.split("").slice(0, maxLength).join(" "); // Join the words and limit the length
    const cuip = randomString.replace(/\s/g, ""); // Remove all
    return cuip;
  };

  const groupsSeed = async () => {
    for (let i = 0; i < 900; i++) {
      const dispatchers = await prisma.group.create({
        data: {
          name: faker.lorem.words(3),
          area: faker.lorem.words(6),
        },
      });
    }
  };

  //officers
  const officersSeed = async () => {
    const groups = await prisma.group.findMany();
    for (let i = 0; i < 900; i++) {
      const randomIndex = Math.floor(Math.random() * groups.length);
      const officers = await prisma.user.create({
        data: {
          name: faker.internet.userName(),
          cuip: await generateCuip(),
          password: faker.internet.password(),
          role: Role.OFFICER,
          group: {
            connect: { id: groups[randomIndex].id },
          },
        },
      });
    }
  };

  //dispatchers
  const dispatchersSeed = async () => {
    for (let i = 0; i < 900; i++) {
      const dispatchers = await prisma.user.create({
        data: {
          name: faker.internet.userName(),
          cuip: await generateCuip(),
          password: faker.internet.password(),
          role: Role.DISPATCHER,
        },
      });
    }
  };

  //reports
  const reportsSeed = async () => {
    const users = await prisma.user.findMany({
      where: {
        role: "OFFICER",
      },
    });
    for (let i = 0; i < 900; i++) {
      const randomIndex = Math.floor(Math.random() * users.length);
      const reports = await prisma.report.create({
        data: {
          event: faker.lorem.words(15),
          actions: faker.lorem.words(20),
          summary: faker.lorem.words(25),
          user: {
            connect: { id: users[randomIndex].id },
          },
        },
      });
    }
  };
  //summaries
  const summariesSeed = async () => {
    const users = await prisma.user.findMany({
      where: {
        role: "DISPATCHER",
      },
    });
    for (let i = 0; i < 1200; i++) {
      const randomIndex = Math.floor(Math.random() * users.length);
      const summaries = await prisma.summary.create({
        data: {
          callTime: `${faker.number.int(
            2
          )} minutos y ${faker.number.int(2)} segundos `,
          incident: faker.lorem.words(10),
          location: faker.lorem.words(5),
          notes: faker.lorem.words(10),
          phone: faker.phone.number(),
          requestor: faker.internet.userName(),
          user: {
            connect: { id: users[randomIndex].id },
          },
        },
      });
    }
  };

  officersSeed(); 
  dispatchersSeed();
  reportsSeed();
  summariesSeed();

  groupsSeed();
}