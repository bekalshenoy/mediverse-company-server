import { Test, TestingModule } from "@nestjs/testing";
import { AppService } from "./app.service";
import { Role } from "@prisma/client";
import { BadRequestException } from "@nestjs/common";
import { Hashing } from "./utils/hashing.util";

describe("AppService", () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should authenticate patient", async () => {
    const userId = "user";
    const password = "password";
    const dob = "2003-01-31";

    const user = {
      userId: userId,
      password: await Hashing.hash(password),
      dob: await Hashing.hash(dob),
      name: "test",
      phone: "1234567890",
      location: "Delhi",
      server: null,
      role: Role.ROLE_PATIENT,
    };

    jest
      .spyOn(service["prismaService"].user, "findUnique")
      .mockResolvedValue(user);

    await expect(
      service.authenticate({ userId, password, dob }),
    ).resolves.toBeUndefined();
  });

  it("should authenticate user", async () => {
    const userId = "user";
    const password = "password";
    const dob = "2003-01-31";

    const user = {
      userId: userId,
      password: await Hashing.hash(password),
      dob: await Hashing.hash(dob),
      name: "test",
      phone: "1234567890",
      location: "Delhi",
      server: null,
      role: Role.ROLE_HOSPITAL,
    };

    jest
      .spyOn(service["prismaService"].user, "findUnique")
      .mockResolvedValue(user);

    await expect(
      service.authenticate({ userId, password }),
    ).resolves.toBeUndefined();
  });

  it("should not authenticate user", async () => {
    const userId = "user";
    const password = "password";
    const dob = "2003-01-31";

    jest
      .spyOn(service["prismaService"].user, "findUnique")
      .mockResolvedValue(null);

    await expect(
      service.authenticate({ userId, password, dob }),
    ).rejects.toThrow(BadRequestException);
  });

  it("should not authenticate user", async () => {
    const userId = "user";
    const password = "password";
    const dob = "2003-01-31";

    const user = {
      userId: userId,
      password: await Hashing.hash("wrong"),
      dob: await Hashing.hash(dob),
      name: "test",
      phone: "1234567890",
      location: "Delhi",
      server: null,
      role: Role.ROLE_HOSPITAL,
    };

    jest
      .spyOn(service["prismaService"].user, "findUnique")
      .mockResolvedValue(user);

    await expect(service.authenticate({ userId, password })).rejects.toThrow(
      BadRequestException,
    );
  });

  it("should not authenticate patient", async () => {
    const userId = "user";
    const password = "password";
    const dob = "2003-01-31";

    const user = {
      userId: userId,
      password: await Hashing.hash(password),
      dob: await Hashing.hash("wrong"),
      name: "test",
      phone: "1234567890",
      location: "Delhi",
      server: null,
      role: Role.ROLE_PATIENT,
    };

    jest
      .spyOn(service["prismaService"].user, "findUnique")
      .mockResolvedValue(user);

    await expect(
      service.authenticate({ userId, password, dob }),
    ).rejects.toThrow(BadRequestException);
  });
});
