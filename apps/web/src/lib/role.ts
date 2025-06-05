import type { roles } from "../../../api/src/types/role";

export function getRoleNameTh(role: roles) {
  switch (role) {
    case "SYSTEM_ADMIN":
      return "ผู้ดูแลระบบ";
    case "UNIVERSITY_ADMIN":
      return "ผู้ดูแลส่วนมหาวิทยาลัย";
    case "FACULTY_ADMIN":
      return "ผู้ดูแลส่วนคณะ/วิทยาลัย";
    case "CURRICULUM_ADMIN":
      return "ผู้ดูแลส่วนหลักสูตร";
    case "TEACHER":
      return "อาจารย์";
    case "STUDENT":
      return "นักศึกษา";
    default:
      return "ไม่ทราบตำแหน่ง";
  }
}

export function getRoleNameEn(role: roles) {
  switch (role) {
    case "SYSTEM_ADMIN":
      return "System Admin";
    case "UNIVERSITY_ADMIN":
      return "University Admin";
    case "FACULTY_ADMIN":
      return "Faculty Admin";
    case "CURRICULUM_ADMIN":
      return "Curriculum Admin";
    case "TEACHER":
      return "Teacher";
    case "STUDENT":
      return "Student";
    default:
      return "Unknown Role";
  }
}
