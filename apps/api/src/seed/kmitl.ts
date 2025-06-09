import { CloType } from "@prisma/client";
import { prisma } from "../config/prisma";
import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";

const universityId = crypto.randomUUID();

const UNIVERSITY = {
  emblemImageSrc: "",
  name: "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",
};

const FACULTIES = [
  {
    id: crypto.randomUUID(),
    name: "คณะครุศาสตร์",
  },
  {
    id: crypto.randomUUID(),
    name: "คณะมนุษยศาสตร์และสังคมศาสตร์",
  },
  {
    id: crypto.randomUUID(),
    name: "คณะวิทยาศาสตร์และเทคโนโลยี",
  },
  {
    id: crypto.randomUUID(),
    name: "คณะเทคโนโลยีอุตสาหกรรม",
  },
  {
    id: crypto.randomUUID(),
    name: "คณะบัณฑิตวิทยาลัย",
  },
];

const CURRICULUMS = [
  { degreeName: "ครุศาสตรบัณฑิต", programName: "สังคมศึกษา", faculty: FACULTIES[0] },
  { degreeName: "ครุศาสตรบัณฑิต", programName: "คอมพิวเตอร์", faculty: FACULTIES[0] },
  { degreeName: "ครุศาสตรบัณฑิต", programName: "การศึกษาปฐมวัย", faculty: FACULTIES[0] },
  { degreeName: "ครุศาสตรบัณฑิต", programName: "ภาษาไทย", faculty: FACULTIES[0] },
  { degreeName: "ครุศาสตรบัณฑิต", programName: "วิทยาศาสตร์ทั่วไป", faculty: FACULTIES[0] },
  { degreeName: "ครุศาสตรบัณฑิต", programName: "ฟิสิกส์", faculty: FACULTIES[0] },
  { degreeName: "ครุศาสตรบัณฑิต", programName: "ภาษาอังกฤษ", faculty: FACULTIES[0] },
  { degreeName: "ครุศาสตรบัณฑิต", programName: "คณิตศาสตร์", faculty: FACULTIES[0] },
  { degreeName: "ครุศาสตรบัณฑิต", programName: "พลศึกษา", faculty: FACULTIES[0] },
  {
    degreeName: "ครุศาสตรบัณฑิต",
    programName: "เทคโนโลยีดิจิทัลเพื่อการศึกษา",
    faculty: FACULTIES[0],
  },

  { degreeName: "นิติศาสตรบัณฑิต", programName: "นิติศาสตร์", faculty: FACULTIES[1] },
  { degreeName: "นิติศาสตรบัณฑิต", programName: "ภาษาไทย", faculty: FACULTIES[1] },
  { degreeName: "นิติศาสตรบัณฑิต", programName: "การจัดการวัฒนธรรม", faculty: FACULTIES[1] },
  { degreeName: "นิติศาสตรบัณฑิต", programName: "ออกแบบนิเทศศิลป์", faculty: FACULTIES[1] },
  { degreeName: "นิติศาสตรบัณฑิต", programName: "ศิลปกรรมศึกษา", faculty: FACULTIES[1] },

  { degreeName: "วิทยาศาสตรบัณฑิต", programName: "วิทยาศาสตร์สิ่งแวดล้อม", faculty: FACULTIES[2] },
  { degreeName: "วิทยาศาสตรบัณฑิต", programName: "วิทยาศาสตร์", faculty: FACULTIES[2] },
  {
    degreeName: "วิทยาศาสตรบัณฑิต",
    programName: "วิทยาการการวิเคราะห์ข้อมูลและเทคโนโลโลยีดิจิทัล",
    faculty: FACULTIES[2],
  },
  { degreeName: "วิทยาศาสตรบัณฑิต", programName: "ฟิสิกส์อุปกรณ์การแพทย์", faculty: FACULTIES[2] },

  {
    degreeName: "ครุศาสตร์อุตสาหกรรมบัณฑิต",
    programName: "อุตสาหกรรมศิลป์",
    faculty: FACULTIES[3],
  },

  { degreeName: "ประกาศนียบัตรบัณฑิต", programName: "ชีพครู ", faculty: FACULTIES[4] },
  {
    degreeName: "ครุศาสตรมหาบัณฑิต",
    programName: "การจัดการนวัตกรรมเพื่อการพัฒนา",
    faculty: FACULTIES[4],
  },
  {
    degreeName: "ครุศาสตรมหาบัณฑิต",
    programName: "นวัตกรรมหลักสูตรและการจัดการเรียนรู้",
    faculty: FACULTIES[4],
  },
  {
    degreeName: "เทคโนโลยีมหาบัณฑิต",
    programName: "นวัตกรรมเทคโนโลยีอุตสาหกรรม",
    faculty: FACULTIES[4],
  },
  { degreeName: "ครุศาสตรมหาบัณฑิต", programName: "การบริหารการศึกษา", faculty: FACULTIES[4] },
  {
    degreeName: "วิทยาศาสตรมหาบัณฑิต",
    programName: "นวัตกรรมวิทยาศาสตร์และเทคโนโลยีสร้างสรรค์",
    faculty: FACULTIES[4],
  },
  {
    degreeName: "ศิลปศาสตรมหาบัณฑิต",
    programName: "สหวิทยาการเพื่อการพัฒนาสังคม",
    faculty: FACULTIES[4],
  },
  {
    degreeName: "ปรัชญาดุษฎีบัณฑิต",
    programName: "การจัดการนวัตกรรมเพื่อการพัฒนา",
    faculty: FACULTIES[4],
  },
  {
    degreeName: "ครุศาสตรดุษฎีบัณฑิต",
    programName: "นวัตกรรมหลักสูตรและการจัดการเรียนรู้",
    faculty: FACULTIES[4],
  },
  {
    degreeName: "ปรัชญาดุษฎีบัณฑิต",
    programName: "นวัตกรรมเทคโนโลยีอุตสาหกรรม",
    faculty: FACULTIES[4],
  },
  {
    degreeName: "ปรัชญาดุษฎีบัณฑิต",
    programName: "สหวิทยการเพื่อการบริหารการพัฒนาที่ยั่งยืน",
    faculty: FACULTIES[4],
  },
  { degreeName: "ปรัชญาดุษฎีบัณฑิต", programName: "การบริหารการศึกษา", faculty: FACULTIES[4] },
  {
    degreeName: "ปรัชญาดุษฎีบัณฑิต",
    programName: "นวัตกรรมวิทยาศาสตร์และเทคโนโลยีสร้างสรรค์",
    faculty: FACULTIES[4],
  },
  {
    degreeName: "ปรัชญาดุษฎีบัณฑิต",
    programName: "สหวิทยาการเพื่อการพัฒนาสังคม",
    faculty: FACULTIES[4],
  },
];

const skillIds = [
  crypto.randomUUID(),
  crypto.randomUUID(),
  crypto.randomUUID(),
  crypto.randomUUID(),
  crypto.randomUUID(),
  crypto.randomUUID(),
];

async function createMockSkills() {
  const names = [
    "Coding",
    "Aritificial Intelligence (AI)",
    "Leadership",
    "Presentation",
    "Problem Solving",
    "Digital Literacy",
  ];

  console.log("Seeding skills...");

  await prisma.skill.createMany({
    data: names.map((name, index) => ({
      id: skillIds[index],
      nameTh: name,
      nameEn: name,
      descriptionTh: `ทักษะด้าน ${name} ที่สำคัญสำหรับนักศึกษาในยุคดิจิทัล`,
      descriptionEn: `The skill of ${name} is essential for students in the digital age`,
      skillMappingRefId: crypto.randomUUID(),
      type: "SPECIFIC",
    })),
  });

  for (const idx in skillIds) {
    console.log(`Seeding skill levels and criteria for skill: ${names[idx]}`);

    await prisma.skillLevel.createMany({
      data: [
        {
          level: 1,
          descriptionTh: "ระดับ 1: พื้นฐาน",
          descriptionEn: "Level 1: Basic",
          skillId: skillIds[idx],
        },
        {
          level: 2,
          descriptionTh: "ระดับ 2: ปานกลาง",
          descriptionEn: "Level 2: Intermediate",
          skillId: skillIds[idx],
        },
        {
          level: 3,
          descriptionTh: "ระดับ 3: ขั้นสูง",
          descriptionEn: "Level 3: Advanced",
          skillId: skillIds[idx],
        },
      ],
    });

    console.log(`Seeding skill level 1 criteria for skill: ${names[idx]}`);

    const skillLevel1 = await prisma.skillLevel.findFirst({
      where: {
        skillId: skillIds[idx],
        level: 1,
      },
    });

    console.log(`Seeding skill level 2 criteria for skill: ${names[idx]}`);

    const skillLevel2 = await prisma.skillLevel.findFirst({
      where: {
        skillId: skillIds[idx],
        level: 2,
      },
    });

    console.log(`Seeding skill level 3 criteria for skill: ${names[idx]}`);

    const skillLevel3 = await prisma.skillLevel.findFirst({
      where: {
        skillId: skillIds[idx],
        level: 3,
      },
    });

    console.log(`Seeding skill level criteria for skill: ${names[idx]}`);

    await prisma.skillLevelCriteria.createMany({
      data: [
        {
          skillLevelId: skillLevel1?.id ?? "",
          criteriaNameEn: "Understand the basic concepts of the skill",
          criteriaNameTh: "เข้าใจแนวคิดพื้นฐานของทักษะ",
        },
        {
          skillLevelId: skillLevel1?.id ?? "",
          criteriaNameEn: "Able to perform basic tasks related to the skill",
          criteriaNameTh: "สามารถทำงานพื้นฐานที่เกี่ยวข้องกับทักษะได้",
        },
        {
          skillLevelId: skillLevel2?.id ?? "",
          criteriaNameEn: "Able to apply the skill in practical situations",
          criteriaNameTh: "สามารถประยุกต์ใช้ทักษะในสถานการณ์จริงได้",
        },
        {
          skillLevelId: skillLevel2?.id ?? "",
          criteriaNameEn: "Demonstrate intermediate proficiency in the skill",
          criteriaNameTh: "แสดงความเชี่ยวชาญระดับกลางในทักษะ",
        },
        {
          skillLevelId: skillLevel3?.id ?? "",
          criteriaNameEn: "Able to analyze and solve complex problems using the skill",
          criteriaNameTh: "สามารถวิเคราะห์และแก้ไขปัญหาที่ซับซ้อนโดยใช้ทักษะได้",
        },
        {
          skillLevelId: skillLevel3?.id ?? "",
          criteriaNameEn: "Demonstrate advanced proficiency in the skill",
          criteriaNameTh: "แสดงความเชี่ยวชาญขั้นสูงในทักษะ",
        },
      ],
    });
  }
}

async function createMockUniversitiesWithUsers() {
  let studentCount = 0;
  let teacherCount = 0;

  const PASSWORD = await bcrypt.hash("P@ssw0rd", 10);

  const university = await prisma.university.create({
    data: {
      id: universityId,
      name: UNIVERSITY.name,
      emblemImageSrc: UNIVERSITY.emblemImageSrc,
    },
  });

  console.log(`Seeding university: ${university.name}`);

  for (const curriculum of CURRICULUMS) {
    const dbCurriculum = await prisma.curriculum.create({
      data: {
        degreeName: curriculum.degreeName,
        programName: curriculum.programName,
        faculty: {
          connectOrCreate: {
            where: { id: curriculum.faculty.id },
            create: {
              id: curriculum.faculty.id,
              name: curriculum.faculty.name,
              university: {
                connect: { id: university.id },
              },
            },
          },
        },
      },
    });

    console.log(`Seeding curriculum: ${dbCurriculum.degreeName} - ${dbCurriculum.programName}`);

    new Array(5).fill(0).forEach(async () => {
      await prisma.student.create({
        data: {
          universityStudentId: faker.string.numeric(8),
          identificationNumber: faker.string.numeric(13),
          birthDate: faker.date.birthdate({ min: 18, max: 22, mode: "age" }),
          enrolledDate: new Date(),
          affiliatedCurriculum: {
            connect: {
              id: dbCurriculum.id,
            },
          },
          user: {
            create: {
              nameTitle: "K.",
              firstName: "Student",
              lastName: studentCount + 1 + "",
              email: `student${(studentCount += 1)}@kmitl.ac.th`,
              password: PASSWORD,
              sex: "MALE",
              role: "STUDENT",
            },
          },
        },
      });

      await prisma.teacher.create({
        data: {
          universityTeacherId: faker.string.numeric(8),
          identificationNumber: faker.string.numeric(13),
          affiliatedCurriculum: {
            connect: {
              id: dbCurriculum.id,
            },
          },
          user: {
            create: {
              nameTitle: "K.",
              firstName: "Teacher",
              lastName: teacherCount + 1 + "",
              email: `teacher${(teacherCount += 1)}@kmitl.ac.th`,
              password: PASSWORD,
              sex: "MALE",
              role: "TEACHER",
            },
          },
        },
      });

      console.log(
        `Seeding student: ${studentCount} and teacher: ${teacherCount} for curriculum: ${dbCurriculum.degreeName} - ${dbCurriculum.programName}`
      );
    });
  }
}

async function createMockCourses() {
  const currciculums = await prisma.curriculum.findMany({
    where: {
      isDeleted: false,
      faculty: {
        university: {
          id: universityId,
        },
      },
    },
    include: {
      students: true,
      teachers: true,
    },
  });

  await prisma.$transaction(
    async (tx) => {
      for (let curriculum of currciculums) {
        const mockCourses = [
          {
            id: crypto.randomUUID(),
            courseCode: "CS101",
            nameEn: "Computer Programming",
            nameTh: "การเขียนโปรแกรมคอมพิวเตอร์",
            descriptionEn: "Introduction to computer programming using Python.",
            descriptionTh: "การแนะนำการเขียนโปรแกรมคอมพิวเตอร์โดยใช้ภาษา Python",
            clos: [
              {
                type: "K",
                name: "เข้าใจพื้นฐานการเขียนโปรแกรมคอมพิวเคอร์",
              },
              {
                type: "A",
                name: "มีทัศนคติที่ดีต่อการเขียนโปรแกรมคอมพิวเตอร์",
              },
              {
                type: "S",
                name: "สามารถเขียนโปรแกรมคอมพิวเตอร์สำหรับการทำ AI และ Machine Learning",
              },
              {
                type: "S",
                name: "สามารถนำเสนอแนวคิดที่เกี่ยวกับการเขียนโปรแกรมคอมพิวเตอร์ได้",
              },
              {
                type: "S",
                name: "สามารถแก้ไขปัญหาที่เกี่ยวกับการเขียนโปรแกรมคอมพิวเตอร์ได้",
              },
            ],
          },
          {
            id: crypto.randomUUID(),
            courseCode: "MA101",
            nameEn: "Mathematics for Daily Life",
            nameTh: "คณิตศาสตร์สำหรับชีวิตประจำวัน",
            descriptionEn: "Basic mathematics concepts applied to everyday situations.",
            descriptionTh: "แนวคิดพื้นฐานทางคณิตศาสตร์ที่ใช้ในสถานการณ์ประจำวัน",
            clos: [
              {
                type: "K",
                name: "เข้าใจพื้นฐานคณิตศาสตร์สำหรับชีวิตประจำวัน",
              },
              {
                type: "A",
                name: "มีทัศนคติที่ดีต่อการใช้คณิตศาสตร์ในชีวิตประจำวัน",
              },
              {
                type: "S",
                name: "สามารถใช้คณิตศาสตร์ในการแก้ปัญหาชีวิตประจำวันได้",
              },
              {
                type: "S",
                name: "สามารถวิเคราะห์ข้อมูลทางคณิตศาสตร์ในชีวิตประจำวันได้",
              },
              {
                type: "S",
                name: "สามารถประยุกต์ใช้คณิตศาสตร์ในสถานการณ์ต่าง ๆ ได้",
              },
            ],
          },
          {
            id: crypto.randomUUID(),
            courseCode: "DT101",
            nameEn: "Introduction to Digital Technology",
            nameTh: "การแนะนำเทคโนโลยีดิจิทัล",
            descriptionEn: "Understanding digital technologies and their applications.",
            descriptionTh: "การเข้าใจเทคโนโลยีดิจิทัลและการประยุกต์ใช้",
            clos: [
              {
                type: "K",
                name: "เข้าใจพื้นฐานของเทคโนโลยีดิจิทัล",
              },
              {
                type: "A",
                name: "มีทัศนคติที่ดีต่อการใช้เทคโนโลยีดิจิทัล",
              },
              {
                type: "S",
                name: "สามารถใช้เทคโนโลยีดิจิทัลในการแก้ปัญหาได้",
              },
              {
                type: "S",
                name: "สามารถวิเคราะห์และประเมินเทคโนโลยีดิจิทัลได้",
              },
              {
                type: "S",
                name: "สามารถประยุกต์ใช้เทคโนโลยีดิจิทัลในชีวิตประจำวันได้",
              },
            ],
          },
          {
            id: crypto.randomUUID(),
            courseCode: "PM101",
            nameEn: "Principle of Marketing",
            nameTh: "หลักการตลาด",
            descriptionEn: "Fundamentals of marketing principles and strategies.",
            descriptionTh: "พื้นฐานของหลักการและกลยุทธ์ทางการตลาด",
            clos: [
              {
                type: "K",
                name: "เข้าใจพื้นฐานของหลักการตลาด",
              },
              {
                type: "A",
                name: "มีทัศนคติที่ดีต่อการตลาด",
              },
              {
                type: "S",
                name: "สามารถวิเคราะห์ตลาดและผู้บริโภคได้",
              },
              {
                type: "S",
                name: "สามารถวางแผนกลยุทธ์การตลาดได้",
              },
              {
                type: "S",
                name: "สามารถประยุกต์ใช้หลักการตลาดในสถานการณ์จริงได้",
              },
            ],
          },
          {
            id: crypto.randomUUID(),
            courseCode: "AI101",
            nameEn: "Introduction to Artificial Intelligence",
            nameTh: "การแนะนำปัญญาประดิษฐ์",
            descriptionEn: "Basics of artificial intelligence and machine learning.",
            descriptionTh: "พื้นฐานของปัญญาประดิษฐ์และการเรียนรู้ของเครื่อง",
            clos: [
              {
                type: "K",
                name: "เข้าใจพื้นฐานของปัญญาประดิษฐ์",
              },
              {
                type: "A",
                name: "มีทัศนคติที่ดีต่อการใช้ปัญญาประดิษฐ์",
              },
              {
                type: "S",
                name: "สามารถประยุกต์ใช้ปัญญาประดิษฐ์ในการแก้ปัญหาได้",
              },
              {
                type: "S",
                name: "สามารถวิเคราะห์และประเมินผลการทำงานของปัญญาประดิษฐ์ได้",
              },
              {
                type: "S",
                name: "สามารถออกแบบและพัฒนาระบบปัญญาประดิษฐ์เบื้องต้นได้",
              },
            ],
          },
        ];

        for (let mockCourseIndex in mockCourses) {
          let cloIndex = 0;
          const mockCourse = mockCourses[mockCourseIndex];

          console.log(
            `Seeding course: ${mockCourse.nameEn} for curriculum: ${curriculum.degreeName} - ${curriculum.programName}`
          );

          const course = await tx.course.create({
            data: {
              skillMappingRefId: mockCourse.courseCode,
              id: mockCourse.id,
              courseCode: mockCourse.courseCode,
              nameEn: mockCourse.nameEn,
              nameTh: mockCourse.nameTh,
              descriptionEn: mockCourse.descriptionEn,
              descriptionTh: mockCourse.descriptionTh,
              curriculum: {
                connect: {
                  id: curriculum.id,
                },
              },
            },
          });

          console.log(`Seeding course section for course: ${mockCourse.nameEn}`);

          const courseSection = await tx.courseSection.create({
            data: {
              section: "1",
              course: {
                connect: {
                  id: mockCourse.id,
                },
              },
            },
          });

          console.log(`Seeding course section teachers for course: ${mockCourse.nameEn}`);

          await tx.courseGradingCriteria.createMany({
            data: [
              {
                courseId: course.id,
                grade: "A",
                minScore: 0,
                maxScore: 0,
              },
              {
                courseId: course.id,
                grade: "B_PLUS",
                minScore: 0,
                maxScore: 0,
              },
              {
                courseId: course.id,
                grade: "B",
                minScore: 0,
                maxScore: 0,
              },
              {
                courseId: course.id,
                grade: "C_PLUS",
                minScore: 0,
                maxScore: 0,
              },
              {
                courseId: course.id,
                grade: "C",
                minScore: 0,
                maxScore: 0,
              },
              {
                courseId: course.id,
                grade: "D_PLUS",
                minScore: 0,
                maxScore: 0,
              },
              {
                courseId: course.id,
                grade: "D",
                minScore: 0,
                maxScore: 0,
              },
              {
                courseId: course.id,
                grade: "F",
                minScore: 0,
                maxScore: 0,
              },
            ],
          });

          const cloId = [
            crypto.randomUUID(), // K 0
            crypto.randomUUID(), // A 1
            crypto.randomUUID(), // S 2
            crypto.randomUUID(), // S 3
            crypto.randomUUID(), // S 4
          ];

          console.log(`Seeding CLOs for course: ${mockCourse.nameEn}`);

          await tx.clo.createMany({
            data: [
              {
                id: cloId[0],
                type: mockCourse.clos[0].type as CloType,
                name: mockCourse.clos[0].name,
              },
              {
                id: cloId[1],
                type: mockCourse.clos[1].type as CloType,
                name: mockCourse.clos[1].name,
              },
              {
                id: cloId[2],
                type: mockCourse.clos[2].type as CloType,
                name: mockCourse.clos[2].name,
              },
              {
                id: cloId[3],
                type: mockCourse.clos[3].type as CloType,
                name: mockCourse.clos[3].name,
              },
              {
                id: cloId[4],
                type: mockCourse.clos[4].type as CloType,
                name: mockCourse.clos[4].name,
              },
            ],
          });

          console.log(`Seeding course CLOs for course: ${mockCourse.nameEn}`);

          await tx.courseClo.createMany({
            data: [
              {
                cloId: cloId[0],
                courseId: course.id,
                index: (cloIndex += 1),
              },
              {
                cloId: cloId[1],
                courseId: course.id,
                index: (cloIndex += 1),
              },
              {
                cloId: cloId[2],
                courseId: course.id,
                index: (cloIndex += 1),
              },
              {
                cloId: cloId[3],
                courseId: course.id,
                index: (cloIndex += 1),
              },
              {
                cloId: cloId[4],
                courseId: course.id,
                index: (cloIndex += 1),
              },
            ],
          });

          console.log(`Seeding course CLO weights for course: ${mockCourse.nameEn}`);

          await tx.courseCloWeight.createMany({
            data: [
              {
                courseId: course.id,
                cloId: cloId[0],
                weight: 0,
              },
              {
                courseId: course.id,
                cloId: cloId[1],
                weight: 0,
              },
              {
                courseId: course.id,
                cloId: cloId[2],
                weight: 0,
              },
              {
                courseId: course.id,
                cloId: cloId[3],
                weight: 0,
              },
              {
                courseId: course.id,
                cloId: cloId[4],
                weight: 0,
              },
            ],
          });

          console.log(`Seeding course skills for course: ${mockCourse.nameEn}`);

          await tx.courseSkill.createMany({
            data: [
              {
                courseId: course.id,
                skillId: skillIds[0],
              },
              {
                courseId: course.id,
                skillId: skillIds[1],
              },
              {
                courseId: course.id,
                skillId: skillIds[2],
              },
              {
                courseId: course.id,
                skillId: skillIds[3],
              },
              {
                courseId: course.id,
                skillId: skillIds[4],
              },
              {
                courseId: course.id,
                skillId: skillIds[5],
              },
            ],
          });

          console.log(`Seeding CLO skill level criteria for course: ${mockCourse.nameEn}`);

          for (const index in skillIds) {
            console.log(
              `Seeding CLO skill level criteria for skill: ${skillIds[index]} in course: ${mockCourse.nameEn}`
            );
            console.log(`Skill Level Criteria 1`);
            const skillLevelCriteria1 = await tx.skillLevelCriteria.findMany({
              where: {
                skillLevel: {
                  skillId: skillIds[index],
                  level: 1,
                },
              },
            });

            console.log(`Skill Level Criteria 2`);

            const skillLevelCriteria2 = await tx.skillLevelCriteria.findMany({
              where: {
                skillLevel: {
                  skillId: skillIds[index],
                  level: 2,
                },
              },
            });

            console.log(`Skill Level Criteria 3`);

            const skillLevelCriteria3 = await tx.skillLevelCriteria.findMany({
              where: {
                skillLevel: {
                  skillId: skillIds[index],
                  level: 3,
                },
              },
            });

            console.log(`Creating CLO skill level 1 criteria for course: ${mockCourse.nameEn}.`);

            await tx.cloSkillLevelCriteria.createMany({
              data: [
                {
                  courseId: course.id,
                  skillLevelCriteriaId: skillLevelCriteria1[0]?.id ?? "",
                  cloId: cloId[2],
                },
                {
                  courseId: course.id,
                  skillLevelCriteriaId: skillLevelCriteria1[1]?.id ?? "",
                  cloId: cloId[2],
                },
              ],
            });

            console.log(`Creating CLO skill level 2 criteria for course: ${mockCourse.nameEn}.`);

            await tx.cloSkillLevelCriteria.createMany({
              data: [
                {
                  courseId: course.id,
                  skillLevelCriteriaId: skillLevelCriteria2[0]?.id ?? "",
                  cloId: cloId[2],
                },
                {
                  courseId: course.id,
                  skillLevelCriteriaId: skillLevelCriteria2[0]?.id ?? "",
                  cloId: cloId[3],
                },
                {
                  courseId: course.id,
                  skillLevelCriteriaId: skillLevelCriteria2[1]?.id ?? "",
                  cloId: cloId[2],
                },
                {
                  courseId: course.id,
                  skillLevelCriteriaId: skillLevelCriteria2[1]?.id ?? "",
                  cloId: cloId[3],
                },
              ],
            });

            console.log(`Creating CLO skill level 3 criteria for course: ${mockCourse.nameEn}.`);

            await tx.cloSkillLevelCriteria.createMany({
              data: [
                {
                  courseId: course.id,
                  skillLevelCriteriaId: skillLevelCriteria3[0]?.id ?? "",
                  cloId: cloId[3],
                },
                {
                  courseId: course.id,
                  skillLevelCriteriaId: skillLevelCriteria3[0]?.id ?? "",
                  cloId: cloId[4],
                },
                {
                  courseId: course.id,
                  skillLevelCriteriaId: skillLevelCriteria3[1]?.id ?? "",
                  cloId: cloId[3],
                },
                {
                  courseId: course.id,
                  skillLevelCriteriaId: skillLevelCriteria3[1]?.id ?? "",
                  cloId: cloId[4],
                },
              ],
            });
          }

          console.log(`Creating course teachers for course: ${mockCourse.nameEn}.`);

          await tx.courseTeacher.create({
            data: {
              course: {
                connect: {
                  id: course.id,
                },
              },
              teacher: {
                connect: {
                  id: curriculum.teachers[mockCourseIndex].id,
                },
              },
              courseSection: {
                connect: {
                  id: courseSection.id,
                },
              },
            },
          });

          for (const student of curriculum.students) {
            console.log(
              `Creating student course for student: ${student.universityStudentId} in course: ${mockCourse.nameEn}.`
            );

            const studentCourse = await tx.studentCourse.create({
              data: {
                courseId: course.id,
                studentId: student.id,
                courseSectionId: courseSection.id,
              },
            });

            console.log(
              `Creating student course grading for student: ${student.universityStudentId} in course: ${mockCourse.nameEn}.`
            );

            const studentCourseGrading = await tx.studentCourseGrading.create({
              data: {
                studentCourse: {
                  connect: {
                    id: studentCourse.id,
                  },
                },
              },
            });

            console.log(
              `Creating grading CLO results for student: ${student.universityStudentId} in course: ${mockCourse.nameEn}.`
            );

            await tx.gradingCloResult.createMany({
              data: [
                {
                  studentCourseGradingId: studentCourseGrading.id,
                  cloId: cloId[0],
                  result: "X",
                  index: 0,
                },
                {
                  studentCourseGradingId: studentCourseGrading.id,
                  cloId: cloId[1],
                  result: "X",
                  index: 1,
                },
                {
                  studentCourseGradingId: studentCourseGrading.id,
                  cloId: cloId[2],
                  result: "X",
                  index: 2,
                },
                {
                  studentCourseGradingId: studentCourseGrading.id,
                  cloId: cloId[3],
                  result: "X",
                  index: 3,
                },
                {
                  studentCourseGradingId: studentCourseGrading.id,
                  cloId: cloId[4],
                  result: "X",
                  index: 4,
                },
              ],
            });
          }
        }
      }
    },
    { maxWait: 9999999, timeout: 9999999 }
  );
}

async function main() {
  await createMockUniversitiesWithUsers();
  await createMockSkills();
  await createMockCourses();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
