// Generouted, changes to this file will be overridden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/courses/:courseId/grading`
  | `/faculties`
  | `/faculties/:facultyId/curriculums`
  | `/faculties/:facultyId/curriculums/:curriculumId`
  | `/faculties/:facultyId/curriculums/:curriculumId/assign`
  | `/home`
  | `/skills`

export type Params = {
  '/courses/:courseId/grading': { courseId: string }
  '/faculties/:facultyId/curriculums': { facultyId: string }
  '/faculties/:facultyId/curriculums/:curriculumId': { facultyId: string; curriculumId: string }
  '/faculties/:facultyId/curriculums/:curriculumId/assign': { facultyId: string; curriculumId: string }
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
