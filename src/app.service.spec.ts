import { Test, TestingModule } from "@nestjs/testing";
import { AppService } from "./app.service";
import { Role } from "@prisma/client";

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

  it("should authenticate", async () => {
    const userId = "user";
    const password = "password";
    const dob = "2003-01-31";

    const user = {
      userId: userId,
      password: password,
      dob: dob,
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
      service.authenticate(userId, password, dob),
    ).resolves.toBeUndefined();
  });
});
