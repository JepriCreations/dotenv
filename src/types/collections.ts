import { Database } from './supabase'

export enum MemberRole {
  Owner = 'owner',
  Editor = 'editor',
  Viewer = 'viewer',
}

export interface Member {
  id: string
  username: string | null
  avatar_url: string | null
  avatar?: string | null
  email?: string
  role: MemberRole
}

export type Profile = Database['public']['Tables']['profiles']['Row'] & {
  avatar: string | undefined | null
  email: string | undefined | null
}

export type DocumentsHistory =
  Database['public']['Tables']['documents_history']['Row']

export type DocumentMembers =
  Database['public']['Tables']['documents_members']['Row']

export type DocumentType = Database['public']['Tables']['documents']['Row']

export type TeamType = {
  members: Member[]
  count: number
}

export interface Document
  extends DocumentType,
    Omit<DocumentsHistory, 'id' | 'document_id' | 'updated_by'> {
  team: TeamType
  updated_by: Partial<Member>
}

export type ProjectType = Database['public']['Tables']['projects']['Row']
export type ProjectInputType =
  Database['public']['Tables']['projects']['Insert']

export interface Project extends ProjectType {
  team: TeamType
  documents: Partial<Document>[]
}
