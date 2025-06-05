import { Curriculum, University } from "@prisma/client";
import { prisma } from "../config/prisma";
import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";

const UNIVERSITY = {
  emblemImageSrc: "https://www.npru.ac.th/2019/img/Npru-logo.png",
  name: "มหาวิทยาลัยราชภัฏนครปฐม",
};

const FACULTIES = [
  {
    id: "1",
    name: "คณะครุศาสตร์",
  },
  {
    id: "2",
    name: "คณะมนุษยศาสตร์และสังคมศาสตร์",
  },
  {
    id: "3",
    name: "คณะวิทยาศาสตร์และเทคโนโลยี",
  },
  {
    id: "4",
    name: "คณะเทคโนโลยีอุตสาหกรรม",
  },
  {
    id: "5",
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

async function main() {
  let studentCount = 0;
  let teacherCount = 0;

  const PASSWORD = await bcrypt.hash("P@ssw0rd", 10);

  const university = await prisma.university.create({
    data: {
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
              nameTitle: faker.person.prefix(),
              firstName: faker.person.firstName(),
              lastName: faker.person.lastName(),
              email: `student${(studentCount += 1)}@npru.ac.th`,
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
              nameTitle: faker.person.prefix(),
              firstName: faker.person.firstName(),
              lastName: faker.person.lastName(),
              email: `teacher${(teacherCount += 1)}@npru.ac.th`,
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

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
