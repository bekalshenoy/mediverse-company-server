import { Test, TestingModule } from "@nestjs/testing";
import { ModelService } from "./model.service";
import { Model, Role, Usage } from "@prisma/client";
import { Hashing } from "src/utils/hashing.util";
import { Decimal } from "@prisma/client/runtime/library";
import { BadRequestException, ForbiddenException } from "@nestjs/common";

describe("ModelService", () => {
  let service: ModelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModelService],
    }).compile();

    service = module.get<ModelService>(ModelService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should add usage", async () => {
    const password = "password";

    const usage = {
      modelId: 1,
      hospitalId: "hospital@hospital.com",
      doctorId: "docyor@doctor.com",
    };

    const user = {
      userId: "hospital@hospital.com",
      password: await Hashing.hash(password),
      dob: "",
      name: "test",
      phone: "1234567890",
      location: "Delhi",
      server: null,
      role: Role.ROLE_HOSPITAL,
    };

    const currentUser = {
      userId: "model1",
      password: "",
      dob: "",
      name: "test",
      phone: "1234567890",
      location: "Delhi",
      server: null,
      role: Role.ROLE_MODEL,
    };

    const model: Model = {
      modelId: 1,
      name: "model1",
      description: "",
      researcherId: "researcher@researcher.com",
      cost: 5 as unknown as Decimal,
      server: "",
    };

    jest
      .spyOn(service["prismaService"].model, "findUnique")
      .mockResolvedValue(model);

    jest
      .spyOn(service["prismaService"].user, "findUnique")
      .mockResolvedValue(user);

    jest.spyOn(service["prismaService"].usage, "create").mockImplementation();

    await expect(
      service.addUsage(usage as Usage, password, currentUser),
    ).resolves.toBeDefined();
  });

  it("should not add usage", async () => {
    const password = "password";

    const usage = {
      modelId: 1,
      hospitalId: "hospital@hospital.com",
      doctorId: "docyor@doctor.com",
    };

    const currentUser = {
      userId: "model1",
      password: "",
      dob: "",
      name: "test",
      phone: "1234567890",
      location: "Delhi",
      server: null,
      role: Role.ROLE_MODEL,
    };

    jest
      .spyOn(service["prismaService"].model, "findUnique")
      .mockResolvedValue(null);

    await expect(
      service.addUsage(usage as Usage, password, currentUser),
    ).rejects.toThrow(ForbiddenException);
  });

  it("should not add usage", async () => {
    const password = "password";

    const usage = {
      modelId: 1,
      hospitalId: "hospital@hospital.com",
      doctorId: "docyor@doctor.com",
    };

    const currentUser = {
      userId: "model2",
      password: "",
      dob: "",
      name: "test",
      phone: "1234567890",
      location: "Delhi",
      server: null,
      role: Role.ROLE_MODEL,
    };

    const model: Model = {
      modelId: 1,
      name: "model1",
      description: "",
      researcherId: "researcher@researcher.com",
      cost: 5 as unknown as Decimal,
      server: "",
    };

    jest
      .spyOn(service["prismaService"].model, "findUnique")
      .mockResolvedValue(model);

    await expect(
      service.addUsage(usage as Usage, password, currentUser),
    ).rejects.toThrow(ForbiddenException);
  });

  it("should not add usage", async () => {
    const password = "password";

    const usage = {
      modelId: 1,
      hospitalId: "hospital@hospital.com",
      doctorId: "docyor@doctor.com",
    };

    const currentUser = {
      userId: "model1",
      password: "",
      dob: "",
      name: "test",
      phone: "1234567890",
      location: "Delhi",
      server: null,
      role: Role.ROLE_MODEL,
    };

    const model: Model = {
      modelId: 1,
      name: "model1",
      description: "",
      researcherId: "researcher@researcher.com",
      cost: 5 as unknown as Decimal,
      server: "",
    };

    jest
      .spyOn(service["prismaService"].model, "findUnique")
      .mockResolvedValue(model);

    jest
      .spyOn(service["prismaService"].user, "findUnique")
      .mockResolvedValue(null);

    await expect(
      service.addUsage(usage as Usage, password, currentUser),
    ).rejects.toThrow(BadRequestException);
  });

  it("should not add usage", async () => {
    const password = "password";

    const usage = {
      modelId: 1,
      hospitalId: "hospital@hospital.com",
      doctorId: "docyor@doctor.com",
    };

    const user = {
      userId: "123456789012",
      password: "",
      dob: "",
      name: "test",
      phone: "1234567890",
      location: "Delhi",
      server: null,
      role: Role.ROLE_PATIENT,
    };

    const currentUser = {
      userId: "model1",
      password: "",
      dob: "",
      name: "test",
      phone: "1234567890",
      location: "Delhi",
      server: null,
      role: Role.ROLE_MODEL,
    };

    const model: Model = {
      modelId: 1,
      name: "model1",
      description: "",
      researcherId: "researcher@researcher.com",
      cost: 5 as unknown as Decimal,
      server: "",
    };

    jest
      .spyOn(service["prismaService"].model, "findUnique")
      .mockResolvedValue(model);

    jest
      .spyOn(service["prismaService"].user, "findUnique")
      .mockResolvedValue(user);

    await expect(
      service.addUsage(usage as Usage, password, currentUser),
    ).rejects.toThrow(BadRequestException);
  });

  it("should not add usage", async () => {
    const password = "password";

    const usage = {
      modelId: 1,
      hospitalId: "hospital@hospital.com",
      doctorId: "docyor@doctor.com",
    };

    const user = {
      userId: "123456789012",
      password: await Hashing.hash("wrong"),
      dob: "",
      name: "test",
      phone: "1234567890",
      location: "Delhi",
      server: null,
      role: Role.ROLE_PATIENT,
    };

    const currentUser = {
      userId: "model1",
      password: "",
      dob: "",
      name: "test",
      phone: "1234567890",
      location: "Delhi",
      server: null,
      role: Role.ROLE_MODEL,
    };

    const model: Model = {
      modelId: 1,
      name: "model1",
      description: "",
      researcherId: "researcher@researcher.com",
      cost: 5 as unknown as Decimal,
      server: "",
    };

    jest
      .spyOn(service["prismaService"].model, "findUnique")
      .mockResolvedValue(model);

    jest
      .spyOn(service["prismaService"].user, "findUnique")
      .mockResolvedValue(user);

    await expect(
      service.addUsage(usage as Usage, password, currentUser),
    ).rejects.toThrow(BadRequestException);
  });
});
